import { useState } from 'react';
import {
    Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Modal, TextField, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialCategories = [
    { id: "1", name: "Danh mục 1" },
    { id: "2", name: "Danh mục 2" },
    { id: "3", name: "Danh mục 3" },
];

const CategoryManagement = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [openModal, setOpenModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    // Mở modal và khởi tạo giá trị cho form
    const handleEdit = (category) => {
        setCurrentCategory(category);
        setOpenModal(true);
    };

    // Xóa danh mục
    const handleDelete = (id) => {
        setCategories(categories.filter(category => category.id !== id));
    };

    // Lưu danh mục (chỉnh sửa hoặc thêm mới)
    const handleSave = () => {
        if (currentCategory.id) {
            // Cập nhật danh mục
            setCategories(categories.map(category =>
                category.id === currentCategory.id ? currentCategory : category
            ));
        } else {
            // Thêm danh mục mới
            setCategories([...categories, { ...currentCategory, id: (categories.length + 1).toString() }]);
        }
        setOpenModal(false);
        setCurrentCategory(null);
    };

    const handleChange = (e) => {
        setCurrentCategory({
            ...currentCategory,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 1, overflowX: 'auto' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Quản lý Danh Mục
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => {
                    setCurrentCategory({ id: '', name: '' });
                    setOpenModal(true);
                }}
            >
                Thêm Danh Mục
            </Button>
            <Table aria-label="simple table" sx={{ whiteSpace: "nowrap" }}>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>ID</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Tên Danh Mục</Typography></TableCell>
                        <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{category.id}</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>{category.name}</Typography></TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEdit(category)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(category.id)}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Modal thêm hoặc chỉnh sửa danh mục */}
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
                    <Typography variant="h6" gutterBottom>{currentCategory?.id ? 'Chỉnh sửa Danh Mục' : 'Thêm Danh Mục'}</Typography>
                    {currentCategory && (
                        <Box component="form">
                            <TextField
                                fullWidth
                                label="Tên Danh Mục"
                                name="name"
                                value={currentCategory.name}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 1 }}>
                                    {currentCategory?.id ? 'Lưu' : 'Thêm'}
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

export default CategoryManagement;
