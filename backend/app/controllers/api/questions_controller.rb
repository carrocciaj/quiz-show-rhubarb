class Api::QuestionsController < ApplicationController
    before_action :set_question

    def index
    end

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

    def question_params
        params.require(:question).permit(:text, :quiz_id)
    end

end
