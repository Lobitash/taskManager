import { DateTime } from 'luxon'
import { BaseModel, column , hasMany , HasMany } from '@ioc:Adonis/Lucid/Orm'
// hasMany, HasMany
//import Task from 'App/Models/Task'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: 'admin' | 'user'
 
  @column()
  public photoPath: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //@hasMany(() => Task)
  //public tasks: HasMany<typeof Task>
}
