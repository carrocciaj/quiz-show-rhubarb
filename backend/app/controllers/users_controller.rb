class UsersController < ApplicationController
  
  def create
    @user = User.new(user_params)
    if User.save 
      render json: @user, status: :created
    else
      render json: {"error": "Invalid"}, status: :unprocessable_entity
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
