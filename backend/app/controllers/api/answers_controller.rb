class Api::AnswersController < ApplicationController
    before_action :set_question

    def show
    end

    def new
    end

    def edit
    end

    def create
    end

    def update
    end

    def destroy
    end

private

    def set_question
        @question = Question.find(params[:question_id])
    end

    def answer_params
        params.require(:answer).permit(:text, :question_id, :correct)
    end

end
