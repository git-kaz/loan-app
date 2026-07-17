class Api::V1::SimulationsController < ApplicationController
  def create
    # 一時的な計算をメモリで行うためにnewを用いる
    card = ScenarioCard.new(
      principal: simulation_params[:amount].to_i * 10_000,
      period_years: simulation_params[:years].to_i,
      repayment_type: simulation_params[:repayment_type].to_i,
      interest_type: simulation_params[:interest_type].to_i,
      initial_rate_sub: (simulation_params[:initial_rate].to_f * 100).round,
      fixed_years: simulation_params[:fixed_years].to_i,
      subsequent_rate_sub: (simulation_params[:subsequent_rate].to_f * 100).round
    )

    if active_prepayment?
    card.prepayments.build(
      execution_year: simulation_params[:prepayment_year].to_i,
      amount: simulation_params[:prepayment_amount].to_i * 10_000, # 万円→円に
      prepayment_type: simulation_params[:prepayment_type].to_i
    )
    end
    
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
