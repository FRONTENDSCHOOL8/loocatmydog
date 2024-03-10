import styled from 'styled-components';

interface StyledMainSectionProps {
  $flexDirection?: string;
  $flexGap?: number;
}

export const MainContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 30px;
`;

export const MainOptions = styled.div`
  padding-block-start: 10px;
  padding-inline: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 30px;
  & .section-options-title {
    ${(props) => props.theme.fontStyles.headingMd};
  }

  & .section-options-description {
    ${(props) => props.theme.fontStyles.textRegularMd};
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 10px;
    flex: 1;

    // Calendar 최외곽 컨테이너 스타일
    & > div {
      inline-size: auto;
    }

    & .select-date-button {
      inline-size: 60px;
      block-size: 26px;
      border-radius: 13px;
      background-color: ${(props) => props.theme.colors.primary};
      padding: 4px 6px;
      ${(props) => props.theme.fontStyles.textSemiboldMd}
    }
  }
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
