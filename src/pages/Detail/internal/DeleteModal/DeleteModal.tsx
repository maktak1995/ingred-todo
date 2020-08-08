import * as React from 'react';
import { Typography, ConfirmModal, Spacer } from 'ingred-ui';
import { Domain } from '../../../../types';

type Props = {
  todo: Domain.Todo;
  onClose?: () => void;
  onSubmit?: (demandId: number) => void;
};

const DeleteModal: React.FunctionComponent<Props> = ({
  todo,
  onClose,
  onSubmit,
}) => {
  const onHandleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(todo.id);
    }
  };
  return (
    <ConfirmModal
      title="TODO削除"
      confirmText="削除する"
      buttonColor="danger"
      onClose={onClose}
      onSubmit={onHandleSubmit}
    >
      <Spacer pt={2}>
        <Typography lineHeight="1.7">
          {todo.title}を削除してもよろしいですか？
        </Typography>
      </Spacer>
    </ConfirmModal>
  );
};

export { DeleteModal };
