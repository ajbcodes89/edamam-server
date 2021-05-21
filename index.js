require('dotenv').config();

const Express = require('express');
const database = require('./db');
const userControllers = require('./controllers/userControllers');
const favoritesControllers = require('./controllers/favoritesControllers');
// const recipeControllers = require('./controllers/recipeControllers');

const app = Express();

app.use(require('./middleware/headers'));
app.use(Express.json());

app.use('/user', userControllers);
app.use('/favorites', favoritesControllers);
// app.use('/recipe', recipeControllers);

database.sync();

app.listen(process.env.PORT, () => console.log(`[${process.env.PORT}]: hheeeyyyy`));

