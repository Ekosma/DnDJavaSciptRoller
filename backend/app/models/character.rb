class Character < ApplicationRecord
  belongs_to :users
  scope :alphabetical, -> {order('name')}
  attributes :name, :race, :class, :alignment, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma
end
