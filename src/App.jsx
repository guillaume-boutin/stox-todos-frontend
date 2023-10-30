import axios from "axios";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function App() {
    const todosUrl = `${import.meta.env.VITE_API_URL}/todos`;

    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    function fetchTodos() {
        axios.get(todosUrl).then((res) => {
            setTodos(() => res.data);
        });
    }

    function handleNewTodoTitleChange(e) {
        setNewTodoTitle(e.target.value);
    }

    function handleEditClick(todoId) {
        setEditingId(todoId);
    }

    function handleCancelClick() {
        setEditingId(null);
    }

    async function handleSaveClick(todo) {
        try {
            await axios.put(`${todosUrl}/${todo.id}`, todo);
            const index = todos.findIndex((t) => t.id === todo.id);
            setTodos((todos) => [
                ...todos.slice(0, index),
                todo,
                ...todos.slice(index + 1),
            ]);
            setEditingId(null);
        } catch (err) {
            return;
        }
    }

    async function handleDeleteClick(todoId) {
        try {
            await axios.delete(`${todosUrl}/${todoId}`);
            const index = todos.findIndex((todo) => todo.id === todoId);
            setTodos((todos) => [
                ...todos.slice(0, index),
                ...todos.slice(index + 1),
            ]);
        } catch (err) {
            return;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const { data } = await axios.post(todosUrl, {
                title: newTodoTitle,
            });
            setTodos((todos) => [...todos, data]);
            setNewTodoTitle("");
        } catch (err) {
            return;
        }
    }

    return (
        <div className="container">
            <h1>Stox Todos</h1>

            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        edit={todo.id === editingId}
                        onEdit={handleEditClick}
                        onCancel={handleCancelClick}
                        onSave={handleSaveClick}
                        onDelete={handleDeleteClick}
                    />
                ))}
            </ul>

            <div className="mt-2">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        value={newTodoTitle}
                        onChange={handleNewTodoTitleChange}
                    />

                    <button type="submit" className="btn btn-success my-2">
                        Add Todo
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
