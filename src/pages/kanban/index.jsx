import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadKanbanTasks, openModal } from "@/redux/slices/kanban.slice";
import { REDUX_KEYS, TASK_STATUSES } from "@/_helpers/constants";
import KanbanColumn from "@/components/kanban-column";
import KanbanModal from "@/components/kanban-modal";
import Spinner from "@/components/spinner";

const Kanban = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, modalOpen, editingTask } = useSelector(
    (state) => state[REDUX_KEYS.KANBAN]
  );

  useEffect(() => {
    // Only fetch from API if there is no persisted Kanban data.
    if (tasks.length === 0) {
      dispatch(loadKanbanTasks());
    }
  }, [dispatch, tasks.length]);

  const todoTasks = tasks.filter((task) => task.status === TASK_STATUSES.TODO);
  const inProgressTasks = tasks.filter(
    (task) => task.status === TASK_STATUSES.IN_PROGRESS
  );
  const doneTasks = tasks.filter((task) => task.status === TASK_STATUSES.DONE);

  const handleCreateTask = () => {
    dispatch(openModal(null));
  };

  if (loading) {
    return (
      <div className="kanban kanban--loading min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center">
          <Spinner size="w-12 h-12" colorClass="text-blue-600" />
          <p className="ml-3 text-gray-700">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kanban">
      <div className="kanban__header">
        <div className="kanban__title-section">
          <h1 className="kanban__title">Kanban Board</h1>
          <p className="kanban__subtitle">
            Drag and drop tasks between columns to organize your work
          </p>
        </div>
        <button className="kanban__btn-create" onClick={handleCreateTask}>
          + New Task
        </button>
      </div>

      {error && (
        <div className="kanban__error">
          <p>Error: {error}</p>
        </div>
      )}

      <div className="kanban__board">
        <KanbanColumn
          status={TASK_STATUSES.TODO}
          title="To Do"
          tasks={todoTasks}
        />
        <KanbanColumn
          status={TASK_STATUSES.IN_PROGRESS}
          title="In Progress"
          tasks={inProgressTasks}
        />
        <KanbanColumn
          status={TASK_STATUSES.DONE}
          title="Done"
          tasks={doneTasks}
        />
      </div>

      <KanbanModal isOpen={modalOpen} task={editingTask} />
    </div>
  );
};

export default Kanban;
