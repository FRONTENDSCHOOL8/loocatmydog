import Button from '@/components/atoms/Button/Button';
import CheckBox from '@/components/atoms/CheckBox/CheckBox';
import styled from 'styled-components';

const StyledSignUpAgree = styled.div`
  padding-inline: 20px;
  padding-block-start: 40px;
  /* background-color: pink;
  border: 1px solid red; */

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

const SignUpAgree = () => {
  return (
    <StyledSignUpAgree>
      <p className="p-signUp">어서오세요,</p>
      <p className="p-signUp">약관동의가 필요해요</p>
      <div className="div-agreeAll">
        <CheckBox reservation={false}>이용약관 전체 동의</CheckBox>
      </div>
      <div className="div-line"></div>
      <div className="div-checkBoxList">
        <CheckBox reservation={false}>
          봐주개냥 서비스 이용약관 동의(필수)
        </CheckBox>
        <span className="span-checkBoxList">보기</span>
      </div>
      <div className="div-checkBoxList">
        <CheckBox reservation={false}>
          개인정보 수집 및 이용 동의(필수)
        </CheckBox>
        <span className="span-checkBoxList">보기</span>
      </div>
      <div className="div-checkBoxList">
        <CheckBox reservation={false}>
          안전보상 프로그램 약관 동의(필수)
        </CheckBox>
        <span className="span-checkBoxList">보기</span>
      </div>
      <div className="div-checkBoxList">
        <CheckBox reservation={false}>
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
      <Button size={'100%'} mode={'disabled'}>
        다음으로
      </Button>
    </StyledSignUpAgree>
  );
};

export default SignUpAgree;
