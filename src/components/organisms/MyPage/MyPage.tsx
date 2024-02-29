import ProfileListLink from '@/components/molecules/ProfileListLink/ProfileListLink';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import styled from 'styled-components';

const StyledMyPage = styled.div`
  display: flex;
  flex-direction: column;
  inline-size: 100%;

  & .petSpan {
    display: block;
    inline-size: 100%;
    block-size: 60px;
    padding: 10px 20px;
    ${(props) => props.theme.fontStyles.textSemiboldMd}
    color:  ${(props) => props.theme.colors.textBlack}
  }
`;

const MyPage = () => {
  return (
    <StyledMyPage>
      <UserProfile
        style={{ marginBlock: 35 }}
        name={'홍길동'}
        src={'/images/grayCircle.svg'}
      />
      <div>
        <span className="petSpan">반려동물</span>
        만드는중
      </div>
      <ProfileListLink />
      <ProfileListLink
        accordion={true}
        accordionContent={'결제수단 컴포넌트 만드는 중'}
      >
        {'결제수단'}
      </ProfileListLink>
      <ProfileListLink to={'/reservation_list'}>{'예약내역'}</ProfileListLink>
      <ProfileListLink to={'/settings'}>{'환경설정'}</ProfileListLink>
    </StyledMyPage>
  );
};

export default MyPage;
