import { Form, Link, redirect } from 'react-router-dom';
import styled from 'styled-components';
import pb from '@/api/pocketbase';

const StyledChatRoom = styled.div`
  inline-size: 100%;
  block-size: 100%;
  display: flex;
  flex-flow: column;

  & a {
    font-size: 12px;
    position: absolute;
    right: 15px;
    top: 17px;
  }

  & form {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    padding: 15px 5px;
  }
  .chatArea {
    inline-size: 100%;
    block-size: 100%;
    background-color: lime;
  }

  .addImage {
    inline-size: 26px;
    block-size: 26px;
    overflow: hidden;

    & label {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      color: #919191;
      line-height: 100%;
      cursor: pointer;
    }

    #addImage {
      display: none;
    }
  }

  .chatSubmitBtn {
    inline-size: 26px;
    block-size: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// dummy userId
const currentUserId = 'qx6lpgtzmsdy3id';

// 채팅 정보 가져오기
// const getChatData = () => {
//   try{
//     return pb.collection("chatList").
//   }catch(error){
//     console.log(error)
//   }
// }

// 서버 통신 subscribe
const subscribeChatRoom = () => {
  pb.collection('chatList').subscribe('', function (e) {}, {});
};
const ChatRoom = () => {
  return (
    <StyledChatRoom>
      <Link to={'/'}>바로가기</Link>
      <div className="chatArea"></div>
      <Form method="POST">
        <div className="addImage">
          <label htmlFor="addImage">+</label>
          <input type="file" name="addImage" id="addImage" />
        </div>
        <div className="messageInput">
          <label htmlFor="messageArea"></label>
          <input type="text" name="messageArea" id="messageArea" />
        </div>
        <button className="chatSubmitBtn" type="submit">
          <img src="/images/iconSend.svg" alt="" />
        </button>
      </Form>
    </StyledChatRoom>
  );
};

export default ChatRoom;

export async function chatRoomFormAction({ request }: { request: any }) {
  const formData = await request.formData();

  const eventData = {
    image: formData.get('addImage'),
    message: formData.get('messageArea'),
  };

  console.log(eventData);

  return redirect('/chat_room');
}
