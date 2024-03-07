import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledShortcutMenuContainer = styled(Link)`
  min-inline-size: 110px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 15px 10px;
  ${(props) => props.theme.fontStyles.textRegularSm}
  color: ${(props) => props.theme.colors.textDarkGray};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray100};
    text-decoration: none;
  }

  & .menu-title {
    block-size: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: flex-start;
    & b {
      ${(props) => props.theme.fontStyles.textSemiboldMd}
      color: ${(props) => props.theme.colors.textBlack}
    }
    & span {
      word-break: keep-all;
    }
  }

  & .menu-image {
    max-inline-size: 40px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;

    & img {
      inline-size: 100%;
      aspect-ratio: 1/1;
      object-fit: cover;
    }
  }
`;

interface ShortcutMenuProps {
  path: string;
  title: string;
  description: string;
  photo: string;
}

const ShortcutMenu = ({
  path,
  title,
  description,
  photo,
}: ShortcutMenuProps) => {
  return (
    <StyledShortcutMenuContainer to={path}>
      <div className="menu-title">
        <span>
          <b>{title}</b>
        </span>
        <span>{description}</span>
      </div>
      <figure className="menu-image">
        <img src={photo} alt={title} />
      </figure>
    </StyledShortcutMenuContainer>
  );
};

export default ShortcutMenu;
