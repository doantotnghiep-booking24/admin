import { useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const initialServices = [
    {
        id: 1,
        Name_Service: "Khách Sạn",
        Price_Service: "500,000 VND"
    },
    {
        id: 2,
        Name_Service: "Ăn Uống",
        Price_Service: "300,000 VND"
    },
    {
        id: 3,
        Name_Service: "Đưa Đón",
        Price_Service: "1,200,000 VND"
    }
];

const ServiceManagement = () => {
    const [services] = useState(initialServices);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState(null);

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleClickOpenEdit = (service) => {
        setEditData(service);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            {/* Tiêu đề căn giữa */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Dịch Vụ
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpenAdd}
                sx={{ mb: 2 }}
            >
                Thêm Dịch Vụ
            </Button>

            {/* Bảng Dịch Vụ */}
            <Table aria-label="bảng dịch vụ">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên Dịch Vụ
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Giá Dịch Vụ
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
                    {services.map((service) => (
                        <TableRow key={service.id}>
                            <TableCell>{service.id}</TableCell>
                            <TableCell>{service.Name_Service}</TableCell>
                            <TableCell>{service.Price_Service}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleClickOpenEdit(service)}>
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

            {/* Form Thêm Dịch Vụ */}
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Thêm Dịch Vụ</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Tên Dịch Vụ"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Giá Dịch Vụ"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleCloseAdd} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Dịch Vụ */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Chỉnh Sửa Dịch Vụ</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Tên Dịch Vụ"
                        value={editData ? editData.Name_Service : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Giá Dịch Vụ"
                        value={editData ? editData.Price_Service : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleCloseEdit} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ServiceManagement;
