class User < ApplicationRecord
  has_secure_password
  has_many :characters
  validates :username, presence: true, uniqueness: true
end
