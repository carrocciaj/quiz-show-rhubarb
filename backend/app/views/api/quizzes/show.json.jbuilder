json.data do
  json.(@quiz, :id, :title)
  json.questions @questions do |question|
    json.extract! question, :id, :text
    json.answers question.answers.shuffle do |answer|
      json.extract! answer, :id, :text
    end
  end
end
