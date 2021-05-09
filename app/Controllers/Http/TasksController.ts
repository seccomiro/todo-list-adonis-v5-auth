import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ view }: HttpContextContract) {
    const tasks = await Task.all()
    return view.render('tasks/index', { tasks })
  }

  public async show({ params, view }: HttpContextContract) {
    const task = await Task.find(params.id)
    return view.render('tasks/show', { task })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('tasks/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['title'])
    await Task.create(data)
    response.redirect().toRoute('tasks.index')
  }

  public async done({ params, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    task.done = !task.done
    task.save()
    response.redirect().toRoute('tasks.index')
  }

  public async edit({ params, view }: HttpContextContract) {
    const task = await Task.find(params.id)
    return view.render('tasks/edit', { task })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    const data = request.only(['title', 'description'])
    task.merge(data)
    task.save()
    response.redirect().toRoute('tasks.index')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    task.delete()
    response.redirect().toRoute('tasks.index')
  }
}
