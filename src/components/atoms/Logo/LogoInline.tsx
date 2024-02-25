import styled from 'styled-components';

interface InlineProps {
  $inlineSize: number;
  $blockSize: number;
}

const Inline = styled.img.attrs((props) => ({
  src: props.src,
}))<InlineProps>`
  inline-size: ${(props) => props.$inlineSize}px;
  block-size: ${(props) => props.$blockSize}px;
`;

interface LogoInlineProps {
  widthHeight: { blockSize: number; inlineSize: number };
}

const LogoInline = ({ widthHeight }: LogoInlineProps) => {
  const { blockSize = 50, inlineSize = 20 } = widthHeight;
  return (
    <Inline
      src={'/images/logo.svg'}
      alt="봐주개냥 가로버전 로고"
      $blockSize={blockSize}
      $inlineSize={inlineSize}
    />
  );
};
export default LogoInline;
