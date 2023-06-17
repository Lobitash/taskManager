
import { schema } from '@ioc:Adonis/Core/Validator'

export default class TaskFileValidator {
  public static storeSchema = schema.create({
    Task_Attachement: schema.file({
      size: '100mb',
      extnames: ['jpg', 'gif', 'png', 'txt' ],
    }),
  })
}