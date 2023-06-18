import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TaskOwnerMiddleware {
  public async handle({ auth, params, response }: HttpContextContract, next: () => Promise<void>) {
    const authenticatedUserId = auth.user?.id
    const taskId = params.id

    if (!authenticatedUserId) {
      return response.unauthorized({
        error: 'You are not the owner of this Task',
      })
    }

    const task = await Task.find(taskId)

    if (!task || task.userId !== authenticatedUserId) {
      return response.unauthorized({ error: 'Unauthorized' })
    }

    await next()
  }
}
