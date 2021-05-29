require('dotenv').config();

const Express = require('express');
const database = require('./db');
const userControllers = require('./controllers/userControllers');
const favoritesControllers = require('./controllers/favoritesControllers');
const validate = require('./middleware/validation')

const app = Express();

app.use(require('./middleware/headers'));
app.use(Express.json());

app.use('/user', userControllers);

app.use(validate);
app.use('/favorites', favoritesControllers);


database.sync();

app.listen(process.env.PORT, () => console.log(`server is up and listening on port [${process.env.PORT}]: hheeeyyyy`));


