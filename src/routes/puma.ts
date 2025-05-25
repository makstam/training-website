import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { PumaRepository } from '../repositories/PumaRepository';

// Створюємо новий обробник HTTP-запитів Express
const router = Router();
// Отримуємо екземпляр репозиторію пум з контейнера інверсії залежностей
const pumaRepository = container.get(PumaRepository);

// Обробка HTTP-запиту GET / - отримання всіх записів пум
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи пум з бази даних через репозиторій
        const pumas = await pumaRepository.findAll();
        res.json(pumas);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту GET /:id - отримання запису однієї пуми за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        const puma = await pumaRepository.findById(req.params.id);
        if (Boolean(puma)) {
            res.json(puma);
        } else {
            res.status(404).json({ message: 'Запис пуми не знайдено' });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту POST / - створення нового запису пуми
router.post('/', (async (req: Request, res: Response) => {
    try {
        const newPuma = await pumaRepository.create(req.body);
        res.status(201).json(newPuma);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PUT /:id - повне оновлення запису пуми
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        const puma = await pumaRepository.update(req.params.id, req.body);
        if (Boolean(puma)) {
            return res.json(puma);
        } else {
            return res.status(404).json({ message: 'Запис пуми не знайдено' });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PATCH /:id - часткове оновлення запису пуми
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        const puma = await pumaRepository.patch(req.params.id, req.body);
        if (Boolean(puma)) {
            res.json(puma);
        } else {
            res.status(404).json({ message: 'Запис пуми не знайдено' });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту DELETE /:id - видалення запису пуми
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        const puma = await pumaRepository.delete(req.params.id);
        if (puma) {
            res.json({ message: 'Запис про пуму видалено' });
        } else {
            res.status(404).json({ message: 'Запис про пуму не знайдено' });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
