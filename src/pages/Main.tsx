import StoryCard from '@/components/molecules/StoryCard/StoryCard';
import styled from 'styled-components';

const StyledMain = styled.div`
  flex: 1;
`;

function Main() {
  return <StyledMain style={{ background: 'yellow' }}></StyledMain>;
}

export default Main;
