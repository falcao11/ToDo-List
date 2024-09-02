import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";
import { Add } from "./components/Add";
import { Empty } from "./components/Empty";
import { Header } from "./components/Header";
import { TaskList } from "./components/TaskList";
import "./global.css";

interface ITaskType {
  id: string;
  content: string;
  isCompleted: boolean;
}

export interface ITask {
  tasks: ITaskType[];
  onDeleteTask: (id: string) => void;
  onChangeStatus: (id: string, value: boolean) => void;
}

export function App() {
  const [tasks, setTasks] = useState<ITaskType[]>([]);
  const [completedCount, setCompletedCount] = useState(0);

  function addTask(inputValid: string) {
    const newTask: ITaskType = {
      id: uuidv4(),
      content: inputValid,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(tasksWithoutDeletedOne);

    setCompletedCount((state) => {
      return state - 1;
    });
  }

  function handleChangeStatus(id: string, value: boolean) {
    const updatedTask = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: value };
      }

      return { ...task };
    });
    setTasks(updatedTask);

    if (value === true) {
      setCompletedCount((state) => {
        return state + 1;
      });
    } else {
      setCompletedCount((state) => {
        return state - 1;
      });
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Add onAddTask={addTask} />
        <div className={styles.tasks}>
          <div className={styles.allTasks}>
            <p>Tarefas criadas</p>
            <p className={styles.tasksCount}>{tasks.length}</p>
          </div>
          <div className={styles.finishedTasks}>
            <p>Concluídas</p>
            <p className={styles.tasksCount}>
              <span>
                {tasks.length === 0
                  ? tasks.length
                  : `${completedCount} de ${tasks.length}`}
              </span>
            </p>
          </div>
        </div>
        <div className={styles.tasksList}>
          {tasks.length === 0 ? (
            <Empty />
          ) : (
            <TaskList
              onDeleteTask={handleDeleteTask}
              tasks={tasks}
              onChangeStatus={handleChangeStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
