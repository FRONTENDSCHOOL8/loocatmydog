import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import StarRating from '@/components/atoms/StarRating/StarRating';
import { convertTime } from '@/utils';
import styled, { css } from 'styled-components';

interface StoryCardProps {
  id: number;
  type: 'review' | 'story';
  profileImageUrl: string;
  attachImageUrl?: string[];
  username: string;
  starCount?: number;
  createdDate: number;
  text: string;
}

interface StyledStoryImageContainerProps {
  $imageCount: number;
}

const StyledStoryCard = styled.div`
  position: relative;
  inline-size: 97%;
  padding: 15px 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.lineColorGray};
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  column-gap: 10px;
`;

const StyledStoryContents = styled.div`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 7px;
  & .username {
    ${(props) => props.theme.fontStyles.textSemiboldBase};
    color: ${(props) => props.theme.colors.textBlack};
  }

  & .review-time {
    display: flex;
    align-items: center;
    column-gap: 5px;
    & .star-rating {
      display: inline-flex;
    }
    & .created-time {
      color: ${(props) => props.theme.colors.textGray};
      ${(props) => props.theme.fontStyles.textRegularSm};
    }
  }

  & .text {
    color: ${(props) => props.theme.colors.textBlack};
    ${(props) => props.theme.fontStyles.textRegularMd};
  }
`;

const StyledStoryImageContainer = styled.figure<StyledStoryImageContainerProps>`
  display: grid;
  gap: 5px;
  inline-size: 100%;
  aspect-ratio: 1/1;

  & .attach-image {
    display: block;
    inline-size: 100%;
    aspect-ratio: ${(props) => (props.$imageCount === 2 ? 2 / 1 : 1 / 1)};
    background-color: ${(props) => props.theme.colors.gray300};
    border-radius: 5px;
    overflow: hidden;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(1.2);
    }
    & > img {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
    }
  }

  ${(props) => {
    if (props.$imageCount === 2) {
      return `
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
      `;
    } else if (props.$imageCount === 3) {
      return css`
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        & .attach-image-1 {
          grid-area: 1 / 1 / 2 / 3;
          aspect-ratio: 2/1;
        }
        & .attach-image-2 {
          grid-area: 2 / 1 / 3 / 2;
        }
        & .attach-image-3 {
          grid-area: 2 / 2 / 3 / 3;
        }
      `;
    } else if (props.$imageCount === 4) {
      return `
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      `;
    }
  }}
`;

const StoryCard = ({
  type,
  profileImageUrl,
  username,
  starCount = 0,
  attachImageUrl = [],
  createdDate,
  text,
}: StoryCardProps) => {
  const MAX_STAR_COUNT = 5;
  const starRating = new Array(MAX_STAR_COUNT)
    .fill(false)
    .map((_, idx) => idx < starCount);
  // 개발용 임시 props 변수
  // const attachImageUrl = [
  //   '/images/story_sample1.jpg',
  //   '/images/story_sample2.jpg',
  //   '/images/story_sample3.jpg',
  //   '/images/story_sample4.jpg',
  // ];
  return (
    <StyledStoryCard>
      <figure className="profile-image">
        <ProfileImage src={profileImageUrl} />
      </figure>
      <StyledStoryContents>
        <span className="username">{username}</span>
        <div className="review-time">
          {type === 'review' && (
            <span className="star-rating">
              {starRating.map((item, idx) => (
                <StarRating key={idx} fill={item} />
              ))}
            </span>
          )}
          <span className="created-time">
            {convertTime(createdDate)} | 신고
          </span>
        </div>
        {attachImageUrl.length > 0 && (
          <StyledStoryImageContainer $imageCount={attachImageUrl.length}>
            {attachImageUrl.map((url, idx) => (
              <a
                key={`image-${idx}`}
                title="새창으로 보기"
                className={`attach-image attach-image-${idx + 1}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={url} alt="" />
              </a>
            ))}
          </StyledStoryImageContainer>
        )}
        <p className="text">{text}</p>
      </StyledStoryContents>
    </StyledStoryCard>
  );
};

export default StoryCard;
