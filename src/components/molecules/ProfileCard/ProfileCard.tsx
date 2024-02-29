import { Dispatch, ReactNode, SetStateAction, useId } from 'react';
import styled from 'styled-components';
import ProfileImage from '../../atoms/ProfileImage/ProfileImage';

// type 지정
interface ButtonCheckProps {
  name: string;
  children: string | ReactNode;
  isChecked: boolean;
  profile: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}

//styled component 작성
const StyledButtonCheckContainer = styled.div`
  position: relative;
  max-inline-size: 190px;
  min-block-size: 80px;
  inline-size: 50%;
  ${(props) => props.theme.fontStyles.textRegularSm}
  ${(props) => props.theme.colors.textGray}
`;
const StyledButtonCheckP = styled.p`
  ${(props) => props.theme.fontStyles.textSemiboldMd}
  ${(props) => props.theme.colors.textBlack}
  text-align: center;
  margin-bottom: 5px;
`;
const StyledButtonCheckLabel = styled.label`
  inline-size: 100%;
  block-size: 100%;
  border-radius: 4px;
  position: absolute;
  left: 0;
  display: flex;
  padding: 6px 10px;
  justify-content: center;
  align-items: center;
  text-align: left;
  border: 1px solid ${(props) => props.theme.colors.lineColorGray};
  background: ${(props) => props.theme.colors.white};

  .textWrap {
    inline-size: 60%;
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

const ProfileCard = ({
  name,
  children,
  isChecked,
  setIsChecked,
  profile = true,
  ...restProps
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
      />
      <StyledButtonCheckLabel profile={profile} htmlFor={id} {...restProps}>
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

export default ProfileCard;
