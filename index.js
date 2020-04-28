const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная страница',
        isHome: 'active'
    });
})

app.get('/add', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: 'active'
    });
})

app.get('/courses', (req, res) => {
    res.render('courses', {
        title: 'Курсы',
        isCourses: 'active'
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
