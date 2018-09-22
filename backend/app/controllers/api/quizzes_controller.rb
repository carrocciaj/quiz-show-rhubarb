class Api::QuizzesController < ApplicationController
    before_action :set_quiz, only: [:show, :destroy, :update]

    def index
        @quizzes = Quiz.all
        render json: @quizzes
    end

    def show
        render json: @quiz
    end

    def create
        if current_user.admin?
            @quiz = Quiz.new(quiz_params)

            if @quiz.save 
                render json: @quiz, status: :created
            else
                render json: @quiz.errors, status: :unprocessable_entity
            end
        else
            render json: {error: "You don't have permission to access these resources"}, status: :unauthorized
        end
    end

    def update
        @quiz = Quiz.new(quiz_params)

        if @quiz.save 
            render json: @quiz, status: :created
        else
            render json: @quiz.errors, status: :unprocessable_entity
        end
    end

    def destroy
        if current_user.admin? && !@quiz.published?
            @quiz.destroy
        else
            render json: {error: "You don't have permission to delete this resource"}, status: :unauthorized
        end
    end

private

    def set_quiz
        @quiz = Quiz.find(params[:id])
    end

    def quiz_params
        params.require(:quiz).permit(:title)
    end

end
