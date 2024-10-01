import { useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const initialPlanes = [
    {
        id: 1,
        Supplier: "Vietnam Airlines",
        Type_Plane: "Airbus A320",
        Price: "200,000,000 VND",
        Description: "Máy bay tầm trung phục vụ nội địa"
    },
    {
        id: 2,
        Supplier: "Vietjet Air",
        Type_Plane: "Boeing 737",
        Price: "180,000,000 VND",
        Description: "Máy bay giá rẻ cho các chuyến bay quốc tế ngắn"
    },
    {
        id: 3,
        Supplier: "Vietnam Airlines",
        Type_Plane: "Airbus A380",
        Price: "300,000,000 VND",
        Description: "Máy bay hạng sang cho các chuyến bay dài"
    }
];

const suppliers = ["Vietnam Airlines", "Vietjet Air"];

const PlaneManagement = () => {
    const [planes] = useState(initialPlanes);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]);
    const [editData, setEditData] = useState(null);

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleClickOpenEdit = (plane) => {
        setEditData(plane);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            {/* Tiêu đề căn giữa */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Máy Bay
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpenAdd}
                sx={{ mb: 2 }}
            >
                Thêm Máy Bay
            </Button>

            {/* Bảng Máy Bay */}
            <Table aria-label="bảng máy bay">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Nhà Cung Cấp
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Loại Máy Bay
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Giá
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
                    {planes.map((plane) => (
                        <TableRow key={plane.id}>
                            <TableCell>{plane.id}</TableCell>
                            <TableCell>{plane.Supplier}</TableCell>
                            <TableCell>{plane.Type_Plane}</TableCell>
                            <TableCell>{plane.Price}</TableCell>
                            <TableCell>{plane.Description}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleClickOpenEdit(plane)}>
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

            {/* Form Thêm Máy Bay */}
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Thêm Máy Bay</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Nhà Cung Cấp"
                        value={selectedSupplier}
                        onChange={(e) => setSelectedSupplier(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        {suppliers.map((supplier) => (
                            <MenuItem key={supplier} value={supplier}>
                                {supplier}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Loại Máy Bay"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Giá"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Mô Tả"
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

            {/* Form Chỉnh Sửa Máy Bay */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Chỉnh Sửa Máy Bay</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Nhà Cung Cấp"
                        value={editData ? editData.Supplier : selectedSupplier}
                        onChange={(e) => setSelectedSupplier(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        {suppliers.map((supplier) => (
                            <MenuItem key={supplier} value={supplier}>
                                {supplier}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Loại Máy Bay"
                        value={editData ? editData.Type_Plane : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Giá"
                        value={editData ? editData.Price : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Mô Tả"
                        value={editData ? editData.Description : ''}
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

export default PlaneManagement;
