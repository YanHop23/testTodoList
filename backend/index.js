import dotenv from 'dotenv'
import express from 'express'
import sequelize from './db.js'
import cors from 'cors'
import router from "./routes/index.js";
dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router)

//обробка помилок
// app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {console.log(`App listening on port ${PORT}`);})
    } catch (error) {
        console.error(error);
    }
}

start();