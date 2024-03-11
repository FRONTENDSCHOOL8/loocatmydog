import pb from '@/api/pocketbase';
import Payment from '@/components/molecules/Payment/Payment';
import ProfileCard from '@/components/molecules/ProfileCard/ProfileCard';
import ProfileListLink from '@/components/molecules/ProfileListLink/ProfileListLink';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import { useAuthStore } from '@/store/useAuthStore';
import getPbImageURL from '@/utils/getPbImageURL';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMyPage = styled.div`
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  padding-block-start: 20px;
  position: relative;

  & .petSpan {
    display: inline-block;
    inline-size: 100%;
    padding-block-start: 20px;
    margin-block: 16px;
    ${(props) => props.theme.fontStyles.textSemiboldMd}
    color:  ${(props) => props.theme.colors.textBlack}
  }
`;

const AddPetPlusBox = styled(Link)`
  position: absolute;
  right: 20px;
  top: 120px;

  & .addPetBtn {
    display: flex;
    flex-flow: row;
    cursor: pointer;
    ${(props) => props.theme.fontStyles.textSemiboldSm}
    color:  ${(props) => props.theme.colors.textDarkGray}
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
  const navigate = useNavigate();

  const handleProfileCardClick = () => {
    navigate('/add_mypet');
  };

  const user = useAuthStore.getState().user;
  const [petData, setPetData] = useState<any>(null);

  const petImage = useEffect(() => {
    const fetchPetData = async () => {
      const record = await pb.from('users').getOne(user?.id, {
        select: {
          expand: {
            petId: true,
          },
        },
      });

      setPetData(record.expand?.petId);
      console.log(record.expand?.petId);
    };
    fetchPetData();
  }, [user]);

  return (
    <StyledMyPage>
      <UserProfile
        style={{ marginBlock: 35 }}
        name={user?.name}
        src={user?.avatar === '' ? '/images/profileNone.svg' : user?.avatar}
      />
      <ProfileCardSection>
        <span className="petSpan">반려동물</span>
        {!petData ? (
          ''
        ) : (
          <AddPetPlusBox to={'/add_mypet'}>
            <button className="addPetBtn">
              추가등록
              <img src="/images/miniPlusCircle.svg" alt="플러스" />
            </button>
          </AddPetPlusBox>
        )}

        <ul>
          {!petData ? (
            <li>
              <ProfileCard
                onClick={handleProfileCardClick}
                isChecked={false}
                profile={false}
                name={'현재 없음'}
              >
                {'반려동물을 등록해주세요'}
              </ProfileCard>
            </li>
          ) : (
            petData.map((data: any) => (
              <li key={data.id}>
                <ProfileCard
                  profile={true}
                  name={data.petName}
                  src={getPbImageURL(data.collectionId, data.id, data.image)}
                >
                  {data.breed} {`${data.weight}kg`}
                </ProfileCard>
              </li>
            ))
          )}
        </ul>
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
