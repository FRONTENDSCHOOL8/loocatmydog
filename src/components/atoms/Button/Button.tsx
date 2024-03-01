import styled from 'styled-components';

interface ButtonProps {
  size: string;
  isInvalid?: boolean;
  isRounded?: boolean;
  mode?: 'kakao' | 'google' | 'chat';
  children: string;
  [restProps: string]: any;
}

interface StyledButtonProps {
  $size: string;
  $isInvalid?: boolean;
  $isRounded?: boolean;
  $mode?: 'kakao' | 'google' | 'chat';
}

const StyledButton = styled.button.attrs({ type: 'button' })<StyledButtonProps>`
  padding-block: 12px;
  padding-inline: 10px;
  inline-size: ${(props) => props.$size};
  min-inline-size: fit-content;
  cursor: ${(props) => (props.$isInvalid === true ? 'not-allowed' : 'pointer')};
  background-color: ${(props) =>
    props.$isInvalid === true ? '#F7F7F7' : '#FFD233'};
  border: 1px solid
    ${(props) => (props.$isInvalid === true ? '#D9D9D9' : '#FFD233')};
  border-radius: ${(props) => (props.$isRounded === true ? '100px' : '4px')};

  ${(props) => {
    if (props.$mode === 'kakao') {
      return `
        position: relative;
        padding-inline: 20px;
        background: #FBE84F;
        border-color: #FBE84F;
    `;
    } else if (props.$mode === 'google') {
      return `
        position: relative;
        padding-inline: 20px;
        background:#FFF;
        border-color: #F1F1F1;
        `;
    } else if (props.$mode === 'chat') {
      return `
        display: flex;
        background:#FFF;
        border-color: #FFB62A;
        `;
    }
  }};

  & img {
    left: 10px;
    ${(props) => {
      if (props.$mode === 'kakao' || props.$mode === 'google') {
        return `
          position: absolute;
          top: 12px;
          left: 20px;
        `;
      }
    }};
  }

  & span {
    flex: 1;
    display: block;
    color: ${(props) => (props.$isInvalid === true ? '#868686' : '#000')};
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    ${(props) => {
      if (props.$mode === 'chat') {
        return `
        color: #754C29;
    `;
      }
    }};
  }
`;

const Button = ({
  size = '100%',
  isInvalid = false,
  isRounded = false,
  mode,
  children,
  ...restProps
}: ButtonProps) => {
  const src = `/images/${mode}.svg`;
  const iconSvg = <img src={src} alt="카카오톡 로고" />;

  return (
    <StyledButton
      $size={size}
      $isInvalid={isInvalid}
      $isRounded={isRounded}
      $mode={mode}
      {...restProps}
    >
      {mode ? iconSvg : undefined}
      <span>{children}</span>
    </StyledButton>
  );
};

export default Button;
