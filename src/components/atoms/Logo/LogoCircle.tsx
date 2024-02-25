import styled from 'styled-components';

const Circle = styled.img.attrs((props) => ({
  src: props.src,
}))`
  inline-size: 150px;
  block-size: 150px;
`;

const LogoCircle = () => {
  return (
    <Circle
      src={'/images/splashImg.svg'}
      alt="동그란 원 안에 있는 봐주개냥 로고"
    />
  );
};
export default LogoCircle;
