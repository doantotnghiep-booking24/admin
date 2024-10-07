import  { useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialRoles = [
    { id: 1, name: 'Admin', description: 'Quản trị hệ thống' },
    { id: 2, name: 'Nhân viên', description: 'Quản lí vé' },
    { id: 3, name: 'User', description: 'Chỉ có quyền xem nội dung' },
];

const RoleManagement = () => {
    const [roles] = useState(initialRoles);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState(null);

    const handleClickOpenEdit = (role) => {
        setEditData(role);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            {/* Tiêu đề */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Vai Trò
            </Typography>

            {/* Bảng Vai Trò */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên Vai Trò
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Mô Tả
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>
                                Hành Động
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {roles.map((role) => (
                        <TableRow key={role.id}>
                            <TableCell>{role.id}</TableCell>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>{role.description}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleClickOpenEdit(role)}>
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

            {/* Form Chỉnh Sửa Vai Trò */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Chỉnh Sửa Vai Trò</DialogTitle>
                <DialogContent>
                    <Select
                        fullWidth
                        label="Tên Vai Trò"
                        value={editData ? editData.name : ''}
                        sx={{ mb: 2 }}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Editor">Nhân viên</MenuItem>
                        <MenuItem value="Viewer">User</MenuItem>
                    </Select>
                    <TextField
                        fullWidth
                        label="Mô Tả"
                        value={editData ? editData.description : ''}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        Đóng
                    </Button>
                    <Button onClick={handleCloseEdit} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default RoleManagement;
 