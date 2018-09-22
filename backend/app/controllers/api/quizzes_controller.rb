class Api::QuizzesController < ApplicationController
    before_action :set_quiz, only: [:show, :destroy, :update]

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

    def set_quiz
        @quiz = Quiz.find(params[:id])
    end

    def quiz_params
        params.require(:quiz).permit(:title)
    end

end
