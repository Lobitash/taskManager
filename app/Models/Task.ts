import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public attachmentPath: string

  @column()
  public priority: 'high' | 'medium' | 'low'

  @column()
  public userId: number;

  @column()
  public file: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

 @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
