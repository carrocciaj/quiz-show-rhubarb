class Answer < ApplicationRecord
  belongs_to :question
  has_one :question
  has_one :quiz, through :questions
end
