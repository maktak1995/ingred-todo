import React from "react";
import * as Styled from "./styled";
import {
  Flex,
  Button,
  Spacer,
  Typography,
  Input,
  RadioButton,
  Icon,
} from "ingred-ui";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { UpdatePyload } from "../../store/modules/todo/actions";

type Props = {
  todo: Todo;
  updateTodo: (payload: UpdatePyload) => void;
};

export const Edit: React.FunctionComponent<Props> = ({ todo, updateTodo }) => {
  const history = useHistory();
  const [editedTodo, setEditedTodo] = React.useState<Todo>(todo);

  return (
    <Styled.Container>
      <Styled.IconContainer
        onClick={() => {
          history.push("/");
        }}
      >
        <Icon name="arrow_double_left" color="active" size="lg" />
      </Styled.IconContainer>
      <Spacer pb={3} />
      <Typography weight="bold" size="xxxl">
        タイトル
      </Typography>
      <Spacer pt={1} />
      <Input
        placeholder="Place holder"
        value={editedTodo.title}
        onChange={(e) =>
          setEditedTodo({ ...editedTodo, title: e.target.value })
        }
      />

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          説明
        </Typography>
        <Spacer pt={1} />
        <Styled.TextAreaContainer
          rows={10}
          cols={110}
          value={editedTodo.content}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, content: e.target.value })
          }
        />
      </Spacer>

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          締切
        </Typography>
        <Spacer pt={1} />
        <TextField
          id="date"
          type="date"
          variant="outlined"
          defaultValue={moment(editedTodo.deadLine).format("YYYY-MM-DD")}
          onChange={(e) =>
            setEditedTodo({
              ...editedTodo,
              deadLine: moment(e.target.value).format("YYYY/MM/DD"),
            })
          }
        />
      </Spacer>

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          状態
        </Typography>
        <Spacer pt={1} />
        <RadioButton
          defaultChecked={true}
          name="group"
          onChange={() => {
            setEditedTodo({
              ...editedTodo,
              finish: true,
            });
          }}
        >
          完了
        </RadioButton>
        <Spacer pt={1} />
        <RadioButton
          name="group"
          onChange={() => {
            setEditedTodo({
              ...editedTodo,
              finish: false,
            });
          }}
        >
          未完了
        </RadioButton>
      </Spacer>
      <Spacer pt={3}>
        <Flex display="flex" alignItems="center">
          <Button
            inline
            color="primary"
            disabled={!(todo.title && todo.deadLine !== "Invalid date")}
            onClick={() => {
              updateTodo(editedTodo);
              history.push(`/detail/${todo.id}`);
            }}
          >
            保存
          </Button>
          <Spacer pl={2} />
          <Button
            inline
            color="cancel"
            onClick={() => {
              history.push(`/detail/${todo.id}`);
            }}
          >
            キャンセル
          </Button>
        </Flex>
      </Spacer>
    </Styled.Container>
  );
};