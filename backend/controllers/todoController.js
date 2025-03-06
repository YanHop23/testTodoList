import ApiError from "../error/ApiError.js";
import { Todo, TodoList } from '../models/model.js';


class TodoController {
    async getAll(req, res, next) {
        const { listId } = req.body;
        if (!listId) {
            return next(ApiError.badRequest('Не вказано listId'));
        }

        try {
            const todos = await Todo.findAll({
                where: { listId },
                include: TodoList
            });
            return res.json(todos);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal('Помилка при отриманні завдань'));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const todo = await Todo.findOne({
                where: { id },
                include: TodoList
            });

            if (!todo) {
                return next(ApiError.badRequest('Завдання не знайдено'));
            }
            return res.json(todo);
        } catch (error) {
            return next(ApiError.internal('Помилка при отриманні завдання'));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const todo = await Todo.findOne({
                where: { id }
            });

            if (!todo) {
                return next(ApiError.badRequest('Завдання не знайдено'));
            }

            await Todo.destroy({
                where: { id }
            });

            return res.json({ message: 'Завдання успішно видалено' });
        } catch (error) {
            return next(ApiError.internal('Помилка при видаленні завдання'));
        }
    }


    async create(req, res, next) {
        const { listId ,userId, title, description } = req.body;
        console.log(listId, userId, title, description);
        if (!userId || !title) {
            return next(ApiError.badRequest('Не вказано необхідні дані'));
        }

        try {
            const todoList = await TodoList.findByPk(listId)
            if (!todoList) {
                return next(ApiError.badRequest('Список завдань не знайдений'));
            }

            const todo = await Todo.create({
                userId,
                listId,
                title,
                description
            });

            return res.json(todo);
        } catch (error) {
            console.log(error)
            return next(ApiError.internal('Помилка при створенні завдання'));
        }
    }
}

export default new TodoController();
