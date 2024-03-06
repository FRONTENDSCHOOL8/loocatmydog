import InputWrapper from '@/components/atoms/InputWrapper/InputWrapper';
import styled from 'styled-components';
import CheckBox from './../../atoms/CheckBox/CheckBox';
import React, { ChangeEventHandler, useState } from 'react';
//type 정의
interface InputTypesProps {
  check?: boolean;
  name: string;
  unit?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  list: Array<string>;
}

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  ${(props) => props.theme.fontStyles.textRegularMd};
  color: ${(props) => props.theme.colors.textBlack};
  & span {
    min-inline-size: 40px;
  }
`;

const InputTypes = ({
  check = false,
  name = '이름',
  list = ['여', '남'],
  unit,
  onChange,
}: InputTypesProps) => {
  const checkBox = check ? (
    <CheckBox
      type={'radio'}
      name={name}
      style={{ position: 'absolute', left: '0' }}
      label={false}
    ></CheckBox>
  ) : (
    ''
  );

  return (
    <StyledInputWrapper>
      <span className="span-title">{name}</span>
      {list?.map((item) => {
        return (
          <InputWrapper
            key={item}
            name={name}
            unit={unit}
            onChange={onChange}
            defaultValue={''}
            placeholder={item}
            disabled={check}
            style={check ? { paddingInlineStart: '30px' } : {}}
          >
            {checkBox}
          </InputWrapper>
        );
      })}
    </StyledInputWrapper>
  );
};

export default InputTypes;
