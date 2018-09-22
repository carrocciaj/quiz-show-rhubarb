class User < ApplicationRecord
  has_secure_token :api_token
  has_secure_password
  validates :username, presence: true, uniqueness: true
  # validates :username, length: { minimum: 6 }
  # validates :password, length: { minimum: 8 }
end
