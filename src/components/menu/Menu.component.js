import React, { useState, useEffect } from 'react';

import { Menu } from 'antd';
const { SubMenu } = Menu;

import { administrationService } from '../../service';

export default function MenuComponent() {
    const [province, setProvince] = useState([]);

    useEffect(() => {
        administrationService.province().then(ret => {
            // console.log(ret.data.data);
            setProvince(ret.data.data);
        });
    }, []);

    return (
        <>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
            >
                <SubMenu key="sub1" title="市场">
                    {
                        province.map((data, index) =>
                            <Menu.Item key={ data.code }>{ data.name }</Menu.Item>
                        )
                    }
                </SubMenu>
            </Menu>
        </>
    );
}