'use strict';

const router = require('express').Router();
const { codeGenerator } = require('../controllers/codeController');

router.get('/', async (req, res) => {
  //res.send('<h1>이라온</h1>');

  res.render('codegenerator/index', { name: '이시오이 왕왕왕' });
});

router.post('/', codeGenerator);

module.exports = router;
