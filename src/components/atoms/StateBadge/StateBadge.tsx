import { ReactNode } from 'react';
import styled from 'styled-components';

interface StateBadgeBoxProps {
  $mode: 'normal' | 'fill';
}

const StyledStateBadgeBox = styled.span<StateBadgeBoxProps>`
  padding: 2px 6px;
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
  children?: ReactNode;
  [key: string]: any;
}

const StateBadge = ({
  isActive,
  mode,
  children = '당일가능',
  ...restProps
}: StateBadgeProps) => {
  if (isActive)
    return (
      <StyledStateBadgeBox $mode={mode} {...restProps}>
        {children}
      </StyledStateBadgeBox>
    );
  else {
    return '';
  }
};

export default StateBadge;
