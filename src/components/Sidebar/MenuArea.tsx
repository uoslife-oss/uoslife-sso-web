import * as React from 'react';

import MenuCard from '@/components/Sidebar/MenuCard';
import Col from '@/components/utils/Col';
import { sidebarConfig } from '@/utils/configs/sidebar.config';

const MenuArea: React.FC = () => (
  <Col gap={24}>
    {sidebarConfig.map((menu) => (
      <MenuCard menu={menu} key={menu.title} />
    ))}
  </Col>
);

export default MenuArea;
