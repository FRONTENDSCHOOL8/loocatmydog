import styled from 'styled-components';

interface ButtonProps {
  size: number;
  invalid?: boolean;
  rounded?: boolean;
  mode?: 'kakao' | 'google' | 'chat';
  children: string;
}

interface StyledButtonProps {
  $size: number;
  $invalid?: boolean;
  $rounded?: boolean;
  $mode?: 'kakao' | 'google' | 'chat';
}

const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  column-gap: 10px;
  padding-block: 12px;
  padding-inline: 10px;
  width: ${(props) => props.$size + '%'};
  background-color: ${(props) =>
    props.$invalid === true ? '#F7F7F7' : '#FFD233'};
  border: 1px solid
    ${(props) => (props.$invalid === true ? '#D9D9D9' : '#FFD233')};
  border-radius: ${(props) => (props.$rounded === true ? '100px' : '4px')};

  ${(props) => {
    if (props.$mode === 'kakao') {
      return `
        padding-inline: 20px;
        background: #FBE84F;
        border-color: #FBE84F;
    `;
    } else if (props.$mode === 'google') {
      return `
        padding-inline: 20px;
        background:#FFF;
        border-color: #F1F1F1;
        `;
    } else if (props.$mode === 'chat') {
      return `
        background:#FFF;
        border-color: #FFB62A;
        `;
    }
  }};

  & img {
    position: absolute;
    top: 14px;
    left: ${(props) =>
      props.$mode === 'kakao' || props.$mode === 'google' ? '20px' : '10px'};
  }

  & span {
    flex: 1;
    color: ${(props) => (props.$invalid === true ? '#868686' : '#000')};
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    ${(props) => {
      if (props.$mode === 'chat') {
        return `
        color: #754C29;
    `;
      }
    }};
  }
`;

const Button = ({ size, invalid, rounded, mode, children }: ButtonProps) => {
  let iconSvg;

  switch (mode) {
    case 'kakao':
      iconSvg = <img src="/images/kakao.svg" />;
      break;
    case 'google':
      iconSvg = <img src="/images/google.svg" />;
      break;
    case 'chat':
      iconSvg = <img src="/images/chat.svg" />;
      break;
    default:
      break;
  }

  return (
    <StyledButton
      $size={size}
      $invalid={invalid}
      $rounded={rounded}
      $mode={mode}
    >
      {mode ? iconSvg : undefined}
      <span>{children}</span>
    </StyledButton>
  );
};

export default Button;
