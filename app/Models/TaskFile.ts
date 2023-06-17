import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'

export default class TaskFiles extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public file_name: string

  @column()
  public file_path: string

  @column()
  public file_extension: string

  @column()
  public taskId: number

  
  @belongsTo(() => Task)
  public task: BelongsTo<typeof Task>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
