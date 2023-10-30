import { useState } from "react";

function TodoItem({
    todo = "",
    edit = false,
    disabled = true,
    onEdit,
    onDelete,
    onSave,
    onCancel,
}) {
    const [newTitle, setNewTitle] = useState(todo.title);

    function handleTitleChange(e) {
        setNewTitle(e.target.value);
    }

    function handleCancelClick() {
        setNewTitle(todo.title);
        onCancel(todo.id);
    }

    function handleSaveClick() {
        onSave({
            ...todo,
            title: newTitle,
        });
    }

    function handleEditClick() {
        onEdit(todo.id);
    }

    function handleDeleteClick() {
        onDelete(todo.id);
    }

    function handleToggleDone() {
        onSave({
            ...todo,
            done: !todo.done,
        });
    }

    return (
        <li className="my-2 d-flex flex-row align-items-center gap-3">
            {edit ? (
                <>
                    <input
                        type="text"
                        className="form-control w-30"
                        value={newTitle}
                        onChange={handleTitleChange}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={handleSaveClick}
                    >
                        Save
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <span
                        className={
                            todo.done ? "text-decoration-line-through" : ""
                        }
                    >
                        {todo.title}
                    </span>

                    <button
                        className="btn btn-primary"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>

                    {todo.done ? (
                        <button
                            className="btn btn-warning"
                            onClick={handleToggleDone}
                        >
                            Undone
                        </button>
                    ) : (
                        <button
                            className="btn btn-success"
                            onClick={handleToggleDone}
                        >
                            Done
                        </button>
                    )}

                    <button
                        className="btn btn-danger"
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </button>
                </>
            )}
        </li>
    );
}

export default TodoItem;
