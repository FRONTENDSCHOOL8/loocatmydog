import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import styled from 'styled-components';

const StyledModifyProfileBox = styled.div`
  padding-block-start: 23px;
  position: relative;

  & .camera {
    position: absolute;
    top: 35px;
    right: 18px;
  }
`;

const StyledEmailBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
  padding-block-end: 10px;
  margin-inline: 20px;
  margin-block-end: 30px;
  gap: 14px;

  & span {
    color: ${(props) => props.theme.colors.textBlack};
    ${(props) => props.theme.fontStyles.textRegularSm};
  }

  & div {
    display: flex;
    justify-content: space-between;
    align-items: self-end;
    & p {
      color: ${(props) => props.theme.colors.textBlack};
    }
    & .orangeButton {
      padding: 10px 15px;
      ${(props) => props.theme.fontStyles.textSemiboldMd};
      color: ${(props) => props.theme.colors.orange};
      border: 1px solid ${(props) => props.theme.colors.orange};
      border-radius: 4px;
    }
  }
`;

const StyledProfileBox = styled.div`
  padding-block-start: 36px;
`;

const ModifyProfile = () => {
  //UserProfile에 이름이랑 등록한 이미지 받아오기
  return (
    <StyledModifyProfileBox>
      <UserProfile name={'홍길동'} src={'/images/profileNone.svg'} />
      <StyledProfileBox>
        <button type="button">
          <img
            className="camera"
            src="/images/camera.svg"
            alt="프로필 사진 변경"
          />
        </button>
        <StyledEmailBox>
          <span>이메일 아이디</span>
          <p>test123456@dev.or</p>
        </StyledEmailBox>
        <StyledEmailBox>
          <span>휴대전화 번호</span>
          <div>
            <p>010-1234-5678</p>
            <button className="orangeButton" type="button">
              변경
            </button>
          </div>
        </StyledEmailBox>
        <StyledEmailBox>
          <span>내 주소</span>
          <div>
            <p>서울 마포구 사랑동 행복로 1234</p>
            <button className="orangeButton" type="button">
              변경
            </button>
          </div>
        </StyledEmailBox>
      </StyledProfileBox>
    </StyledModifyProfileBox>
  );
};

export default ModifyProfile;
