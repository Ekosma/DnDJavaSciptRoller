class ApplicationController < ActionController::API

  def signup
    User.new(user_params)
  end

  def login
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      render json: {user: user}
    else
      render json: {errors: "invalid username"}
    end
  end

  private
  
  def user_params
    params.require(:user).permit(params[:username], params[:password])
  end

end
