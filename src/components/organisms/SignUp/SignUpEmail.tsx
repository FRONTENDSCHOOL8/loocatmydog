import Button from '@/components/atoms/Button/Button';
import styled from 'styled-components';
import FormInput from './../../molecules/FormInput/FormInput';

const StyledSignUpEmail = styled.div`
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
      border: 1px solid ${(props) => props.theme.colors.lineColorGray};
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

const SignUpEmail = () => {
  return (
    <StyledSignUpEmail>
      <div className="div-phase">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="pWrapper">
        <p className="p-signUp">이메일을</p>
        <p className="p-signUp">입력하세요</p>
      </div>
      <div className="inputWrapper">
        <FormInput
          mode={'register'}
          type={'email'}
          name={'email'}
          placeholder="이메일 주소"
        >
          이메일
        </FormInput>
        <FormInput
          mode={'register'}
          type={'password'}
          name={'password'}
          placeholder="비밀번호"
        >
          비밀번호
        </FormInput>
        <FormInput
          mode={'register'}
          type={'password'}
          name={'passwordConfirm'}
          placeholder="비밀번호 확인"
        >
          비밀번호 확인
        </FormInput>
      </div>

      <Button size={'100%'} mode={'disabled'}>
        다음으로
      </Button>
    </StyledSignUpEmail>
  );
};

export default SignUpEmail;
