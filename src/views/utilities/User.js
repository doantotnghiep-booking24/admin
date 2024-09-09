import { useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const users = [
    {
        id: "1",
        name: "Sunil Joshi",
        gmail: "sunil.joshi@example.com",
        password: "password123",
    },
    {
        id: "2",
        name: "Andrew McDownland",
        gmail: "andrew.mcdownland@example.com",
        password: "pass234",
    },
    {
        id: "3",
        name: "Christopher Jamil",
        gmail: "christopher.jamil@example.com",
        password: "securePass!9",
    },
    {
        id: "4",
        name: "Nirav Joshi",
        gmail: "nirav.joshi@example.com",
        password: "myPassword!8",
    },
];

const UserManagement = () => {
    const [userList, setUserList] = useState(users);

    const handleEdit = (id) => {
        console.log("Sửa người dùng với id:", id);
        // Logic sửa người dùng ở đây
    };

    const handleDelete = (id) => {
        setUserList(userList.filter(user => user.id !== id));
        console.log("Đã xóa người dùng với id:", id);
    };

    return (
        <Box 
            sx={{ 
                p: 2, // Padding quanh hộp
                border: '1px solid #ddd', // Viền quanh hộp
                borderRadius: '8px', // Góc bo tròn
                boxShadow: 1, // Hiệu ứng đổ bóng
                overflowX: 'auto' // Xử lý tràn nếu cần
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                Quản lý Người dùng
            </Typography>
            <Table
                aria-label="simple table"
                sx={{
                    whiteSpace: "nowrap"
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Mã
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Gmail
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Mật khẩu
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="subtitle2" fontWeight={600}>
                                Hành động
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {user.id}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {user.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                    {user.gmail}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                    {user.password}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEdit(user.id)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(user.id)}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default UserManagement;
