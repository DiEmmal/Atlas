import mongoose from "mongoose";

export interface MongoConnectionOptions {
    url: string;
    dbName: string;
};

export class MongoDatabase {

    static async connect(options: MongoConnectionOptions) {

        const { url, dbName } = options;
        
        try {

            await mongoose.connect(url, {
                dbName,
            });

            console.log('Connected to MongoDB');

            return true;
            
        } catch (error) {
            console.error('Error connecting to MongoDB');

            throw error;
        };

    };

};