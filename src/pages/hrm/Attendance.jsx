import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Snackbar, Alert } from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import AccessTime from "@mui/icons-material/AccessTime";
import { supabase } from "../../supabaseClient";

export default function Attendance() {
    const [time, setTime] = useState(new Date());
    const [user, setUser] = useState(null);
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [hasCheckedOut, setHasCheckedOut] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });
    const [loading, setLoading] = useState(false);

    // อัปเดตเวลาเรียลไทม์
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // โหลดข้อมูล user
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    // เช็กสถานะวันนี้
    useEffect(() => {
        if (user) checkTodayStatus();
    }, [user]);

    const checkTodayStatus = async () => {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const { data: todayRecords, error } = await supabase
            .from("attendance")
            .select("*")
            .eq("user_id", user.id)
            .gte("created_at", startOfDay.toISOString())
            .lte("created_at", endOfDay.toISOString())
            .order("created_at", { ascending: true });

        if (!error && todayRecords.length > 0) {
            const checkedIn = todayRecords.some(r => r.type === "checkin");
            const checkedOut = todayRecords.some(r => r.type === "checkout");
            setHasCheckedIn(checkedIn);
            setHasCheckedOut(checkedOut);
        } else {
            setHasCheckedIn(false);
            setHasCheckedOut(false);
        }
    };

    const handleCheckIn = async () => {
        if (!user) {
            setSnackbar({
                open: true,
                message: "ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่",
                severity: "error"
            });
            return;
        }
        setLoading(true);
        const { error } = await supabase
            .from("attendance")
            .insert([{ user_id: user.id, type: "checkin" }]);
        setLoading(false);

        if (error) {
            setSnackbar({
                open: true,
                message: "บันทึกเวลาเข้างานไม่สำเร็จ กรุณาลองอีกครั้ง",
                severity: "error"
            });
        } else {
            setSnackbar({
                open: true,
                message: "เข้างานสำเร็จ",
                severity: "success"
            });
            setHasCheckedIn(true);
            setHasCheckedOut(false);
        }
    };

    const handleCheckOut = async () => {
        if (!user) {
            setSnackbar({
                open: true,
                message: "ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่",
                severity: "error"
            });
            return;
        }
        setLoading(true);
        const { error } = await supabase
            .from("attendance")
            .insert([{ user_id: user.id, type: "checkout" }]);
        setLoading(false);

        if (error) {
            setSnackbar({
                open: true,
                message: "บันทึกเวลาออกงานไม่สำเร็จ กรุณาลองอีกครั้ง",
                severity: "error"
            });
        } else {
            setSnackbar({
                open: true,
                message: "ออกงานสำเร็จ",
                severity: "success"
            });
            setHasCheckedOut(true);
        }
    };

    return (
        <DashboardLayout>
            <Box
                sx={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 500,
                    p: 2
                }}
            >
                <AccessTime color="primary" sx={{ fontSize: "4rem", mb: 1 }} />
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    ลงเวลาเข้า / ออกงาน
                </Typography>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    {time.toLocaleDateString("th-TH", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}
                </Typography>
                <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{ mb: 3 }}
                >
                    {time.toLocaleTimeString("th-TH", { hour12: false })}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCheckIn}
                        sx={{ width: "35%" }}
                        disabled={loading || hasCheckedIn}
                    >
                        เข้างาน
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCheckOut}
                        sx={{ width: "35%" }}
                        disabled={loading || !hasCheckedIn || hasCheckedOut}
                    >
                        ออกงาน
                    </Button>
                </Box>
            </Box>

            {/* Snackbar แจ้งเตือนด้านบน */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ mt: 8 }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
