import styled from 'styled-components';

const StyledStateBadgeBox = styled.div`
  display: inline-block;
  padding-block: 2px;
  padding-inline: 6px;
  border: 1px solid ${(props) => props.theme.colors.orange};
  border-radius: 2px;
  ${(props) => props.theme.fontStyles.textSemiboldSm}
  color: ${(props) => props.theme.colors.orange}
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
