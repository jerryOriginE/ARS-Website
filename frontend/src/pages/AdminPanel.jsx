import { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab, Paper, Button, TextField, Chip } from "@mui/material";

import LeftBar from "../components/LeftBar";
import Navbar from "../components/Navbar";

import API_BASE_URL from "../config";

export default function AdminPanel() {
  const [tab, setTab] = useState(0);

  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [points, setPoints] = useState("");

  const [content, setContent] = useState("");
  const [label, setLabel] = useState("");

  const token = localStorage.getItem("token");

  // ---------------- LOAD ----------------
  useEffect(() => {
    loadUsers();
    loadNews();
  }, []);

  async function loadUsers() {
    const res = await fetch(`${API_BASE_URL}/auth/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setUsers(data);
  }

  async function loadNews() {
    const res = await fetch(`${API_BASE_URL}/news`);
    const data = await res.json();
    setNews(data);
  }

  // ---------------- POINTS (FIXED ADMIN ROUTE) ----------------
  async function updatePoints(amount) {
    if (!selectedUser || !points) return;

    await fetch(`${API_BASE_URL}/auth/admin/points`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: selectedUser,
        amount: Number(points) * amount
      })
    });

    setPoints("");
    loadUsers();
  }

  // ---------------- NEWS ----------------
  async function createNews() {
    await fetch(`${API_BASE_URL}/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content, label })
    });

    setContent("");
    setLabel("");
    loadNews();
  }

  return (
    <Box sx={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#F6FAF2"
    }}>
      {/* LEFT BAR */}
      <LeftBar />

      {/* MAIN */}
      <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
        <Navbar />

        <Typography sx={{ fontSize: 28, fontWeight: 800, color: "#2F3A1F", mb: 2 }}>
          Admin Panel
        </Typography>

        {/* TABS */}
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Usuarios" />
          <Tab label="Puntos" />
          <Tab label="Noticias" />
        </Tabs>

        {/* ================= USERS ================= */}
        {tab === 0 && (
          <Box sx={{ mt: 3 }}>
            {users.map((u) => (
              <Paper
                key={u.id}
                sx={{
                  p: 2,
                  mb: 2,
                  border: "1px solid #D8EDAB",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>
                    {u.username}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "#6B7280" }}>
                    {u.role} · {u.points} pts
                  </Typography>
                </Box>

                <Button
                  onClick={() => setSelectedUser(u.id)}
                  variant="outlined"
                >
                  Select
                </Button>
              </Paper>
            ))}
          </Box>
        )}

        {/* ================= POINTS ================= */}
        {tab === 1 && (
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ mb: 2 }}>
              Selected: {selectedUser || "none"}
            </Typography>

            <TextField
              fullWidth
              label="Points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={() => updatePoints(1)}
                variant="contained"
                sx={{ backgroundColor: "#6E9B2D" }}
              >
                Add
              </Button>

              <Button
                onClick={() => updatePoints(-1)}
                variant="outlined"
                sx={{ color: "#D14343", borderColor: "#D14343" }}
              >
                Remove
              </Button>
            </Box>
          </Box>
        )}

        {/* ================= NEWS ================= */}
        {tab === 2 && (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              onClick={createNews}
              variant="contained"
              sx={{ backgroundColor: "#6E9B2D" }}
            >
              Create News
            </Button>

            <Box sx={{ mt: 3 }}>
              {news.map((n) => (
                <Paper
                  key={n.id}
                  sx={{ p: 2, mb: 1, border: "1px solid #D8EDAB" }}
                >
                  <Typography sx={{ fontWeight: 700 }}>
                    {n.content}
                  </Typography>

                  <Chip
                    label={n.label}
                    size="small"
                    sx={{
                      mt: 1,
                      bgcolor: "#F6FAF2",
                      border: "1px solid #D8EDAB"
                    }}
                  />
                </Paper>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}