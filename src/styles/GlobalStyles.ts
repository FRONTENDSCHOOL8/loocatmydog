import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

body {
  font-family:
    'Pretendard Variable',
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    sans-serif;
    overflow-x: hidden;
}

/* CSS 이미지 프리로드 */
body::after {
  position: absolute;
  inline-size: 0;
  block-size: 0;
  overflow: hidden;
  z-index: -1;  
  content: url('/images/navigation/home-active.svg') url('/images/navigation/reservationList-active.svg') url('/images/navigation/stories-active.svg') url('/images/navigation/chatList-active.svg') url('/images/navigation/profile-active.svg') url('/images/loading/loading_spinner_1.svg') url('/images/loading/loading_spinner_2.svg') url('/images/loading/loading_spinner_3.svg');
}

img {
  display: block;
}


/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul,
ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.2;
}

/* A elements that don't have a class get default styles */
a {
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

button {
  padding: 0;
  cursor: pointer;
  border: 0;
  background: transparent;
}

figure {
  margin: 0;
  padding: 0;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

`;

export default GlobalStyles;
