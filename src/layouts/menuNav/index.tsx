import { Link, history } from 'umi';
import { Menu } from 'antd';
import Icon from '@/common/components/Iconfont';
import menuConfig from './menuConfig';

const { SubMenu } = Menu;

const createMenu = (list: any) =>
  list.map((item: any) => {
    const { name, children, key, icon, path } = item;
    if (children) {
      return (
        <SubMenu
          key={key}
          icon={<Icon type={icon} />}
          title={
            <span>
              <span>{name}</span>
            </span>
          }
        >
          {createMenu(children as any)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={key} icon={<Icon type={icon} />}>
        <Link to={path}>
          <span>{name}</span>
        </Link>
      </Menu.Item>
    );
  });

function MenuNav() {
  const { pathname } = history.location;
  const defaulS = [];
  defaulS.push(pathname.substr(1));
  let menuList = sessionStorage.getItem('menu');
  // eslint-disable-next-line no-unused-vars
  menuList = menuList ? JSON.parse(menuList) : menuConfig;
  return (
    <div>
      <Menu defaultOpenKeys={['/']} defaultSelectedKeys={defaulS} mode="inline">
        {createMenu(menuList)}
      </Menu>
    </div>
  );
}

export default MenuNav;
