import styled from 'styled-components';
import Dropdown from '../../atoms/Dropdown/Dropdown';

export const Container = styled.div``;

export const Dropdownn = styled(Dropdown)`
  background-color: ${props =>
    props.isDropdownOpen ? props.theme.colors.backgrounds.cards : 'inherit'};
  top: 30px;
  right: 0;
  width: 180px;
`;