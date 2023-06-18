import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TaskPriority } from 'App/Enums/TaskEnums'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('priority', Object.values(TaskPriority)).defaultTo(TaskPriority.MEDIUM).nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {})
  }
}
