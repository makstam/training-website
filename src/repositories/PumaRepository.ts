import { injectable } from 'inversify';
import { Puma, IPuma } from '../models/puma'; // Puma має бути Mongoose-моделлю

@injectable()
export class PumaRepository {
    public async findAll(): Promise<IPuma[]> {
        return Puma.find().exec(); // додано .exec() для явного виконання
    }

    public async findById(id: string): Promise<IPuma | null> {
        return Puma.findById(id).exec();
    }

    public async create(pumaData: IPuma): Promise<IPuma> {
        const puma = new Puma(pumaData); // тип PumaData повинен бути сумісним із схемою
        return puma.save();
    }

    public async delete(id: string): Promise<boolean> {
        const result = await Puma.findByIdAndDelete(id).exec();
        return result !== null;
    }

    public async update(id: string, pumaData: IPuma): Promise<IPuma | null> {
        return Puma.findByIdAndUpdate(id, pumaData, { new: true }).exec();
    }

    public async patch(id: string, pumaData: Partial<IPuma>): Promise<IPuma | null> {
        return Puma.findByIdAndUpdate(id, { $set: pumaData }, { new: true }).exec();
    }
}
