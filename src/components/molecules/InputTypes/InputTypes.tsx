import InputWrapper from '@/components/atoms/InputWrapper/InputWrapper';
import styled from 'styled-components';
import CheckBox from './../../atoms/CheckBox/CheckBox';
import React, { useState } from 'react';
//type 정의
interface InputTypesProps {
  check?: boolean;
  name: string;
  unit?: string;
  list: Array<string>;
}
interface InputValuesProps {
  [key: string]: string;
}
const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  ${(props) => props.theme.fontStyles.textRegularMd};
  color: ${(props) => props.theme.colors.textBlack};
  & span {
    min-inline-size: 25px;
  }
`;

const InputTypes = ({
  check = false,
  name = '이름',
  list = ['여', '남'],
  unit,
}: InputTypesProps) => {
  const checkBox = check ? (
    <CheckBox
      type={'radio'}
      name={name}
      isChecked
      style={{ position: 'absolute', left: '0' }}
      label={false}
    ></CheckBox>
  ) : (
    ''
  );
  const [inputValues, setInputValues] = useState<InputValuesProps>({});

  const handleChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setInputValues({
      ...inputValues,
      [key]: value,
    });
  };

  return (
    <StyledInputWrapper>
      <span className="span-title">{name}</span>
      {list?.map((item) => {
        return (
          <InputWrapper
            key={item}
            name={name}
            unit={unit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(item, e)
            }
            value={inputValues[item] as string | any}
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
