import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import styled from 'styled-components';
import { Form, redirect } from 'react-router-dom';
import Photo from '@/components/atoms/Photo/Photo';
import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import pb from '@/api/pocketbase';
import getFirstPathName from '@/utils/getFirstPathName';
import { useAuthStore } from '@/store/useAuthStore';
import { and, eq } from 'typed-pocketbase';

const StyledStoryWrite = styled.div`
  inline-size: 100%;
  block-size: 75%;

  .write-submit {
    position: absolute;
    right: 12px;
    top: 12px;
    inline-size: 60px;
    block-size: 26px;
    border-radius: 13px;
    background-color: ${(props) => props.theme.colors.primary};
    padding: 4px 6px;
    ${(props) => props.theme.fontStyles.textSemiboldMd}
  }

  .write-submit:disabled {
    cursor: default;
  }

  .textArea-wrapper {
    display: flex;
    inline-size: 100%;
    block-size: 100%;
    padding: 10px 12px;
    gap: 10px;

    & Form {
      inline-size: 87.25%;
      block-size: 100%;
      padding: 10px 0px;
      display: flex;
      flex-flow: column nowrap;
    }

    & textarea {
      border: 0px;
      inline-size: 100%;
      block-size: 90%;
      resize: none;
    }

    & textarea:focus {
      outline: none;
    }
  }

  .photoAdd-wrapper {
    display: flex;
    gap: 10px;
    padding: 0px 20px;
  }

  .starContainer {
    block-size: 30px;
    margin-block-start: 4px;
    display: inline-flex;
    align-items: center;
  }

  .rateCheck {
    inline-size: 30px;
    block-size: 30px;
    background-image: url('/images/star.svg');
    background-position: center;
    background-size: contain;
    appearance: none;
  }

  .rateCheck:checked {
    appearance: none;
    background-image: url('/images/star-fill.svg');
  }
`;

// multi imageFiles container
const imageFiles: File[] = [];

const StoryWrite = () => {
  // 게시물 작성 유형
  const type = getFirstPathName();

  // 리뷰 별
  const [stars, setStars] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
  ]);

  const handleStar = (e: ChangeEvent<HTMLInputElement>) => {
    const index = Number(e.currentTarget.dataset.index);
    const newStars = [];
    for (let i = 0; i < 5; i++) {
      if (i <= index) {
        newStars.push(true);
      } else {
        newStars.push(false);
      }
    }
    setStars(newStars);
  };

  const rateTemplate = (
    <>
      <span>{'별점 입력'}</span>
      <div className="starContainer">
        {stars.map((star: boolean, index: number) => {
          return (
            <input
              key={index}
              type="checkbox"
              name="star"
              id={String(index)}
              data-index={index}
              className="rateCheck"
              checked={star}
              onChange={handleStar}
            />
          );
        })}
      </div>
    </>
  );

  // 로그인 유저 정보
  const currentUserData = useAuthStore.getState().user;
  const currentUserId = currentUserData?.id;

  // 화면에 이미지 렌더링을 위한 상태
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  // 게시하기 버튼 비활성화 | 활성화
  const [textArea, setTextArea] = useState<string>('');
  const isDisable = textArea.length < 1;
  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(e.target.value);
  };

  // 이미지 파일 업로드 이벤트
  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    let file;

    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0];
      imageFiles.push(file);
    }

    if (imageURLs.length === 4) {
      alert('이미지 등록은 4개까지만 가능합니다');
      return;
    }

    const fileURL = URL.createObjectURL(file as Blob);

    if (fileURL) {
      setImageURLs([...imageURLs, fileURL]);
      e.target.value = '';
    }
  };

  // 업로드한 파일 삭제 이벤트
  const handleImageDelete = (e: MouseEvent<HTMLButtonElement>) => {
    const currentSource = e.currentTarget.dataset.src;
    setImageURLs(
      imageURLs.filter((url, index) => {
        imageFiles.splice(index, 1);
        return url !== currentSource;
      })
    );
  };

  return (
    <StyledStoryWrite>
      <button
        className="write-submit"
        type="submit"
        form="storyForm"
        disabled={isDisable}
      >
        게시하기
      </button>
      <div className="textArea-wrapper">
        <ProfileImage />
        <Form id="storyForm" method="post" action="/stories/post">
          <label htmlFor="textArea"></label>
          <textarea
            name="textArea"
            id="textArea"
            placeholder="공유하고 싶은 이야기가 있나요?"
            onChange={handleTextArea}
            required
          />
          <input type="hidden" name="userId" value={currentUserId} />
          {type === 'review' ? rateTemplate : null}
        </Form>
      </div>
      <div className="photoAdd-wrapper">
        <Photo type={'default'} onChange={handleImageInput} />
        {imageURLs.map((url, index) => (
          <Photo
            key={index}
            type={'picture'}
            imgSrc={url}
            onClick={handleImageDelete}
          />
        ))}
        <Photo type={'total'} currentImageNum={imageURLs.length} />
      </div>
    </StyledStoryWrite>
  );
};

export default StoryWrite;

// submit action 함수
export async function storyFormAction({ request }: { request: any }) {
  const type = getFirstPathName();

  const formData = await request.formData();

  const productId = type === 'review' ? getIdFromPath() : null;
  const userId = formData.get('userId');

  const starInput = formData.getAll('star');

  let rateCount = 0;
  for (let i = 0; i < starInput.length; i++) {
    if (starInput[i] === 'on') {
      rateCount += 1;
    }
  }

  const eventData = {
    userId: userId,
    type: type,
    textContent: formData.get('textArea'),
    photo: imageFiles,
    placeId: productId,
    rate: rateCount,
  };

  console.log(eventData);

  try {
    await pb.collection('boards').create(eventData);
    console.log(productId);
    console.log(userId);
    if (productId) {
      updateReviewed(productId, userId);
    }

    // 메모리 비우기
    imageFiles.splice(0, imageFiles.length);

    alert('스토리 작성이 완료됐습니다.');
  } catch (error) {
    console.log('Error while writing : ', error);
  }

  return redirect('/main');
}

const getIdFromPath = () => {
  const pathName = window.location.pathname;
  const type = pathName.split('/')[3];
  console.log(type);

  return type;
};

const updateReviewed = async (productId: string, userId: string) => {
  const records = await pb.from('reservation').getFullList({
    filter: and(eq('placeId', productId), eq('userId', userId)),
  });

  const recordID = records[0].id;
  const data = {
    ...records[0],
    reviewed: true,
  };

  await pb.from('reservation').update(recordID, data);
};
