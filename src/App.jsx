import { useState } from "react";
import "./App.css";
import JobForm from "./components/JobForm";

const APY_KEY = "WFo8sSvyQMV7atLnf7eQv6ja1iOL3JdP74y_SwvZwGZZyObNNA";

function App() {
  const [jobList, setJobList] = useState([]);
  const getTasks = () => {
    fetch("/api/v1/todo", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${APY_KEY}`,
        completed: false,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Response failed");
        return res.json();
      })
      .then((data) =>
        setJobList(
          data.items.map((task) => {
            return {
              tasks: task.tasks,
              newTask: task.newTask,
              id: task._uuid,
            };
          })
        )
      )
      .catch((err) => console.log(err));
  };
  const onFormSubmit = (task, newtask) => {
    fetch("/api/v1/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APY_KEY}`,
        completed: false,
      },
      body: JSON.stringify([{ task, newtask }]),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Response failed");
        return res.json();
      })
      .then((data) =>
        setJobList((prev) => [
          ...prev,
          {
            tasks: data.items[0].tasks,
            newTask: data.items[0].newTasks,
            id: data.items[0]._uuid,
          },
        ])
      )

      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <JobForm onFormSubmit={onFormSubmit} />
      <button className="btn" onClick={getTasks}>
        GET Tasks
      </button>

      {jobList.map((task) => (
        <div key={task.id} className="jobs-list">
          <h3>{task.task}</h3>
          <h3>{task.newTask}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
