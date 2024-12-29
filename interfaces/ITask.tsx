export interface ITask {
  _id?: string;
  title: string;
  description: string;
  state: string;
}

export interface ITaskState {
  name: string;
  code: string;
}

export interface ITaskPartial extends Partial<ITask> {}
