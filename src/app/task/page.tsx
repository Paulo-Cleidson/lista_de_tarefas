'use client'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { List, Check, BadgeX, Trash, ListCheck, Sigma } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import EditTaskForm from '@/components/EditTaskFrom';
import AddTaskForm from '@/components/AddTaskForm';
import { getTask } from '../actions';
import { useEffect, useState } from 'react';
import { ITask } from '@/types/Task';

export default function Home() {

  const [taskList, setTaskList] = useState<ITask[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await getTask();
      if (!result) return;
      if("error" in result) {
        console.error(result.error);
        return;
      }
      setTaskList(result.serialized);
    };
    fetchTasks();
  }, [])

  const handleRefreshTasks = async () => {
    const result = await getTask()
    if (!result) return
    if("error" in result) {
      console.error(result.error);
      return;
    }
    setTaskList(result.serialized)
  }

  return (
    <main className='w-full h-screen bg-gray-100 flex justify-center items-center'>
      <Card className='w-lg p-4'>

        <AddTaskForm />

        <CardContent>
          <Separator className='mb-4'/>

          <div className='flex gap-2'>
            <Badge className='cursor-pointer' variant="default"> <List/> Todas </Badge>
            <Badge className='cursor-pointer' variant="outline"> <BadgeX/> Não Finalizadas </Badge>
            <Badge className='cursor-pointer' variant="outline"> <Check/> Concluidas </Badge>
          </div>

          <div className='mt-4 border-b'>
            {taskList.map(task => (
              <div className='h-14 flex justify-between items-center border-t' key={ task._id }>
                <div className='w-1 h-full bg-green-300'></div>
                <p className='flex-1 px-2 text-sm'>{task.tarefa}</p>
                <div className='flex items-center gap-3'>
                  <EditTaskForm/>
                  <Trash size={16} className='cursor-pointer'/>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-between mt-4'>
            <div className='flex gap-2 items-center'>
              <ListCheck size={18}/>
              <p className='text-sx'>Tarefas Concluídas (3/3)</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='text-xs h-7' variant="outline">
                  <Trash/> Limpar Tarefas Concluídas
                </Button> 
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza que deseja excluir x itens?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>

          <div className='h-2 w-full bg-gray-100 mt-4 rounded-md'>
            <div className='h-full bg-blue-500 rounded-md' style={{width: "50%" }}></div>
          </div>

          <div className='flex justify-end items-center gap-2'>
            <Sigma size={18}/>
            <p className='text-xs'> 3 tarefas no total </p>
          </div>

        </CardContent>

      </Card>
    </main>
  )
}
