import Button from '@/components/atoms/Button/Button';
import styled from 'styled-components';
import FormInput from '../../molecules/FormInput/FormInput';

const StyledSignUpPhone = styled.div`
  padding-inline: 20px;

  /* background-color: pink; */
  /* border-top: 1px solid red; */

  & .div-phase {
    display: flex;

    & :first-child {
      width: 33%;
      border: 1px solid ${(props) => props.theme.colors.primary};
    }

    & :nth-child(2) {
      width: 33%;
      border: 1px solid ${(props) => props.theme.colors.primary};
    }

    & :nth-child(3) {
      width: 33%;
      border: 1px solid ${(props) => props.theme.colors.lineColorGray};
    }
  }

  & .pWrapper {
    padding-block-start: 40px;

    & .p-signUp {
      margin-block-end: 5px;
      ${(props) => props.theme.fontStyles.headingMd}
      color: ${(props) => props.theme.colors.textBlack}
    }
  }

  & .inputWrapper {
    display: flex;
    flex-flow: column;
    row-gap: 30px;
    padding-block-start: 40px;
    padding-block-end: 30px;
  }
`;

const SignUpPhone = () => {
  return (
    <StyledSignUpPhone>
      <div className="div-phase">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="pWrapper">
        <p className="p-signUp">본인인증이 필요해요.</p>
      </div>
      <div className="inputWrapper">
        <FormInput
          mode={'register'}
          type={'text'}
          name={'name'}
          placeholder="실명 입력"
        >
          이름
        </FormInput>
        <FormInput
          mode={'register'}
          type={'number'}
          name={'birthday'}
          placeholder="생년월일"
        >
          생년월일
        </FormInput>

        <FormInput
          mode={'register'}
          type={'text'}
          name={'phone'}
          placeholder="휴대폰 번호 입력"
        >
          휴대폰 정보
        </FormInput>
        {/* <FormInput
          mode={'register'}
          type={'text'}
          name={'certification'}
          placeholder="인증번호 입력"
          hiddenLabel={true}
        >
          인증번호
        </FormInput> */}
      </div>

      <Button size={'100%'} mode={'disabled'}>
        인증번호 요청
      </Button>
      {/* <Button size={'100%'} mode={'normal'}>
        인증번호 확인
      </Button> */}
    </StyledSignUpPhone>
  );
};

export default SignUpPhone;
