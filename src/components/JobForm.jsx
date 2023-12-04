import { useState } from "react";

const JobForm = ({ onFormSubmit }) => {
  const [task, setTask] = useState();
  const [newTask, setnewTask] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(task, newTask);
  };

  return (
    <form className="form-section" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Task"
        onChange={(e) => setnewTask(e.target.value)}
      />
      <button className="btn">Submit</button>
    </form>
  );
};

export default JobForm;
