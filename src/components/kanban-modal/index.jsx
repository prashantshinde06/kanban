import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  addKanbanTask,
  editKanbanTask,
  closeModal,
} from "@/redux/slices/kanban.slice";
import { TASK_STATUSES } from "@/_helpers/constants";
import { useFormik } from "formik";
import * as Yup from "yup";

const KanbanModal = ({ isOpen, task }) => {
  const dispatch = useDispatch();

  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }, []);

  // Validation Schema
  const validationSchema = useMemo(
    () =>
      Yup.object({
        title: Yup.string()
          .trim()
          .required("Task title is required"),

        description: Yup.string()
          .trim()
          .required("Description is required"),

        status: Yup.string()
          .required("Status is required"),

        priority: Yup.string()
          .required("Priority is required"),

        dueDate: Yup.date()
          .required("Due date is required")
          .min(minDate, "Due date must be tomorrow or later"),

        assignee: Yup.string()
          .required("Assignee is required"),
      }),
    [minDate]
  );

  const initialValues = useMemo(
    () => ({
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || TASK_STATUSES.TODO,
      priority: task?.priority || "medium",
      dueDate: task?.dueDate || "",
      assignee: task?.assignee || "",
      createdAt: task?.createdAt || new Date().toISOString(),
    }),
    [task]
  );

  const formik = useFormik({
    initialValues,

    enableReinitialize: true,

    validationSchema,

    onSubmit: (values) => {
      const payload = {
        ...values,
        title: values.title.trim(),
        description: values.description.trim(),
      };

      if (task) {
        dispatch(
          editKanbanTask({
            id: task.id,
            taskData: payload,
          })
        );
      } else {
        dispatch(addKanbanTask(payload));
      }

      dispatch(closeModal());
    },
  });

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  // Dynamic Error Class
  const getFieldClassName = (fieldName, baseClass) => {
    const hasError =
      formik.touched[fieldName] &&
      formik.errors[fieldName];

    return `${baseClass} ${
      hasError ? "kanban-modal__input--error" : ""
    }`;
  };

  return (
    <div
      className="kanban-modal-overlay"
      onClick={handleClose}
    >
      <div
        className="kanban-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="kanban-modal__header">
          <h2 className="kanban-modal__title">
            {task ? "Edit Task" : "Create New Task"}
          </h2>

          <button
            className="kanban-modal__close"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          className="kanban-modal__form"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          {/* Title */}
          <div className="kanban-modal__group">
            <label
              className="kanban-modal__label"
              htmlFor="title"
            >
              Title <span className="required">*</span>
            </label>

            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter task title"
              className={getFieldClassName(
                "title",
                "kanban-modal__input"
              )}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoFocus
            />

            {formik.touched.title &&
              formik.errors.title && (
                <p className="kanban-modal__error">
                  {formik.errors.title}
                </p>
              )}
          </div>

          {/* Description */}
          <div className="kanban-modal__group">
            <label
              className="kanban-modal__label"
              htmlFor="description"
            >
              Description{" "}
              <span className="required">*</span>
            </label>

            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Enter task description"
              className={getFieldClassName(
                "description",
                "kanban-modal__textarea"
              )}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.description &&
              formik.errors.description && (
                <p className="kanban-modal__error">
                  {formik.errors.description}
                </p>
              )}
          </div>

          {/* Row */}
          <div className="kanban-modal__row">
            {/* Status */}
            <div className="kanban-modal__group">
              <label
                className="kanban-modal__label"
                htmlFor="status"
              >
                Status{" "}
                <span className="required">*</span>
              </label>

              <select
                id="status"
                name="status"
                className={getFieldClassName(
                  "status",
                  "kanban-modal__select"
                )}
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">
                  Select Status
                </option>

                <option value={TASK_STATUSES.TODO}>
                  To Do
                </option>

                <option
                  value={TASK_STATUSES.IN_PROGRESS}
                >
                  In Progress
                </option>

                <option value={TASK_STATUSES.DONE}>
                  Done
                </option>
              </select>

              {formik.touched.status &&
                formik.errors.status && (
                  <p className="kanban-modal__error">
                    {formik.errors.status}
                  </p>
                )}
            </div>

            {/* Priority */}
            <div className="kanban-modal__group">
              <label
                className="kanban-modal__label"
                htmlFor="priority"
              >
                Priority{" "}
                <span className="required">*</span>
              </label>

              <select
                id="priority"
                name="priority"
                className={getFieldClassName(
                  "priority",
                  "kanban-modal__select"
                )}
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">
                  Select Priority
                </option>

                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>
              </select>

              {formik.touched.priority &&
                formik.errors.priority && (
                  <p className="kanban-modal__error">
                    {formik.errors.priority}
                  </p>
                )}
            </div>
          </div>

          {/* Row */}
          <div className="kanban-modal__row">
            {/* Due Date */}
            <div className="kanban-modal__group">
              <label
                className="kanban-modal__label"
                htmlFor="dueDate"
              >
                Due Date{" "}
                <span className="required">*</span>
              </label>

              <input
                type="date"
                id="dueDate"
                name="dueDate"
                min={minDate}
                className={getFieldClassName(
                  "dueDate",
                  "kanban-modal__input"
                )}
                value={formik.values.dueDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.dueDate &&
                formik.errors.dueDate && (
                  <p className="kanban-modal__error">
                    {formik.errors.dueDate}
                  </p>
                )}
            </div>

            {/* Assignee */}
            <div className="kanban-modal__group">
              <label
                className="kanban-modal__label"
                htmlFor="assignee"
              >
                Assignee{" "}
                <span className="required">*</span>
              </label>

              <select
                id="assignee"
                name="assignee"
                className={getFieldClassName(
                  "assignee",
                  "kanban-modal__select"
                )}
                value={formik.values.assignee}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">
                  Select Assignee
                </option>

                <option value="Prashant">
                  Prashant
                </option>

                <option value="John">
                  John
                </option>

                <option value="Sarah">
                  Sarah
                </option>
              </select>

              {formik.touched.assignee &&
                formik.errors.assignee && (
                  <p className="kanban-modal__error">
                    {formik.errors.assignee}
                  </p>
                )}
            </div>
          </div>

          {/* Footer */}
          <div className="kanban-modal__footer">
            <button
              type="button"
              className="kanban-modal__btn kanban-modal__btn--cancel"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="kanban-modal__btn kanban-modal__btn--submit"
            >
              {task
                ? "Update Task"
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KanbanModal;