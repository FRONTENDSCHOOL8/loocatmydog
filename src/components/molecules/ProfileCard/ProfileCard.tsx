import { ChangeEventHandler, ReactNode, useId } from 'react';
import styled from 'styled-components';
import ProfileImage from '../../atoms/ProfileImage/ProfileImage';
import { Link } from 'react-router-dom';

// type 지정
interface ButtonCheckProps {
  name: string;
  children: string | ReactNode;
  isChecked?: boolean;
  profile?: boolean;
  src?: string;
  [key: string]: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

// styled component 작성
const StyledButtonCheckContainer = styled.div`
  display: inline-block;
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
  cursor: pointer;
  left: 0;
  top: 0;
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
  onChange,
  isChecked = false,
  profile = true,
  src,
  ...restProps
}: ButtonCheckProps) => {
  const id = useId();
  return (
    <StyledButtonCheckContainer {...restProps}>
      <StyledButtonCheck
        id={id}
        type="checkbox"
        checked={isChecked}
        value={name}
        name={name}
        onChange={onChange}
      />
      <StyledButtonCheckLabel htmlFor={id}>
        <div className="textWrap">
          <StyledButtonCheckP>{name}</StyledButtonCheckP>
          {children}
        </div>
        {profile ? (
          <ProfileImage src={src} />
        ) : (
          <ProfileImage src={'/images/plusIcon.svg'} />
        )}
      </StyledButtonCheckLabel>
    </StyledButtonCheckContainer>
  );
};

export default ProfileCard;
