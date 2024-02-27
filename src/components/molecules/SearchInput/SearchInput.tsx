import styled from 'styled-components';

const StyledSearchInputContainer = styled.div`
  position: relative;
  inline-size: 100%;
  max-inline-size: 232px;
  min-inline-size: 154px;
  block-size: 27px;
  border: 1px solid ${(props) => props.theme.colors.lineColorGray};
  border-radius: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin: 0 auto;
  background:
    url('/images/search.svg') no-repeat 10px center,
    url('/images/plus.svg') no-repeat 95% center;
  background-color: ${(props) => props.theme.colors.white};

  & .address {
    color: ${(props) => props.theme.colors.textBlack};
    ${(props) => props.theme.fontStyles.textRegularSm};
    padding-inline-end: 7px;
    border-right: 1px solid ${(props) => props.theme.colors.textGray};
    position: absolute;
    left: 30px;
  }
`;
const StyledSearchInput = styled.input.attrs({ type: 'search' })`
  inline-size: 71px;
  border: none;
  outline: none;
  position: absolute;
  left: 70px;
  ${(props) => props.theme.fontStyles.textRegularSm};
  &::placeholder {
    ${(props) => props.theme.fontStyles.textRegularSm};
    color: ${(props) => props.theme.colors.textDarkGray};
  }
`;

const SearchInput = () => {
  return (
    <StyledSearchInputContainer>
      <span className="address">마포구</span>
      <StyledSearchInput placeholder="날짜 선택" />
    </StyledSearchInputContainer>
  );
};

export default SearchInput;
