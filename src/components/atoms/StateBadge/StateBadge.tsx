import styled from 'styled-components';

interface StateBadgeBoxProps {
  $mode: 'normal' | 'fill';
}

const StyledStateBadgeBox = styled.div<StateBadgeBoxProps>`
  display: inline-block;
  padding-block: 2px;
  padding-inline: 6px;
  border: 1px solid ${(props) => props.theme.colors.orange};
  border-radius: 2px;
  ${(props) => props.theme.fontStyles.textSemiboldSm}

  background-color: ${(props) =>
    props.$mode === 'normal' ? 'none' : `${props.theme.colors.orange}`};
  color: ${(props) =>
    props.$mode === 'normal'
      ? `${props.theme.colors.orange}`
      : `${props.theme.colors.white}`};
`;

interface StateBadgeProps {
  isActive: boolean;
  mode: 'normal' | 'fill';
  [key: string]: any;
}

const StateBadge = ({ isActive, mode, ...restProps }: StateBadgeProps) => {
  if (isActive)
    return (
      <StyledStateBadgeBox $mode={mode} {...restProps}>
        당일가능
      </StyledStateBadgeBox>
    );
  else {
    return '';
  }
};

export default StateBadge;
