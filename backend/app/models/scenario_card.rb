class ScenarioCard < ApplicationRecord
  has_many :prepayments, dependent: :destroy

  # 元利均等: 0, 元金均等: 1
  enum :repayment_type, { equal_payment: 0, equal_principal: 1 }
  # 全期間固定: 0, 全期間変動: 1, 当初固定: 2
  enum :interest_type, { floating: 0, fully_fixed: 1, initial_fixed: 2 }

  validates :principal, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :period_years, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :initial_rate_sub, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :repayment_type, presence: true
  validates :interest_type, presence: true
  with_options if: :initial_fixed? do |card|
    card.validates :fixed_years, presence: true, numericality: { only_integer: true, greater_than: 0 }
    card.validates :subsequent_rate_sub, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  end


  def calculate_schedule
    # 期間（年）を月数に変換
    months = period_years * 12
    # ループ用に元本を代入
    balance = principal

    # 毎月の返済額の初期値
    if equal_payment?
      current_payment = calculate_equal_payment(balance, months, initial_rate_sub)

      monthly_payment_initial = current_payment
      monthly_payment_after = current_payment

    else
      current_principal_payment = (balance / months.to_f).ceil
      initial_interest = (balance * (initial_rate_sub / 120000.0)).floor
      monthly_payment_initial = current_principal_payment + initial_interest
      monthly_payment_after = monthly_payment_initial
    end

    total_payment = 0

    chart_data = []

    # メモリに繰り上げ返済データを読み込んでおく
    active_prepayments = prepayments.to_a

    # 返済金額の計算
    (1..months).each do |m|
      break if balance <= 0

      # 当月適応金利の判定
      current_rate_bps = current_rate_bps_at(m)

      # 当月の利息計算
      interest = (balance * (current_rate_bps / 120000.0)).floor

      # 当月の返済額計算
      # 毎月返済額 or 残高の少ない方
      target_payment = equal_payment? ? current_payment : (current_principal_payment + interest)
      payment_this_month = [ target_payment, balance + interest ].min
      # 元本返済分を計算
      principal_paid = payment_this_month - interest
      # 残高から元本返済分を引く
      balance -= principal_paid
      # 総返済額に加算
      total_payment += payment_this_month

      if m % 12 == 0
          chart_data << { year: m / 12, payment: payment_this_month }

      end

      # 当初固定金利終了時に返済額再計算
      if initial_fixed? && fixed_years.present? && subsequent_rate_sub.present? && m == fixed_years * 12 && balance > 0
        remaining_months = months - m
        # 残りの返済額を再計算
        if equal_payment?
          current_payment = calculate_equal_payment(balance, remaining_months, current_rate_bps_at(m+1))
          monthly_payment_after = current_payment
        else
          next_rate_bps = current_rate_bps_at(m+1)
          next_month_interest = (balance * (next_rate_bps / 120000.0)).floor
          monthly_payment_after = current_principal_payment + next_month_interest
        end
      end

      # 繰り上げ返済の実行判定と処理
      prepayment = active_prepayments.find { |p| p.execution_year * 12 == m }
      if prepayment && balance > 0
        prepay_amount = [ prepayment.amount, balance ].min
        balance -= prepay_amount
        total_payment += prepay_amount

        # 返済額軽減型の場合は翌月以降の返済額を再計算
        if prepayment.payment_reduction?
          remaining_months = months - m
          next_rate_bps = current_rate_bps_at(m+1)
          if equal_payment?
            current_payment = calculate_equal_payment(balance, remaining_months, next_rate_bps)
            monthly_payment_after = current_payment
          else
            current_principal_payment = (balance / remaining_months.to_f).ceil
            next_month_interest = (balance * (next_rate_bps / 120000.0)).floor
            monthly_payment_after = current_principal_payment + next_month_interest
          end
        end
      end
    end

    while chart_data.size < period_years
      chart_data << { year: chart_data.size + 1, payment: 0 }
    end

      {
        monthly_payment_initial: monthly_payment_initial,
        monthly_payment_after: monthly_payment_after,
        total_payment: total_payment,
        chart_data: chart_data
      }
  end

    private

    # 元利均等返済の計算を行うヘルパーメソッド
    def calculate_equal_payment(balance, months, annual_rate_bps)
      # 金利が0%の場合は単に元金を月数で割る
      return (balance / months.to_f).ceil if annual_rate_bps == 0

      # 万分栗の年利を月利(float)に変換
      monthly_rate = annual_rate_bps / 120000.0

      # 返済額の計算式：元金 * 月利 * (1 + 月利) ^ 月数 / ((1 + 月利) ^ 月数 - 1)
      # 分子
      numerator = balance * monthly_rate * ((1 + monthly_rate) ** months)
      # 分母
      denominator = (1 + monthly_rate) ** months - 1

      (numerator / denominator).floor # 小数点以下切り捨て
    end

    def current_rate_bps_at(month)
      if initial_fixed? && fixed_years.present? &&subsequent_rate_sub.present? && month > fixed_years * 12
        subsequent_rate_sub
      else
        initial_rate_sub
      end
    end
end
