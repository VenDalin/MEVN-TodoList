import express from 'express';
import { getTodos ,createTodo, updateTodo ,deleteTodo , getTodo} from '../controller/todoController.js'

const route = express.Router();

route.get('/', getTodos);
route.get('/:id', getTodo);  // Get a specific todo by id  // This is for testing purpose only. In a real application, you would want to use a unique identifier (like a UUID) instead of the ID from MongoDB.
route.post('/create', createTodo);
route.put('/update/:id', updateTodo);
route.delete('/delete/:id', deleteTodo);

export default route; 