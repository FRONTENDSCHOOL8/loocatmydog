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
    min-inline-size: 35px;
  }
  div {
    display: flex;
    min-inline-size: 70px;
    flex-grow: 1;
    align-items: center;
  }
  & input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    appearance: none;
  }
`;

const AnimalRateInput = ({
  name,
  size,
  ...restProps
}: AnimalRateInputProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [price, setPrice] = useState<undefined | string>();

  const handleChange = () => setIsChecked(!isChecked);
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  return (
    <StyledAnimalRateInput {...restProps}>
      <span className="span-title">{size}</span>
      <InputWrapper
        type="number"
        placeholder={isChecked ? '-' : '단위) 천'}
        name={name}
        value={isChecked ? '-' : price}
        onChange={handlePrice}
        disabled={isChecked}
        required={size === '소형' ? true : false}
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
