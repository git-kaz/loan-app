class ApplicationController < ActionController::API
rescue_from ArgumentError, with: :handle_argument_error

  private

  def handle_argument_error(exception)
    render json: { errors: [ exception.message ] }, status: :unprocessable_entity
  end
end
