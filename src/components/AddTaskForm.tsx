'use client'

import { useRef } from "react";
import { addTarefa } from "@/app/actions";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddTaskForm() {

  const [task, setTask] = useState("");
  const ref = useRef<HTMLFormElement>(null);

  async function clientAction(formData: FormData) {
    const result = await addTarefa(formData);

    if (result?.error) {
      alert(result.error);
    } else {
      ref.current?.reset();
      setTask("");
    }
  }

  return (
    <form ref={ref} action={clientAction}>
      <CardHeader className="flex gap-2">
        <Input
          name="tarefa"
          placeholder="Adicionar Tarefa"
          onChange={e => setTask(e.target.value)}
          required
        />

        <Button type="submit">
          <Plus className="mr-2"/> Cadastrar
        </Button>
      </CardHeader>
    </form>
  );
}
