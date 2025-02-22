<script setup>
import { useTodos } from "@/composables/TodoList.js";
import { ref } from "vue";
import { onMounted } from 'vue';


const { todos, addTodo, deleteTodo, updateTodo } = useTodos();
const newTask = ref("");
const editingTask = ref(null);
const updatedTask = ref("");

const submitTodo = async () => {
  if (newTask.value.trim()) {
    await addTodo(newTask.value);
    newTask.value = "";
  }
};

const startEditing = (todo) => {
  editingTask.value = todo._id;
  updatedTask.value = todo.task;
};

const saveEdit = async (id) => {
  if (updatedTask.value.trim()) { // Check if the updated task isn't empty
    try {
      await updateTodo(id, updatedTask.value); // Call the updateTodo function to update the task
      editingTask.value = null; // Reset the editing state once saved
    } catch (error) {
      console.error("Error saving the updated task:", error);
    }
  } else {
    console.error("Updated task cannot be empty");
  }
};

const handleDelete = async (id) => {
  await deleteTodo(id);
};


// onMounted(() => {
//   fetchTodos();
// });

</script>

<template>
  <div class="bg-slate-300 min-h-screen flex items-center justify-center px-4">
    <div class="w-full h-full max-w-lg bg-white shadow-lg rounded-xl p-6 overflow-y-auto ">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">📌 Todo List</h2>

      <!-- Form -->
      <form @submit.prevent="submitTodo" class="flex gap-2">
        <input v-model="newTask" placeholder="New Task"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
        <button type="submit"
          class="bg-white text-purple-700 px-5 py-2 rounded-lg hover:bg-white transition-all transform hover:scale-105">
          ➕ Add
        </button>
      </form>

      <!-- Todo List -->
      <ul class="mt-6 space-y-3">
        <li v-for="todo in todos" :key="todo._id"
          class="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm    ">
          <div class="flex items-center gap-2 w-full">
            <!-- Edit Mode -->
            <input v-if="editingTask === todo._id" v-model="updatedTask"
              class="w-full p-2 border rounded-md outline-none" />
            <span v-else class="flex-grow text-gray-800 font-medium">
              {{ todo.task }}
            </span>
          </div>

          <div class="flex gap-2">
            <!-- Save Button -->
            <button v-if="editingTask === todo._id" @click="saveEdit(todo._id)"
               class=" text-purple-500 px-3 py-1 rounded-md hover:bg-white transition">
              💾 Save
            </button>


            <!-- Edit Button -->
            <button v-else @click="startEditing(todo)"
              class="bg-white text-yellow-500 px-3 py-1 rounded-md hover:bg-white transition">
              ✏️ Edit
            </button>

            <!-- Delete Button -->
            <button @click="handleDelete(todo._id)"
              class="bg-white text-white px-3 py-1 rounded-md hover:bg-white transition">
              ❌
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>