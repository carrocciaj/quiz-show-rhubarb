class Api::QuizzesController < ApplicationController

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

    def quiz_params
        params.require(:quiz).permit(:title)
    end

end
