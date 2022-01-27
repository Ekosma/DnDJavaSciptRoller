class ApplicationController < ActionController::API

  def signup
    User.new(params[:username], params[:password])
  end

  def login
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      render json: {user: user}
    else
      render json: {errors: "invalid username"}
    end
  end
end
