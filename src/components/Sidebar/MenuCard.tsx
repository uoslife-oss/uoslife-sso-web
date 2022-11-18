import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Emoji from '@/components/common/Emoji';
import Col from '@/components/utils/Col';
import Row from '@/components/utils/Row';
import { Menu } from '@/utils/configs/sidebar.config';

type Props = {
  menu: Menu;
};

const MenuCard: React.FC<Props> = ({ menu }) => (
  <Col gap={8}>
    <MenuTitle gap={4} align="center">
      <Emoji size={18}>{menu.emoji}</Emoji>
      {menu.title}
    </MenuTitle>
    <SubMenu gap={4}>
      {menu.children.map((child) => (
        <SubMenuLink key={child.title + child.link} to={child.link}>
          <Emoji size={14}>{child.emoji}</Emoji>
          {child.title}
        </SubMenuLink>
      ))}
    </SubMenu>
  </Col>
);

const MenuTitle = styled(Row)`
  ${({ theme }) => theme.typographies.Heading6};
`;

const SubMenu = styled(Col)`
  padding-left: 16px;
`;

const SubMenuLink = styled(Link)`
  ${({ theme }) => theme.typographies.Body3};
  text-decoration: none;
  display: flex;
  gap: 4px;
  transition: 0.2s ease-in-out;
  border-radius: 8px;
  padding: 6px 8px;
  font-weight: 500;
  &:hover {
    text-decoration: none;
    background: ${({ theme }) => theme.colors.Secondary7};
  }
`;

export default MenuCard;
