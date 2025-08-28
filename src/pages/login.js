import {
  HomeFilled,
  LoginOutlined,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
      username: username || "",
      password: password || "",
    });

    // Send tokens to SW
    if (navigator.serviceWorker.controller) {
      const channel = new MessageChannel();
      const ackPromise = new Promise((resolve) => {
        channel.port1.onmessage = (event) => {
          if (event.data?.type === "SET_TOKENS_ACK") {
            resolve();
          }
        };
      });

      navigator.serviceWorker.controller.postMessage(
        {
          type: "SET_TOKENS",
          token: {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          },
        },
        [channel.port2]
      );

      console.log("Waiting for SW to ack...", ackPromise);

      await ackPromise;
    }

    if (res.status === 200) {
      navigate("/rent");
    }
  };

  return (
    <>
      <Box className="login-container">
        <Box className="login-form">
          <Avatar variant="rounded" sx={{ bgcolor: "#1976d2", padding: 1 }}>
            <HomeFilled />
          </Avatar>
          <Typography
            fontWeight={700}
            fontSize={22}
            gutterBottom
            color="#012169"
          >
            Tenant Management
          </Typography>
          <Box>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-username">
                Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="Username" edge="end">
                      <Person />
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
          <Button
            variant="contained"
            endIcon={<LoginOutlined />}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
}
