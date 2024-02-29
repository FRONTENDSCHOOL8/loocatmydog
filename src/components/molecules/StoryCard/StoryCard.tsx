import React, { ReactNode, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { format } from 'date-fns';
import A11yHidden from '@/components/A11yHidden/A11yHidden';
import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import StarRating from '@/components/atoms/StarRating/StarRating';
import { convertTime } from '@/utils';

interface StoryCardProps {
  id: string;
  type: 'review' | 'story';
  profileImageUrl: string;
  attachImageUrl?: string[];
  username: string;
  userId: string;
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
  min-inline-size: 280px;
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

const StyledMoreButton = styled.button.attrs({ type: 'button' })`
  background: url('/images/more.svg') no-repeat center;
  inline-size: 30px;
  block-size: 30px;
  border-radius: 15px;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${(props) => props.theme.colors.gray100};
  }
`;

const StyledMoreButtonContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
`;

const StoryCard = ({
  id,
  type,
  profileImageUrl,
  username,
  userId,
  starCount = 0,
  attachImageUrl = [],
  createdDate,
  text,
}: StoryCardProps) => {
  const MAX_STAR_COUNT = 5;
  const starRating = new Array(MAX_STAR_COUNT)
    .fill(false)
    .map((_, idx) => idx < starCount);
  const [isPopUpMenuOpen, setIsPopUpMenuOpen] = useState<boolean>(false);
  const handleDeleteStory = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('story deleted');
  };

  useEffect(() => {
    const handleClosePopupMenu = () => setIsPopUpMenuOpen(false);

    if (isPopUpMenuOpen) window.addEventListener('click', handleClosePopupMenu);

    return () => window.removeEventListener('click', handleClosePopupMenu);
  }, [isPopUpMenuOpen]);

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
          <time
            dateTime={format(createdDate, 'yyyy-MM-dd hh:mm:ss.SSS')}
            className="created-time"
          >
            {convertTime(createdDate)}
          </time>
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

      <StyledMoreButtonContainer>
        <StyledMoreButton
          aria-labelledby="more"
          aria-haspopup={true}
          onClick={(e) => {
            e.stopPropagation();
            console.log('popup open clicked');
            setIsPopUpMenuOpen(true);
          }}
        >
          <A11yHidden id="more">더보기</A11yHidden>
        </StyledMoreButton>
        {isPopUpMenuOpen && (
          <PopUpMenu aria-expanded={isPopUpMenuOpen}>
            <li role="none">
              <button
                className="delete-story"
                type="button"
                onClick={handleDeleteStory}
              >
                삭제하기
              </button>
            </li>
          </PopUpMenu>
        )}
      </StyledMoreButtonContainer>
    </StyledStoryCard>
  );
};

const StyledPopUpMenuContainer = styled.ul.attrs({ role: 'menu' })`
  position: absolute;
  top: 100%;
  left: -250%;
  inline-size: 100px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray300};
  border-radius: 10px;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  overflow: hidden;

  & > li {
    inline-size: 100%;
    block-size: 100%;
    &:hover {
      background-color: ${(props) => props.theme.colors.gray100};
    }
  }

  & button {
    padding-block: 10px;
    inline-size: 100%;
    block-size: 100%;
  }

  & .delete-story {
    color: ${(props) => props.theme.colors.red};
  }
`;

interface PopUpMenuProps {
  children: ReactNode;
  [key: string]: any;
}

const PopUpMenu = ({ children, ...restProps }: PopUpMenuProps) => {
  return (
    <StyledPopUpMenuContainer {...restProps}>
      {children}
    </StyledPopUpMenuContainer>
  );
};

export default StoryCard;
