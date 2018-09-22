class Api::UsersController < ApplicationController
  skip_before_action :verify_authentication

  def create
    @user = User.new(user_params)
    if @user.save 
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password)
  end
end
