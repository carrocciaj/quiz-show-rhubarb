class Api::QuestionsController < ApplicationController
    before_action :set_question, only:[:show, :update, :destroy]

    def index
        @questions = Question.all
        render json: @questions
    end

    def show
        render json: @question
    end

    def create
      @question = Question.new(question_params)
      if current_user.admin == true 
        if @question.save 
          render json: @question, status: :created
        else
          render json: @question.errors, status: :unprocessable_entity
        end
      else
        render json: {"error": "Only Admins can Create Questions"}, status: :unauthorized
      end
    end

    def update
      if current_user.admin == true
        if @question.update(question_params)
            render json: @question, status: :accepted
        else
            render json: @question.errors, status: :unprocessable_entity
        end
      else 
        render json: {"error": "Only Admins can Update Questions"}, status: :unauthorized
      end
    end

    def destroy
      if current_user.admin == true
        if @question.destroy
            render json: {"notice": "Question has been deleted"}, status: :accepted
        else
            render json: @question.errors, status: :unprocessable_entity
        end
      else 
        render json: {"error": "Only Admins can Delete Questions"}, status: :unauthorized
      end
    end

private

    def set_question
        @question = Question.find(params[:id])
    end

    def question_params
        params.require(:question).permit(:text, :quiz_id)
    end

end
