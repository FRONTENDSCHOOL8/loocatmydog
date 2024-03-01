import styled from 'styled-components';
import CheckBox from './../../atoms/CheckBox/CheckBox';
import React, { useState } from 'react';
import InputWrapper from '@/components/atoms/InputWrapper/InputWrapper';

//type 정의
interface AnimalRateInputProps {
  price?: number;
  name: string;
  size: '소형' | '중형' | '대형';
  [key: string]: any;
}

const StyledAnimalRateInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  ${(props) => props.theme.fontStyles.textRegularMd};
  color: ${(props) => props.theme.colors.textBlack};
  & span {
    min-inline-size: 25px;
  }
  div {
    display: flex;
    min-inline-size: 70px;
    flex-grow: 1;
    align-items: center;
  }
`;

const AnimalRateInput = ({
  name,
  size,
  ...restProps
}: AnimalRateInputProps) => {
  const [isChecked, setIsChecked] = useState(true);
  const [price, setPrice] = useState<undefined | string>();

  const handleChange = () => setIsChecked(!isChecked);
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  return (
    <StyledAnimalRateInput {...restProps}>
      <span className="span-title">{size}</span>
      <InputWrapper
        placeholder={isChecked ? '-' : '단위) 천'}
        name={name}
        value={price}
        onChange={handlePrice}
        disabled={isChecked}
      />
      <div>
        <CheckBox
          isChecked={isChecked}
          reservation={isChecked}
          onChange={handleChange}
          name={size}
        >
          <span style={{ fontSize: '0.75rem' }}>예약불가</span>
        </CheckBox>
      </div>
    </StyledAnimalRateInput>
  );
};

export default AnimalRateInput;
