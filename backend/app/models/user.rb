class User < ApplicationRecord
  has_secure_token :api_token
  has_secure_password
  validates :username, presence: true, uniqueness: true
end
