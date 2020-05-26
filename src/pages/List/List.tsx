import React from "react";
import * as Styled from "./styled";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { AddPyload, UpdatePyload } from "../../store/modules/todo/actions";
import {
  DataTable,
  Icon,
  Flex,
  createTheme,
  ActionButton,
  Spacer,
} from "ingred-ui";
import { CreateModal } from "./internal/CreateModal";

type Props = {
  todos: Todo[];
  updateTodo: (payload: UpdatePyload) => void;
  addTodo: (payload: AddPyload) => void;
};

export const List: React.FunctionComponent<Props> = ({
  todos,
  updateTodo,
  addTodo,
}) => {
  const theme = createTheme();
  const history = useHistory();
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const onHandleChangeCreateModalOpen = (isOpen: boolean) => () =>
    setCreateModalOpen(isOpen);

  const onHandleCreate = (title: string) => {
    addTodo(title);
    setCreateModalOpen(false);
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
        enablePagination={true}
        per={10}
        data={todos}
        columns={[
          {
            name: "Status",
            selector: (row) => row.finish.toString(),
            renderCell: (row) =>
              row.finish && (
                <Spacer pl={2}>
                  <Icon
                    name="check"
                    size="lg"
                    color={theme.palette.danger.main}
                  />
                </Spacer>
              ),
            sortable: true,
            width: "15%",
          },
          {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            width: "50%",
          },
          {
            name: "DeadLine",
            selector: (row) => moment(row.deadLine).format("YYYY/MM/DD"),
            sortable: true,
            width: "20%",
          },
          {
            name: "Operation",
            selector: (row) => row.id,
            renderCell: (row) => (
              <Flex display="flex" alignItems="center">
                {!row.finish && (
                  <Spacer pr={0.5}>
                    <ActionButton
                      icon={"check"}
                      onClick={() => updateTodo({ ...row, finish: true })}
                    >
                      完了
                    </ActionButton>
                  </Spacer>
                )}
                <ActionButton
                  icon={"pencil"}
                  onClick={() => history.push(`/detail/${row.id}`)}
                >
                  詳細
                </ActionButton>
              </Flex>
            ),
            width: "25%",
          },
        ]}
      />
    </Styled.Container>
  );
};
