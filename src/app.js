import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

class App {

    constructor() {
        this.server = express();

        this.name = "leandrozulis";
        this.password = "lelezs22";

        mongoose.set('strictQuery', false)

        mongoose
        .connect(`mongodb+srv://${this.name}:${this.password}@devhouse.emgyr0t.mongodb.net/?retryWrites=true&w=majority`);
        
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

}

export default new App().server;