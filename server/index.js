import express from 'express';
import ApiRouter from './api/index.js';
import ImagesRouter from './images/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
const port = 4000;
const app = express();

// no-cors
app.use(
    cors({
        origin: '*',
    })
);

app.use('/public', express.static(path.resolve('public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

/**
 *  API Routes for FilePond
 */

app.use('/api', ApiRouter);
app.use('/images', ImagesRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
