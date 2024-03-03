import LogoCircle from '@/components/atoms/Logo/LogoCircle';
import styled from 'styled-components';

const StyledSplash = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 10dvh;
  height: 100%;
  /* padding-inline: 20dvw; */
  padding-block-start: 20dvh;
  background: linear-gradient(
    180deg,
    #fff 70.77%,
    rgba(255, 233, 156, 0.51) 100%
  );

  & .img-pet {
    height: 30dvh;
  }
`;

const Splash = () => {
  return (
    <StyledSplash>
      <LogoCircle />
      <img className="img-pet" src="/images/pet-splash.png" alt="" />
    </StyledSplash>
  );
};

export default Splash;
