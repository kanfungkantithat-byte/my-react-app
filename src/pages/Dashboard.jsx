import React from "react";
import { Box, Typography, Paper, Button, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                backgroundColor: "#f5f5f5",
            }}
        >
            {/* Side Menu */}
            <Box
                sx={{
                    width: 250,
                    background: "#fff",
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "column",
                    py: 3,
                    minHeight: "100vh",
                }}
            >
                <Typography variant="h6" align="center" sx={{ mb: 3 }}>
                    HR Dashboard
                </Typography>
                <Divider />
                <List>
                    <ListItem button sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <PeopleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ข้อมูลพนักงาน" />
                    </ListItem>
                    <ListItem button sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <AssignmentIndIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="การลา" />
                    </ListItem>
                    <ListItem button sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <EventNoteIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ตารางงาน" />
                    </ListItem>
                    <ListItem button sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <MonetizationOnIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="เงินเดือน" />
                    </ListItem>
                    <ListItem button sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <AssignmentIndIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ประวัติการทำงาน" />
                    </ListItem>
                    <ListItem button sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <PeopleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ประเมินผล" />
                    </ListItem>
                    <ListItem button sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <EventNoteIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="อบรม/สัมมนา" />
                    </ListItem>
                    <ListItem button sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <AssignmentIndIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="สวัสดิการ" />
                    </ListItem>
                    <ListItem button sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <PeopleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ประกาศ/ข่าวสาร" />
                    </ListItem>
                    <ListItem button sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <EventNoteIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ตั้งค่าบัญชี" />
                    </ListItem>
                </List>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <List>
                    <ListItem button sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                        <ListItemIcon>
                            <LogoutIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="ออกจากระบบ" />
                    </ListItem>
                </List>
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, minWidth: 350 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        แดชบอร์ด
                    </Typography>
                    <Typography align="center" sx={{ mb: 3, color: "text.secondary" }}>
                        ยินดีต้อนรับเข้าสู่ระบบ!<br />
                        คุณเข้าสู่หน้าแดชบอร์ดสำเร็จแล้ว
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/")}
                        >
                            กลับหน้าแรก
                        </Button>
                    </Box>
                </Paper> */}
            </Box>
        </Box>
    );
}