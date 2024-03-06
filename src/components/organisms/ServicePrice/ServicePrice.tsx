import PetIcon from '@/components/atoms/PetIcon/PetIcon';
import styled from 'styled-components';

//type 지정
interface PriceWrapProps {
  size: string;
  weight?: string;
  price?: number | undefined;
}
const StyledServicePrice = styled.div`
  & p {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 15px;
  }
  & .priceWrapContainer {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const StyledPriceWrap = styled.div`
  display: flex;
  justify-content: space-between;
  & .inner {
    display: flex;
    gap: 15px;
  }
  & .size {
    ${(props) => props.theme.fontStyles.textSemiboldMd}
    color: ${(props) => props.theme.colors.textBlack}
  }
  & .price {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack}
  }
  & .none {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textGray}
  }
  & span {
    ${(props) => props.theme.fontStyles.textSemiboldMd}
    color: ${(props) => props.theme.colors.textGray}
  }
`;

const PriceWrap = ({ size, weight, price }: PriceWrapProps) => {
  return (
    <StyledPriceWrap>
      <div className="inner">
        <PetIcon dogSize={`${size}견`} />
        <p className="size">{size}</p>
        <span>{weight}</span>
      </div>
      <p className={`${price ? 'price' : 'none'}`}>
        {price ? `${price}원` : '예약불가'}
      </p>
    </StyledPriceWrap>
  );
};

const ServicePrice = ({ price = [0] }: { price: Array<number> }) => {
  return (
    <StyledServicePrice>
      <p>이용 금액</p>
      <div className="priceWrapContainer">
        <PriceWrap size={'소형'} weight={'7kg 미만'} price={price[0]} />
        <PriceWrap size={'중형'} weight={'7kg ~ 14.9kg'} price={price[1]} />
        <PriceWrap size={'대형'} weight={'15kg 이상'} price={price[2]} />
      </div>
    </StyledServicePrice>
  );
};

export default ServicePrice;
