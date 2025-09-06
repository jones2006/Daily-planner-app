import React, { createContext, useContext, useState } from "react";

interface Task {
  id: string;
  title: string;
  time: string;
}

// context data
interface TasksContextType {
  tasks: Task[];
  completedTasks: Task[];
  handleAddTask: (title: string, date: Date) => void;
  handleCompleteTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
}

// context
const TasksContext = createContext<TasksContextType | undefined>(undefined);

// custom hook to use the context
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

// provider component
export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string, date: Date) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title,
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks((currentTasks) => {
      const taskToComplete = currentTasks.find((task) => task.id === taskId);
      if (taskToComplete) {
        setCompletedTasks((currentCompleted) => [
          ...currentCompleted,
          taskToComplete,
        ]);
        return currentTasks.filter((task) => task.id !== taskId);
      }
      return currentTasks;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setCompletedTasks((currentCompleted) =>
      currentCompleted.filter((task) => task.id !== taskId)
    );
  };

  const value = {
    tasks,
    completedTasks,
    handleAddTask,
    handleCompleteTask,
    handleDeleteTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export default TasksProvider;
