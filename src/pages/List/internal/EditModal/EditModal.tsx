import React, { useState } from 'react';
import { TextField, ConfirmModal, ToggleButton } from 'ingred-ui';
import { useForm } from 'react-hook-form';
import { Domain } from '../../../../types';
import * as Styled from './styled';

type Props = {
  todo: Domain.Todo;
  onClose: () => void;
  onSubmit?: (todo: Domain.Todo) => void;
};

type CreateTodoForm = {
  title: string;
};

export const EditModal: React.FunctionComponent<Props> = ({
  todo,
  onClose,
  onSubmit,
}) => {
  const [isFinished, setIsFinished] = useState<boolean>(
    todo[Object.keys(todo)[0]].isFinished,
  );
  const { handleSubmit, register, watch } = useForm<CreateTodoForm>({
    defaultValues: {
      title: todo[Object.keys(todo)[0]].title,
    },
  });

  const onHandleSubmit = (data: CreateTodoForm) => {
    if (onSubmit) {
      onSubmit({ [Object.keys(todo)[0]]: { title: data.title, isFinished } });
    }
  };

  const watchTodoTitle = watch('title');

  return (
    <ConfirmModal
      title="Todoの編集"
      confirmText="保存する"
      buttonColor="primary"
      disabled={!watchTodoTitle}
      onClose={onClose}
      onSubmit={handleSubmit(onHandleSubmit)}
    >
      <Styled.FormContainer>
        <Styled.FormGroup>
          <Styled.FormGroupLeft>Todo名</Styled.FormGroupLeft>
          <Styled.FormGroupRight>
            <Styled.TextFieldContainer>
              <TextField inputRef={register({ required: true })} name="title" />
            </Styled.TextFieldContainer>
          </Styled.FormGroupRight>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.FormGroupLeft>完了/未完了</Styled.FormGroupLeft>
          <Styled.FormGroupRight>
            <ToggleButton
              active={isFinished}
              onChange={() => setIsFinished(!isFinished)}
            />
          </Styled.FormGroupRight>
        </Styled.FormGroup>
      </Styled.FormContainer>
    </ConfirmModal>
  );
};
