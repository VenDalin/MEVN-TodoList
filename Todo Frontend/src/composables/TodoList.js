import { ref, onMounted } from "vue";
import axios from "axios";

export function useTodos() {
  const todos = ref([]);

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todo/');
      if (Array.isArray(response.data)) {
        todos.value = response.data;
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  
  
  // Add Todo
  const addTodo = async (task) => {
    try {
      const response = await axios.post("/api/todo/create", { task });
      console.log("Response from API:", response.data);  // Check the response
      if (response.data && response.data.newTask) {
        // Ensure todos.value is always an array
        if (Array.isArray(todos.value)) {
          todos.value.push(response.data.newTask);  // Add new task to the array
        } else {
          todos.value = [response.data.newTask];  // Reset to an array with the new task
        }
      } else {
        console.error("No newTask in API response");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  
  

  // Delete Todo
  const deleteTodo = async (id) => {
    try {

      const response = await axios.delete(`/api/todo/delete/${id}`);
      console.log("Delete response:", response.data); // Log the response
      
      // Check if the todo was deleted and update the list
      const filteredTodos = todos.value.filter(todo => todo._id !== id);
      if (filteredTodos.length === todos.value.length) {
        console.log("Todo not found, no deletion occurred.");
      } else {
        todos.value = filteredTodos;
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  

  // ✅ Update Todo
  const updateTodo = async (id, updatedTask) => {
    try {
      const response = await axios.put(`/api/todo/update/${id}`, { task: updatedTask });
      console.log("Response from API:", response.data); // Log the response to see its structure
  
      if (response.data && response.data.updatedTask) {
        // Find the index of the todo to be updated
        const index = todos.value.findIndex(todo => todo._id === id);
        if (index !== -1) {
          // Update the todo in the local state with the updated task
          todos.value[index] = response.data.updatedTask; // Use the updated task from API response
        } else {
          console.error("Todo with this ID not found in local state.");
        }
      } else {
        console.error("No updated task in API response");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  
    console.log("Todo ID:", id); // Log the ID being passed
  };
  
  
  onMounted(fetchTodos); // Auto-fetch todos when the component mounts

  return { todos, fetchTodos, addTodo, deleteTodo, updateTodo };
}
