import {SettingOutlined} from '@ant-design/icons';
import {MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import React from 'react';

const items: MenuProps['items'] = [
  
  {
    key: '1',
    label: (
      <a target="_self"  href="./student/">
        查看
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        编辑
      </a>
    ),
    
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        删除
      </a>
    ),
 
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];

const MyDropdown: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={e => e.preventDefault()}>
      <Space>
        <SettingOutlined/>
      </Space>
    </a>
  </Dropdown>
);

export default MyDropdown;