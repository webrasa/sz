import type { NextPage } from 'next'
import { useState } from "react";
import {ProSidebarProvider, Menu, MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/';
import {Box, IconButton, Typography, useTheme} from '@mui/material';
import { tokens } from "../../../styles/theme";

import {MenuOpenOutlined, Home} from '@mui/icons-material';
import MenuIcon from "@mui/icons-material/Menu";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Link from 'next/link';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type ItemType = {
    title: string,
    to: string,
    icon: any,
    selected: string,
    setSelected: Function
}

const Item = ({ title, to, icon, selected, setSelected }: ItemType) => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        {/* <Typography>{title}</Typography> */}
        <Link href={to}><Typography>{title}</Typography></Link>
      </MenuItem>
    );
  };

type Props = {
    name: string,
    email: string,
    role: string
  }

const Sidebar: NextPage<Props> = (props) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');

    return (
        <Box
            sx={{
                '& .ps-menu-root': {
                    backgroundColor: `${colors.primary[400]} !important`
                },
                '& .pro-icon-wrapper': {
                    backgroundColor: 'transparent !important'
                },
                '& .ps-menuitem-root': {
                    padding: '5px 35px 5px 20px !important'
                },
                '& .ps-menu-button:hover': {
                    color: '#832f2c !important'
                },
                '& .ps-menuitem-root ps-active': {
                    color: '#832f2c !important',
                    // backgroundColor: 'red'
                }
            }}
        >
            <ProSidebarProvider defaultCollapsed={isCollapsed}>
                <Menu iconShape='square'>
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuIcon /> : undefined}
                        style={{
                        margin: "10px 0 20px 0",
                        color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px"
                        >
                            <Typography variant="h3" color={colors.grey[100]}>
                            ADMINIS
                            </Typography>
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                            <MenuOpenOutlined />
                            </IconButton>
                        </Box>
                        )}
                    </MenuItem>
                    {/* User */}
                    {!isCollapsed && (
                        <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                alt="profile-user"
                                width="100px"
                                height="100px"
                                src={`/static/images/avatars/user.png`}
                                style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        </Box>
                            <Box textAlign="center">
                                <Typography
                                variant="h2"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ m: "10px 0 0 0" }}
                                >
                                {props.name}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                {props.role}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    {/* Menu items */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/index"
                            icon={<Home />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                            Data
                            </Typography>
                        <Item
                            title="Manage Team"
                            to="/invoices"
                            icon={<PeopleOutlineIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebarProvider>
        </Box>
    )
}

export default Sidebar;