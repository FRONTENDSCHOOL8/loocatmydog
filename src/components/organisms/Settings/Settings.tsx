import BooleanBox from '@/components/molecules/BooleanBox/BooleanBox';
import styled from 'styled-components';

const StyledSettingsBox = styled.div`
  & .settings {
    display: block;
    margin-block-start: 40px;
    margin-block-end: 10px;
    padding: 10px 20px;
    ${(props) => props.theme.fontStyles.headingMd}
  }

  & .logout {
    display: block;
    inline-size: 100%;
    block-size: 60px;
    padding: 10px 20px;
    ${(props) => props.theme.fontStyles.textRegularBase}
    color:  ${(props) => props.theme.colors.red};
    text-align: left;
  }
  border-bottom: solid 1px ${(props) => props.theme.colors.lineColorGray};
`;

const Settings = () => {
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
      <button className="logout" type="button">
        로그아웃
      </button>
    </StyledSettingsBox>
  );
};

export default Settings;
