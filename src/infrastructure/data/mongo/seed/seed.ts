import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { MongoDatabase } from '../init.js';
import { PostCommentModel, PostModel, UserModel } from '../models/index.js';
import { seedData } from './data.js';

const mongoURL = process.env.MONGO_URL ?? 'mongodb://localhost:27017';
const mongoDBName = process.env.MONGO_DB_NAME ?? 'social_media_api';

async function seed(): Promise<void> {
    await MongoDatabase.connect({ url: mongoURL, dbName: mongoDBName });

    try {
        await Promise.all([
            PostCommentModel.deleteMany({}),
            PostModel.deleteMany({}),
            UserModel.deleteMany({}),
        ]);

        const users = await Promise.all(
            seedData.users.map(async user => ({
                ...user,
                password: await bcrypt.hash(user.password, 10),
            })),
        );

        await UserModel.insertMany(users);
        await PostModel.insertMany(seedData.posts);
        await PostCommentModel.insertMany(seedData.comments);

        console.log(`Seed completed: ${users.length} users, ${seedData.posts.length} posts and ${seedData.comments.length} comments.`);
    } finally {
        await mongoose.disconnect();
    }
}

seed().catch(error => {
    console.error('Seed failed', error);
    process.exitCode = 1;
});
