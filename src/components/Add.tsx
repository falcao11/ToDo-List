import { PlusCircle } from "@phosphor-icons/react";
import { FormEvent, InvalidEvent, useState } from "react";
import styles from "./Add.module.css";

interface TaskProps {
  id?: string;
  inputValue?: string;
  onAddTask: (inputValid: string) => void;
}

export function Add({ ...props }: TaskProps) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmitNewTask(event: FormEvent) {
    event.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    props.onAddTask(inputValue);
    setInputValue("");
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Por favor, preencha este campo.");
  }

  return (
    <div>
      <form onSubmit={handleSubmitNewTask} className={styles.search}>
        <input
          type="text"
          value={inputValue}
          placeholder="Adicionar uma nova tarefa"
          onChange={(e) => setInputValue(e.target.value)}
          onInvalid={handleNewTaskInvalid}
          required
        />
        <footer>
          <button type="submit" onClick={handleSubmitNewTask}>
            Criar
            <PlusCircle size={20} />
          </button>
        </footer>
      </form>
    </div>
  );
}
