import React from "react";
import {
    Box,
    Button,
    Typography,
    Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Index() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, minWidth: 300 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    ยินดีต้อนรับ
                </Typography>
                <Typography align="center" sx={{ mb: 3, color: "text.secondary" }}>
                    กรุณาเลือก "สมัครสมาชิก" หากยังไม่มีบัญชี หรือ "เข้าสู่ระบบ" หากมีบัญชีอยู่แล้ว
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row", // เปลี่ยนจาก column เป็น row
                        gap: 2,
                        alignItems: "center",
                        mt: 2,
                        justifyContent: "center", // จัดให้อยู่ตรงกลาง
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ width: 150, py: 1.5, fontSize: "1rem" }}
                        onClick={() => navigate("/register")}
                    >
                        สมัครสมาชิก
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        sx={{ width: 150, py: 1.5, fontSize: "1rem" }}
                        onClick={() => navigate("/login")}
                    >
                        เข้าสู่ระบบ
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
