import * as React from 'react';
import { TextField, ConfirmModal } from 'ingred-ui';
import { useForm } from 'react-hook-form';
import * as Styled from './styled';

type Props = {
  onClose: () => void;
  onSubmit?: (title: string) => void;
};

type CreateTodoForm = {
  title: string;
};

const CreateModal: React.FunctionComponent<Props> = ({ onClose, onSubmit }) => {
  const { handleSubmit, register, watch } = useForm<CreateTodoForm>();

  const onHandleSubmit = (data: CreateTodoForm) => {
    if (onSubmit) {
      onSubmit(data.title);
    }
  };

  const watchTodoTitle = watch('title');

  return (
    <ConfirmModal
      title="Todoの新規作成"
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
      </Styled.FormContainer>
    </ConfirmModal>
  );
};

export { CreateModal };
