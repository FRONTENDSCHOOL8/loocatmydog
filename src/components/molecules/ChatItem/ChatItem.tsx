import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import { format } from 'date-fns';
import styled from 'styled-components';

interface ChatItemProps {
  id: string;
  isOwn: boolean;
  username: string;
  message?: string;
  attachImageUrl?: string[];
  sendDate: number;
}

interface StyledChatItemProps {
  $isOwn: boolean;
}

const StyledChatItemContainer = styled.div<StyledChatItemProps>`
  inline-size: 100%;
  display: flex;
  flex-direction: ${(props) => (props.$isOwn ? 'row-reverse' : 'row')};
  align-items: flex-start;
  gap: 10px;

  & .profile-image {
    flex-shrink: 0;
  }

  & .date {
    ${(props) => props.theme.fontStyles.textRegularSm}
    color: ${(props) => props.theme.colors.textGray};
    margin-block-start: auto;
  }
`;

const StyledChatBox = styled.div<StyledChatItemProps>`
  & .username {
    display: block;
    ${(props) => props.theme.fontStyles.textSemiboldBase};
    color: ${(props) => props.theme.colors.textBlack};
    text-align: ${(props) => (props.$isOwn ? 'right' : 'left')};
  }
  & .message {
    position: relative;
    padding: 10px;
    background-color: ${(props) =>
      props.$isOwn ? '#ffd233d9' : props.theme.colors.white};
    border-radius: 4px;
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
    ${(props) => props.theme.fontStyles.textRegularMd};
    max-inline-size: 250px;
    min-inline-size: 170px;
    margin-block-start: 5px;

    &::before {
      content: '';
      position: absolute;
      inline-size: 0px;
      block-size: 0px;
      top: 0;
      border: 4px solid
        ${(props) => (props.$isOwn ? '#ffd233d9' : props.theme.colors.white)};
      ${(props) => {
        if (props.$isOwn)
          return `
            border-bottom-color: transparent;
            border-right-color: transparent;
            right: -4px;
          `;
        else
          return `
            border-bottom-color: transparent;
            border-left-color: transparent;
            left: -4px;
          `;
      }}
    }
  }
  & .attach-image {
    margin-block-start: 5px;
    max-inline-size: 250px;
    min-inline-size: 170px;
    max-block-size: 250px;
    border-radius: 5px;
    overflow: hidden;

    & > img {
      aspect-ratio: 1/1;
      object-fit: cover;
    }
  }
`;

const ChatItem = ({
  isOwn = false,
  message,
  sendDate,
  username,
  attachImageUrl,
}: ChatItemProps) => {
  const messageSendDate = new Date(sendDate).toLocaleTimeString().slice(0, -3);
  const senderName = isOwn ? '나' : username;
  return (
    <StyledChatItemContainer $isOwn={isOwn}>
      {!isOwn && <ProfileImage className="profile-image" />}
      <StyledChatBox $isOwn={isOwn}>
        <span className="username">{senderName}</span>
        {attachImageUrl && attachImageUrl.length > 0 && (
          <a
            href="/images/story_sample1.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <figure className="attach-image">
              <img src="/images/story_sample1.jpg" alt="" />
            </figure>
          </a>
        )}
        {message && <p className="message">{message}</p>}
      </StyledChatBox>
      <time
        className="date"
        dateTime={format(sendDate, 'yyyy-MM-dd hh:mm:ss.SSS')}
      >
        {messageSendDate}
      </time>
    </StyledChatItemContainer>
  );
};

export default ChatItem;
