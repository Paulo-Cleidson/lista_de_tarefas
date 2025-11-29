import { Schema, models, model } from "mongoose";

const TaskSchema = new Schema(
  {
    tarefa: { type: String, required: true },
    done: { type: Boolean, default: false },
    usuarioId: { type: String, required: true },
  },
  { timestamps: true }
);

const Task = models.Task || model("Task", TaskSchema);
export default Task;
