import TaskForm from "../../components/tasks/TaskForm";

function CreateTask() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Task</h1>
      <TaskForm />
    </div>
  );
}

export default CreateTask;