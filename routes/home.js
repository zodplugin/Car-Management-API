const router = require('express').Router();

router.get('/', (req, res) => {
    res.render("index", {
        name: 'Bagus',
        status: 'tanda tanya',
        title: 'Hello FSW 3 yang luar biasa dari client side nih !'
    })
})

module.exports = router;