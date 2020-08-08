import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 500px;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing * 3}px 0
    ${({ theme }) => theme.spacing * 8}px;
  & + & {
    border-top: 2px solid ${({ theme }) => theme.palette.gray.light};
  }
`;

export const FormGroupLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20%;
  min-height: 42px;
`;

export const FormGroupRight = styled.div`
  width: 80%;
`;

export const TextFieldContainer = styled.div`
  position: relative;
`;

export const DiscriptionBackground = styled.div`
  margin-top: -${({ theme }) => theme.spacing * 6}px;
  padding: ${({ theme }) => theme.spacing * 2}px;
  background-color: ${({ theme }) => theme.palette.gray.light};
  border-radius: 4px;
`;
