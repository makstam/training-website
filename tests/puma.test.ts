import 'reflect-metadata';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { Puma } from '../src/models/puma';
import { container } from '../src/config/container';
import { TYPES } from '../src/types/types';
import { IDatabase } from '../src/interfaces/IDatabase';
import { MONGODB_URI } from '../src/config/env';
import mongoose from 'mongoose';

const { expect } = chai;
chai.use(chaiHttp);

// Тести API вебдодатку сайту про пум
describe('API вебдодатку сайту про пум', () => {
    const database = container.get<IDatabase>(TYPES.IDatabase);
    const testMongoURI = MONGODB_URI.replace(/\/[^/]*$/, '/pumas-test');

    before(async () => {
        await database.connect(testMongoURI);
        console.log('Підключено до тестової бази даних:', testMongoURI);
    });

    after(async () => {
        try {
            await mongoose.connection.db.dropDatabase();
            console.log('Тестову базу даних "pumas-test" успішно видалено');
        } catch (error) {
            console.log(
                'Помилка видалення тестової бази даних:',
                error instanceof Error ? error.message : 'Невідома помилка',
            );
        } finally {
            await database.disconnect();
            console.log('Відключено від тестової бази даних');
        }
    });

    describe('Підключення до бази даних', () => {
        it('має перевірити підключення до тестової бази даних', () => {
            expect(database.isConnected()).to.be.true;
            expect(database.getConnectionUri()).to.equal(testMongoURI);
            console.log('Підключення до бази даних успішно перевірено');
        });
    });

    beforeEach(async () => {
        await Puma.deleteMany({});
    });

    describe('POST /api/pumas', () => {
        it('має створити запис про нову пуму', done => {
            const puma = {
                name: 'Гроза',
                age: 4,
                height: 70,
                weight: 35,
                gender: 'female' as const,
                description: 'Сильна пума',
            };

            chai.request(app)
                .post('/api/pumas')
                .send(puma)
                .end((err, res) => {
                    if (Boolean(err)) return done(err);
                    expect(res).to.have.status(201);
                    expect(res.body).to.include(puma);
                    expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
                    done();
                });
        });
    });

    describe('GET /api/pumas', () => {
        it('має отримати всіх пум', async () => {
            const testPuma = new Puma({
                name: 'Луна',
                age: 3,
                height: 65,
                weight: 32,
                gender: 'female',
                description: 'Нічна пума',
            });
            await testPuma.save();

            const res = await chai.request(app).get('/api/pumas');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array').with.lengthOf(1);
            expect(res.body[0]).to.include({
                name: 'Луна',
                gender: 'female',
                description: 'Нічна пума',
            });
            expect(new Date(res.body[0].dateAdded)).to.be.instanceOf(Date);
        });
    });

    describe('GET /api/pumas/:id', () => {
        it('має отримати конкретну пуму за id', async () => {
            const testPuma = new Puma({
                name: 'Скеля',
                age: 5,
                height: 80,
                weight: 40,
                gender: 'male',
                description: 'Могутня пума',
            });
            const savedPuma = await testPuma.save();

            const res = await chai.request(app).get(`/api/pumas/${String(savedPuma._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.include({
                name: 'Скеля',
                age: 5,
                height: 80,
                weight: 40,
                gender: 'male',
                description: 'Могутня пума',
            });
        });

        it('має повернути 404 для неіснуючої пуми', async () => {
            const res = await chai.request(app).get('/api/pumas/654321654321654321654321');
            expect(res).to.have.status(404);
        });
    });

    describe('PUT /api/pumas/:id', () => {
        it('має повністю оновити запис про пуму', async () => {
            const testPuma = new Puma({
                name: 'Стара',
                age: 3,
                height: 60,
                weight: 30,
                gender: 'female',
                description: 'Початковий опис',
            });
            const savedPuma = await testPuma.save();

            const updatedData = {
                name: 'Нова',
                age: 4,
                height: 70,
                weight: 35,
                gender: 'male',
                description: 'Оновлений опис',
            };

            const res = await chai
                .request(app)
                .put(`/api/pumas/${String(savedPuma._id)}`)
                .send(updatedData);

            expect(res).to.have.status(200);
            expect(res.body).to.include(updatedData);
        });

        it("має завершитися невдачею при відсутності обов'язкових полів", async () => {
            const testPuma = new Puma({
                name: 'Стара',
                age: 3,
                height: 60,
                weight: 30,
                gender: 'female',
                description: 'Початковий опис',
            });
            const savedPuma = await testPuma.save();

            const incompleteData = {
                name: 'Нова',
                age: 4,
                gender: 'male',
                description: 'Оновлений опис',
            };

            const res = await chai
                .request(app)
                .put(`/api/pumas/${String(savedPuma._id)}`)
                .send(incompleteData);

            expect(res).to.have.status(400);

            const unchangedPuma = await Puma.findById(savedPuma._id);
            expect(unchangedPuma).to.have.property('name', 'Стара');
            expect(unchangedPuma).to.have.property('height', 60);
            expect(unchangedPuma).to.have.property('weight', 30);
        });
    });

    describe('PATCH /api/pumas/:id', () => {
        it('має частково оновити запис про пуму', async () => {
            const testPuma = new Puma({
                name: 'Стара',
                age: 3,
                height: 60,
                weight: 30,
                gender: 'female',
                description: 'Початковий опис',
            });
            const savedPuma = await testPuma.save();

            const patchData = {
                name: 'Оновлена',
                age: 5,
                description: 'Часткове оновлення',
            };

            const res = await chai
                .request(app)
                .patch(`/api/pumas/${String(savedPuma._id)}`)
                .send(patchData);

            expect(res).to.have.status(200);
            expect(res.body).to.include({
                name: 'Оновлена',
                age: 5,
                height: 60,
                weight: 30,
                gender: 'female',
                description: 'Часткове оновлення',
            });
        });

        it('демонструє різницю між PATCH і PUT з частковими оновленнями', async () => {
            const testPuma = new Puma({
                name: 'Стара',
                age: 3,
                height: 60,
                weight: 30,
                gender: 'female',
                description: 'Початковий опис',
            });
            const savedPuma = await testPuma.save();

            const partialData = {
                name: 'Оновлена',
                age: 4,
                gender: 'male',
                description: 'Часткове оновлення',
            };

            const res = await chai
                .request(app)
                .patch(`/api/pumas/${String(savedPuma._id)}`)
                .send(partialData);

            expect(res).to.have.status(200);
            expect(res.body).to.include({
                name: 'Оновлена',
                age: 4,
                height: 60,
                weight: 30,
                gender: 'male',
                description: 'Часткове оновлення',
            });
        });
    });

    describe('HEAD /api/pumas', () => {
        it('має повернути заголовки метаданих', async () => {
            const res = await chai
                .request(app)
                .head('/api/pumas')
                .set('Accept', 'application/json');

            expect(res).to.have.status(200);
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            expect(res.headers['x-powered-by']).to.equal('Express');
            expect(res.headers['content-length']).to.equal('2');
        });
    });

    describe('DELETE /api/pumas/:id', () => {
        it('має видалити запис про пуму', async () => {
            const testPuma = new Puma({
                name: 'Тінь',
                age: 5,
                height: 75,
                weight: 34,
                gender: 'female',
                description: 'Тиха пума',
            });
            const savedPuma = await testPuma.save();

            const res = await chai.request(app).delete(`/api/pumas/${String(savedPuma._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Запис про пуму видалено');

            const findPuma = await Puma.findById(savedPuma._id);
            expect(findPuma).to.be.null;
        });
    });
});
