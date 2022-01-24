class Character < ApplicationRecord
  belongs_to :users
  attributes :name, :race, :class, :alignment, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma
end
