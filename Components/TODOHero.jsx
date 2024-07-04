

 function TODOHero({todos_completed, total_todos}) {
  return (

    <section className="todohero_section">
        <div>
            <p className="todohero_para1">Task done</p>
            <p className="todohero_para2">Keep it up</p>
        </div>
        <div>
            {todos_completed}/{total_todos}
        </div>
    </section>
  )
}

export default TODOHero