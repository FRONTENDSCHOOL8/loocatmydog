import Button from '@/components/atoms/Button/Button';
import { useInput } from '@/hooks/useInput';
import {
  isEmail,
  isEqualsToOtherValue,
  isNotEmpty,
  isValidPassword,
} from '@/utils/signUpValidation';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FormInput from './../../molecules/FormInput/FormInput';
import SignUpHeader from './SignUpHeader';

const StyledSignUpEmail = styled.div`
  padding-inline: 20px;

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

  & .formInputWrapper {
    position: relative;

    & .span-error {
      position: absolute;
      top: 0;
      right: 0;
      ${(props) => props.theme.fontStyles.textRegularSm}
      color: ${(props) => props.theme.colors.red}
    }
  }
`;

interface SignUpEmailData {
  email: string;
  password: string;
  passwordConfirm: string;
}
interface SignUpEmailProps extends SignUpEmailData {
  updateFields: (fields: Partial<SignUpEmailData>) => void;
  back: () => void;
  next: () => void;
}

const SignUpEmail = ({ updateFields, back, next }: SignUpEmailProps) => {
  // '다음으로' 버튼 활성 여부 state
  const [isActive, setIsActive] = useState(false);

  // 이메일 state (useInput 커스텀훅 사용)
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
    isDuplicate: emailIsDuplicate,
  } = useInput('', (value: string) => isEmail(value) && isNotEmpty(value));

  // 비밀번호 state (useInput 커스텀훅 사용)
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput('', (value: string) => isValidPassword(value));

  // 비밀번호 확인 state (useInput 커스텀훅 사용)
  const {
    value: passwordConfirmValue,
    handleInputChange: handlePasswordConfirmChange,
    handleInputBlur: handlePasswordConfirmBlur,
    hasError: passwordConfirmHasError,
  } = useInput('', (value: string) =>
    isEqualsToOtherValue(value, passwordValue)
  );

  // '다음으로' 버튼 활성화를 위한 useEffect
  useEffect(() => {
    if (
      emailValue &&
      passwordValue &&
      passwordConfirmValue &&
      !emailHasError &&
      !passwordHasError &&
      !passwordConfirmHasError
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    emailValue,
    passwordValue,
    passwordConfirmValue,
    emailHasError,
    passwordHasError,
    passwordConfirmHasError,
  ]);

  return (
    <>
      <SignUpHeader type={'step'} phase="1/3" back={back} />
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
          <div className="formInputWrapper">
            <FormInput
              mode={'register'}
              type={'email'}
              name={'email'}
              placeholder="이메일 주소"
              value={emailValue}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                handleEmailBlur(e, 'email')
              }
              onChange={handleEmailChange}
            >
              이메일
            </FormInput>
            {emailHasError && (
              <span className="span-error">
                올바른 이메일 형식을 입력해주세요.
              </span>
            )}
            {!emailHasError && emailIsDuplicate && (
              <span className="span-error">이미 가입된 이메일입니다.</span>
            )}
          </div>
          <div className="formInputWrapper">
            <FormInput
              mode={'register'}
              type={'password'}
              name={'password'}
              placeholder="영문, 숫자, 특수문자 조합 8~20자리"
              value={passwordValue}
              onBlur={handlePasswordBlur}
              onChange={handlePasswordChange}
            >
              비밀번호
            </FormInput>
            {passwordHasError && (
              <span className="span-error">
                8~20자리 영문, 숫자, 특수문자 조합으로 입력해 주세요.{' '}
              </span>
            )}
          </div>
          <div className="formInputWrapper">
            <FormInput
              mode={'register'}
              type={'password'}
              name={'passwordConfirm'}
              placeholder="비밀번호 확인"
              value={passwordConfirmValue}
              onBlur={handlePasswordConfirmBlur}
              onChange={handlePasswordConfirmChange}
            >
              비밀번호 확인
            </FormInput>
            {passwordConfirmHasError && (
              <span className="span-error">비밀번호가 일치하지 않습니다.</span>
            )}
          </div>
        </div>

        {isActive && (
          <Button
            size={'100%'}
            mode={'normal'}
            onClick={() => {
              next();
              updateFields({ email: emailValue, password: passwordValue });
            }}
          >
            다음으로
          </Button>
        )}
        {!isActive && (
          <Button size={'100%'} mode={'disabled'}>
            다음으로
          </Button>
        )}
      </StyledSignUpEmail>
    </>
  );
};

export default SignUpEmail;
