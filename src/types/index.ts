export namespace Domain {
  export type Todo = {
    [key: string]: {
      title: string;
      isFinished: boolean;
    };
  };
}
