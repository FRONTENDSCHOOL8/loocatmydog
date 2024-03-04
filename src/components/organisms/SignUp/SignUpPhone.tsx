import Button from '@/components/atoms/Button/Button';
import styled from 'styled-components';
import FormInput from '../../molecules/FormInput/FormInput';
import React, { useEffect, useState } from 'react';
import { useInput } from '@/hooks/useInput';
import {
  isBirthday,
  isGenderNo,
  isName,
  isPhone,
} from '@/utils/signUpValidation';
import { getRandomNumber } from '@/utils';
import SignUpHeader from './SignUpHeader';

const StyledSignUpPhone = styled.div`
  padding-inline: 20px;

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

  & .inputIdentityNumberWrapper {
    display: flex;
    column-gap: 10px;

    & .inputIdentityFirstNumberWrapper {
      width: 50%;
    }

    & .inputIdentityLastNumberWrapper {
      display: flex;
      padding-block-start: 27px;

      & input {
        max-width: 30px;
        margin-inline: 10px;
        text-align: center;
        border: 0;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
      }

      & .span-star {
        letter-spacing: 5px;
        padding-block-start: 5px;
      }
    }
  }
  & .inputPositionWrapper {
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
interface SignUpPhoneData {
  name: string;
  birthday: string;
  genderNo: string;
  phone: string;
}
interface SignUpPhoneProps extends SignUpPhoneData {
  updateFields: (fields: Partial<SignUpPhoneData>) => void;
  back: () => void;
  next: () => void;
}

const SignUpPhone = ({ back, next, updateFields }: SignUpPhoneProps) => {
  // '다음으로' 버튼 활성 여부 state
  const [isActive, setIsActive] = useState(false);

  // 이름 state (useInput 커스텀훅 사용)
  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameHasError,
  } = useInput('', (value: string) => isName(value));

  // 생년월일 state (useInput 커스텀훅 사용)
  const {
    value: birthdayValue,
    handleInputChange: handleBirthdayChange,
    handleInputBlur: handleBirthdayBlur,
    hasError: birthdayHasError,
  } = useInput('', (value: string) => isBirthday(value));

  // 주민번호 뒷번호 첫째자리 state (useInput 커스텀훅 사용)
  const {
    value: genderNoValue,
    handleInputChange: handleGenderNoChange,
    handleInputBlur: handleGenderNoBlur,
    hasError: genderNoHasError,
  } = useInput('', (value: string) => isGenderNo(value));

  // 핸드폰 번호 확인 state (useInput 커스텀훅 사용)
  const {
    value: phoneValue,
    handleInputChange: handlePhoneChange,
    handleInputBlur: handlePhoneBlur,
    hasError: phoneHasError,
  } = useInput('', (value: string) => isPhone(value));

  // 인증번호 state
  const [certificationNumber, setCertificationNumber] = useState('');

  // 사용자가 입력한 인증번호 state
  const [enteredCertificationNumber, setEnteredCertificationNumber] =
    useState('');

  // '다음으로' 버튼 활성화를 위한 useEffect
  useEffect(() => {
    if (
      nameValue &&
      birthdayValue &&
      genderNoValue &&
      phoneValue &&
      !nameHasError &&
      !birthdayHasError &&
      !genderNoHasError &&
      !phoneHasError
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
      setCertificationNumber('');
    }
  }, [
    nameValue,
    birthdayValue,
    genderNoValue,
    phoneValue,
    nameHasError,
    birthdayHasError,
    genderNoHasError,
    phoneHasError,
  ]);

  const handleClickCertificationButton = () => {
    const randomNumber = getRandomNumber(0, 999999);
    setCertificationNumber(randomNumber);
  };

  const handleEnteredCertificationNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredCertificationNumber(e.target.value);
  };

  const handleClickNext = () => {
    if (certificationNumber === enteredCertificationNumber) {
      next();
      updateFields({
        name: nameValue,
        birthday: birthdayValue,
        genderNo: genderNoValue,
        phone: phoneValue,
      });
    }
  };

  return (
    <>
      <SignUpHeader type={'step'} phase="2/3" back={back} />
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
          <div className="inputPositionWrapper">
            <FormInput
              mode={'register'}
              type={'text'}
              name={'name'}
              placeholder="실명 입력"
              value={nameValue}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
            >
              이름
            </FormInput>
            {nameHasError && (
              <span className="span-error">
                2~10자리 한글 조합으로 입력해주세요.
              </span>
            )}
          </div>
          <div className="inputIdentityNumberWrapper inputPositionWrapper">
            <div className="inputIdentityFirstNumberWrapper">
              <FormInput
                mode={'register'}
                type={'number'}
                name={'birthday'}
                placeholder="생년월일"
                value={birthdayValue}
                onChange={handleBirthdayChange}
                onBlur={handleBirthdayBlur}
              >
                생년월일
              </FormInput>
              {birthdayHasError && (
                <span className="span-error">
                  6자리 생년월일을 입력해주세요.
                </span>
              )}
              {genderNoHasError && (
                <span className="span-error">
                  1~4 사이의 한 자리수를 입력해주세요.
                </span>
              )}
            </div>
            <div className="inputIdentityLastNumberWrapper">
              <span>-</span>
              <input
                type="number"
                name="genderNo"
                value={genderNoValue}
                onChange={handleGenderNoChange}
                onBlur={handleGenderNoBlur}
              />
              <span className="span-star">******</span>
            </div>
          </div>

          <div className="inputPositionWrapper">
            <FormInput
              mode={'register'}
              type={'number'}
              name={'phone'}
              placeholder="휴대폰 번호 입력"
              value={phoneValue}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
            >
              휴대폰 정보
            </FormInput>

            {phoneHasError && (
              <span className="span-error">휴대폰 번호를 확인해주세요.</span>
            )}
          </div>
          <div className="inputPositionWrapper">
            <FormInput
              mode={'register'}
              type={'number'}
              name={'phone'}
              placeholder="인증번호 입력"
              onChange={handleEnteredCertificationNumber}
            >
              인증번호 입력
            </FormInput>
            {certificationNumber && (
              <span className="span-error">
                인증 번호는 {certificationNumber} 입니다.
              </span>
            )}
          </div>
        </div>

        {!isActive && (
          <Button size={'100%'} mode={'disabled'}>
            인증번호 요청
          </Button>
        )}
        {isActive && !certificationNumber && (
          <Button
            size={'100%'}
            mode={'normal'}
            onClick={handleClickCertificationButton}
          >
            인증번호 요청
          </Button>
        )}
        {isActive && certificationNumber && (
          <Button size={'100%'} mode={'normal'} onClick={handleClickNext}>
            인증번호 입력
          </Button>
        )}
      </StyledSignUpPhone>
    </>
  );
};

export default SignUpPhone;
