import axiosInstance from './axiosInstance';

const taskService = {
  getTasks: async () => {
    try {
      const response = await axiosInstance.get('/tasks');
      console.log('::: /tasks getTasks ', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  getTaskById: async id => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`);
      console.log(`::: /tasks/${id} getTaskById`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      throw error;
    }
  },

  createTask: async taskData => {
    console.log('>>>>> createTask i/p', taskData);
    try {
      const response = await axiosInstance.post('/tasks', taskData);
      console.log(`::: /tasks/ createTask`, response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  updateTask: async (id, taskData) => {
    try {
      console.log('>>>> id', id);
      const response = await axiosInstance.put(`/tasks/${id}`, taskData);
      console.log(`::: /tasks/${id} updateTask`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating task with ID:`, error);
      throw error;
    }
  },

  deleteTask: async id => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      console.log(`::: /tasks/${id} deleteTask`);
    } catch (error) {
      console.error(`Error deleting task with ID:`, error);
      throw error;
    }
  },
};

export default taskService;
