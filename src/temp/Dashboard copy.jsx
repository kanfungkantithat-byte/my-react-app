import React, { useState } from "react";
import {
    Box, Typography, List, ListItemIcon, ListItemText, Divider, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ListItemButton, useMediaQuery
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState(null);
    const [teamUsers, setTeamUsers] = useState([]);
    const isMobile = useMediaQuery("(max-width:900px)"); // ตรวจว่าหน้าจอเล็กหรือไม่

    const fetchTeamUsers = async () => {
        const { data, error } = await supabase.from("team_user").select("*");
        if (error) {
            console.error("Error fetching team_user:", error);
        } else {
            setTeamUsers(data);
        }
    };

    const handleMenuClick = (selected) => {
        setMenu(selected);
        if (selected === "employees") {
            fetchTeamUsers();
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: isMobile ? "column" : "row", backgroundColor: "#f5f5f5" }}>
            {/* Side Menu */}
            <Box
                sx={{
                    width: isMobile ? "100%" : 250,
                    background: "#fff",
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "column",
                    py: 3,
                    minHeight: isMobile ? "auto" : "100vh",
                }}
            >
                <Typography variant="h6" align="center" sx={{ mb: 3 }}>
                    HR Dashboard
                </Typography>
                <Divider />
                <List sx={{ display: "flex", flexDirection: isMobile ? "row" : "column", flexWrap: "wrap" }}>
                    <ListItemButton sx={{ cursor: "pointer" }} onClick={() => handleMenuClick("employees")}>
                        <ListItemIcon>
                            <PeopleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ข้อมูลพนักงาน" />
                    </ListItemButton>
                    <ListItemButton sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <AssignmentIndIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="การลา" />
                    </ListItemButton>
                    <ListItemButton sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <EventNoteIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ตารางงาน" />
                    </ListItemButton>
                    <ListItemButton sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <MonetizationOnIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="เงินเดือน" />
                    </ListItemButton>
                    <ListItemButton sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <AssignmentIndIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ประวัติการทำงาน" />
                    </ListItemButton>
                    <ListItemButton sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <PeopleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ประเมินผล" />
                    </ListItemButton>
                    <ListItemButton sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <EventNoteIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="อบรม/สัมมนา" />
                    </ListItemButton>
                    <ListItemButton sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <AssignmentIndIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="สวัสดิการ" />
                    </ListItemButton>
                    <ListItemButton sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <PeopleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ประกาศ/ข่าวสาร" />
                    </ListItemButton>
                    <ListItemButton sx={{ cursor: "pointer" }}>
                        <ListItemIcon>
                            <EventNoteIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ตั้งค่าบัญชี" />
                    </ListItemButton>
                </List>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <List>
                    <ListItemButton sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                        <ListItemIcon>
                            <LogoutIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="ออกจากระบบ" />
                    </ListItemButton>
                </List>
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, p: 2, overflowX: "auto" }}>
                {menu === "employees" && (
                    <TableContainer component={Paper} sx={{ minWidth: 800 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>คำนำหน้า</TableCell>
                                    <TableCell>ชื่อ</TableCell>
                                    <TableCell>นามสกุล</TableCell>
                                    <TableCell>อีเมล</TableCell>
                                    <TableCell>ตำแหน่ง</TableCell>
                                    <TableCell>รหัสบริษัท</TableCell>
                                    <TableCell>รายงานต่อ</TableCell>
                                    <TableCell>ประเภทสัญญาจ้าง</TableCell>
                                    <TableCell>รหัสพนักงาน</TableCell>
                                    <TableCell>วันที่เริ่มงาน</TableCell>
                                    <TableCell>บทบาท</TableCell>
                                    <TableCell>สถานะการทำงาน</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teamUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.prefix}</TableCell>
                                        <TableCell>{user.first_name}</TableCell>
                                        <TableCell>{user.last_name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.position}</TableCell>
                                        <TableCell>{user.company_id}</TableCell>
                                        <TableCell>{user.report_to}</TableCell>
                                        <TableCell>{user.contract_type}</TableCell>
                                        <TableCell>{user.employee_id}</TableCell>
                                        <TableCell>{user.work_start_date}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.work_status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Box>
    );
}
