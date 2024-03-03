import Button from '@/components/atoms/Button/Button';
import LogoInline from '@/components/atoms/Logo/LogoInline';
import styled from 'styled-components';

const StyledLanding = styled.div`
  height: 100dvh;
  padding-block-start: 25dvh;

  & .div-logo {
    position: absolute;
    z-index: 10;
    top: 25dvh;
    left: 50%;
    transform: translateX(-50%);
  }

  & .div-img {
    position: relative;
    height: 50dvh;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 5%,
        rgba(238, 238, 238, 0.55) 66.76%,
        rgba(217, 217, 217, 0) 78.94%,
        rgba(238, 238, 238, 0.55) 95%,
        rgba(255, 255, 255, 1) 100%
      ),
      url('/images/pet-landing.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding-inline: 20px;
  }

  & .buttonWrapper {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    row-gap: 10px;
    height: 100%;
  }

  & .buttonRowWrapper {
    display: flex;
    flex-flow: row;
    column-gap: 5px;
    padding-inline: 20px;
    padding-block-start: 10px;
  }
`;

const Landing = () => {
  return (
    <StyledLanding>
      <div className="div-logo">
        <LogoInline inlineSize={160} />
      </div>
      <div className="div-img">
        <div className="buttonWrapper">
          <Button size={'100%'} mode={'kakao'}>
            카카오톡으로 로그인
          </Button>
          <Button size={'100%'} mode={'google'}>
            구글로 로그인
          </Button>
        </div>
      </div>
      <div className="buttonRowWrapper">
        <Button size={'100%'} mode={'gray'}>
          이메일 가입
        </Button>
        <Button size={'100%'} mode={'gray'}>
          로그인
        </Button>
      </div>
    </StyledLanding>
  );
};

export default Landing;
