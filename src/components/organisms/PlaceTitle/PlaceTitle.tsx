import StarRating from '@/components/atoms/StarRating/StarRating';
import Tag from '@/components/atoms/Tag/Tag';
import { maskingName } from '@/utils';
import styled from 'styled-components';

//type 지정
interface PlaceUserInfoProps {
  review: number;
  address: string;
  name: string;
  [key: string]: any;
}
interface PlaceTitleSectionProps {
  title: string;
  review: number;
  address: string;
  name: string;
  tagList: Array<string>;
}

const StyledPlaceTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & .title {
    ${(props) => props.theme.fontStyles.headingMd}
    color: ${(props) => props.theme.colors.textBlack};
  }
  border-bottom: 1px solid ${(props) => props.theme.colors.lineColorGray};
  padding: 20px 0;
`;
const StlyedPlaceUserInfo = styled.div`
  ${(props) => props.theme.fontStyles.textRegularMd};
  color: ${(props) => props.theme.colors.textDarkGray};
  display: flex;
  gap: 5px;
`;
const StyledTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const PlaceUserInfo = ({
  review,
  address,
  name = '홍길동',
  ...restProps
}: PlaceUserInfoProps) => {
  return (
    <StlyedPlaceUserInfo {...restProps}>
      <StarRating fill={true} />
      <span>리뷰 {review}개 </span>
      <span>{address.split(' ', 2)}</span>
      <span>{maskingName(name)}</span>
    </StlyedPlaceUserInfo>
  );
};

const PlaceTitleSection = ({
  title = '플레이스 제목',
  review = 2,
  address,
  name,
  tagList = ['test', 'test2', 'test3'],
}: PlaceTitleSectionProps) => {
  return (
    <StyledPlaceTitle>
      <p className="title">{title}</p>
      <PlaceUserInfo
        review={review}
        address={address}
        name={name}
      ></PlaceUserInfo>
      <StyledTagContainer>
        {tagList.map((tag: string) => {
          return <Tag key={tag}>{tag}</Tag>;
        })}
      </StyledTagContainer>
    </StyledPlaceTitle>
  );
};

export default PlaceTitleSection;
