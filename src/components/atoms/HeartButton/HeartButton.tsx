import A11yHidden from '@/components/A11yHidden/A11yHidden';
import { useAuthStore } from '@/store/useAuthStore';
import { toggleBookmark } from '@/utils';
import React, { useId, useState } from 'react';
import styled from 'styled-components';

interface HeartButtonProps {
  id: string;
  [key: string]: any;
}

const StyledHeartLabel = styled.label`
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
  }
`;

const HeartButton = ({ id: placeId, ...restProps }: HeartButtonProps) => {
  const { user, update } = useAuthStore();
  const initialState = user?.heart.includes(placeId);
  const [isChecked, setIsChecked] = useState<boolean>(initialState);
  const checkboxId = useId();
  const heartIcon = isChecked ? 'heart_fill.svg' : 'heart.svg';
  const heartAlt = isChecked ? '찜했음' : '찜하기';
  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    await toggleBookmark(user?.id, placeId, e.currentTarget.checked);
    await update();
    setIsChecked((prev) => !prev);
  };
  return (
    <div className="heart-container" {...restProps}>
      <A11yHidden
        as="input"
        type="checkbox"
        name="heart"
        id={checkboxId}
        checked={isChecked}
        onChange={handleCheck}
      />
      <StyledHeartLabel htmlFor={checkboxId}>
        <img src={`/images/${heartIcon}`} alt={heartAlt} />
      </StyledHeartLabel>
    </div>
  );
};

export default HeartButton;
