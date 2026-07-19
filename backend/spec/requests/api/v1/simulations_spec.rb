require 'rails_helper'

RSpec.describe "Api::V1::Simulations", type: :request do
    let(:valid_params) do
      {
        amount: 4000,
        years: 35,
        repayment_type: 0,
        interest_type: 1,
        initial_rate_sub: 70
      }
    end

  context "正常なパラメーターの場合" do
    it "200 OKを返すこと" do
      post api_v1_simulations_path, params: valid_params
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to have_key("monthly_payment_initial")
      expect(json).to have_key("monthly_payment_after")
      expect(json).to have_key("total_payment")
      expect(json).to have_key("chart_data")
    end
  end

  context "バリデーションエラーが発生する場合" do
    shared_examples "422を返しエラーメッセージを返す" do
      it "422 Unprocessable Entityを返し、エラーメッセージを返すこと" do
        post api_v1_simulations_path, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json["errors"]).to be_present
        expect(json["errors"]).to be_an(Array)
      end
    end

    context "金額がマイナスの場合" do
      let(:invalid_params) { valid_params.merge(amount: -100) }
      include_examples "422を返しエラーメッセージを返す"
    end

    context "金額が0の場合" do
      let(:invalid_params) { valid_params.merge(amount: 0) }
      include_examples "422を返しエラーメッセージを返す"
    end

    context "返済期間が0年の場合" do
      let(:invalid_params) { valid_params.merge(years: 0) }
      include_examples "422を返しエラーメッセージを返す"
    end

    context "返済期間がマイナスの場合" do
      let(:invalid_params) { valid_params.merge(years: -5) }
      include_examples "422を返しエラーメッセージを返す"
    end
    context "金利がマイナスの場合" do
      let(:invalid_params) { valid_params.merge(initial_rate_sub: -1) }
      include_examples "422を返しエラーメッセージを返す"
    end

    context "不正なrepayment_typeの場合" do
      let(:invalid_params) { valid_params.merge(repayment_type: 99) }
      include_examples "422を返しエラーメッセージを返す"
    end

    context "不正なinterest_typeの場合" do
      let(:invalid_params) { valid_params.merge(interest_type: 99) }
      include_examples "422を返しエラーメッセージを返す"
    end


    context "当初固定金利を選択したのにfixed_yearsが未指定の場合" do
      let(:invalid_params) do
        valid_params.merge(interest_type: 2, subsequent_rate: 0.9)
      end
        include_examples "422を返しエラーメッセージを返す"
    end

    context "当初固定金利を選択したのにsubsequent_rateが未指定の場合" do
      let(:invalid_params) do
        valid_params.merge(interest_type: 2, fixed_years: 5)
      end
      include_examples "422を返しエラーメッセージを返す"
    end

    context "金額が数値でない場合" do
      let(:invalid_params) { valid_params.merge(amount: "abc") }
      include_examples "422を返しエラーメッセージを返す"
    end
  end

  context "繰上げ返済のバリデーションエラーが発生する場合" do
    shared_examples "422を返しエラーメッセージを返す" do
      it "422 Unprocessable Entityを返し、エラーメッセージを返すこと" do
        post api_v1_simulations_path, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json["errors"]).to be_present
      end
    end

    context "繰上げ返済額がマイナスの場合" do
      let(:invalid_params) do
        valid_params.merge(
          prepayment_enabled: true,
          prepayment_year: 5,
          prepayment_amount: -50,
          prepayment_type: 0
        )
      end
      include_examples "422を返しエラーメッセージを返す"
    end

    context "不正なprepayment_typeの場合" do
      let(:invalid_params) do
        valid_params.merge(
          prepayment_enabled: true,
          prepayment_year: 5,
          prepayment_amount: 100,
          prepayment_type: 99
        )
      end
      include_examples "422を返しエラーメッセージを返す"
    end

    context "繰上げ返済の実行年が返済期間を超える場合" do
      let(:invalid_params) do
        valid_params.merge(
          years: 10,
          prepayment_enabled: true,
          prepayment_year: 20,
          prepayment_amount: 100,
          prepayment_type: 0
        )
      end
      include_examples "422を返しエラーメッセージを返す"
    end
  end
end
