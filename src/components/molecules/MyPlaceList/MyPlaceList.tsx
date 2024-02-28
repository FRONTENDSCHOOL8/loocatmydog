import DateList from '@/components/atoms/DateList/DateList';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import styled from 'styled-components';
//type 선언
interface MyPlaceListProps {
  title: string;
  children: string;
  like?: boolean;
  review?: boolean;
  year: number;
  month: number;
  day: number;
  dDay: string;
}

//styled 컴포넌트

const StyledMyPlaceListContainer = styled.div`
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

function MyPlaceList({
  title = '테스트',
  children = '테스트입니다',
  like = false,
  review = false,
  year,
  month,
  day,
  dDay,
  ...restProps
}: MyPlaceListProps) {
  const isLike = like ? (
    <HeartButton fill />
  ) : (
    <DateList year={year} month={month} day={day} dDay={dDay} review={review} />
  );
  return (
    <StyledMyPlaceListContainer {...restProps}>
      <div className="inner">
        <figure>
          <img src="/src/assets/test.png" alt="플레이스사진" />
        </figure>
        <div className="textWrap">
          <p>{title}</p>
          <span>{children}</span>
        </div>
      </div>
      {isLike}
    </StyledMyPlaceListContainer>
  );
}

export default MyPlaceList;
