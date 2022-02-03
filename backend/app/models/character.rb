class Character < ApplicationRecord
  belongs_to :users
  #scope :alphabetical, -> {order('name')}
  attribute :name, :race, :character_class, :alignment, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma
end
