import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Alert,
    Link
} from "@mui/material";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            setSuccess("สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลเพื่อยืนยันตัวตน");
            setEmail("");
            setPassword("");
        }
    };

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
                <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    สมัครสมาชิก
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignItems: "center",
                    }}
                >
                    <TextField
                        label="อีเมลของคุณ"
                        type="email"
                        required
                        value={email}
                        InputLabelProps={{ required: false }}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ width: 320 }}
                        size="medium"
                    />
                    <TextField
                        label="สร้างรหัสผ่าน"
                        type="password"
                        required
                        value={password}
                        InputLabelProps={{ required: false }}                        
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ width: 320 }}
                        size="medium"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ width: 320, py: 1.5, fontSize: "1rem" }}
                        disabled={loading}
                    >
                        {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
                    </Button>
                    <Typography sx={{ mt: 1, fontSize: "0.95rem" }}>
                        มีบัญชีอยู่แล้ว?{" "}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate("/login")}
                            underline="hover"
                        >
                            เข้าสู่ระบบ
                        </Link>
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ width: 320 }}>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" sx={{ width: 320 }}>
                            {success}
                        </Alert>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}
