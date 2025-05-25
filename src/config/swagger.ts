// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про Пум',
        version: '1.0.0',
        description: 'Документація API для Сайту про Пум',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення кінцевих точок (endpoints) REST API та операцій з ними
    paths: {
        '/api/pumas': {
            // GET запит для отримання всіх пум
            get: {
                summary: 'Отримати всіх пум',
                responses: {
                    '200': {
                        description: 'Список всіх пум',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Puma' },
                                },
                            },
                        },
                    },
                },
            },

            // POST запит для створення нової пуми
            post: {
                summary: 'Створити нову пуму',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Puma' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт пуми",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Puma' },
                            },
                        },
                    },
                },
            },
        },

        // Операції для конкретної пуми за ID
        '/api/pumas/{id}': {
            // GET запит для отримання пуми за ID
            get: {
                summary: 'Отримати пуму за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID пуми',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт пуми",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Puma' },
                            },
                        },
                    },
                    '404': { description: 'Пуму не знайдено' },
                },
            },

            // PUT запит для повного оновлення пуми за ID
            put: {
                summary: 'Повністю оновити пуму',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID пуми',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Puma' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт пуми",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Puma' },
                            },
                        },
                    },
                    '404': { description: 'Пуму не знайдено' },
                },
            },

            // PATCH запит для часткового оновлення пуми за ID
            patch: {
                summary: 'Частково оновити пуму',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID пуми',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Puma' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт пуми",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Puma' },
                            },
                        },
                    },
                    '404': { description: 'Пуму не знайдено' },
                },
            },

            // DELETE запит для видалення даних про пуму за ID
            delete: {
                summary: 'Видалити дані про пуму',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID пуми',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Пуму не знайдено' },
                },
            },
        },
    },

    // Визначення компонентів для повторного використання
    components: {
        // Схеми даних
        schemas: {
            // Схема об'єкта Пума
            Puma: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я пуми",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік пуми у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота пуми в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага пуми в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать пуми',
                    },
                    description: {
                        type: 'string',
                        description: "Опис пуми (необов'язкове поле)",
                    },
                },
            },
        },
    },
};
