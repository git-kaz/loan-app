FactoryBot.define do
  factory :prepayment do
    scenario_card { nil }
    execution_year { 1 }
    amount { 1 }
    prepayment_type { 1 }
  end
end
