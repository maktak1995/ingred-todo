export namespace Domain {
  export type Todo = {
    id: number;
    title: string;
    content?: string;
    deadLine: string;
    finish: boolean;
  };
}
