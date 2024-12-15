/* eslint-disable react/prop-types */

import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie"
const AuthLogin = ({ title, subtitle, subtext }) => {
    const navigate = useNavigate()
    const [valueInput, setValueInput] = useState({
        Email: "",
        Password: ""
    })
    const handleGetValueInput = (e) => {
        const { value, name } = e.target;
        setValueInput(prev => ({ ...prev, [name]: value }))
    }

    const handleLogin = async () => {
        const api = "http://localhost:3001/User/Login";
        try {
            const result = await axios.post(api, valueInput)
            const data = await result.data;
console.log('data',data);

            if (data.inforUser.role === "Admin" || data.inforUser.role === "Staff") {
                // Đặt token xác thực vào cookie
                Cookies.set("authAdmin", JSON.stringify(data.inforUser), {
                    expires: 1,
                    secure: true,
                    sameSite: "lax",
                    path: '/',
                    domain: 'localhost'
                });
                setValueInput({ Email: "", Password: "" });
                navigate("/dashboard");
            } else {
                alert("Bạn không có quyền truy cập với tư cách là Admin.");
            }
        } catch (error) {
            console.log(error)
        }
    }




    return (<>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Stack>
            <Box>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username' mb="5px">Username</Typography>
                <CustomTextField id="username" name="Email" onChange={handleGetValueInput} variant="outlined" fullWidth />
            </Box>
            <Box mt="25px">
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                <CustomTextField id="password" type="password" name="Password" onChange={handleGetValueInput} variant="outlined" fullWidth />
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Remeber this Device"
                    />
                </FormGroup>
                <Typography
                    component={Link}
                    to="/"
                    fontWeight="500"
                    sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                    }}
                >
                    Forgot Password ?
                </Typography>
            </Stack>
        </Stack>
        <Box>
            <Button
                onClick={handleLogin}
                color="primary"
                variant="contained"
                size="large"
                fullWidth


                type="submit"
            >
                Sign In
            </Button>
        </Box>
        {subtitle}
    </>)

};

export default AuthLogin;
