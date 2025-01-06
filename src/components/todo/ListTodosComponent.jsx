import { useEffect, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import './HeaderComponent.css'

export function TotalTodos(todos) {
    return todos.length
}

function ListTodosComponent() {

    const today = new Date()

    const authContext = useAuth()

    const username = authContext.username

    const location = useLocation()

    const navigate = useNavigate()

    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())
    
    const [message, setMessage] = useState(location.state?.message || null);


    const [todos, setTodos] = useState([])

    useEffect(() => refreshTodos(), [])

    function refreshTodos() {
        retrieveAllTodosForUsernameApi(username)
            .then(response => {
                setTodos(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    function deleteTodo(id, description) {
        console.log('clicked ' + id)
        deleteTodoApi(username, id)
            .then(() => {
                setMessage(`Successfully deleted task: ${description}`)
                refreshTodos()
            })
            .catch(error => console.log(error))
    }

    function updateTodo(id) {
        console.log('clicked ' + id)
        navigate(`/todo/${id}`)
    }

    function addNewTodo() {
        navigate(`/todo/-1`)
    }

    return (
        <div className="container">
            <h1>Things You Want To Do!</h1>

            {message && <div className="alert-greener">{message}</div>}

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.length > 0 ? (
                                todos.map(todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this task?')) {
                                                        deleteTodo(todo.id, todo.description);
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center table-warning">No Tasks Found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}

export default ListTodosComponent