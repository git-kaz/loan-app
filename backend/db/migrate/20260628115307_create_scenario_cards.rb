class CreateScenarioCards < ActiveRecord::Migration[8.1]
  def change
    create_table :scenario_cards do |t|
      t.integer :principal, null: false
      t.integer :period_years, null: false
      t.integer :repayment_type, null: false, default: 0
      t.integer :interest_type, null: false, default: 0
      t.integer :initial_rate_sub, null: false
      t.integer :fixed_years
      t.integer :subsequent_rate_sub

      t.timestamps
    end
  end
end
