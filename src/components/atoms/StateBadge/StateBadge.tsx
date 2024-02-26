import styled from 'styled-components';

const StyledStateBadgeBox = styled.div`
  display: inline-block;
  padding-block: 2px;
  padding-inline: 6px;
  border: 1px solid#FFB62B;
  border-radius: 2px;
  font-size: 10px;
  color: #ffb62b;
  font-weight: 600;
`;

interface StateBadgeProps {
  isActive: boolean;
}

const StateBadge = ({ isActive }: StateBadgeProps) => {
  if (isActive) return <StyledStateBadgeBox>당일가능</StyledStateBadgeBox>;
  else {
    return '';
  }
};

export default StateBadge;
