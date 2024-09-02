import { ITask } from "../App";
import { Task } from "./Task";

export function TaskList({ tasks, onDeleteTask, onChangeStatus }: ITask) {
  function deleteTask(id: string) {
    onDeleteTask(id);
  }

  function changeStatus(id: string, value: boolean) {
    onChangeStatus(id, value);
  }

  return (
    <div>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            content={task.content}
            onDeleteTask={deleteTask}
            isCompleted={task.isCompleted}
            onChangeStatus={changeStatus}
          />
        );
      })}
    </div>
  );
}
