import Button from '@/components/atoms/Button/Button';
import CheckBox from '@/components/atoms/CheckBox/CheckBox';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SignUpHeader from './SignUpHeader';

const StyledSignUpAgree = styled.div`
  padding-inline: 20px;
  padding-block-start: 40px;

  & .p-signUp {
    margin-block-end: 5px;
    ${(props) => props.theme.fontStyles.headingMd}
    color: ${(props) => props.theme.colors.textBlack}
  }

  & .div-agreeAll {
    margin-block-start: 43px;
    margin-block-end: 20px;
  }

  & .div-line {
    height: 1px;
    background: ${(props) => props.theme.colors.lineColorGray};
    margin-block-end: 21px;
  }

  & .div-checkBoxList {
    display: flex;
    align-items: center;
    padding-block-end: 15px;

    & .span-checkBoxList {
      ${(props) => props.theme.fontStyles.textRegularMd}
      color: ${(props) => props.theme.colors.textDarkGray};
      text-decoration-line: underline;
    }
  }

  & .imgWrapper {
    display: flex;
    justify-content: center;
    & img {
      width: 124px;
    }
  }
`;

interface SignUpAgreeProps {
  back(): void;
  next(): void;
}
const SignUpAgree = ({ back, next }: SignUpAgreeProps) => {
  // 이용약관 동의 초기값 false
  const initialValue: { [key: number]: boolean } = {
    0: false,
    1: false,
    2: false,
    3: false,
  };

  // 이용약관 동의(개별) state
  const [isChecked, setIsChecked] = useState(initialValue);
  // 이용약관 전체 동의 state
  const [isAllChecked, setIsAllChecked] = useState(false);
  // '다음으로' 버튼 활성 여부 state
  const [isActive, setIsActive] = useState(false);

  // 이용약관 개별 동의 렌더링에 따라 전체 동의 state와 버튼 state 조절
  useEffect(() => {
    if (Object.values(isChecked).indexOf(false) === -1) {
      setIsAllChecked(true);
      setIsActive(true);
    } else {
      setIsAllChecked(false);
      setIsActive(false);
    }
  }, [isChecked]);

  // 이용약관 개별 동의 체크박스 클릭
  const handleCheck = (index: number) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [index]: !isChecked[index],
    }));
  };

  // 이용약관 전체 동의 체크박스 클릭
  const handleAllCheck = () => {
    const allChecked = {
      0: true,
      1: true,
      2: true,
      3: true,
    };

    const allNotChecked = {
      0: false,
      1: false,
      2: false,
      3: false,
    };

    if (isAllChecked) {
      setIsChecked(allNotChecked);
      setIsActive(false);
    } else {
      setIsChecked(allChecked);
      setIsActive(true);
    }

    setIsAllChecked((prevState) => !prevState);
  };

  return (
    <>
      <SignUpHeader type={'popup'} back={back} />
      <StyledSignUpAgree>
        <p className="p-signUp">어서오세요,</p>
        <p className="p-signUp">약관동의가 필요해요</p>
        <div className="div-agreeAll">
          <CheckBox
            reservation={false}
            isChecked={isAllChecked}
            onChange={handleAllCheck}
          >
            이용약관 전체 동의
          </CheckBox>
        </div>
        <div className="div-line"></div>
        <div className="div-checkBoxList">
          <CheckBox
            reservation={false}
            isChecked={isChecked[0]}
            onChange={() => handleCheck(0)}
          >
            봐주개냥 서비스 이용약관 동의(필수)
          </CheckBox>
          <span className="span-checkBoxList">보기</span>
        </div>
        <div className="div-checkBoxList">
          <CheckBox
            reservation={false}
            isChecked={isChecked[1]}
            onChange={() => handleCheck(1)}
          >
            개인정보 수집 및 이용 동의(필수)
          </CheckBox>
          <span className="span-checkBoxList">보기</span>
        </div>
        <div className="div-checkBoxList">
          <CheckBox
            reservation={false}
            isChecked={isChecked[2]}
            onChange={() => handleCheck(2)}
          >
            안전보상 프로그램 약관 동의(필수)
          </CheckBox>
          <span className="span-checkBoxList">보기</span>
        </div>
        <div className="div-checkBoxList">
          <CheckBox
            reservation={false}
            isChecked={isChecked[3]}
            onChange={() => handleCheck(3)}
          >
            위치기반 서비스 이용약관 동의(필수)
          </CheckBox>
          <span className="span-checkBoxList">보기</span>
        </div>
        <div className="imgWrapper">
          <img
            src="/images/pet-signUp.png"
            alt="한 쪽 발을 들고 있는 강아지 사진"
          />
        </div>
        {isActive && (
          <Button size={'100%'} mode={'normal'} onClick={next}>
            다음으로
          </Button>
        )}
        {!isActive && (
          <Button size={'100%'} mode={'disabled'}>
            다음으로
          </Button>
        )}
      </StyledSignUpAgree>
    </>
  );
};

export default SignUpAgree;
