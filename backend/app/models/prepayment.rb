class Prepayment < ApplicationRecord
  belongs_to :scenario_card

  # 繰り上げ返済のタイプ　0: 期間短縮, 1: 返済額軽減
  enum :prepayment_type, { duration_reduction: 0, payment_reduction: 1 }

  validates :execution_year, presence: true, numericality: {
    only_integer: true,
    greater_than: 0,
    less_than: ->(prepayment) { prepayment.scenario_card&.period_years || 99 }
  }
  validates :amount, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :prepayment_type, presence: true
end
