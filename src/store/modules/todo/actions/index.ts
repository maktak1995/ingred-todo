import actionCreaterFactory from "typescript-fsa";
const actionCreater = actionCreaterFactory("todo");

export type AddPyload = string;
export const add_todo = actionCreater<AddPyload>("ADD_TODO");

export type DeletePyload = number;
export const delete_todo = actionCreater<DeletePyload>("DELETE_TODO");

export type UpdatePyload = {
  id: number;
  content: string;
  finish: boolean;
};
export const update_todo = actionCreater<UpdatePyload>("UPDATE_TODO");