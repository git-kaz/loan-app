class Prepayment < ApplicationRecord
  belongs_to :scenario_card

  # 繰り上げ返済のタイプ　0: 期間短縮, 1: 返済額軽減
  enum :prepayment_type, { duration_reduction: 0, payment_reduction: 1 }
end
