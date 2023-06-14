
import Route from '@ioc:Adonis/Core/Route'
//import Database from '@ioc:Adonis/Lucid/Database'

Route.group(()=>{

   Route.post('auth/register', 'AuthController.register')
   Route.post('auth/login', 'AuthController.login')
   Route.get('/auth/logout', 'AuthController.logout')
   Route.get('/users/:id?' , 'UsersController.getUsers')





  Route.group(() => {
    
    
    // Task routes
    
    Route.get('/tasks/:id', 'TasksController.getTask').middleware('auth').middleware('adminRoleAuthorization')
    Route.post('/tasks','TasksController.store').middleware('auth')




    //Route.resource('/tasks', 'TasksController').apiOnly().except(['index', 'show'])
    
    // Route.get('/users/:userId/tasks', 'TasksController.index').as('tasks.index')

  //   // Task attachment route
  //   Route.post('/tasks/:taskId/attachments', 'TaskAttachmentController.store').as('task.attachments.store')





  //   // User routes
    Route.resource('/users', 'UsersController').apiOnly().except(['index', 'show'])
    

  //   // User profile photo route
  //   Route.post('/users/:userId/photo', 'UserProfilePhotoController.store').as('users.photo.store')
  })



  // Route.post('/create', 'usersController.addUser')


})
 