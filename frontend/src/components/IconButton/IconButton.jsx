import { styled } from 'styled-components'

const StyledIconButton = styled.button`
  width:40px;
  height:40px;
  border: none;
  display: inline;
  text-decoration: none;
  background: none;
  color: #3F3D56;
  opacity: 50%;
  &:hover {
    opacity: 100%;
  }
`

export default function IconButton({ children, toDo }) {
  return <StyledIconButton onClick={toDo}>{children}</StyledIconButton>
}