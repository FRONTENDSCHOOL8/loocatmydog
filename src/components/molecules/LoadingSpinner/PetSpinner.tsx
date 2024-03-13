import { forwardRef } from 'react';
import styled from 'styled-components';

interface PetSpinnerProps {
  [key: string]: any;
}

const StyledPetSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
  }
`;

const PetSpinner = forwardRef<any, PetSpinnerProps>(({ ...restProps }, ref) => {
  return (
    <StyledPetSpinnerContainer ref={ref} {...restProps}>
      <img src="/images/loading/loading_spinner_2.svg" alt="" />
      <span>불러오는 중...</span>
      <img src="/images/loading/loading_spinner_3.svg" alt="" />
    </StyledPetSpinnerContainer>
  );
});

PetSpinner.displayName = 'PetSpinner';

export default PetSpinner;
