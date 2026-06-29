require 'rails_helper'

RSpec.describe ScenarioCard, type: :model do
  describe '#calculate_schedule' do
    context '全期間固定金利・元利均等返済の場合' do
      let(:scenario_card) do
        ScenarioCard.new(
          principal: 40_000_000, #4000万円
          period_years: 35, #35年
          repayment_type: 0, #元利均等
          interest_type: 1, #全期間固定
          initial_rate_sub: 70 #金利0.7% (70 bps)
        )
      end

      it '正しく毎月の返済額、総返済額を計算できること' do

        result = scenario_card.calculate_schedule

        expect(result[:monthly_payment_initial]).to eq(107_408) # 初回の毎月返済額
        expect(result[:monthly_payment_after]).to eq(107_408) # 固定期間以降の毎月返済額

        expect(result[:total_payment]).to eq(45_111_360) # 総返済額(107,408円 * 420回)

      end
    end
  end
end
