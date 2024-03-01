import A11yHidden from '@/components/A11yHidden/A11yHidden';
import { ReactNode, useId } from 'react';
import styled from 'styled-components';
import CheckBox from '../CheckBox/CheckBox';

//type 정의
interface InputWrapperProps {
  type?: string;
  name: string;
  check?: boolean;
  children?: string | ReactNode;
  unit?: string;
  [key: string]: any;
}

const StyledInputWrapper = styled.div`
  inline-size: 100%;
  .inputTextWrapper {
    position: relative;
    display: flex;
    align-items: center;
    & span {
      position: absolute;
      right: 0;
      ${(props) => props.theme.fontStyles.textRegularMd};
      color: ${(props) => props.theme.colors.textBlack};
    }
  }

  .inputTextWrapper input[type='text'] {
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
`;

const InputWrapper = ({
  type = 'text',
  name,
  unit = '원',
  children,
  ...restProps
}: InputWrapperProps) => {
  const id = useId();
  return (
    <StyledInputWrapper>
      <A11yHidden>
        <label htmlFor={id}>{name}</label>
      </A11yHidden>
      <div className="inputTextWrapper">
        {children}
        <input
          type={type}
          id={id}
          name={name}
          className="input-wrapper"
          {...restProps}
        />
        <span>{unit}</span>
      </div>
    </StyledInputWrapper>
  );
};

export default InputWrapper;
