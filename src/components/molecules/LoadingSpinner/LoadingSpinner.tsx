import LogoInline from '@/components/atoms/Logo/LogoInline';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledLoadingSpinnerContainer = styled.div`
  position: relative;
  inline-size: 100%;
  block-size: 100%;
  background-color: ${(props) => props.theme.colors.orangeBg};
  margin: 0 auto;

  & .logo-wrapper {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;

    & .loading-text {
      ${(props) => props.theme.fontStyles.textSemiboldBase}
    }
  }
`;

const LoadingSpinner = () => {
  return (
    <StyledLoadingSpinnerContainer>
      <div className="logo-wrapper">
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ bounce: 1 }}
        >
          <LogoInline inlineSize={300} />
        </motion.div>
        <p className="loading-text">
          페이지를 불러오고 있습니다. 잠시만 기다려주세요~
        </p>
      </div>
    </StyledLoadingSpinnerContainer>
  );
};

export default LoadingSpinner;
