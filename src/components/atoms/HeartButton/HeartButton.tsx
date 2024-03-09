import styled from 'styled-components';

interface HeartButtonProps {
  fill: boolean;
  [key: string]: any;
}

const StyledHeartButton = styled.button.attrs({ type: 'button' })`
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  padding: 3px;
  transition:
    background-color 0.2s,
    transform 0.2s;
  &:hover {
    background-color: ${(props) => props.theme.colors.orange};
    transform: scale(1.2);
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 0.8),
      0 8px 10px -6px rgb(0 0 0 / 0.8);
  }
`;

const HeartButton = ({ fill = false, ...restProps }: HeartButtonProps) => {
  const heartIcon = fill ? 'heart_fill.svg' : 'heart.svg';
  const heartAlt = fill ? '찜했음' : '찜하기';
  return (
    <StyledHeartButton {...restProps}>
      <img src={`/images/${heartIcon}`} alt={heartAlt} />
    </StyledHeartButton>
  );
};

export default HeartButton;
