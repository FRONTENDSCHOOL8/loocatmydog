import DateList from '@/components/atoms/DateList/DateList';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import React from 'react';
import styled from 'styled-components';
//type 선언
interface MyPlaceListProps {
  title: string;
  children: string;
  dDay?: string;
  date?: string;
  src?: string;
  like?: boolean;
  state?: string;
  review?: boolean;
  mode?: boolean;
  onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
}

//styled 컴포넌트

const StyledMyPlaceListContainer = styled.div<{ $dDay: string | undefined }>`
  inline-size: 100%;
  max-inline-size: 420px;
  display: flex;
  background: ${(props) =>
    props.$dDay === 'D-day' ? props.theme.colors.orangeBg : 'none'};
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
    display: flex;
    align-items: center;
    justify-content: center;
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
  mode = true,
  date = 'yyyy.mm.dd',
  dDay,
  state = '당일가능',
  src = '/images/story_sample3.jpg',
  onClick,
  ...restProps
}: MyPlaceListProps) {
  const isLike = like ? (
    <HeartButton fill />
  ) : (
    <DateList
      mode={mode ? 'normal' : 'fill'}
      date={date}
      dDay={dDay}
      review={review}
      state={state}
      onClick={onClick}
    />
  );
  return (
    <StyledMyPlaceListContainer $dDay={dDay} {...restProps}>
      <div className="inner">
        <figure>
          <img src={src} alt="플레이스사진" />
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
