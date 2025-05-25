import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Пума"
interface IPuma {
    name: string; // Ім'я пуми
    age: number; // Вік пуми у роках
    height: number; // Висота пуми в сантиметрах
    weight: number; // Вага пуми в кілограмах
    gender: 'male' | 'female'; // Стать пуми: 'male' - самець, 'female' - самка
    description?: string; // Опис пуми (необов'язкове поле)
    dateAdded: Date; // Дата додавання запису до бази даних
}

// Схема MongoDB для моделі "Пума"
const pumaSchema = new Schema<IPuma>({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    description: String, // Необов'язкове текстове поле
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
});

// Створення моделі Mongoose на основі схеми
export const Puma = model<IPuma>('Puma', pumaSchema);
export type { IPuma }; // Експортуємо інтерфейс для використання в інших файлах
