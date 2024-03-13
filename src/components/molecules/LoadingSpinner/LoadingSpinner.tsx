import LogoInline from '@/components/atoms/Logo/LogoInline';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledLoadingSpinnerContainer = styled.div`
  position: relative;
  inline-size: 100%;
  block-size: 100%;
  margin: 0 auto;

  & .logo-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    border: 20px solid transparent;
    border-top: 20px solid ${(props) => props.theme.colors.orange};
    inline-size: 80%;
    aspect-ratio: 1/1;
  }

  & .logo-inner {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    position: absolute;
    inline-size: 80%;
    aspect-ratio: 1/1;
    top: 50%;
    left: 50%;
    translate: -50% -50%;

    & .loading-text {
      ${(props) => props.theme.fontStyles.headingMd};
      text-align: center;
      line-height: 2;
    }
  }
`;

const LoadingSpinner = () => {
  return (
    <StyledLoadingSpinnerContainer>
      <motion.div
        className="logo-wrapper"
        animate={{ rotate: 360 }}
        transition={{ ease: 'linear', repeat: Infinity, duration: 1 }}
      ></motion.div>
      <motion.div className="logo-inner">
        <motion.div>
          <LogoInline inlineSize={200} />
        </motion.div>
        <p className="loading-text">
          페이지를 불러오고 있습니다.
          <br />
          잠시만 기다려주세요~
        </p>
      </motion.div>
    </StyledLoadingSpinnerContainer>
  );
};

export default LoadingSpinner;
