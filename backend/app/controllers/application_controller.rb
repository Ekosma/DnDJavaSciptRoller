class ApplicationController < ActionController::API

  def new
    user = User.new
  end

  def create
    user = User.new(sign_up_params)
    if user.save
      render json: {status: "SUCCESS", message: "added a new user!", data: user}, status: :ok
    else
      render json: {status: "ERROR", message: "couldn't add a user", data: user.errors}, status: :unprocessable_entity
    end
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
  def sign_up_params
    params.permit(:username, :password)
  end

end

  #def signup
    #User.new(user_params)
  #end

  #private
  
  #def user_params
    #params.require(:user).permit(params[:username], params[:password])
  #end

