class RenameCharactersClassColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :characters, :class, :character_class
  end
end
