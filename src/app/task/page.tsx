"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { List, Check, BadgeX, Trash, ListCheck, Sigma } from "lucide-react";
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
import { getTask, deleteTask } from "../actions";
import { useEffect, useState } from "react";
import { ITask } from "@/types/Task";
import { toast } from "sonner";

export default function Home() {
  const [taskList, setTaskList] = useState<ITask[]>([]);

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
    console.log(taskList)

    const priviousTasks = [...taskList]
    console.log(priviousTasks)

    setTaskList((prev) => {
      const updatedTaskList = prev.map(task => {
        if (task._id === taskId) {
          return {
            ...task,
            done: !task.done
          }
        } else {
          return task
        }
      })

      return updatedTaskList

    })


  }

  return (
    <main className="w-full h-screen bg-background flex justify-center items-start mt-8">
      <Card className="w-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-2xl">Suas Tarefas</CardTitle>
        </div>

        <AddTaskForm onTaskAdded={handleRefreshTasks} />

        <CardContent>
          <Separator className="mb-4" />

          <div className="flex gap-2">
            <Badge className="cursor-pointer" variant="default">
              <List /> Todas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <BadgeX /> Não Finalizadas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <Check /> Concluidas
            </Badge>
          </div>

          <div className="mt-4 border-b">
            {taskList.map((task) => (
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
                <p className="flex-1 px-2 text-sm cursor-pointer hover: text-gray-900"
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
              <p className="text-sx">Tarefas Concluídas (3/3)</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="text-xs h-7" variant="outline">
                  <Trash /> Limpar Tarefas Concluídas
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
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
            <p className="text-xs"> 3 tarefas no total </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
