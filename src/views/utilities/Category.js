import  { useState } from 'react';
import {
    Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
    Paper, IconButton, Modal, TextField, Button, Snackbar, Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const initialCategories = [
    { id: "1", name: "Biển" },
    { id: "2", name: "Cắm trại" },
    { id: "3", name: "Nghỉ dưỡng" } 
];

const CategoryManagement = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [newCategory, setNewCategory] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            setCategories([...categories, { id: Date.now().toString(), name: newCategory }]);
            setNewCategory('');
            setOpenModal(false);
            setSnackbarMessage('Danh mục đã được thêm thành công!');
            setSnackbarOpen(true);
        }
    };

    const handleEditCategory = (id) => {
        const category = categories.find(cat => cat.id === id);
        setNewCategory(category.name);
        setIsEditing(true);
        setCurrentId(id);
        setOpenModal(true);
    };

    const handleUpdateCategory = () => {
        setCategories(categories.map(cat =>
            cat.id === currentId ? { ...cat, name: newCategory } : cat
        ));
        setNewCategory('');
        setIsEditing(false);
        setCurrentId(null);
        setOpenModal(false);
        setSnackbarMessage('Danh mục đã được cập nhật thành công!');
        setSnackbarOpen(true);
    };

    const handleDeleteCategory = (id) => {
        setCategories(categories.filter(cat => cat.id !== id));
        setSnackbarMessage('Danh mục đã được xóa thành công!');
        setSnackbarOpen(true);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Quản Lý Danh Mục Du Lịch
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                    setNewCategory('');
                    setIsEditing(false);
                    setOpenModal(true);
                }}
                sx={{ mb: 2 }}
            >
                Thêm Danh Mục
            </Button>
            <Paper sx={{ overflowX: 'auto', borderRadius: '8px', boxShadow: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    ID
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Tên Danh Mục
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Hành Động
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
                                        {category.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {category.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEditCategory(category.id)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteCategory(category.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
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
                    <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                        {isEditing ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Tên Danh Mục"
                        variant="outlined"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={isEditing ? handleUpdateCategory : handleAddCategory}
                            sx={{ mr: 1 }}
                        >
                            {isEditing ? 'Cập Nhật' : 'Thêm'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setOpenModal(false)}
                        >
                            Hủy
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                action={
                    <Button color="inherit" onClick={() => setSnackbarOpen(false)}>
                        Đóng
                    </Button>
                }
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CategoryManagement;
