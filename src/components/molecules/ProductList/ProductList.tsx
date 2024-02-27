import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import StateBadge from '@/components/atoms/StateBadge/StateBadge';
import styled from 'styled-components';
//type 선언
interface ProductListProps {
  title: string;
  children: string;
  like?: boolean;
  review?: boolean;
}
interface DateListProps {
  year: number;
  month: number;
  day: number;
  dDay: string;
  review?: boolean;
}

//styled 컴포넌트

const StyledProductListContainer = styled.div`
  inline-size: 100%;
  max-inline-size: 420px;
  background: #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;

  .inner {
    display: flex;
    gap: 10%;
    inline-size: 70%;
    align-items: center;
  }
  figure {
    inline-size: 28%;
    block-size: 60px;
    border-radius: 4px;
    overflow: hidden;
  }
  .textWrap {
    ${(props) => props.theme.colors.textDarkGray};
    ${(props) => props.theme.fontStyles.textRegularSm};
  }
  .textWrap p {
    margin-bottom: 0.325rem;
    ${(props) => props.theme.colors.textBlack};
    ${(props) => props.theme.fontStyles.textSemiboldMd};
  }
`;

const StyledDateList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.textBlack};
  font-size: ${(props) => props.theme.fontSizes.nameTitle};

  &.reviewtext {
    color: ${(props) => props.theme.colors.textGray};
    font-size: ${(props) => props.theme.fontSizes.description};
    margin-bottom: 3px;
  }

  .dDay {
    color: ${(props) => props.theme.colors.red};
    font-size: ${(props) => props.theme.fontSizes.description};
    font-weight: ${(props) => props.theme.fontWeight.regular};
    margin-top: 3px;
  }
  .date {
    margin-bottom: 3px;
  }
`;
const DateList = ({
  year,
  day,
  month,
  dDay = 'd-day',
  review = false,
  ...restProps
}: DateListProps) => {
  return (
    <StyledDateList className={review ? 'reviewtext' : ''} {...restProps}>
      <span className="year">{year}</span>
      <span className="date">
        {month}/{day}
      </span>
      {review ? <StateBadge isActive /> : <span className="dDay">{dDay}</span>}
    </StyledDateList>
  );
};

function ProductList({
  title = '테스트',
  children = '테스트입니다',
  like = false,
  review,
  ...restProps
}: ProductListProps) {
  return (
    <StyledProductListContainer {...restProps}>
      <div className="inner">
        <figure>
          <img src="/src/assets/test.png" alt="플레이스사진" />
        </figure>
        <div className="textWrap">
          <p>{title}</p>
          <span>{children}</span>
        </div>
      </div>
      {like ? (
        <HeartButton fill />
      ) : (
        <DateList year={2024} month={2} day={22} dDay="d-day" review />
      )}
    </StyledProductListContainer>
  );
}

export default ProductList;
