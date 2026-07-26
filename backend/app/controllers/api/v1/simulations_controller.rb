class Api::V1::SimulationsController < ApplicationController
  def create
    card = ScenarioCard.build_from_params(simulation_params)

    if card.invalid?
      render json: { errors: card.errors.full_messages }, status: :unprocessable_entity
      return
    end

    # 計算を実行し、結果をjsonで返す
    render json: card.calculate_schedule
  end

  private

  def simulation_params
    params.permit(:amount, :years, :repayment_type, :interest_type,
                  :initial_rate, :fixed_years, :subsequent_rate,
                  :prepayment_enabled, :prepayment_type, :prepayment_year, :prepayment_amount)
  end

  def active_prepayment?
    # true(boolean)に変換する
    ActiveModel::Type::Boolean.new.cast(simulation_params[:prepayment_enabled])
  end
end
