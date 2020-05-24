import React from "react";
import * as Styled from "./styled";
import { Typography, Spacer, Input } from "ingred-ui";
import moment from "moment";
import TextField from "@material-ui/core/TextField";

type Props = {
  todo: Todo;
  onChange: (changedTodo: Todo) => void;
};

export const Edit: React.FunctionComponent<Props> = ({ todo, onChange }) => {
  const [copiedTodo, setCopiedTodo] = React.useState<Todo>(
    Object.assign({}, todo)
  );

  React.useEffect(() => {
    onChange(copiedTodo);
  }, [onChange, copiedTodo]);

  return (
    <Styled.Container>
      <Typography weight="bold" size="xxxl">
        タイトル
      </Typography>
      <Spacer pt={1} />
      <Input
        placeholder="Place holder"
        value={copiedTodo.title}
        onChange={(e) =>
          setCopiedTodo({ ...copiedTodo, title: e.target.value })
        }
      />

      <Styled.ContentContainer>
        <Typography weight="bold" size="xxl">
          説明
        </Typography>
        <Styled.TextAreaContainer
          rows={20}
          cols={110}
          value={copiedTodo.content}
          onChange={(e) =>
            setCopiedTodo({ ...copiedTodo, content: e.target.value })
          }
        />
      </Styled.ContentContainer>

      <Styled.DeadLineContainer>
        <Typography weight="bold" size="xxl">
          締切
        </Typography>
        <TextField
          id="date"
          type="date"
          variant="outlined"
          defaultValue={moment(copiedTodo.deadLine).format("YYYY-MM-DD")}
          onChange={(e) =>
            setCopiedTodo({
              ...copiedTodo,
              deadLine: moment(e.target.value).format("YYYY/MM/DD"),
            })
          }
        />
      </Styled.DeadLineContainer>
    </Styled.Container>
  );
};
