import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Skeleton
} from "@mui/material";

import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";

import { getProfile } from "../../api/authHelper";
import {
  levelProgress,
  pointsToNextLevel,
  calculateLevel
} from "../../api/levelSystem";

export default function PointsCard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, border: "1px solid #D8EDAB", borderRadius: 1 }}>
        <Skeleton width={180} />
        <Skeleton height={80} sx={{ mt: 2 }} />
        <Skeleton height={10} sx={{ mt: 2 }} />
      </Box>
    );
  }

  const points = profile?.points || 0;

  const level =
    profile?.level || calculateLevel(points);

  const progress = levelProgress(points);
  const remaining = pointsToNextLevel(points);

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        border: "1px solid #D8EDAB",
        borderRadius: 1,
        p: 3,
        flex: 1
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: 700, color: "#2F3A1F" }}>
          Puntos Obtenidos
        </Typography>

        <EnergySavingsLeafIcon sx={{ color: "#6E9B2D", fontSize: 30 }} />
      </Box>

      {/* POINTS */}
      <Typography
        sx={{
          fontSize: "3rem",
          fontWeight: 700,
          color: "#2F3A1F",
          mt: 2
        }}
      >
        {points}
      </Typography>

      {/* LEVEL */}
      <Typography sx={{ color: "#6B7280", mt: -1 }}>
        Nivel actual:{" "}
        <strong style={{ color: "#2F3A1F" }}>{level}</strong>
      </Typography>

      {/* PROGRESS */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, mb: 1 }}>
        <Typography sx={{ color: "#889172", fontSize: "0.8rem" }}>
          Progreso al siguiente nivel
        </Typography>

        <Typography sx={{ fontWeight: 700, color: "#6E9B2D", fontSize: "0.8rem" }}>
          {progress}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          borderRadius: 10,
          backgroundColor: "#EEF5E2",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#6E9B2D",
            borderRadius: 10
          }
        }}
      />

      {/* FOOTER */}
      <Typography sx={{ mt: 2, color: "#6B7280", fontSize: "0.9rem" }}>
        Te faltan <strong>{remaining} puntos</strong> para subir de nivel.
      </Typography>
    </Box>
  );
}