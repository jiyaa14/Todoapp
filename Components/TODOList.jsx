import React, { useState, useRef, useEffect } from 'react';

function Item({item, setTodos, todos}) {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);

    const completeTodo = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === item.id
                ? { ...todo, is_completed: !todo.is_completed }
                : todo
            )
          )

          const updatedTodos = JSON.stringify(todos)
          localStorage.setItem("todos", updatedTodos)
        }

          const handleEdit = () => {
            setEditing(true);
          }

          const handleDelete = () => {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
            if(todos){
              const updatedTodos = JSON.stringify(
                todos.filter((todo) => todo.id !== item.id)
                );
                localStorage.setItem("todos", updatedTodos);
                setTodos(todos.filter((todo) => todo.id !== item.id));
            
            }
              };
          
          useEffect(() => {
            if (editing && inputRef.current) {
              inputRef.current.focus()
              inputRef.current.setSelectionRange(
                inputRef.current.value.length,
                inputRef.current.value.length
              )
            }
          }, [editing]);
          
          const handleInputChange = (e) => {
            setTodos((prevTodos) =>
              prevTodos.map((todo) =>
                todo.id === item.id ? { ...todo, title: e.target.value } : todo
              )
            );
          };
          
          
          const handleInpuSubmit = (event) => {
            event.preventDefault();

            const updatedTodos = JSON.stringify(todos);
            localStorage.setItem("todos", updatedTodos);
            setEditing(false);
          }; 

          const handleInputBlur = () => {
            const updatedTodos = JSON.stringify(todos);
            localStorage.setItem("todos", updatedTodos);
            setEditing(false);
          }
          
          
    return (
        <li id={item?.id} className={`todo_item ${item.is_completed ? "completed-task" : ""}`} onClick={completeTodo} >
            {editing ? (
        <form className="edit-form" onSubmit={handleInpuSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
            <button className="todo_items_left">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" strokeWidth="2" stroke="#88ab33" fill={item.is_completed ? "#88ab33" : "none"}/>
                </svg>
                <p>{item?.title}</p>
            </button>
            <div className="todo_items_right">
                <button onClick={handleEdit}>
                    <span className="visually-hidden">
                    Edit
                    </span>
                    <svg width="50" height="50" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" >
                      <image x="5" y="5" width="18" height="18" href="https://img.icons8.com/?size=100&id=6697&format=png&color=40C057"/>  
                    </svg>
                </button>  
                <button onClick={handleDelete}>                                                                                                                 
                    <span className="visually-hidden">Delete</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
  <path d="M3 6H5H21" stroke="#88ab33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6H19Z" stroke="#88ab33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M10 11V17" stroke="#88ab33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M14 11V17" stroke="#88ab33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                        <path d=""/>
                    </svg>
                </button>
            </div>
            </>
      )}
        </li>
    )
}


function TODOList({todos, setTodos}){
    return (
    <ol className="todo_list">
        {todos && todos.length > 0 ? (
            todos?.map((item, index) => (
            <Item key={index} item={item} setTodos={setTodos} />
            ))
        ) : (
            <p>Seems lonely in here, what are you up to?</p>
        )}
    </ol>
    )
}

export default TODOList