// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import {
    Box,
    List,
    ListItemIcon,
    ListItemText,
    Divider,
    ListItemButton,
    useMediaQuery,
    Drawer,
    IconButton,
    AppBar,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccessTimeFilled from "@mui/icons-material/AccessTimeFilled";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }) {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:900px)");
    const [mobileOpen, setMobileOpen] = useState(false);

    const menuItems = [
        { icon: <PersonIcon color="primary" />, text: "ข้อมูลส่วนตัว", path: "/profile" },
        { icon: <AccessTimeFilled color="primary" />, text: "ลงเวลา", path: "/hrm/attendance" },
        { icon: <EventNoteIcon color="primary" />, text: "ตารางงาน", path: "/schedule" },
        { icon: <AssignmentIndIcon color="primary" />, text: "ลางาน", path: "/leave" },
        { icon: <MonetizationOnIcon color="primary" />, text: "เงินเดือน", path: "/salary" },
        { icon: <WorkHistoryIcon color="primary" />, text: "การทำงาน", path: "/work-history" },
        { icon: <AnnouncementIcon color="primary" />, text: "ข่าวสาร/ประกาศ", path: "/news" },
        { icon: <ContactPhoneIcon color="primary" />, text: "ติดต่อฝ่ายบุคคล", path: "/contact-hr" },
    ];

    const drawerContent = (
        <Box sx={{ width: 250, display: "flex", flexDirection: "column", height: "100%" }}>
            <Typography variant="h6" align="center" sx={{ py: 2, fontWeight: 'bold' }}>
                HRM
            </Typography>
            <Divider />
            <Box sx={{ flexGrow: 1 }}>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItemButton
                            key={index}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
            <Divider />
            <List>
                <ListItemButton onClick={() => navigate("/")}>
                    <ListItemIcon>
                        <LogoutIcon color="error" />
                    </ListItemIcon>
                    <ListItemText primary="ออกจากระบบ" />
                </ListItemButton>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", overflowX: "hidden" }}>
            {isMobile && (
                <AppBar position="fixed" sx={{ backgroundColor: "#1976d2" }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={() => setMobileOpen(true)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }} noWrap>
                            HRM
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}

            {!isMobile && (
                <Box
                    sx={{
                        width: 250,
                        flexShrink: 0,
                        background: "#fff",
                        boxShadow: 2,
                        minHeight: "100vh"
                    }}
                >
                    {drawerContent}
                </Box>
            )}

            {isMobile && (
                <Drawer
                    anchor="left"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{ keepMounted: true }}
                >
                    {drawerContent}
                </Drawer>
            )}

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: isMobile ? 3 : 2,
                    mt: isMobile ? 8 : 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", // กลางแนวนอน
                    minHeight: "100vh",
                    boxSizing: "border-box"
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
