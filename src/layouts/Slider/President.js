import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import {
    DashboardOutlined,
    LogoutOutlined,
    UserOutlined,
    ContactsOutlined,
    GroupOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {AntAvatar} from "../AntAvatar";

class President extends Component {
    renderMenuItems = (routes) => {
        const {
            dashboardRoute,
            contactListRoute,
            contactCreateRoute,
            contactGroupListRoute,
            contactGroupCreateRoute,
        } = routes
        return [
            getItem(<Link to={dashboardRoute}>Dashboard</Link>, dashboardRoute,
                <DashboardOutlined/>),
            getItem('Contact', 'contact', <ContactsOutlined />, [
                getItem(<Link to={contactListRoute}>List</Link>, contactListRoute),
                getItem(<Link to={contactCreateRoute}>Create</Link>, contactCreateRoute),
            ]),
            getItem('Contact Group', 'contact-group', <GroupOutlined />, [
                getItem(<Link to={contactGroupListRoute}>List</Link>, contactGroupListRoute),
                getItem(<Link to={contactGroupCreateRoute}>Create</Link>, contactGroupCreateRoute),
            ]),
        ];
    }

    renderUserMenuItems = (params) => {
        const {fullName, collapsed, randomAvatar, handleLogout} = params;
        return [
            {
                type: "divider", // Must have
            },
            {
                type: "group", // Must have
                key: "account",
                label: <div className={collapsed ? "sub-collapsed" : ""}><UserOutlined/> Account</div>,
                children: [
                    getItem(fullName, "account-user", <AntAvatar
                        alt={fullName}
                        icon={<UserOutlined/>}
                        size="small"
                        src={randomAvatar}
                    />),
                    getItem(<div onClick={handleLogout}>Logout</div>, "account-logout", <LogoutOutlined/>),
                ],
            },
        ];
    }

    render() {
        const {
            router,
            common,
            auth,
            match,
            randomAvatar,
            handleLogout
        } = this.props;

        const pathname = router.location.pathname;
        console.log(pathname)

        // Layout
        const collapsed = common.siderCollapsed;

        // Auth
        const {user} = auth;
        const full_name = user.full_name;

        let selectDefault;
        let openDefault;

        let dashboardRoute = '/';
        let contactListRoute = '/contact';
        let contactCreateRoute = '/contact/create';
        let contactGroupListRoute = '/contact-group';
        let contactGroupCreateRoute = '/contact-group/create';

        // Render open default && select default
        switch (true) {
            case pathname === "/":
                selectDefault = dashboardRoute
                break;
            case pathname.indexOf(contactListRoute) !== -1:
                openDefault = 'contact'
                selectDefault = contactListRoute
                break;
            case pathname.indexOf(contactCreateRoute) !== -1:
                openDefault = 'contact'
                selectDefault = contactCreateRoute
                break;
            case pathname.indexOf(contactGroupListRoute) !== -1:
                openDefault = 'contact-group'
                selectDefault = contactGroupListRoute
                break;
            case pathname.indexOf(contactGroupCreateRoute) !== -1:
                openDefault = 'contact-group'
                selectDefault = contactGroupCreateRoute
                break;
            default:
                break;
        }

        return (
            <Layout.Sider
                className="left-slider"
                width={208}
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[selectDefault]}
                    defaultOpenKeys={collapsed ? [] : [openDefault]}
                    selectable={true}
                    items={this.renderMenuItems({
                        "dashboardRoute": dashboardRoute,
                        "contactListRoute": contactListRoute,
                        "contactCreateRoute": contactCreateRoute,
                        "contactGroupListRoute": contactGroupListRoute,
                        "contactGroupCreateRoute": contactGroupCreateRoute,
                    })}
                />
                <Menu
                    className={"menu-account " + (collapsed ? "sub-collapsed" : "")}
                    mode="inline"
                    selectable={false}
                    defaultOpenKeys={collapsed ? [] : ['account']}
                    items={this.renderUserMenuItems({
                        fullName: full_name,
                        collapsed: collapsed,
                        randomAvatar: randomAvatar,
                        handleLogout: handleLogout,
                    })}
                />
            </Layout.Sider>
        )
    }
}

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export default President;