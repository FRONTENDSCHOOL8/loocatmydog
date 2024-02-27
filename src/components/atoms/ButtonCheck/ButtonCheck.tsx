import { Dispatch, ReactNode, SetStateAction, useId } from 'react';
import styled from 'styled-components';
import ProfileImage from '../ProfileImage/ProfileImage';

// type 지정
interface ButtonCheckProps {
  name: string;
  children: string | ReactNode;
  isChecked: boolean;
  profile: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}
interface StyledButtonCheckProps {
  $profile: boolean;
}
//styled component 작성
const profileStyles = `
  display: flex;
  flex-direction: row;
`;
const StyledButtonCheckContainer = styled.div<StyledButtonCheckProps>`
  position: relative;
  max-inline-size: ${(props) => (props.$profile ? '190px' : '140px')};
  min-block-size: ${(props) => (props.$profile ? '80px' : '70px')};
  inline-size: ${(props) => (props.$profile ? '50%' : '33.333%')};
  ${(props) => props.theme.fontStyles.textRegularSm}
  ${(props) => props.theme.colors.textGray}
`;
const StyledButtonCheckP = styled.p`
  ${(props) => props.theme.fontStyles.textSemiboldMd}
  ${(props) => props.theme.colors.textBlack}
  text-align: center;
  margin-bottom: 5px;
`;
const StyledButtonCheckLabel = styled.label<StyledButtonCheckProps>`
  inline-size: 100%;
  block-size: 100%;
  border-radius: 4px;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
  justify-content: center;
  align-items: center;
  text-align: ${(props) => (props.$profile ? 'left' : 'center')};
  border: 1px solid ${(props) => props.theme.colors.lineColorGray};
  background: ${(props) => props.theme.colors.white};
  ${(props) => (props.$profile ? profileStyles : '')};

  .textWrap {
    inline-size: ${(props) => (props.$profile ? '60%' : 'normal')};
  }
`;

const StyledButtonCheck = styled.input`
  inline-size: 100%;
  block-size: 100%;
  appearance: none;
  position: absolute;
  left: 0;

  &:checked + ${StyledButtonCheckLabel} {
    border: 1px solid ${(props) => props.theme.colors.orange};
    background: rgba(255, 182, 43, 0.1);
  }
`;

const ButtonCheck = ({
  name,
  children,
  isChecked,
  setIsChecked,
  profile = true,
}: ButtonCheckProps) => {
  const checkBoxChecked = () => setIsChecked(!isChecked);
  const id = useId();
  return (
    <StyledButtonCheckContainer $profile={profile}>
      <StyledButtonCheck
        id={id}
        type="checkbox"
        checked={isChecked}
        value={name}
        onChange={checkBoxChecked}
      />
      <StyledButtonCheckLabel $profile={profile} htmlFor={id}>
        <div className="textWrap">
          <StyledButtonCheckP>{name}</StyledButtonCheckP>
          <p>{children}</p>
        </div>
        {profile ? (
          <ProfileImage />
        ) : (
          <ProfileImage src={'/images/plusIcon.svg'} />
        )}
      </StyledButtonCheckLabel>
    </StyledButtonCheckContainer>
  );
};

export default ButtonCheck;
