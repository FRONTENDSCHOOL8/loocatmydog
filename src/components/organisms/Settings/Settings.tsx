import BooleanBox from '@/components/molecules/BooleanBox/BooleanBox';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledSettingsBox = styled.div`
  & .settings {
    display: block;
    margin-block-start: 40px;
    margin-block-end: 5px;
    padding: 10px 20px;
    ${(props) => props.theme.fontStyles.headingMd}
  }

  & .signOut {
    display: block;
    inline-size: 100%;
    block-size: 60px;
    padding: 10px 20px;
    ${(props) => props.theme.fontStyles.textRegularBase}
    color:  ${(props) => props.theme.colors.textBlack};
    text-align: left;
    border-bottom: solid 1px ${(props) => props.theme.colors.lineColorGray};
  }
`;

const Settings = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    useAuthStore.getState().signOut;
    navigate('/');
  };

  const handleWithdrawal = () => {
    useAuthStore.getState().withDrawal;
    navigate('/');
    //탈퇴 하시겠습니까? 문구 먼저 띄워주고 탈퇴를 선택하면 탈퇴 시킴
  };

  return (
    <StyledSettingsBox>
      <span className="settings">환경설정</span>
      <BooleanBox />
      <BooleanBox title="플레이스 메시지 알림">
        {'플레이스가 보낸 메시지 도착 알림'}
      </BooleanBox>
      <BooleanBox title="이벤트 혜택 알림">
        {'할인 이벤트 및 마케팅 정보 알림'}
      </BooleanBox>
      <button className="signOut" type="button" onClick={handleSignOut}>
        로그아웃
      </button>
      <button className="signOut" type="button" onClick={handleWithdrawal}>
        회원탈퇴
      </button>
    </StyledSettingsBox>
  );
};

export default Settings;
