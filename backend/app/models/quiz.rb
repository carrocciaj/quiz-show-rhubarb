class Quiz < ApplicationRecord
    has_many :questions, dependent: :destroy
    has_many :answers, through: :questions, dependent: :destroy
end
