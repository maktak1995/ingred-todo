import React, { useState } from 'react';
import {
  DataTable,
  Icon,
  Flex,
  createTheme,
  ActionButton,
  Spacer,
} from 'ingred-ui';
import {
  AddPyload,
  UpdatePyload,
  DeletePyload,
} from '../../store/modules/todo/actions';
import * as Styled from './styled';
import { CreateModal } from './internal/CreateModal';
import { EditModal } from './internal/EditModal';
import { Domain } from '../../types';

type Props = {
  todos: Domain.Todo[];
  updateTodo: (payload: UpdatePyload) => void;
  addTodo: (payload: AddPyload) => void;
  deleteTodo: (payload: DeletePyload) => void;
};

export const List: React.FunctionComponent<Props> = ({
  todos,
  updateTodo,
  addTodo,
  deleteTodo,
}) => {
  const theme = createTheme();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [editModalId, setEditModalId] = useState<number | null>(null);
  const onHandleChangeCreateModalOpen = (isOpen: boolean) => () =>
    setCreateModalOpen(isOpen);

  const onHandleCreate = (title: string) => {
    addTodo(title);
    setCreateModalOpen(false);
  };

  const onHandleEdit = (todo: Domain.Todo) => {
    updateTodo(todo);
    setEditModalId(null);
  };

  const onHandleChangeEditModalId = (id: number | null) => () =>
    setEditModalId(id);

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
        data={todos}
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
                  {row.title}
                </Styled.TitleContainer>
                {editModalId === row.id && (
                  <EditModal
                    todo={row}
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
                {!row.isFinished && (
                  <Spacer pr={0.5}>
                    <ActionButton
                      icon="check"
                      onClick={() => updateTodo({ ...row, isFinished: true })}
                    >
                      完了
                    </ActionButton>
                  </Spacer>
                )}
                <ActionButton
                  icon="delete_bin"
                  onClick={() => deleteTodo(row.id)}
                >
                  削除
                </ActionButton>
              </Flex>
            ),
            width: '25%',
          },
        ]}
      />
    </Styled.Container>
  );
};
