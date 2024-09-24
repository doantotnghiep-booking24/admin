import { useState } from 'react';
import {
    Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Modal, TextField, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const users = [
    { id: "1", name: "Sunil Joshi", gmail: "sunil.joshi@example.com", password: "password123" },
    { id: "2", name: "Andrew McDownland", gmail: "andrew.mcdownland@example.com", password: "pass234" },
    { id: "3", name: "Christopher Jamil", gmail: "christopher.jamil@example.com", password: "securePass!9" },
    { id: "4", name: "Nirav Joshi", gmail: "nirav.joshi@example.com", password: "myPassword!8" },
];

const UserManagement = () => {
    const [userList, setUserList] = useState(users);
    const [openModal, setOpenModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // Lưu thông tin người dùng hiện tại

    const handleEdit = (user) => {
        setCurrentUser(user); // Lưu thông tin người dùng khi nhấn sửa
        setOpenModal(true); // Hiển thị modal
    };

    const handleDelete = (id) => {
        setUserList(userList.filter(user => user.id !== id));
        console.log("Đã xóa người dùng với id:", id);
    };

    const handleSave = () => {
        setUserList(userList.map(user => 
            user.id === currentUser.id ? currentUser : user
        ));
        setOpenModal(false); // Đóng modal sau khi lưu
    };

    const handleChange = (e) => {
        setCurrentUser({
            ...currentUser,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Box 
            sx={{ 
                p: 2, 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                boxShadow: 1, 
                overflowX: 'auto' 
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                Quản lý Người dùng
            </Typography>
            <Table aria-label="simple table" sx={{ whiteSpace: "nowrap" }}>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Mã</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Tên</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Gmail</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Mật khẩu</Typography></TableCell>
                        <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Hành động</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{user.id}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>{user.name}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>{user.gmail}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>{user.password}</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEdit(user)}>
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

            {/* Modal chỉnh sửa người dùng */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" gutterBottom>Chỉnh sửa thông tin người dùng</Typography>
                    {currentUser && (
                        <Box component="form">
                            <TextField
                                fullWidth
                                label="Tên"
                                name="name"
                                value={currentUser.name}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Gmail"
                                name="gmail"
                                value={currentUser.gmail}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Mật khẩu"
                                name="password"
                                type="password"
                                value={currentUser.password}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 1 }}>
                                    Lưu
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => setOpenModal(false)}>
                                    Hủy
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default UserManagement;
