import { useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Button, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Dữ liệu cứng ban đầu
const initialCategories = [
    { id: 1, name: "Du lịch biển" },
    { id: 2, name: "Du lịch sinh thái" },
    { id: 3, name: "Du lịch văn hóa" },
];

const CategoryManagement = () => {
    const [categories] = useState(initialCategories);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({ id: '', name: '' });
    const [newCategory, setNewCategory] = useState({ name: '' });

    // Mở form chỉnh sửa
    const handleEdit = (category) => {
        setSelectedCategory(category);
        setOpenEdit(true);
    };

    // Đóng form chỉnh sửa
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    // Mở form thêm danh mục
    const handleOpenAdd = () => {
        setNewCategory({ name: '' });
        setOpenAdd(true);
    };

    // Đóng form thêm danh mục
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            {/* Tiêu đề được căn giữa */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Danh Mục
            </Typography>

            {/* Form thêm danh mục nằm bên trái */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAdd}
                >
                    Thêm danh mục
                </Button>
            </Box>

            {/* Bảng Danh Mục */}
            <Table aria-label="bảng danh mục">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Danh mục
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
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEdit(category)}>
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

            {/* Form chỉnh sửa danh mục */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tên danh mục"
                        fullWidth
                        variant="outlined"
                        value={selectedCategory.name}
                        onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="secondary">Đóng</Button>
                    <Button onClick={handleCloseEdit} color="primary">Lưu</Button>
                </DialogActions>
            </Dialog>

            {/* Form thêm danh mục */}
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Thêm danh mục mới</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tên danh mục"
                        fullWidth
                        variant="outlined"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd} color="secondary">Đóng</Button>
                    <Button onClick={handleCloseAdd} color="primary">Lưu</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default CategoryManagement;
