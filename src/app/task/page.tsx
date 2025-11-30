"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash, ListCheck, Sigma, BookOpenCheck } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditTaskForm from "@/components/EditTaskFrom";
import AddTaskForm from "@/components/AddTaskForm";
import { getTask, deleteTask, updateTaskStatus } from "../actions";
import { useEffect, useState } from "react";
import { ITask } from "@/types/Task";
import { toast } from "sonner";
import Filter from "@/components/Filter";
import { FilterType } from "@/components/Filter";

export default function Home() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await getTask();
      if (!result) return;
      if ("error" in result) {
        console.error(result.error);
        return;
      }
      setTaskList(result.serialized);
    };
    fetchTasks();
  }, []);

  const handleRefreshTasks = async () => {
    const result = await getTask();
    if (!result) return;
    if ("error" in result) {
      console.error(result.error);
      return;
    }
    setTaskList(result.serialized);
  };

  const handleToggleTask = async (taskId: string) => {
    const priviousTasks = [...taskList];
    try {
      setTaskList((prev) => {
        const updatedTaskList = prev.map((task) => {
          if (task._id === taskId) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });
        return updatedTaskList;
      });

      await updateTaskStatus(taskId);
    } catch (error) {
      setTaskList(priviousTasks);
      throw error;
    }
  };

  const filteredTasks = (() => {
    switch (currentFilter) {
      case "pending":
        return taskList.filter((task) => !task.done);
      case "complited":
        return taskList.filter((task) => task.done);
      case "all":
      default:
        return taskList;
    }
  })();

  return (
    <main className="w-full h-screen bg-background flex justify-center items-start mt-8">
      <Card className="w-lg p-4">
        <div className="flex items-center mb-4 gap-4">
          <BookOpenCheck />
          <CardTitle className="text-2xl">Suas Tarefas</CardTitle>
        </div>

        <AddTaskForm onTaskAdded={handleRefreshTasks} />

        <CardContent>
          <Separator className="mb-4" />

          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <div className="mt-4 border-b">
            {taskList.length === 0 && (
              <p className="text-sm border-t p-2">
                Você não possui atividades Cadastradas
              </p>
            )}

            {filteredTasks.map((task) => (
              <div
                className="h-14 flex justify-between items-center border-t"
                key={task._id}
              >
                <div
                  className={`${
                    task.done
                      ? "w-1 h-full bg-green-400"
                      : "w-1 h-full bg-red-400"
                  }`}
                ></div>
                <p
                  className="flex-1 px-2 text-lg cursor-pointer hover:text-orange-500"
                  onClick={() => handleToggleTask(task._id)}
                >
                  {task.tarefa}
                </p>
                <div className="flex items-center gap-3">
                  <EditTaskForm
                    task={task}
                    onTaskUpdated={handleRefreshTasks}
                  />

                  <form
                    action={async () => {
                      await deleteTask(task._id);
                      await handleRefreshTasks();
                      toast.warning("Tarefa excluida com sucesso!");
                    }}
                  >
                    <button type="submit">
                      <Trash
                        size={16}
                        className="cursor-pointer text-red-500"
                      />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-sx">
                Tarefas Concluídas (
                {taskList.filter((task) => task.done).length}/{taskList.length})
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="text-xs h-7" variant="outline">
                  <Trash /> Limpar Tarefas Concluídas
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-100 dark:bg-zinc-900">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir x itens?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end items-center gap-2">
            <Sigma size={18} />
            <p className="text-xs"> {taskList.length} tarefas no total </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
