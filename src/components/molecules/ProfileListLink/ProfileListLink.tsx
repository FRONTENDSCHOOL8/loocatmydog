import { useState, ReactNode, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledProfileListLinkBox = styled(Link)`
  inline-size: 100%;
  padding: 16px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.theme.fontStyles.textSemiboldMd}
  color: ${(props) => props.theme.colors.textBlack};
  border-bottom: 1px solid ${(props) => props.theme.colors.lineColorGray};
  cursor: pointer;
  text-decoration-line: none;

  & button {
    background-color: transparent;

    & img {
      inline-size: 12px;
      block-size: 12px;
    }
  }
`;

const StyledAccordionContent = styled.div`
  /* 아코디언 내용에 적용할 스타일을 여기에 작성 */
  inline-size: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.lineColorGray};
`;

interface ProfileListLinkProps {
  to?: string;
  accordion?: boolean;
  children?: ReactNode;
  accordionContent?: ReactNode;
  [key: string]: any;
}

const ProfileListLink = ({
  to = '/bookmark',
  accordion = false,
  children = '찜 목록',
  accordionContent = 'null',
  ...restProps
}: ProfileListLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowIcon = accordion ? 'arrowDown.svg' : 'arrowRight.svg';
  const arrowAlt = accordion
    ? '아래 메뉴가 펼쳐지는 화살표'
    : '링크이동 오른쪽 화살표';

  const handleToggle: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <StyledProfileListLinkBox
        to={to}
        onClick={accordion ? handleToggle : undefined}
        {...restProps}
      >
        {children}
        <button type="button">
          <img src={`/images/arrow/${arrowIcon}`} alt={arrowAlt} />
        </button>
      </StyledProfileListLinkBox>
      {accordion && isOpen && (
        <StyledAccordionContent>{accordionContent}</StyledAccordionContent>
      )}
    </>
  );
};

export default ProfileListLink;
