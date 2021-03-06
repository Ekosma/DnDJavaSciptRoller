class ApplicationController < ActionController::API

  def new
    user = User.new
  end

  def create
    user = User.new(sign_up_params)
    if user.save
      #render json: {status: "SUCCESS", message: "added a new user!", data: user}, status: :ok
      user = User.find_by(username: params[:username])
      render json: {user: user}
    else
      render json: {status: "ERROR", message: "couldn't add a user", data: user.errors}, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      characters = Character.where("user_id = ?", user.id).alphabetical
      render json: {user: user, characters: characters}
    else
      render json: {errors: "Username or Password incorrect, Please try again."}
    end
  end

  private
  def sign_up_params
    params.permit(:username, :password)
  end

end

