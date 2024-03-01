import Payment from '@/components/molecules/Payment/Payment';
import ProfileCard from '@/components/molecules/ProfileCard/ProfileCard';
import ProfileListLink from '@/components/molecules/ProfileListLink/ProfileListLink';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import styled from 'styled-components';

const StyledMyPage = styled.div`
  display: flex;
  flex-direction: column;
  inline-size: 100%;

  & .petSpan {
    display: inline-block;
    inline-size: 100%;
    margin-block: 16px;
    ${(props) => props.theme.fontStyles.textSemiboldMd}
    color:  ${(props) => props.theme.colors.textBlack}
  }
`;

const ProfileCardSection = styled.div`
  padding-inline: 20px;
  padding-block-end: 25px;
`;

const PaymentPlusBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 17px;
  & button {
    ${(props) => props.theme.fontStyles.textRegularSm};
    color: ${(props) => props.theme.colors.textDarkGray};
    display: flex;

    & img {
      padding-inline-start: 5px;
    }
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
      <ProfileCardSection>
        <span className="petSpan">반려동물</span>
        <ProfileCard isChecked={false} profile={false} name={'현재 없음'}>
          {'반려동물을 등록해주세요'}
        </ProfileCard>
      </ProfileCardSection>
      <ProfileListLink />
      <ProfileListLink
        accordion={true}
        accordionContent={
          <>
            <Payment
              style={{
                paddingInline: 20,
                paddingBlockStart: 6,
                paddingBlockEnd: 20,
              }}
              src={'/images/card.svg'}
              userPay={false}
              name={'test'}
            />
            <PaymentPlusBox>
              <button type="button">
                결제수단 추가등록
                <img src="/images/miniPlusCircle.svg" alt="추가 버튼" />
              </button>
            </PaymentPlusBox>
          </>
        }
      >
        {'결제수단'}
      </ProfileListLink>
      <ProfileListLink to={'/reservation_list'}>{'예약내역'}</ProfileListLink>
      <ProfileListLink to={'/settings'}>{'환경설정'}</ProfileListLink>
    </StyledMyPage>
  );
};

export default MyPage;
