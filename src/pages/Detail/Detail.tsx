import React from "react";
import * as Styled from "./styled";
import moment from "moment";
import { Flex, Button, Spacer, Typography } from "ingred-ui";
import { default as ReactMarkdown } from "react-markdown";
import { useHistory } from "react-router-dom";
import { DeletePyload } from "../../store/modules/todo/actions";
import { DeleteModal } from "./internal/DeleteModal";

type Props = {
  todo: Todo;
  deleteTodo: (payload: DeletePyload) => void;
};

export const Detail: React.FunctionComponent<Props> = ({
  todo,
  deleteTodo,
}) => {
  const history = useHistory();
  const [deleteModalId, setDeleteModalId] = React.useState<number | null>(null);

  const onHandleDelete = (todoId: number) => {
    deleteTodo(todoId);
    history.push("/");
  };
  const onHandleChangeDeleteModalId = (id: number | null) => () =>
    setDeleteModalId(id);

  return (
    <Styled.Container>
      <Typography weight="bold" size="xxxl">
        {todo.title}
      </Typography>

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          説明
        </Typography>
        <Spacer pb={1} />
        {todo.content ? (
          <ReactMarkdown source={todo.content} escapeHtml={false} />
        ) : (
          <div>なし</div>
        )}
      </Spacer>

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          締切
        </Typography>
        <Spacer pb={1} />
        {moment(todo.deadLine).format("YYYY/MM/DD")}
      </Spacer>

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          状態
        </Typography>
        <Spacer pb={1} />
        {todo.finish ? <div>完了</div> : <div>未完了</div>}
      </Spacer>

      <Spacer pt={3}>
        <Flex display="flex" alignItems="center">
          <Button
            inline
            color="primary"
            onClick={() => {
              history.push(`/edit/${todo.id}`);
            }}
          >
            編集
          </Button>
          <Spacer pl={2} />
          <Button
            inline
            color="danger"
            onClick={onHandleChangeDeleteModalId(todo.id)}
          >
            削除
          </Button>
          {deleteModalId === todo.id && (
            <DeleteModal
              todo={todo}
              onClose={onHandleChangeDeleteModalId(null)}
              onSubmit={onHandleDelete}
            />
          )}
        </Flex>
      </Spacer>
    </Styled.Container>
  );
};
