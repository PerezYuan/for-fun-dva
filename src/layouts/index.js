import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const menu = [
  {
    name: '首页',
    icon: 'smile',
    url: '/',
    hasSub: false
  },
  {
    name: '基础资源管理',
    icon: 'folder',
    hasSub: true,
    key: 'baseInfo',
    subMenu: [
      {
        name: '发型师管理',
        icon: 'idcard',
        url: '/users',
      },
    ]
  },
  {
    name: '线上信息配置',
    icon: 'code-o',
    hasSub: true,
    key: 'onlineInfo',
    subMenu: [
      {
        name: '门店管理',
        icon: 'home',
        url: '/shops',
      },
      {
        name: '服务项目管理',
        icon: 'inbox',
        url: '/service',
      },
    ]
  }
]

const getSubOpen = (path) => {
  const subMenus = menu.filter(item => item.hasSub)
  const key = [];
  subMenus.forEach(item => {
    const find = item.subMenu.find(item => item.url === path)
    if (find) {
      key.push(item.key)
    }
  })
  return key
}

function MainLayout({ children, location }) {
  return (
    <Layout style={{ height: '100%' }}>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={getSubOpen(location.pathname)}
            style={{ height: '100%', borderRight: 0 }}
          >
            {menu.map(item => {
              if (item.hasSub) {
                return (
                  <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.name}</span>}>
                    {item.subMenu.map(subItem => <Menu.Item key={subItem.url}><Link to={subItem.url}>
                <Icon type={subItem.icon} />{subItem.name}
              </Link>{subItem.name}</Menu.Item>)}
                  </SubMenu>
                )
              }
              return <Menu.Item key={item.url}><Link to={item.url}>
                <Icon type={item.icon} />{item.name}
              </Link>{item.name}</Menu.Item>
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: 24 }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout;
