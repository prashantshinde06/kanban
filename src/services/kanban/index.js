import { TASK_STATUSES } from "@/_helpers/constants";
import { apiCall } from "~/config/http-config";
import { GET_KANBAN_TASKS } from "~/config/api-config";

/**
 * Fetch todos from JSONPlaceholder API
 * Maps them to our task structure with all fields
 */
export const fetchKanbanTasks = async () => {
  try {
    const response = await apiCall({
      method: "GET",
      url: `${GET_KANBAN_TASKS()}?_limit=12`,
    });

    // Map API todos to our extended task structure
    return response.map((todo, index) => ({
      id: todo.id,
      title: todo.title,
      description: `Task ${todo.id}`,
      status: [TASK_STATUSES.TODO, TASK_STATUSES.IN_PROGRESS, TASK_STATUSES.DONE][index % 3],
      priority: ["high", "medium", "low"][index % 3],
      assignee: ["Prashant", "John", "Sarah"][index % 3],
      dueDate: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      completed: todo.completed,
      userId: todo.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching kanban tasks:", error);
    throw error;
  }
};

/**
 * Create a new task (mock API call)
 */
export const createKanbanTask = async (taskData) => {
  try {
    const response = await apiCall({
      method: "POST",
      url: GET_KANBAN_TASKS(),
      data: taskData,
    });

    return response;
  } catch (error) {
    console.error("Error creating kanban task:", error);
    throw error;
  }
};

/**
 * Update a task (mock API call)
 */
export const updateKanbanTask = async (taskId, taskData) => {
  try {
    const response = await apiCall({
      method: "PUT",
      url: `${GET_KANBAN_TASKS()}/${taskId}`,
      data: taskData,
    });

    return response;
  } catch (error) {
    console.error("Error updating kanban task:", error);
    throw error;
  }
};

/**
 * Delete a task (mock API call)
 */
export const deleteKanbanTask = async (taskId) => {
  try {
    await apiCall({
      method: "DELETE",
      url: `${GET_KANBAN_TASKS()}/${taskId}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting kanban task:", error);
    throw error;
  }
};
