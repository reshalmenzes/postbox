import React, { Dispatch, useState } from 'react';
import { Layout, Menu } from 'antd';
import { menuList } from './config';
import { connect } from 'react-redux';
import { openModal } from '../../store/modal/actions';
import { ActionTypes } from '../../store/modal/types';

const { Sider } = Layout;

function Sidebar({ openModal }: any) {
  const [collapsed, onCollapse] = useState(false);

  // ✅ Build items array for Ant Design v5 Menu
  const items = menuList.map(({ subMenu, title, action }: any, index: number) => {
    if (subMenu) {
      return {
        key: `${index}`,
        label: title,
        children: subMenu.map((data: any, subIndex: number) => ({
          key: `${index}${subIndex}`,
          label: data.title,
          onClick: data.action ? () => openModal(data.action) : undefined,
        })),
      };
    }
    return {
      key: `${index}`,
      label: title,
      onClick: action ? () => openModal(action) : undefined,
    };
  });

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(c) => onCollapse(c)}
      theme="light"
      breakpoint="lg"
    >
      <Menu theme="light" mode="inline" items={items} /> {/* ✅ v5 API */}
    </Sider>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => {
  return {
    openModal: (modalProps: any) => dispatch(openModal(modalProps)),
  };
};

export default connect(null, mapDispatchToProps)(Sidebar);