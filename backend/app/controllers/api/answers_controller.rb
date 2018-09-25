class Api::AnswersController < ApplicationController
    before_action :set_question
    before_action :set_answer, only: [:show, :update, :destroy]

    def show
        render json: @answer
    end

    def create
        if current_user.admin?
            
            @answer = @question.answers.create(answer_params)

            if @answer.save 
                render json: @answer, status: :created
            else
                render json: @answer.errors, status: :unprocessable_entity
            end
        else
            render json: {error: "Only Admins can Create Answers"}, status: :unauthorized
        end
    end

    def update
        if current_user.admin? && !@quiz.published?

            if @answer.update(answer_params)
                render json: @answer
            else
                render json: @answer.errors, status: :unprocessable_entity
            end
        else
            render json: {error: "Only Admins can edit unpublished quiz answers"}, status: :unauthorized
        end
    end

    def destroy
        if current_user.admin? && !@quiz.published?
            @answer.destroy
            render json: {notice: "Answer successfully deleted"}, status: :deleted
        else
            render json: {error: "You don't have permission to delete this resource"}, status: :unauthorized
        end
    end

private

    def set_answer
        @answer = Answer.find(params[:id])
    end

    def set_question
        @question = Question.find(params[:question_id])
    end

    def answer_params
        params.require(:answer).permit(:text, :question_id, :correct)
    end

end
