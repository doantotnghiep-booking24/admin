import { useEffect, useState } from 'react';
import validator from 'validator';
import { handleGetCategories, handleCreateCategories, handleDeleteCategories, handleUpdateCategories } from '../../service/index.js';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Button, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

const CategoryManagement = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({ id: '', name: '' });
    const [getcategories, setGetcategories] = useState([]);
    const [valueinput, setValueinput] = useState('');
    const [idDelete, setIdDelete] = useState();
    const [idUpdate, setIdUpdate] = useState();
    const [type_ButtonAdd, setType_ButtonAdd] = useState();
    const [type_ButtonEdit, setType_ButtonEdit] = useState();

    // Hàm kiểm tra input hợp lệ sử dụng validator
    const isValidCategory = (input) => {
        return validator.isLength(input.trim(), { min: 3 });
    };

    const getValueEdit = (data) => {
        setValueinput(data);
    };

    const getValueAdd = (data) => {
        setValueinput(data);
    };

    const btn_edit = (type) => {
        if (!isValidCategory(valueinput)) {
            notification("error", "Tên danh mục không được để trống phải có ít nhất 3 kí tự");
            return;
        }
        setType_ButtonEdit(type);
    };

    const btn_add = (type) => {
        if (!isValidCategory(valueinput)) {
            notification("error", "Tên danh mục không được để trống phải có ít nhất 3 kí tự");
            return;
        }
        setType_ButtonAdd(type);
    };

    useEffect(() => {
        if (valueinput && type_ButtonEdit) {
            const Update_cate = async () => {
                const res = await handleUpdateCategories(idUpdate, valueinput);
                res.status === 200 ? window.location.reload() : console.error('Error When handle function Update');
                handleCloseAdd();
                notification("success", "Update categories successfully");
            };
            Update_cate();
        }
    }, [type_ButtonEdit]);

    useEffect(() => {
        if (valueinput && type_ButtonAdd) {
            const Create_cate = async () => {
                const res = await handleCreateCategories(valueinput);
                res.status === 200 ? window.location.reload() : console.error('Error When handle function Create');
                handleCloseAdd();
                notification("success", "Create categories successfully");
            };
            Create_cate();
        }
    }, [type_ButtonAdd]);

    useEffect(() => {
        const Delete_Cate = async () => {
            const res = await handleDeleteCategories(idDelete);
            res.status === 200 ? window.location.reload() : console.error('Error When handle function Delete');
            handleCloseAdd();
            notification("success", "Delete categories successfully");
        };
        Delete_Cate();
    }, [idDelete]);

    useEffect(() => {
        const getCate = async () => {
            const data_categories = await handleGetCategories();
            setGetcategories(data_categories);
        };
        getCate();
    }, []);

    const handleDelete = (id) => {
        setIdDelete(id);
    };

    const handleEdit = (Name_Cate, _id, type) => {
        setIdUpdate(_id);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleOpenAdd = (type) => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const notification = (status, message) => {
        toast[status](message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Danh Mục
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenAdd('Create')}
                >
                    Thêm danh mục
                </Button>
            </Box>

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
                    {getcategories.map((category) => (
                        <TableRow key={category._id}>
                            <TableCell>{category._id}</TableCell>
                            <TableCell>{category.Name_Cate}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEdit(category.Name_Cate, category._id)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(category._id)}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tên danh mục"
                        onChange={(e) => getValueEdit(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="secondary">Đóng</Button>
                    <Button onClick={() => btn_edit('Update')} color="primary">Lưu</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Thêm danh mục mới</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tên danh mục"
                        onChange={(e) => getValueAdd(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd} color="secondary">Đóng</Button>
                    <Button onClick={() => btn_add('Create')} color="primary">Lưu</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default CategoryManagement;
