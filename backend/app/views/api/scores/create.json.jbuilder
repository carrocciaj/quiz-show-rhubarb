json.data do
  json.quiz_id @quiz.id
  json.quiz @quiz.title
    json.score do
      json.user_id current_user.id
      json.username current_user.username
      json.total_questions @quiz.questions.count
      json.score @correct_count
    end
end