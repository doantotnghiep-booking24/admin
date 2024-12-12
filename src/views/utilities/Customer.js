import { useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { handleGetUsers } from '../../service';
import axios from 'axios'
const CustomerManagement = () => {
    const [custommers,setCustommer] = useState([]);
    const [users,setUsers] = useState([]);
    useEffect(() => {
        const abc = async () => {
            const res = await axios.get('http://localhost:3001/Custommer/GetCustommers')
        setCustommer(res.data.Custommer)
        }
        abc()
    }, [])
    useEffect(() => {
        const handleCallUser = async () => {
            const res = await handleGetUsers()
            setUsers(res.Users)
        }
        handleCallUser()
    }, [])
    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            {/* Tiêu đề căn giữa */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Khách Hàng
            </Typography>

            <Table aria-label="bảng khách hàng">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Được tạo bởi
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên Khách Hàng
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Ngày Sinh
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Giới Tính
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Số Điện Thoại
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                CMND/CCCD
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Địa Chỉ
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>
                                Hành động
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {custommers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell>
                                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                    {customer.id}
                                </Typography>
                            </TableCell>
                            {users.filter(user => user._id === customer.Create_by).map(user => (
                                <TableCell>{user.Name}</TableCell>
                            ))}
                            <TableCell>{customer.Name_Customer}</TableCell>
                            <TableCell>{customer.Date_Of_Birth}</TableCell>
                            <TableCell>{customer.Sex_Customer}</TableCell>
                            <TableCell>{customer.Phone_Number}</TableCell>
                            <TableCell>{customer.Citizen_Identification}</TableCell>
                            <TableCell>{customer.Address}</TableCell>
                            <TableCell align="right">
                                <IconButton>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default CustomerManagement;
