import styled from 'styled-components';

interface HeartButtonProps {
  fill: boolean;
  restProps: {
    [key: string]: string;
  };
}

const StyledHeartButton = styled.button.attrs({ type: 'button' })`
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  padding: 2px;
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
