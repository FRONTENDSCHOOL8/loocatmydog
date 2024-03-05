import Button from '@/components/atoms/Button/Button';
import styled from 'styled-components';
import FormInput from '../../molecules/FormInput/FormInput';
import SignUpHeader from './SignUpHeader';

const StyledSignUpAddress = styled.div`
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
      border: 1px solid ${(props) => props.theme.colors.primary};
    }
  }

  & .pWrapper {
    padding-block-start: 40px;

    & .p-signUp {
      margin-block-end: 5px;
      ${(props) => props.theme.fontStyles.headingMd}
      color: ${(props) => props.theme.colors.textBlack};
    }
  }

  & .inputWrapper {
  }

  & .searchInputWrapper {
    display: flex;
    align-items: flex-end;
    column-gap: 11px;
    margin-block: 37px;
  }

  & .searchInputWrapper div:first-child {
    flex-grow: 1;
  }

  & .exampleWrapper {
    ${(props) => props.theme.fontStyles.textRegularBase}
    color: ${(props) => props.theme.colors.textGray};

    span {
      ${(props) => props.theme.fontStyles.textSemiboldBase}
      color: ${(props) => props.theme.colors.textBlack};
    }
  }

  & .addressDetailWrapper {
    margin-block-end: 57px;
  }
`;

interface SignUpAddressData {
  address: string;
  addressDetail: string;
}
interface SignUpAddressProps extends SignUpAddressData {
  updateFields: (fields: Partial<SignUpAddressData>) => void;
  back: () => void;
  next: () => void;
}

const SignUpAddress = ({ updateFields, next, back }: SignUpAddressProps) => {
  return (
    <>
      <SignUpHeader type={'step'} phase="3/3" back={back} />
      <StyledSignUpAddress>
        <div className="div-phase">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="pWrapper">
          <p className="p-signUp">내가 사는 곳의</p>
          <p className="p-signUp">주소를 입력하세요</p>
        </div>
        <div className="searchInputWrapper">
          <FormInput
            mode={'register'}
            type={'text'}
            name={'address'}
            hiddenLabel={true}
            placeholder="연희동 132"
          >
            주소
          </FormInput>
          <Button size="20%" mode={'gray'}>
            검색
          </Button>
        </div>

        <div className="exampleWrapper">
          <p>
            <span>도로명&nbsp;&nbsp;&nbsp;</span>예) 무학로 33, 도신대로 8길 23
          </p>
          <p>
            <span>동주소&nbsp;&nbsp;&nbsp;</span>예) 연희동 42-18
          </p>
          <p>
            <span>건물명&nbsp;&nbsp;&nbsp;</span>예) 역삼동 푸르지오, 텐즈휠
          </p>
        </div>
        <div className="addressDetailWrapper">
          <FormInput
            mode={'register'}
            type={'text'}
            name={'addressDetail'}
            hiddenLabel={true}
            placeholder="상세주소 입력(건물명, 동/호수, 단독 주택 등"
          >
            주소
          </FormInput>
        </div>
        <Button size={'100%'} mode={'normal'}>
          가입완료
        </Button>
      </StyledSignUpAddress>
    </>
  );
};

export default SignUpAddress;
