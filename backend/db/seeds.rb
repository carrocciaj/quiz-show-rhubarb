# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Answer.delete_all
Question.delete_all
Quiz.delete_all
User.delete_all

user = User.create!(username: 'test-user', password: 'password')
admin = User.create!(username: 'test-admin', password: 'password', admin: true)

Quiz.create!([
  {title: "Javascript Arrays", published: true},
  {title: "Rails Models", published: true}
])

Question.create!([
  {text: 'What method do you use to get all records that match a condition?',
  quiz_id: 1},
  {text: 'What does `findIndex` return if no records match its condition?',
  quiz_id: 1},
  {text: 'Which of the following does the method `map` do?',
  quiz_id: 1},
  {text: 'Given a table `posts` and another table `comments` with the field `post_id`, which of the following associations would you use to connect the tables?',
  quiz_id: 2},
  {text: 'Which of the following is a built-in Rails validation?',
  quiz_id: 2},
  {text: 'Which of the following is **not** a database you can use with ActiveRecord?',
  quiz_id: 2}
])

Answer.create!([
  {text: 'find',
    question_id: 1,
    correct: false},
  {text: 'findAll',
    question_id: 1,
    correct: false},
  {text: 'filter',
    question_id: 1,
    correct: true},
  {text: 'reduce',
    question_id: 1,
    correct: false},
  {text: '-1',
    question_id: 2,
    correct: true},
  {text: 'false',
    question_id: 2,
    correct: false},
  {text: 'null',
    question_id: 2,
    correct: false},
  {text: 'create a new array of shorter length than the original',
    question_id: 3,
    correct: false},
  {text: 'create a new array of the same length as the original',
    question_id: 3,
    correct: true},
  {text: 'return a single value',
    question_id: 3,
    correct: false},
  {text: 'transform the original array',
    question_id: 3,
    correct: false},
  {text: '`has_and_belongs_to_many :posts` in `Comment`',
    question_id: 4,
    correct: false},
  {text: '`belongs_to :post, through: :post_id` in `Comment`',
    question_id: 4,
    correct: false},
  {text: '`has_many :comments` in `Post`',
    question_id: 4,
    correct: true},
  {text: '`belongs_to :comment` in `Post`',
    question_id: 4,
    correct: false},
  {text: 'numericality',
    question_id: 5,
    correct: true},
  {text: 'reliability',
    question_id: 5,
    correct: false},
  {text: 'email',
    question_id: 5,
    correct: false},
  {text: 'text',
    question_id: 5,
    correct: false},
  {text: 'size',
    question_id: 5,
    correct: false},
  {text: 'PostgreSQL',
    question_id: 6,
    correct: false},
  {text: 'SQLite',
    question_id: 6,
    correct: false},
  {text: 'MySQL',
    question_id: 6,
    correct: false},
  {text: 'MongoDB',
    question_id: 6,
    correct: true}                           
])