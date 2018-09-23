class Api::QuizzesController < ApplicationController
    before_action :set_quiz, only: [:show, :destroy, :update]

    def index
        @quizzes = Quiz.where(published: true)
        render json: @quizzes
    end

    def show
        @questions = @quiz.questions.includes(:answers)  
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
            render json: {error: "Only Admins can Create Quizzes"}, status: :unauthorized
        end
    end

    def update
        if current_user.admin? && !@quiz.published?
            @quiz = Quiz.find(quiz_params)

            if @quiz.save 
                render json: @quiz, status: :created
            else
                render json: @quiz.errors, status: :unprocessable_entity
            end
        else
            render json: {error: "Only Admins can edit unpublished quizzes"}, status: :unauthorized
        end
    end

    def destroy
        if current_user.admin? && !@quiz.published?
            @quiz.destroy
            render json: {notice: "Quiz number #{@quiz.id} successfully deleted"}, status: :deleted
        else
            render json: {error: "You don't have permission to delete this resource"}, status: :unauthorized
        end
    end

private

    def set_quiz
        @quiz = Quiz.find(params[:id])
    end

    def quiz_params
        params.require(:quiz).permit(:title, :published)
    end

end
