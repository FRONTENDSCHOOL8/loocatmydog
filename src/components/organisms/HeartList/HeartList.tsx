import MyPlaceList from '@/components/molecules/MyPlaceList/MyPlaceList';
import styled from 'styled-components';

const StyledHeartListBox = styled.div`
  display: flex;
  flex-flow: column;
  padding-block: 50px;

  & .heartListTitle {
    display: block;
    padding-block-end: 23px;
    padding-inline: 20px;
    ${(props) => props.theme.fontStyles.headingMd};
    color: ${(props) => props.theme.colors.textBlack};
  }
`;

const HeartList = () => {
  return (
    <StyledHeartListBox>
      <span className="heartListTitle">찜목록</span>
      <MyPlaceList
        src={'/images/innerImg.jpg'}
        like={true}
        title={'플레이스 목록'}
      >
        {'주소입력 주소입력'}
      </MyPlaceList>
    </StyledHeartListBox>
  );
};

export default HeartList;
