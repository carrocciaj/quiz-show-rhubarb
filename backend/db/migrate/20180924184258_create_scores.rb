class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.integer :user_id
      t.integer :quiz_id
      t.integer :score
      t.string :submission

      t.timestamps
    end
  end
end
