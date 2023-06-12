import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.enum('priority', ['high','medium','low']).notNullable().defaultTo('medium')
      //table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at', {useTz: true}).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', {useTz: true}).notNullable().defaultTo(this.now())
    //  table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
