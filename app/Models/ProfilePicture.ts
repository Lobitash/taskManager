import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class ProfilePicture extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public file_name: string

  @column()
  public file_path: string

  @column()
  public file_extension: string

  @column()
  public userId: number

  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
