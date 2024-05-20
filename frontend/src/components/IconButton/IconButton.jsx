import { styled } from 'styled-components';

const StyledIconButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  display: flex;
  text-decoration: none;
  align-items: center;
  background: none;
  color: #3f3d56;
  opacity: 50%;
  &:hover {
    opacity: 100%;
  }
`;

export default function IconButton({ children, toDo }) {
  return <StyledIconButton onClick={toDo}>{children}</StyledIconButton>;
}
