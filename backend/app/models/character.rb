class Character < ApplicationRecord
  #scope :alphabetical, -> {order('name')}
  #attribute :name, :race, :character_class, :alignment, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma
  validates :name, :race, :character_class, :alignment, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :user_id, presence: true
end
