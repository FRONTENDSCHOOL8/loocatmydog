import pb from '@/api/pocketbase';
import StoryCard from '@/components/molecules/StoryCard/StoryCard';
import Tab from '@/components/molecules/Tab/Tab';
import getPbImageURL from '@/utils/getPbImageURL';
import { RecordModel } from 'pocketbase';
import React, { useEffect, useState } from 'react';

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
interface Expand {
  [key: string]: any;
}

const readStory = async (mode: 'front' | 'after') => {
  const option = {};
  try {
    // if(mode === "after"){
    //   option.filter = `userId = ${userId}`
    // }
    const record: RecordModel[] = await pb.collection('boards').getFullList({
      filter: `type = "stories"`,
      expand: 'userId',
    });

    const storyList = record.map((data, index) => {
      const { id, userId, collectionId, expand, content, image, created } =
        data;
      const expandUserData = (data.expand as Expand).userId;
      const date = new Date(created);
      const time = date.getTime();
      const profileImage = getPbImageURL(
        expandUserData.collectionId,
        expandUserData.id,
        expandUserData.avatar
      );
      const imageUrls = image.map((url: string) =>
        getPbImageURL(collectionId, id, url)
      );

      return (
        <StoryCard
          key={index}
          id={id}
          userId={userId}
          username={expandUserData.name}
          profileImageUrl={profileImage}
          type={'story'}
          text={content}
          attachImageUrl={imageUrls}
          createdDate={time}
        />
      );
    });

    return storyList;
  } catch (error) {
    console.log(error);
  }
};

const Stories = () => {
  const [modeState, setModeState] = useState<'front' | 'after'>('front');
  const [storyList, setStoryList] = useState<React.JSX.Element[]>([]);

  const handleMode = () => {
    if (modeState === 'front') {
      setModeState('after');
    } else {
      setModeState('front');
    }
  };

  useEffect(() => {
    readStory(modeState)
      .then((list) => {
        setStoryList([...storyList, ...(list as React.JSX.Element[])]);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }, [modeState]);

  return (
    <>
      <Tab
        mode={modeState}
        front={'진행 예약'}
        after={'지난 예약'}
        onClick={handleMode}
      />
      {storyList}
    </>
  );
};

export default Stories;
