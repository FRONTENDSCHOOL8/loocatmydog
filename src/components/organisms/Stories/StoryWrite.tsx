import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import styled from 'styled-components';
import { Form, redirect } from 'react-router-dom';
import Photo from '@/components/atoms/Photo/Photo';
import { ChangeEvent, MouseEvent, useState } from 'react';

const StyledStoryWrite = styled.div`
  inline-size: 100%;
  block-size: 75%;

  .button-wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 18px 20px;

    .write-submit {
      inline-size: 60px;
      block-size: 26px;
      border-radius: 13px;
      background-color: ${(props) => props.theme.colors.primary};
      padding: 4px 6px;
      ${(props) => props.theme.fontStyles.textSemiboldMd}
    }
  }

  .textArea-wrapper {
    display: flex;
    inline-size: 100%;
    block-size: 100%;
    padding: 10px 20px;
    gap: 10px;

    & Form {
      inline-size: 85%;
      padding: 10px 0px;
    }

    & textarea {
      border: 0px;
      inline-size: 100%;
      block-size: 100%;
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
`;

/* 
  id
  userId
  avatar
  type
  content
  photos
  created
*/

const StoryWrite = () => {
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    let file;

    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0];
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

  const handleImageDelete = (e: MouseEvent<HTMLButtonElement>) => {
    const currentSource = e.currentTarget.dataset.src;
    setImageURLs(imageURLs.filter((url) => url !== currentSource));
  };

  return (
    <StyledStoryWrite>
      <div className="button-wrapper">
        <button>
          <img src="/images/bigXIcon.svg" alt="닫기" />
        </button>
        <button className="write-submit" type="submit" form="storyForm">
          게시하기
        </button>
      </div>
      <div className="textArea-wrapper">
        <ProfileImage />
        <Form id="storyForm" method="post">
          <label htmlFor="textArea"></label>
          <textarea
            name="textArea"
            id="textArea"
            placeholder="공유하고 싶은 이야기가 있나요?"
            required
          />
          {imageURLs.map((url, index) => (
            <input
              key={index}
              type="hidden"
              name={`photo_${index}`}
              value={url}
            />
          ))}
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

export async function storyFormAction({ request }: { request: any }) {
  const formData = await request.formData();
  const photoUrls = [];

  for (let i = 0; i < 4; i++) {
    if (formData.has(`photo_${i}`)) {
      photoUrls.push(formData.get(`photo_${i}`));
    }
  }

  const eventData = {
    content: formData.get('textArea'),
    photos: photoUrls,
  };
  console.log(eventData);

  return redirect('/stories/post');
}
