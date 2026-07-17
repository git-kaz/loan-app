require 'rails_helper'

RSpec.describe ScenarioCard, type: :model do
  describe '#calculate_schedule' do
    context '全期間固定金利・元利均等返済の場合' do
      let(:scenario_card) do
        ScenarioCard.new(
          principal: 40_000_000, # 4000万円
          period_years: 35, # 35年
          repayment_type: 0, # 元利均等
          interest_type: 1, # 全期間固定
          initial_rate_sub: 70 # 金利0.7% (70 bps)
        )
      end

      it '正しく毎月の返済額、総返済額を計算できること' do
        result = scenario_card.calculate_schedule

        expect(result[:monthly_payment_initial]).to eq(107_408) # 初回の毎月返済額
        expect(result[:monthly_payment_after]).to eq(107_408) # 固定期間以降の毎月返済額
        expect(result[:total_payment]).to eq(45_111_275) # 総返済額(420回分のループ計算。floorで切り捨て)

        # rechart用データ
        expect(result[:chart_data].size).to eq(35)
        expect(result[:chart_data].first).to eq({ year: 1, payment: 107_408 })
        expect(result[:chart_data].last).to eq({ year: 35, payment: 107_323 })
      end
    end

    context '全期間固定金利、元金均等返済の場合' do
      let(:scenario_card) do
        ScenarioCard.new(
          principal: 40_000_000,
          period_years: 35,
          repayment_type: 1,
          interest_type: 1,
          initial_rate_sub: 70
        )
      end

      it '正しく毎月の返済額、総返済額を計算できること' do
        result = scenario_card.calculate_schedule

        expect(result[:monthly_payment_initial]).to eq(118_572)
        expect(result[:total_payment]).to eq(44_911_410)

        expect(result[:chart_data].size).to eq(35)
        expect(result[:chart_data].first).to eq({ year: 1, payment: 117_961 })
        expect(result[:chart_data].last).to eq({ year: 35, payment: 94_914 })
      end
    end

    context '当初固定金利・元金均等返済の場合' do
      let(:scenario_card) do
        ScenarioCard.new(
          principal: 40_000_000, # 4000万円
          period_years: 35, # 35年
          repayment_type: 1, # 元金均等
          interest_type: 2, # 当初固定
          initial_rate_sub: 70,
          fixed_years: 3, #
          subsequent_rate_sub: 150
        )
      end

      it '正しく毎月の返済額、総返済額を計算できること' do
        result = scenario_card.calculate_schedule

        expect(result[:monthly_payment_initial]).to eq(118_572) # 初回の毎月返済額
        expect(result[:monthly_payment_after]).to eq(140_953) # 固定期間終了後

        expect(result[:total_payment]).to eq(49_604_691)

        expect(result[:chart_data].size).to eq(35)
        expect(result[:chart_data][0]).to eq({ year: 1, payment: 117_961 })
        expect(result[:chart_data][3]).to eq({ year: 4, payment: 139_643 })
        expect(result[:chart_data].last).to eq({ year: 35, payment: 94_977 })
      end
    end

    context '当初固定金利・元利均等返済の場合' do
      let(:scenario_card) do
        ScenarioCard.new(
          principal: 40_000_000, # 4000万円
          period_years: 35, # 35年
          repayment_type: 0, # 元利均等
          interest_type: 2, # 当初固定
          initial_rate_sub: 90, # 金利0.9% (90 bps)
          fixed_years: 3, # 3年間固定
          subsequent_rate_sub: 150 # 3年後の金利1.5% (150 bps)
        )
      end

      it '正しく毎月の返済額、総返済額を計算できること' do
        result = scenario_card.calculate_schedule

        expect(result[:monthly_payment_initial]).to eq(111_059) # 初回の毎月返済額
        expect(result[:monthly_payment_after]).to eq(121_522) # 固定期間以降の毎月返済額
        expect(result[:total_payment]).to eq(50_662_572) # 総返済額(111,059円 * 36回 + 121,522円 * 384回)

        # rechart用データ
        expect(result[:chart_data].size).to eq(35)
        expect(result[:chart_data][0]).to eq({ year: 1, payment: 111_059 })
        expect(result[:chart_data][3]).to eq({ year: 4, payment: 121_522 })
        expect(result[:chart_data].last).to eq({ year: 35, payment: 121_522 })
      end
    end

    context '繰り上げ返済がある場合' do
      let(:scenario_card) do
        # DB保存が必要なためcreate!を使用
        ScenarioCard.create!(
          principal: 40_000_000, # 4000万円
          period_years: 35, # 35年
          repayment_type: 0, # 元利均等
          interest_type: 1, # 全期間固定
          initial_rate_sub: 70 # 金利0.7% (70 bps)
        )
      end

      context '期間短縮柄の場合' do
        before do
          scenario_card.prepayments.create!(
            execution_year: 5,
            amount: 1_000_000,
            prepayment_type: 0 # 期間短縮型
          )
        end

        it '総返済額が減り、期間短縮効果が反映されること' do
          result = scenario_card.calculate_schedule
          expect(result[:total_payment]).to eq(44_881436)

          expect(result[:chart_data].size).to eq(35)
          expect(result[:chart_data][4]).to eq({ year: 5, payment: 107_408 })
          expect(result[:chart_data].last).to eq({ year: 35, payment: 0 })
        end
      end

      context '返済額軽減型の場合' do
        before do
          scenario_card.prepayments.create!(
            execution_year: 5,
            amount: 1_000_000,
            prepayment_type: 1 # 返済額軽減型
          )
        end

        it '総返済額が減り、61ヶ月以降の返済額が軽減されること' do
          result = scenario_card.calculate_schedule
          expect(result[:total_payment]).to eq(45_002_200)
          expect(result[:monthly_payment_after]).to eq(104_327)

          expect(result[:chart_data].size).to eq(35)
          expect(result[:chart_data][4]).to eq({ year: 5, payment: 107_408 })
          expect(result[:chart_data][5]).to eq({ year: 6, payment: 104_327 })
        end
      end
    end
  end
end
