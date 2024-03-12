import MyPlaceList from '@/components/molecules/MyPlaceList/MyPlaceList';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeartListBox = styled.div`
  display: flex;
  flex-flow: column;
`;

const StyledHeartItem = styled(Link)`
  &:hover {
    background-color: ${(props) => props.theme.colors.orangeBg};
    text-decoration: none;
  }
`;
interface HeartListProps {
  data: {
    [key: string]: any;
  };
}

const HeartList = ({ data }: HeartListProps) => {
  return (
    <StyledHeartListBox>
      {data?.map((item: any) => (
        <StyledHeartItem key={item.id} to={`/place_detail/${item.id}`}>
          <MyPlaceList
            id={item.id}
            src={item.photo}
            like={true}
            title={item.title}
          >
            {item.address}
          </MyPlaceList>
        </StyledHeartItem>
      ))}
    </StyledHeartListBox>
  );
};

export default HeartList;
