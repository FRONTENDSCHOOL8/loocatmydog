import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPageBox = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 20% auto;

  & h1 {
    font-size: 20px;
    color: ${(props) => props.theme.colors.orange};
  }
`;

const NotFoundPageLink = styled(Link)`
  display: block;
  padding-block: 30px;
  ${(props) => props.theme.fontStyles.headingMd}
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageBox>
      <h1>404 - 페이지를 찾을 수 없습니다!</h1>
      <NotFoundPageLink to="/main">
        ➡️ ➡️ 메인 페이지로 돌아가기 ⬅️ ⬅️
      </NotFoundPageLink>
      <img src="/images/catdogs.jpg" alt="고양이와 강아지 그림" />
    </NotFoundPageBox>
  );
};

export default NotFoundPage;
