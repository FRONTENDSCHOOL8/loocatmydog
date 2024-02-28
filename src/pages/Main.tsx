import StoryCard from '@/components/molecules/StoryCard/StoryCard';
import styled from 'styled-components';

const StyledMain = styled.div`
  flex: 1;
`;

interface StoryCardProps {
  id: number;
  type: 'review' | 'story';
  profileImageUrl: string;
  attachImageUrl?: string[];
  username: string;
  starCount?: number;
  createdDate: number;
  text: string;
}

// 개발용 임시 스토리 데이터
const storyObj = [
  {
    id: 0,
    type: 'review' as 'story' | 'review',
    profileImageUrl: '/images/starDog.svg',
    username: '김개냥',
    starCount: 3,
    attachImageUrl: ['/images/story_sample1.jpg'],
    text: '우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?',
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    type: 'story' as 'story' | 'review',
    profileImageUrl: '/images/starDog.svg',
    username: '이개냥',
    starCount: 5,
    attachImageUrl: ['/images/story_sample1.jpg', '/images/story_sample2.jpg'],
    text: '우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?',
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    type: 'story' as 'story' | 'review',
    profileImageUrl: '/images/starDog.svg',
    username: '최개냥',
    starCount: 5,
    attachImageUrl: [
      '/images/story_sample1.jpg',
      '/images/story_sample2.jpg',
      '/images/story_sample3.jpg',
    ],
    text: '우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?',
    createdDate: new Date().getTime(),
  },
  {
    id: 3,
    type: 'story' as 'story' | 'review',
    profileImageUrl: '/images/starDog.svg',
    username: '박개냥',
    starCount: 5,
    attachImageUrl: [
      '/images/story_sample1.jpg',
      '/images/story_sample2.jpg',
      '/images/story_sample3.jpg',
      '/images/story_sample4.jpg',
    ],
    text: '우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?우리집 강아지 너무 이쁘죠?',
    createdDate: new Date().getTime(),
  },
];

function Main() {
  return (
    <StyledMain style={{ background: 'yellow' }}>
      {storyObj.map((item) => (
        <StoryCard key={item.id} {...item} />
      ))}
    </StyledMain>
  );
}

export default Main;
