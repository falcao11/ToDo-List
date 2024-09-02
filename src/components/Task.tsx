import { Check, Trash } from "@phosphor-icons/react";
import styles from "./Task.module.css";

interface TaskProps {
  id: string;
  content: string;
  isCompleted: boolean;
  onDeleteTask: (id: string) => void;
  onChangeStatus: (id: string, value: boolean) => void;
}

export function Task({ ...props }: TaskProps) {
  function handleDeleteTask() {
    props.onDeleteTask(props.id);
  }

  function handleChangeStatus() {
    props.onChangeStatus(props.id, !props.isCompleted);
  }

  return (
    <div className={styles.task}>
      <label htmlFor="checkbox" onClick={handleChangeStatus}>
        <input readOnly type="checkbox" />
        {props.isCompleted ? (
          <span className={styles.checkboxChecked}>
            <Check size={12} />
          </span>
        ) : (
          <span className={styles.checkbox}></span>
        )}
      </label>
      <p>
        {props.isCompleted ? (
          <span className={styles.isCompleted}>{props.content}</span>
        ) : (
          props.content
        )}
      </p>
      <button onClick={handleDeleteTask}>
        <Trash size={20} color="#808080" />
      </button>
    </div>
  );
}
