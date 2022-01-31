class Character < ApplicationRecord
  belongs_to :users
  scope :alphabetical, -> {order('name')}
  attribute :name, :race, :class, :alignment, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma
end
