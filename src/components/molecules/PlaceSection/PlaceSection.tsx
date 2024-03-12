import { ReactNode } from 'react';
import styled from 'styled-components';
//type 지정
interface PlaceSectionProps {
  title: string | undefined;
  children: ReactNode;
  [key: string]: any;
}
const StyledPlaceSection = styled.div`
  background: #fff;
  padding: 0 20px;
  margin-bottom: 20px;
  & .sectionTitle {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 15px;
  }
  & .borderLine {
    block-size: 1px;
    inline-size: 100%;
    margin-top: 20px;
    background: ${(props) => props.theme.colors.lineColorGray};
  }
`;

const PlaceSection = ({ title, children, ...restProps }: PlaceSectionProps) => {
  return (
    <StyledPlaceSection {...restProps}>
      <p className="sectionTitle">{title}</p>
      {children}
      <div className="borderLine"></div>
    </StyledPlaceSection>
  );
};

export default PlaceSection;
