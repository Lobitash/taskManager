import Route from '@ioc:Adonis/Core/Route'

Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')

Route.group(() => {
  Route.get('/auth/logout', 'AuthController.logout')
  Route.post('/tasks', 'TasksController.store')
  Route.get('/users/:userId/download-profile-picture', 'UsersController.downloadPicture')
  Route.post('users/profile-picture', 'UsersController.uploadProfilePicture')

  Route.group(() => {
    Route.get('/tasks/:id?', 'TasksController.Tasks')
    Route.delete('/tasks/:id/delete', 'TasksController.destroy')
    Route.put('tasks/:id/update', 'TasksController.update')
    Route.post('/tasks/:taskId/attachement', 'TasksController.TaskAttachement')
  }).middleware('TaskOwnerMiddleware')

  Route.group(() => {
    Route.get('/users/:id?', 'UsersController.users')
    Route.put('users/:id/update', 'UsersController.update')
    Route.delete('users/:id/delete', 'UsersController.destroy')
  }).middleware('adminRoleAuthorization')
}).middleware('auth')
