class ScenarioCard < ApplicationRecord

  # 元利均等: 0, 元金均等: 1
  enum :repayment_type, { equal_payment: 0, equal_principal: 1 }
  # 全期間固定: 0, 全期間変動: 1, 当初固定: 2
  enum :interest_type, { floating: 0, fully_fixed: 1, initial_fixed: 2 }

  def calculate_schedule
    # 期間（年）を月数に変換
    months = period_years * 12

    # 毎月の返済額を計算
    payment = calculate_equal_payment(principal, months, initial_rate_sub)
    
    # フロントに渡すためにハッシュで返す
    {
      monthly_payment_initial: payment,
      monthly_payment_after: payment, 
      total_payment: payment * months
    }
  end

    private

    # 元利均等返済の遺産を行うヘルパーメソッド
    def calculate_equal_payment(balance, months, annual_rate_bps)
      # 金利が0%の場合は単に元金を月数で割る
      return (balance / months.to_f).ceil if annual_rate_bps == 0

      #万分栗の年利を月利(float)に変換
      monthly_rate = annual_rate_bps / 120000.0

      # 返済額の計算式：元金 * 月利 * (1 + 月利) ^ 月数 / ((1 + 月利) ^ 月数 - 1)
      # 分子
      numerator = balance * monthly_rate * ((1 + monthly_rate) ** months)
      # 分母
      denominator = (1 + monthly_rate) ** months - 1

      (numerator / denominator).round
    
    end
end