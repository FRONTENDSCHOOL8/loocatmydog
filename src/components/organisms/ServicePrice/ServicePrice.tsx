import PetIcon from '@/components/atoms/PetIcon/PetIcon';
import styled from 'styled-components';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

//test

//DB URL
const API = import.meta.env.VITE_PB_API_URL;
const pb = new PocketBase(API);

//type 지정
interface PriceWrapProps {
  size: string;
  weight?: string;
  price?: number | undefined;
}
const StyledServicePrice = styled.div`
  & .img {
    inline-size: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 5px;
  }
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
  align-items: center;
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
        <div className="img">
          <PetIcon dogSize={`${size}견`} />
        </div>
        <p className="size">{size}</p>
        <span>{weight}</span>
      </div>
      <p className={`${price ? 'price' : 'none'}`}>
        {price ? `${price}원` : '예약불가'}
      </p>
    </StyledPriceWrap>
  );
};
// type 지정
interface PriceProps {
  small: number;
  middle: number;
  large: number;
}

const ServicePrice = ({ data }: { data: any }) => {
  console.log(data.priceSmall);

  return (
    <StyledServicePrice>
      <p>이용 금액</p>
      <div className="priceWrapContainer">
        <PriceWrap size={'소형'} weight={'7kg 미만'} price={data.priceSmall} />
        <PriceWrap
          size={'중형'}
          weight={'7kg ~ 14.9kg'}
          price={data.priceMiddle}
        />
        <PriceWrap size={'대형'} weight={'15kg 이상'} price={data.priceLarge} />
      </div>
    </StyledServicePrice>
  );
};

export default ServicePrice;
