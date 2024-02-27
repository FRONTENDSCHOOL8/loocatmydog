import Toggle from '@/components/atoms/Toggle/Toggle';
import { useState } from 'react';
import styled from 'styled-components';

const StyledBooleanBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  inline-size: 20rem;
  block-size: 3.75rem;
  padding: 0.6rem 1.25rem;
  border-bottom: solid 1px ${(props) => props.theme.colors.lineColorGray};
`;

const StyledBooleanSpanBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StyledBooleanBookSpan = styled.span`
  color: ${(props) => props.theme.colors.textBlack};
  ${(props) => props.theme.fontStyles.textRegularBase};
`;

const StyledBooleanPlaceSpan = styled.span`
  color: ${(props) => props.theme.colors.textDarkGray};
  ${(props) => props.theme.fontStyles.textRegularMd}
`;

interface BooleanBoxProps {
  title: string;
  children: string;
}

const BooleanBox = ({ title, children }: BooleanBoxProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <StyledBooleanBox>
      <StyledBooleanSpanBox>
        <StyledBooleanBookSpan>
          {(title = '예약현황 알림')}
        </StyledBooleanBookSpan>
        <StyledBooleanPlaceSpan>
          {(children = '플레이스 예약날짜 알림')}
        </StyledBooleanPlaceSpan>
      </StyledBooleanSpanBox>
      <Toggle isActive={isActive} setIsActive={setIsActive} />
    </StyledBooleanBox>
  );
};

export default BooleanBox;
