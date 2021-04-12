import React, { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import tool from '../../common/tool';

import { Menu } from 'antd';
const { SubMenu } = Menu;

export default function MenuPage({props: props}) {
    
    useEffect(() => {

    }, [])


    return (
        <>
            <PerfectScrollbar>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['market']}
                    mode="inline"
                    theme="dark"
                >
                    <SubMenu key="market" title="市场">
                        {
                            props.commonProvinceReducer.map((data, index) =>
                                <Menu.Item className={`${tool.filterUrl('province', props.location.search) === data.code ? 'select-li' : ''}`} key={ data.code }>                                    
                                    <NavLink 
                                                                              
                                        to={`/home/market?province=${data.code}`}>
                                        { data.name }
                                    </NavLink>
                                </Menu.Item>
                            )
                        }
                    </SubMenu>
                </Menu>
            </PerfectScrollbar>
        </>
    );
}
