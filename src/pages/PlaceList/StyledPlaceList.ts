import styled from 'styled-components';

interface StyledMainSectionProps {
  $flexDirection?: string;
  $flexGap?: number;
}

export const MainContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 40px;
`;

export const MainSection = styled.section<StyledMainSectionProps>`
  padding-block-start: 30px;
  padding-inline: 20px;
  &:last-child {
    padding-block-end: 40px;
  }
  & .section-title {
    ${(props) => props.theme.fontStyles.headingMd};
    margin-block-end: 15px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  & .section-filter {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
  & .section-content {
    display: flex;
    flex-flow: ${(props) => `${props.$flexDirection || 'row'} nowrap`};
    gap: ${(props) => `${props.$flexGap || 0}px`};
  }
`;
