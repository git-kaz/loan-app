class CreatePrepayments < ActiveRecord::Migration[8.1]
  def change
    create_table :prepayments do |t|
      t.references :scenario_card, null: false, foreign_key: true
      t.integer :execution_year, null: false
      t.integer :amount, null: false
      t.integer :prepayment_type, null: false, default: 0

      t.timestamps
    end
  end
end
