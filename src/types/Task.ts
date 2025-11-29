export interface ITask {
  _id: string;
  tarefa: string;
  done: boolean;
  usuarioId: string;
  createdAt?: string;
  updatedAt?: string;
}
