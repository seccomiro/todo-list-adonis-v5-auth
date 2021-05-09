import Route from '@ioc:Adonis/Core/Route'

Route.resource('tasks', 'TasksController')
Route.get('/tasks/:id/done', 'TasksController.done').as('tasks.done')
