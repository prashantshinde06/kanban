import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchKanbanTasks,
  createKanbanTask,
  updateKanbanTask,
  deleteKanbanTask,
} from "@/services/kanban";
import { TASK_STATUSES } from "@/_helpers/constants";
import { setToastNotification } from "./global.slice";

/* ------------- INITIAL STATE ------------- */

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  modalOpen: false,
  editingTask: null,
  filterStatus: null,
  confirmModal: {
    isOpen: false,
    taskId: null,
  },
};

/* ------------- ASYNC THUNKS ------------- */

export const loadKanbanTasks = createAsyncThunk(
  "kanban/loadKanbanTasks",
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await fetchKanbanTasks();
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load tasks");
    }
  }
);

export const addKanbanTask = createAsyncThunk(
  "kanban/addKanbanTask",
  async (taskData, { dispatch, rejectWithValue }) => {
    try {
      const newTask = {
        id: Date.now(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isLocal: true,
      };
      // Call API for logging/demo, but do not depend on response for local tasks
      await createKanbanTask(newTask).catch(() => null);
      dispatch(
        setToastNotification({
          visibility: true,
          type: "success",
          title: "Task created",
          message: `Task "${newTask.title}" was created successfully.`,
          timeOut: 3000,
        })
      );
      return newTask;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create task");
    }
  }
);

export const editKanbanTask = createAsyncThunk(
  "kanban/editKanbanTask",
  async ({ id, taskData, isLocal }, { dispatch, rejectWithValue }) => {
    try {
      const updatedTask = {
        ...taskData,
        id,
        updatedAt: new Date().toISOString(),
        isLocal: isLocal || false,
      };
      if (!isLocal) {
        await updateKanbanTask(id, updatedTask);
      }
      dispatch(
        setToastNotification({
          visibility: true,
          type: "success",
          title: "Task updated",
          message: `Task "${updatedTask.title}" was updated successfully.`,
          timeOut: 3000,
        })
      );
      return updatedTask;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update task");
    }
  }
);

export const removeKanbanTask = createAsyncThunk(
  "kanban/removeKanbanTask",
  async ({ taskId, isLocal }, { dispatch, rejectWithValue }) => {
    try {
      if (!isLocal) {
        await deleteKanbanTask(taskId);
      }
      dispatch(
        setToastNotification({
          visibility: true,
          type: "success",
          title: "Task deleted",
          message: "Task deleted successfully.",
          timeOut: 3000,
        })
      );
      return taskId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete task");
    }
  }
);

/* ------------- SLICE ------------- */

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    /* Modal Actions */
    openModal: (state, action) => {
      state.modalOpen = true;
      state.editingTask = action.payload || null;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.editingTask = null;
    },

    /* Confirmation Modal Actions */
    openConfirmModal: (state, action) => {
      state.confirmModal.isOpen = true;
      state.confirmModal.taskId = action.payload;
    },
    closeConfirmModal: (state) => {
      state.confirmModal.isOpen = false;
      state.confirmModal.taskId = null;
    },

    /* Task CRUD Actions */
    createTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description || "",
        status: action.payload.status || TASK_STATUSES.TODO,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.unshift(newTask);
      state.modalOpen = false;
    },

    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      state.modalOpen = false;
      state.editingTask = null;
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    /* Drag & Drop Actions */
    moveTask: (state, action) => {
      const { taskId, newStatus, newIndex } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) {
        return;
      }

      const [movedTask] = state.tasks.splice(taskIndex, 1);
      movedTask.status = newStatus;
      movedTask.updatedAt = new Date().toISOString();

      if (newIndex !== undefined) {
        const statusIndexes = state.tasks.reduce((indexes, task, idx) => {
          if (task.status === newStatus) {
            indexes.push(idx);
          }
          return indexes;
        }, []);

        const insertIndex =
          statusIndexes.length === 0
            ? state.tasks.length
            : newIndex <= 0
            ? statusIndexes[0]
            : newIndex >= statusIndexes.length
            ? statusIndexes[statusIndexes.length - 1] + 1
            : statusIndexes[newIndex];

        state.tasks.splice(insertIndex, 0, movedTask);
      } else {
        const firstStatusIndex = state.tasks.findIndex((task) => task.status === newStatus);
        if (firstStatusIndex === -1) {
          state.tasks.push(movedTask);
        } else {
          state.tasks.splice(firstStatusIndex, 0, movedTask);
        }
      }
    },

    reorderTasksInStatus: (state, action) => {
      const { status, tasks } = action.payload;
      const statusTasks = state.tasks.filter((task) => task.status === status);
      const nonStatusTasks = state.tasks.filter((task) => task.status !== status);

      state.tasks = [...nonStatusTasks, ...tasks];
    },

    /* Filter Actions */
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },

    /* Persist State from localStorage */
    restoreState: (state, action) => {
      return { ...state, ...action.payload };
    },

    /* Clear All */
    clearTasks: (state) => {
      state.tasks = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Load Tasks - Pending
      .addCase(loadKanbanTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Load Tasks - Success
      .addCase(loadKanbanTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      // Load Tasks - Error
      .addCase(loadKanbanTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Task - Success
      .addCase(addKanbanTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        state.modalOpen = false;
        state.editingTask = null;
      })
      // Add Task - Error
      .addCase(addKanbanTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Edit Task - Success
      .addCase(editKanbanTask.fulfilled, (state, action) => {
        const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = action.payload;
        }
        state.modalOpen = false;
        state.editingTask = null;
      })
      // Edit Task - Error
      .addCase(editKanbanTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Remove Task - Success
      .addCase(removeKanbanTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.confirmModal.isOpen = false;
        state.confirmModal.taskId = null;
      })
      // Remove Task - Error
      .addCase(removeKanbanTask.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

/* ------------- EXPORTS ------------- */

export const {
  openModal,
  closeModal,
  openConfirmModal,
  closeConfirmModal,
  moveTask,
  reorderTasksInStatus,
  setFilterStatus,
  restoreState,
  clearTasks,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
