const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('courses', {
        title: 'Курсы',
        isCourses: 'active'
    });
})

module.exports = router;
