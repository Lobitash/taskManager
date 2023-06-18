import { schema } from '@ioc:Adonis/Core/Validator'
import { TaskPriority } from 'App/Enums/TaskEnums'

export default class TaskValidator {
  public static storeSchema = schema.create({
    name: schema.string(),
    description: schema.string(),
    priority: schema.enum(Object.values(TaskPriority)),
  })
}
