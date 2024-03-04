import A11yHidden from '@/components/A11yHidden/A11yHidden';
import { ChangeEventHandler, ElementType, ReactNode, useId } from 'react';
import styled from 'styled-components';

interface FormInputLabelProps {
  $mode: 'register' | 'place';
}

const StyledFormInputBox = styled.div<FormInputLabelProps>`
  display: flex;
  flex-direction: column;
  gap: 15px;

  & input {
    padding-block-end: 5px;
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    outline: none;

    & ::placeholder {
      color: ${(props) => props.theme.colors.textGray};
      ${(props) => props.theme.fontStyles.textSemiboldBase}
    }
  }
  & label {
    color: ${(props) => props.theme.colors.textBlack};
    ${(props) => {
      if (props.$mode === 'register') {
        return `${props.theme.fontStyles.textRegularSm}`;
      } else if (props.$mode === 'place') {
        return `${props.theme.fontStyles.textSemiboldBase}`;
      }
    }}
  }
`;

interface FormInputProps {
  as?: string | ElementType;
  mode: 'register' | 'place';
  type: string;
  name: string;
  value?: string;
  children?: ReactNode;
  hiddenLabel?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  [key: string]: any;
}

const FormInput = ({
  as,
  mode,
  children = '이름',
  hiddenLabel = false,
  type = 'text',
  name,
  placeholder = '실명 입력',
  value,
  onChange,
  ...restProps
}: FormInputProps) => {
  const FormId = useId();
  const Component = as || StyledFormInputBox;

  let labelElement = <label htmlFor={FormId}>{children}</label>;

  if (hiddenLabel) {
    labelElement = (
      <A11yHidden as="label" htmlFor={FormId}>
        {children}
      </A11yHidden>
    );
  }
  return (
    <Component $mode={mode} {...restProps}>
      {labelElement}
      <input
        type={type}
        id={FormId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Component>
  );
};

export default FormInput;
