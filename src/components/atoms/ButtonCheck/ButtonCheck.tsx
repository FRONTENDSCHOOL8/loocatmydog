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
  flex-direction: row
  // justify-content: space-between;
`;
const StyledButtonCheckContainer = styled.div<StyledButtonCheckProps>`
  position: relative;
  inline-size: 33.333%;
  max-inline-size: ${(props) => (props.$profile ? '' : '140px')};
  min-block-size: ${(props) => (props.$profile ? '' : '70px')};
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
    inline-size: 65%;
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
    <StyledButtonCheckContainer>
      <StyledButtonCheck
        id={id}
        type="checkbox"
        checked={isChecked}
        value={name}
        onChange={checkBoxChecked}
        $profile={profile}
      />
      <StyledButtonCheckLabel $profile={profile} htmlFor={id}>
        <div className="textWrap">
          <StyledButtonCheckP>{name}</StyledButtonCheckP>
          <p>{children}</p>
        </div>
        {profile ? <ProfileImage /> : ''}
      </StyledButtonCheckLabel>
    </StyledButtonCheckContainer>
  );
};

export default ButtonCheck;
