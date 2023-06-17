import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('profile_picture')
      table.renameColumn('photo_path','profile_picture')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
    })
  }
}