import styled from 'styled-components';
import CheckBox from './../../atoms/CheckBox/CheckBox';
import React, { useState } from 'react';

//type 정의
interface AnimalRateInputProps {
  price: number;
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
  .inputTextWrapper {
    position: relative;

    & span {
      position: absolute;
      right: 0;
      ${(props) => props.theme.fontStyles.textRegularMd};
      color: ${(props) => props.theme.colors.textBlack};
    }
  }

  .inputTextWrapper input {
    padding: 8px 0;
    padding-inline-start: 5px;
    padding-inline-end: 20px;
    inline-size: 100%;
    display: inline-block;
    background: ${(props) => props.theme.colors.white};
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.lineColorGray};
    ${(props) => props.theme.fontStyles.textRegularMd};
    color: ${(props) => props.theme.colors.textDarkGray};
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
    <StyledAnimalRateInput>
      <span className="span-title">소형</span>
      <div className="inputTextWrapper">
        <input
          type="text"
          value={price}
          name={name}
          onChange={handlePrice}
          disabled={isChecked}
          className="input-animalRate"
          placeholder={isChecked ? '-' : '단위) 천'}
          {...restProps}
        />
        <span>원</span>
      </div>

      <div>
        <CheckBox
          isChecked={isChecked}
          reservation={isChecked}
          onChange={handleChange}
          name={size}
          style={{ fontSize: '0.75rem' }}
        >
          예약불가
        </CheckBox>
      </div>
    </StyledAnimalRateInput>
  );
};

export default AnimalRateInput;
