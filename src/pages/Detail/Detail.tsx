import React from 'react';
import moment from 'moment';
import { Flex, Button, Spacer, Table, Icon } from 'ingred-ui';
import { default as ReactMarkdown } from 'react-markdown';
import { useHistory } from 'react-router-dom';
import * as Styled from './styled';
import { DeletePyload } from '../../store/modules/todo/actions';
import { DeleteModal } from './internal/DeleteModal';
import { Domain } from '../../types';

type Props = {
  todo: Domain.Todo;
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
    history.push('/');
  };
  const onHandleChangeDeleteModalId = (id: number | null) => () =>
    setDeleteModalId(id);

  return (
    <Styled.Container>
      <Styled.IconContainer
        onClick={() => {
          history.push('/');
        }}
      >
        <Icon name="arrow_double_left" color="active" size="lg" />
      </Styled.IconContainer>
      <Spacer pb={3} />
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell width="140px">タイトル</Table.HeaderCell>
            <Table.Cell>{todo.title}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell width="140px">説明</Table.HeaderCell>
            <Table.Cell>
              {todo.content ? (
                <ReactMarkdown source={todo.content} escapeHtml={false} />
              ) : (
                <div>なし</div>
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell width="140px">締め切り</Table.HeaderCell>
            <Table.Cell>
              {moment(todo.deadLine).format('YYYY/MM/DD')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell width="140px">状態</Table.HeaderCell>
            <Table.Cell>
              {todo.finish ? <div>完了</div> : <div>未完了</div>}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

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
