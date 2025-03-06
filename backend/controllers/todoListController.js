import ApiError from "../error/ApiError.js";
import {Todo, TodoList} from "../models/model.js";

class TodoListController {
    async getAll(req, res, next) {
        try {
            const todoLists = await TodoList.findAll();
            return res.json(todoLists);
        } catch (error) {

            return next(ApiError.internal('Помилка при отриманні списків'));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const todoList = await TodoList.findOne({
                where: { id },
            });

            if (!todoList) {
                return next(ApiError.badRequest('Список не знайдено'));
            }

            return res.json(todoList);
        } catch (error) {
            return next(ApiError.internal('Помилка при отриманні списку'));
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const todo = await TodoList.findOne({
                where: { id }
            });

            if (!todo) {
                return next(ApiError.badRequest('Cписок успішно не знайдено'));
            }

            await TodoList.destroy({
                where: { id }
            });

            return res.json({ message: 'Список успішно видалено' });
        } catch (error) {
            return next(ApiError.internal('Помилка при видаленні списку'));
        }
    }
    async create(req, res, next) {
        const { name } = req.body;

        if (!name) {
            return next(ApiError.badRequest('Не вказана назва списку'));
        }

        try {
            const newTodoList = await TodoList.create({ name });
            return res.json(newTodoList);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal(error));
        }
    }
}

export default new TodoListController();
