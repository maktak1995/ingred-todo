import React from "react";
import * as Styled from "./styled";
import { default as ReactMarkdown } from "react-markdown";
import { Typography } from "ingred-ui";
import moment from "moment";

type Props = {
  todo: Todo;
};

export const Content: React.FunctionComponent<Props> = ({ todo }) => {
  return (
    <Styled.Container>
      <Typography weight="bold" size="xxxl">
        {todo.title}
      </Typography>

      <Styled.ContentContainer>
        <Typography weight="bold" size="xxl">
          説明
        </Typography>
        {todo.content ? (
          <ReactMarkdown source={todo.content} />
        ) : (
          <div>なし</div>
        )}
      </Styled.ContentContainer>

      <Styled.DeadLineContainer>
        <Typography weight="bold" size="xxl">
          締切
        </Typography>
        {moment(todo.deadLine).format("YYYY/MM/DD")}
      </Styled.DeadLineContainer>

      <Styled.StatusContainer>
        <Typography weight="bold" size="xxl">
          状態
        </Typography>
        {todo.finish ? <div>完了</div> : <div>未完了</div>}
      </Styled.StatusContainer>
    </Styled.Container>
  );
};
