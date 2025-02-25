const express = require('express');
const todoController = require('../controller/todoController');
const router = express.Router();

router.get('/getAllData/:collection',todoController.getAllData);
router.get('/getData/:collection/:id',todoController.getData);  
router.post('/create/:collection',todoController.create);
router.put('/update/:collection/:id', todoController.update);
router.delete('/delete/:collection/:id',todoController.delete);

router.get('/pagination', todoController.getPagination);

module.exports = router; 