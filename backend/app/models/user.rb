class User < ApplicationRecord
  has_secure_password
  has_many :characters
  attributes :username, :password_digest
end
