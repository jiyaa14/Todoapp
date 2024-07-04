'use client'
function Form({setTodos, todos}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const value = event.target.todo.value
        const newTodo =  {
               title: value,
               id: self.crypto.randomUUID(),
               is_completed: false,
             }
        setTodos((prevTodos) => [...prevTodos, newTodo])
        const updatedTodoList = JSON.stringify([...todos, newTodo])
        localStorage.setItem("todos", updatedTodoList)
        event.target.reset();
    } 
  return (
<form className="form" onSubmit={handleSubmit}>
    <label htmlFor="todo">
        <input
        type="text"
        name="todo"
        id="todo"
        placeholder="Write your next task"
        />
    </label>
<button className="submit">
    <span className="visually-hidden">Submit</span>
<svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="5" x2="12" y2="19" stroke="black" strokeWidth="2"/>
                <line x1="5" y1="12" x2="19" y2="12" stroke="black" strokeWidth="2"/>
    
</svg>
</button>
</form>
  )
}

export default Form