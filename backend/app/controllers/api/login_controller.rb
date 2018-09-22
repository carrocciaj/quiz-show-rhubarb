class Api::LoginController < ApplicationController
  skip_before_action :verify_authentication

  def create
    user = User.find_by_username(params[:username])

    if user && user.authenticate(params[:password])
      render json: {username: user.username, token: user.api_token, admin: user.admin}
    else
      render json: {error: "Invalid"}, status: :unauthorized
    end
  end

end