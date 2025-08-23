import {
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
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
      username: "balaji",
      password: "balaji@1993",
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

      await ackPromise;
    }

    if (res.status === 200) {
      navigate("/rent");
    }
  };

  return (
    <>
      <Box className="login-container">
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Login
        </Typography>
        <Box className="login-form">
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username">
              Username
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              type="text"
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
    </>
  );
}
