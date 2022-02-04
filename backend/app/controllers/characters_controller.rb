class CharactersController < ApplicationController
  before_action :set_character, only: [:show, :update, :destroy]

  # GET /characters
  def index
    @characters = Character.all
    render json: @characters
  end

  # GET /characters/1
  def show
    render json: @character
  end

  # POST /characters
  def create

    @character = Character.new(character_params)

    if @character.save
      characters = Character.where("user_id = ?", @character.user_id).alphabetical
      render json: characters, status: :created, location: @characters
    else
      render json: @character.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /characters/1
  def update
    if @character.update(character_params)
      render json: @character
    else
      render json: @character.errors, status: :unprocessable_entity
    end
  end

  # DELETE /characters/1
  def destroy
    @character.destroy
    #render json: {message:'Character Deleted'}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_character
      @character = Character.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def character_params
      params.permit(:name, :race, :character_class, :alignment, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :user_id)
    end
end
