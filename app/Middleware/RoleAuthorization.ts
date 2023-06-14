import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'




//Only Admin has Access
export default class adminRoleAuthorization {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    //const userRole = auth.user?.roleId

    // 1 = Use , 2= Admin
      if (auth.user?.roleId !== 2 ) {
      return response.unauthorized({ error: 'Unauthorized' })
    } else {
      await next()
    }

    
  }


  //public async handleTasks {}
}
