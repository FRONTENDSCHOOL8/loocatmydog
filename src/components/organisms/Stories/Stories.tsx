import Header from '@/components/molecules/Header/Header';
import StoryCard from '@/components/molecules/StoryCard/StoryCard';
import Tab from '@/components/molecules/Tab/Tab';

/* 
  storycard
    - id = 글id [데이터]
    - type = 별 여부 [데이터]
    - profileImageUrl = 프로필 사진 url [데이터]
    - attachImageUrl? = 이미지 url [데이터]
    - username = 이름 [데이터]
    - userId = 작성자 id
    - starCount? = 별 개수 [데이터]
    - createDate = 생성 날짜 [데이터]
    - text = 내용 [데이터]
*/

const dummyData = {
  names: '',
  version: '',
  author: '',
  items: [
    {
      id: 'asd-12312412',
      writer: 'qwe-123142',
      type: 'story',
      content: '안녕하세요',
      productId: 'qwezx-asdaqwe',
      rate: 3,
      image: '/images/story_sample1.jpg',
      created: '2024-01-04 13:32:35.990Z',
      updated: '2024-01-04 13:45:38.296Z',
    },
  ],
};

const Stories = () => {
  const datas = dummyData.items;
  const storyCardList = datas.map(
    (
      {
        id,
        writer: userId,
        type,
        content: text,
        productId,
        rate,
        image,
        created,
      },
      index
    ) => {
      console.log(id, userId, type);
    }
  );

  return (
    <>
      <Header type={'logo'} />
      <Tab
        mode={'front'}
        front={'진행 예약'}
        after={'지난 예약'}
        onModeChange={(mode) => {
          if (mode === 'front') mode = 'after';
          else if (mode === 'after') mode = 'front';
        }}
      />
      {/* <StoryCard /> */}
    </>
  );
};

export default Stories;
