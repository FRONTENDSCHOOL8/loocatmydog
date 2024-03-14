import LogoCircle from '@/components/atoms/Logo/LogoCircle';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledSplashContainer = styled.div`
  min-inline-size: 280px;
  max-inline-size: 420px;
  block-size: 100dvh;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 50px;
  justify-content: center;
  align-items: center;

  background: linear-gradient(180deg, #fff0bb 70.77%, #ffd233 100%);
  /* background: linear-gradient(
    180deg,
    #fff 20.77%,
    rgba(255, 233, 156, 0.51) 100%
  ); */

  & .img-pet {
    height: 30dvh;
  }
`;

const Splash = () => {
  return (
    <StyledSplashContainer>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <LogoCircle />
      </motion.div>
      <motion.img
        className="img-pet"
        src="/images/pet-splash.png"
        alt=""
        initial={{ scale: 0.3 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      />
    </StyledSplashContainer>
  );
};

export default Splash;
