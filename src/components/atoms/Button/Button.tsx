import styled from 'styled-components';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  size: string;
  isRounded?: boolean;
  mode: 'normal' | 'gray' | 'disabled' | 'kakao' | 'google' | 'chat';
  children: string;
  [restProps: string]: any;
}

interface StyledButtonProps {
  $size: string;
  $isRounded?: boolean;
  $mode?: 'normal' | 'gray' | 'disabled' | 'kakao' | 'google' | 'chat';
}

const StyledButton = styled.button<StyledButtonProps>`
  padding-block: 12px;
  padding-inline: 10px;
  inline-size: ${(props) => props.$size};
  min-inline-size: fit-content;
  cursor: ${(props) =>
    props.$mode === 'disabled' ? 'not-allowed' : 'pointer'};
  ${(props) => {
    let style = '';
    switch (props.$mode) {
      case 'normal':
        style = `
        background-color: #FFD233;
        border: 1px solid #FFD233;
      `;
        break;
      case 'gray':
        style = `
        background-color: #F7F7F7;
        border: 1px solid #F7F7F7;
      `;
        break;
      case 'disabled':
        style = `
        background-color: #F7F7F7;
        border: 1px solid #D9D9D9;
      `;
        break;
      case 'kakao':
        style = `
        position: relative;
        padding-inline: 20px;
        background: #FBE84F;
        border: 1px solid #FBE84F;
      `;
        break;
      case 'google':
        style = `
        position: relative;
        padding-inline: 20px;
        background:#FFF;
        border:1px solid #F1F1F1;
      `;
        break;
      case 'chat':
        style = `
        display: flex;
        background:#FFF;
        border: 1px solid #FFB62A;
      `;
        break;
      default:
        style = `
        background-color: #FFD233;
        border: 1px solid #FFD233;
      `;
        break;
    }
    return style;
  }}
  border-radius: ${(props) => (props.$isRounded === true ? '100px' : '4px')};

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
    color: ${(props) => (props.$mode === 'disabled' ? '#868686' : '#000')};
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
  type = 'button',
  size = '100%',
  isRounded = false,
  mode = 'normal',
  children,
  ...restProps
}: ButtonProps) => {
  let alt;
  if (mode === 'kakao') {
    alt = '카카오톡 로고';
  }
  if (mode === 'google') {
    alt = '구글 로고';
  }
  if (mode === 'kakao') {
    alt = '말풍선 이미지';
  }
  const src = `/images/${mode}.svg`;
  const iconSvg = <img src={src} alt={alt} />;

  return (
    <StyledButton
      type={type}
      $size={size}
      $isRounded={isRounded}
      $mode={mode}
      {...restProps}
    >
      {mode === 'kakao' || mode === 'google' || mode === 'chat'
        ? iconSvg
        : undefined}
      <span>{children}</span>
    </StyledButton>
  );
};

export default Button;
