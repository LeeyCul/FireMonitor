import { Menu, Dropdown, Button, Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './style.less';

const CheckboxGroup = Checkbox.Group;

interface Props {
  columns: any[];
  onChange: (checkedValues: any[]) => void;
  value: string[];
}

function DropdownCol({ columns, onChange, value }: Props) {
  const menus = (
    <Menu>
      <CheckboxGroup onChange={onChange} value={value}>
        {columns?.map((item) => (
          <div className={styles.dropdownSigle} key={item?.dataIndex}>
            <Checkbox value={item.dataIndex}>{item.title}</Checkbox>
          </div>
        ))}
      </CheckboxGroup>
    </Menu>
  );

  return (
    <Dropdown overlay={menus}>
      <Button>
        请选择
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default DropdownCol;
