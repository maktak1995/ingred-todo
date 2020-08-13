import React, { useState, useEffect } from 'react';
import {
  DataTable,
  Icon,
  Flex,
  createTheme,
  ActionButton,
  Spacer,
  Typography,
} from 'ingred-ui';
import {
  SetPyload,
  AddPyload,
  UpdatePyload,
  DeletePyload,
} from '../../store/modules/todo/actions';
import * as Styled from './styled';
import { CreateModal } from './internal/CreateModal';
import { EditModal } from './internal/EditModal';
import { Domain } from '../../types';
import { firebaseDb } from '../../infra/firebase';

const ref = firebaseDb.ref('todos');

type Props = {
  todos: Domain.Todo[];
  setTodos: (payload: SetPyload) => void;
  updateTodo: (payload: UpdatePyload) => void;
  addTodo: (payload: AddPyload) => void;
  deleteTodo: (payload: DeletePyload) => void;
};

type todoForList = {
  id: number;
  key: string;
  title: string;
  isFinished: boolean;
};

export const List: React.FunctionComponent<Props> = ({
  todos,
  setTodos,
  updateTodo,
  addTodo,
  deleteTodo,
}) => {
  const theme = createTheme();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [listedTodos, setListedTodos] = useState<todoForList[]>([]);
  const [editModalId, setEditModalId] = useState<number | null>(null);

  useEffect(() => {
    ref.on('value', (snapshot) => {
      const recentTodos = snapshot.val();
      const editedTodos: Domain.Todo[] = [];
      if (recentTodos !== null) {
        Object.keys(recentTodos).forEach((key) => {
          editedTodos.push({
            [key]: {
              title: recentTodos[key].title,
              isFinished: recentTodos[key].isFinished,
            },
          });
        });
      }
      console.log(editedTodos);
      setTodos(editedTodos);
    });
  }, [setTodos]);

  useEffect(() => {
    const num = 0;
    setListedTodos(
      todos.map((todo) => ({
        id: num + 1,
        key: Object.keys(todo)[0],
        title: todo[Object.keys(todo)[0]].title,
        isFinished: todo[Object.keys(todo)[0]].isFinished,
      })),
    );
  }, [todos]);

  const onHandleChangeCreateModalOpen = (isOpen: boolean) => () =>
    setCreateModalOpen(isOpen);

  const onHandleCreate = (newTodoTitle: string) => {
    addTodo(newTodoTitle);
    setCreateModalOpen(false);
  };

  const onHandleEdit = (todo: Domain.Todo) => {
    updateTodo(todo);
    setEditModalId(null);
  };

  const onHandleChangeEditModalId = (id: number | null) => () =>
    setEditModalId(id);

  const onHandleUpdateTodo = (rowTodo: todoForList) => {
    const todo: Domain.Todo = {
      [rowTodo.key]: { title: rowTodo.title, isFinished: rowTodo.isFinished },
    };
    updateTodo(todo);
  };

  return (
    <Styled.Container>
      <Styled.TaskAdderContainer>
        <Styled.IconContainer onClick={onHandleChangeCreateModalOpen(true)}>
          <Icon name="add_line" color="active" size="lg" />
        </Styled.IconContainer>
        {createModalOpen && (
          <CreateModal
            onClose={onHandleChangeCreateModalOpen(false)}
            onSubmit={onHandleCreate}
          />
        )}
      </Styled.TaskAdderContainer>
      <Spacer pb={3} />
      <DataTable
        emptyTitle="TODOがありません。"
        enablePagination
        per={10}
        data={listedTodos}
        columns={[
          {
            name: 'Status',
            selector: (row) => row.isFinished.toString(),
            renderCell: (row) =>
              row.isFinished && (
                <Spacer pl={2}>
                  <Icon
                    name="check"
                    size="lg"
                    color={theme.palette.danger.main}
                  />
                </Spacer>
              ),
            sortable: true,
            width: '15%',
          },
          {
            name: 'Title',
            selector: (row) => row.title,
            renderCell: (row) => (
              <div>
                <Styled.TitleContainer
                  onClick={onHandleChangeEditModalId(row.id)}
                >
                  <Typography>{row.title}</Typography>
                </Styled.TitleContainer>
                {editModalId === row.id && (
                  <EditModal
                    todo={{
                      [row.key]: {
                        title: row.title,
                        isFinished: row.isFinished,
                      },
                    }}
                    onClose={onHandleChangeEditModalId(null)}
                    onSubmit={onHandleEdit}
                  />
                )}
              </div>
            ),
            sortable: true,
          },
          {
            name: 'Operation',
            selector: (row) => row.id,
            renderCell: (row) => (
              <Flex display="flex" alignItems="center">
                <Spacer pr={0.5}>
                  <ActionButton
                    icon="delete_bin"
                    onClick={() => deleteTodo(row.key)}
                  >
                    削除
                  </ActionButton>
                </Spacer>
                {!row.isFinished && (
                  <ActionButton
                    icon="check"
                    onClick={() =>
                      onHandleUpdateTodo({ ...row, isFinished: true })
                    }
                  >
                    完了
                  </ActionButton>
                )}
              </Flex>
            ),
            width: '25%',
          },
        ]}
      />
    </Styled.Container>
  );
};
