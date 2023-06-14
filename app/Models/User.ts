import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column , hasMany , HasMany , beforeSave, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Task from './Task'
// hasMany, HasMany
//import Task from 'App/Models/Task'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public roleId: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  // @column()
  // public role: 'admin' | 'user'
 
  @column()
  public photoPath: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>;

  // @belongsTo(()=> Task)
  // public tasks: BelongsTo<typeof Task>

  @belongsTo(()=> Role)
  public role: BelongsTo<typeof Role>

  @beforeSave()
  public static async hashPassword (user : User) {
    if(user.$dirty.password){
      user.password = await Hash.make(user.password)
    }
  }


  //@hasMany(() => Task)
  //public tasks: HasMany<typeof Task>
}
