import useDateRangeStore from '@/store/useDateRange';
import { format } from 'date-fns';
import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  background: url('/images/home.svg') no-repeat 10px center;
  background-color: ${(props) => props.theme.colors.white};

  & .address {
    color: ${(props) => props.theme.colors.textBlack};
    ${(props) => props.theme.fontStyles.textRegularSm};
    padding-inline-end: 7px;
    border-right: 1px solid ${(props) => props.theme.colors.textGray};
    position: absolute;
    left: 30px;
  }

  & .search-button {
    position: absolute;
    top: 50%;
    right: 0px;
    translate: 0% -50%;
    background: url('/images/search.svg') no-repeat center;
    inline-size: 30px;
    block-size: 30px;
    border-radius: 50%;
    transition: background-color 0.2s;
    &:hover {
      background-color: ${(props) => props.theme.colors.gray300};
    }
  }
`;
const StyledSearchInput = styled.span`
  inline-size: 50%;
  border: none;
  outline: none;
  position: absolute;
  left: 70px;
  ${(props) => props.theme.fontStyles.textSemiboldSm};
  &::placeholder {
    ${(props) => props.theme.fontStyles.textRegularSm};
    color: ${(props) => props.theme.colors.textDarkGray};
  }
`;

interface SearchInputProps {
  address: string;
  onClick?: any;
  value?: string;
}

const SearchInput = forwardRef<any, SearchInputProps>(
  ({ address, onClick, value = '' }, ref) => {
    const {
      dateRange: [startDate, endDate],
    } = useDateRangeStore();
    const navigate = useNavigate();
    const date = value?.replace(' - ', ' ~ ');
    const dateText = date === '' ? '날짜선택' : date;
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (startDate === null || endDate === null)
        return alert('정확한 날짜를 선택해주세요.');
      navigate(
        `/place_list?startDate=${format(startDate, 'yyMMdd')}&endDate=${format(endDate, 'yyMMdd')}`,
        { state: [startDate, endDate] }
      );
    };
    return (
      <StyledSearchInputContainer onClick={onClick} ref={ref}>
        <span className="address">{address}</span>
        <StyledSearchInput>{dateText}</StyledSearchInput>
        <button
          className="search-button"
          type="button"
          aria-label="날짜 검색"
          onClick={handleClick}
        ></button>
      </StyledSearchInputContainer>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
