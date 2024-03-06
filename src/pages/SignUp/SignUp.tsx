import pb from '@/api/pocketbase';
import Button from '@/components/atoms/Button/Button';
import SignUpAddress from '@/components/organisms/SignUp/SignUpAddress';
import SignUpAgree from '@/components/organisms/SignUp/SignUpAgree';
import SignUpEmail from '@/components/organisms/SignUp/SignUpEmail';
import SignUpPhone from '@/components/organisms/SignUp/SignUpPhone';
import React, { useState } from 'react';
import { Form, redirect, useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birthday: string;
  genderNo: string;
  phone: string;
  address: string;
  addressDetail: string;
  zonecode: string;
  sigungu: string;
  latitude: string;
  longitude: string;
}

const INITIAL_DATA: FormData = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  birthday: '',
  genderNo: '',
  phone: '',
  address: '',
  addressDetail: '',
  zonecode: '',
  sigungu: '',
  latitude: '',
  longitude: '',
};

const SignUp = () => {
  const navigate = useNavigate();

  // 데이터 저장을 위한 상태관리
  const [data, setData] = useState(INITIAL_DATA);
  // 현재 화면에 보이는 컴포넌트 조절을 위한 상태관리
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // 회원가입 다음 단계로 이동 시 데이터 업데이트
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  // 다음단계로 가는 버튼 클릭 시 실행
  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  // 상단의 뒤로가기 버튼 클릭 시 실행
  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userData = {
      email: data.email,
      password: data.password,
      passwordConfirm: data.password,
      name: data.name,
      birthday: data.birthday,
      genderNo: data.genderNo,
      phone: data.phone,
      address: data.address,
      addressDetail: data.addressDetail,
      addressInfo: {
        zonecode: data.zonecode,
        sigungu: data.sigungu,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    };
    try {
      await pb.collection('users').create(userData);
      alert('회원가입을 완료했습니다.');
      navigate('/');
    } catch (error) {
      console.log('데이터 통신 중 에러가 발생했습니다. : ', error);
    }
  }
  const steps = [
    <SignUpAgree {...data} next={next} back={back} key="signUpAgree" />,
    <SignUpEmail
      {...data}
      next={next}
      back={back}
      updateFields={updateFields}
      key="signUpEmail"
    />,
    <SignUpPhone
      {...data}
      next={next}
      back={back}
      updateFields={updateFields}
      key="signUpPhone"
    />,
    <SignUpAddress
      {...data}
      next={next}
      back={back}
      updateFields={updateFields}
      key="signUpAddress"
    />,
  ];

  return (
    <form onSubmit={(e) => handleSubmit(e)}>{steps[currentStepIndex]}</form>
  );
};

export default SignUp;
