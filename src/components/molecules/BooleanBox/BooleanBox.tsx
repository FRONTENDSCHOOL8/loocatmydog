import Toggle from '@/components/atoms/Toggle/Toggle';
import { useState } from 'react';
import styled from 'styled-components';

const StyledBooleanBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  inline-size: 100%;
  block-size: 60px;
  padding: 10px 20px;
  border-bottom: solid 1px ${(props) => props.theme.colors.lineColorGray};
`;

const StyledBooleanSpanBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  title?: string;
  children?: string;
}

const BooleanBox = ({
  title = '예약현황 알림',
  children = '플레이스 예약날짜 알림',
}: BooleanBoxProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <StyledBooleanBox>
      <StyledBooleanSpanBox>
        <StyledBooleanBookSpan>{title}</StyledBooleanBookSpan>
        <StyledBooleanPlaceSpan>{children}</StyledBooleanPlaceSpan>
      </StyledBooleanSpanBox>
      <Toggle isActive={isActive} setIsActive={setIsActive} />
    </StyledBooleanBox>
  );
};

export default BooleanBox;
