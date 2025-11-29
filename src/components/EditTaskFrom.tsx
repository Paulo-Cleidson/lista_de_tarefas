"use client";

import { SquarePen } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { updateTask } from "@/app/actions";
import { ITask } from "@/types/Task";
import { toast } from "sonner";

interface Props {
  task: ITask;
  onTaskUpdated: () => void;
}

const EditTaskForm = ({ task, onTaskUpdated }: Props) => {
  const [open, setOpen] = useState(false);
  const [newText, setNewText] = useState(task.tarefa);

  const handleSubmit = async (formData: FormData) => {
    await updateTask(task._id, formData);
    onTaskUpdated();
    setOpen(false);
    toast.success("Tarefa editada com sucesso!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SquarePen size={16} className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="bg-white dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="flex gap-2">
          <Input
            name="tarefa"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />

          <input type="hidden" name="done" value={String(task.done)} />

          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskForm;
