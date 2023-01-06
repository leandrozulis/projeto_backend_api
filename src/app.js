import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import routes from './routes';

class App {

    constructor() {
        this.server = express();

        this.name = "leandrozulis";
        this.password = "lelezs22";

        mongoose.set('strictQuery', false)

        mongoose
            .connect(`mongodb+srv://${this.name}:${this.password}@devhouse.emgyr0t.mongodb.net/?retryWrites=true&w=majority`)
            .then(() => console.log('Banco iniciado!'))
            .catch(err => console.log(err));

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());

        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );

        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

}

export default new App().server;