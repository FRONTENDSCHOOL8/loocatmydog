import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import styled from 'styled-components';
import { converTimeChat } from '@/utils';

interface ChatRoomListProps {
  name: string;
  recentMessage: string;
  createdDate: number;
  chatCount: number;
}

const StyledChatList = styled.div`
  display: flex;
  column-gap: 10px;
  inline-size: 100%;
  padding-block: 16px;
  padding-inline: 20px;
  border-block-end: 1px solid ${(props) => props.theme.colors.lineColorGray};

  & .chatContentWrapper {
    display: flex;
    flex: 1;
    flex-flow: column;
    justify-content: space-between;

    & :first-child {
      ${(props) => props.theme.fontStyles.textMediumBase}
      color: ${(props) => props.theme.colors.textBlack};
    }

    & :last-child {
      ${(props) => props.theme.fontStyles.textRegularSm}
      color: ${(props) => props.theme.colors.textDarkGray};
    }
  }

  & .chatAlarmWrapper {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;

    & :first-child {
      ${(props) => props.theme.fontStyles.textRegularSm}
      color: ${(props) => props.theme.colors.textDarkGray};
    }

    & .span-chatCount {
      padding-inline: 5px;
      padding-block: 2px;
      background-color: #fb724c;
      text-align: center;
      vertical-align: middle;
      border-radius: 8px;
      ${(props) => props.theme.fontStyles.textSemiboldSm}
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

const ChatRoomList = ({
  name,
  recentMessage,
  createdDate,
  chatCount,
}: ChatRoomListProps) => {
  return (
    <StyledChatList>
      <ProfileImage blockSize={35} inlineSize={35} />
      <div className="chatContentWrapper">
        <span>{name}</span>
        <span>{recentMessage}</span>
      </div>
      <div className="chatAlarmWrapper">
        <span>{converTimeChat(createdDate)}</span>
        {0 < chatCount && chatCount <= 300 && (
          <span className="span-chatCount">{chatCount}</span>
        )}
        {chatCount > 300 && (
          <span className="span-chatCount">{chatCount}+</span>
        )}
      </div>
    </StyledChatList>
  );
};

export default ChatRoomList;
