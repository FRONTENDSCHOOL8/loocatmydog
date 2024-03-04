import Tab from '@/components/molecules/Tab/Tab';
import { useEffect, useState } from 'react';

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
      - "created": "2022-01-01 01:00:00.123Z",
      - new Date(created).getTime();
    - text = 내용 [데이터]
*/
const readStory = async (mode: 'front' | 'after') => {
  const option = {};
  try {
    // if(mode === "after"){
    //   option.filter = `userId = ${userId}`
    // }
    // const record = await db.collection('boards').getFullList({
    //   filter: `type = "stories"`,
    // });
    // console.log(record);
    // record.map((data, index)=>{
    // })
  } catch (error) {
    console.log(error);
  }
};

const Stories = () => {
  const [modeState, setModeState] = useState<'front' | 'after'>('front');

  const handleMode = () => {
    if (modeState === 'front') {
      setModeState('after');
    } else {
      setModeState('front');
    }
  };

  useEffect(() => {
    readStory(modeState);
  }, [modeState]);

  return (
    <>
      <Tab
        mode={modeState}
        front={'진행 예약'}
        after={'지난 예약'}
        onClick={handleMode}
      />
      {/* <StoryCard /> */}
    </>
  );
};

export default Stories;
