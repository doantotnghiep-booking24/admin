import { useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const initialSuppliers = [
    {
        id: 1,
        Name_Supplier: "Công ty TNHH ABC",
        Address_Supplier: "123 Đường ABC, Quận 1, TP.HCM",
        PhoneNumber: "0123456789",
        Email_Supplier: "abc@gmail.com",
        Business: "Vận tải",
        Service: "Dịch vụ vận chuyển nội địa"
    },
    {
        id: 2,
        Name_Supplier: "Công ty TNHH XYZ",
        Address_Supplier: "456 Đường XYZ, Quận 2, TP.HCM",
        PhoneNumber: "0987654321",
        Email_Supplier: "xyz@gmail.com",
        Business: "Logistics",
        Service: "Dịch vụ vận chuyển quốc tế"
    }
];

const SupplierManagement = () => {
    const [suppliers] = useState(initialSuppliers);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    // Open and close add form
    const handleAddOpen = () => {
        setOpenAdd(true);
    };

    const handleAddClose = () => {
        setOpenAdd(false);
    };

    // Open and close edit form
    const handleEditOpen = (supplier) => {
        setSelectedSupplier(supplier);
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setSelectedSupplier(null);
        setOpenEdit(false);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            {/* Tiêu đề */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Nhà Cung Cấp
            </Typography>

            {/* Nút Thêm Nhà Cung Cấp */}
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddOpen}
                sx={{ mb: 2 }}
            >
                Thêm Nhà Cung Cấp
            </Button>

            {/* Bảng Nhà Cung Cấp */}
            <Table aria-label="bảng nhà cung cấp">
                <TableHead>
                    <TableRow>
                        {["ID", "Tên Nhà Cung Cấp", "Địa Chỉ", "Số Điện Thoại", "Email", "Ngành Nghề", "Dịch Vụ", "Hành Động"].map(header => (
                            <TableCell sx={{ backgroundColor: '#E3F2FD' }} key={header}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {header}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                            <TableCell>{supplier.id}</TableCell>
                            <TableCell>{supplier.Name_Supplier}</TableCell>
                            <TableCell>{supplier.Address_Supplier}</TableCell>
                            <TableCell>{supplier.PhoneNumber}</TableCell>
                            <TableCell>{supplier.Email_Supplier}</TableCell>
                            <TableCell>{supplier.Business}</TableCell>
                            <TableCell>{supplier.Service}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEditOpen(supplier)}>
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

            {/* Form Thêm Nhà Cung Cấp */}
            <Dialog open={openAdd} onClose={handleAddClose}>
                <DialogTitle>Thêm Nhà Cung Cấp</DialogTitle>
                <DialogContent>
                    <TextField label="Tên Nhà Cung Cấp" fullWidth sx={{ mb: 2 }} />
                    <TextField label="Địa Chỉ" fullWidth sx={{ mb: 2 }} />
                    <TextField label="Số Điện Thoại" fullWidth sx={{ mb: 2 }} />
                    <TextField label="Email" fullWidth sx={{ mb: 2 }} />
                    <TextField label="Ngành Nghề" fullWidth sx={{ mb: 2 }} />
                    <TextField label="Dịch Vụ" fullWidth sx={{ mb: 2 }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleAddClose} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Nhà Cung Cấp */}
            {selectedSupplier && (
                <Dialog open={openEdit} onClose={handleEditClose}>
                    <DialogTitle>Chỉnh Sửa Nhà Cung Cấp</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Tên Nhà Cung Cấp"
                            defaultValue={selectedSupplier.Name_Supplier}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Địa Chỉ"
                            defaultValue={selectedSupplier.Address_Supplier}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Số Điện Thoại"
                            defaultValue={selectedSupplier.PhoneNumber}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Email"
                            defaultValue={selectedSupplier.Email_Supplier}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Ngành Nghề"
                            defaultValue={selectedSupplier.Business}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Dịch Vụ"
                            defaultValue={selectedSupplier.Service}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={handleEditClose} color="primary">
                            Lưu
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Paper>
    );
};

export default SupplierManagement;
