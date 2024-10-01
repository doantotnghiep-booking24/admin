import { useState } from 'react';
import {
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialVouchers = [
    {
        id: 1,
        codeVoucher: "VOUCHER1",
        description: "Giảm giá 10% cho đơn hàng trên 500k",
        discount: "10%",
        type: "Giảm Giá",
        startDate: "2024-10-01",
        endDate: "2024-10-10",
        maxUsage: 100,
        conditions: "Áp dụng cho khách hàng mới",
    },
    {
        id: 2,
        codeVoucher: "VOUCHER2",
        description: "Giảm giá 15% cho đơn hàng trên 1 triệu",
        discount: "15%",
        type: "Giảm Giá",
        startDate: "2024-10-05",
        endDate: "2024-10-15",
        maxUsage: 50,
        conditions: "Áp dụng cho tất cả khách hàng",
    },
    // Bạn có thể thêm nhiều voucher hơn nữa
];

const VoucherManagement = () => {
    const [vouchers] = useState(initialVouchers);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const handleAddClickOpen = () => {
        setOpenAdd(true);
    };

    const handleEditClickOpen = (voucher) => {
        setSelectedVoucher(voucher);
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenAdd(false);
        setOpenEdit(false);
        setSelectedVoucher(null);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Voucher
            </Typography>

            <Button variant="contained" color="primary" onClick={handleAddClickOpen}>
                Thêm Voucher
            </Button>

            <Table aria-label="bảng voucher" sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Id</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Code Voucher</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Mô Tả</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Giảm Giá</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Loại</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Ngày Bắt Đầu</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Ngày Kết Thúc</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Số Lượng Tối Đa</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Điều Kiện</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vouchers.map((voucher) => (
                        <TableRow key={voucher.id}>
                            <TableCell>{voucher.id}</TableCell>
                            <TableCell>{voucher.codeVoucher}</TableCell>
                            <TableCell>{voucher.description}</TableCell>
                            <TableCell>{voucher.discount}</TableCell>
                            <TableCell>{voucher.type}</TableCell>
                            <TableCell>{voucher.startDate}</TableCell>
                            <TableCell>{voucher.endDate}</TableCell>
                            <TableCell>{voucher.maxUsage}</TableCell>
                            <TableCell>{voucher.conditions}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEditClickOpen(voucher)}>
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

            {/* Form Thêm Voucher */}
            <Dialog open={openAdd} onClose={handleClose}>
                <DialogTitle>Thêm Voucher Mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Code Voucher"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Mô Tả"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Giảm Giá"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Loại"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Ngày Bắt Đầu"
                        type="date"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Ngày Kết Thúc"
                        type="date"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Số Lượng Tối Đa"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Điều Kiện"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleClose} color="primary">Thêm</Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Voucher */}
            <Dialog open={openEdit} onClose={handleClose}>
                <DialogTitle>Chỉnh Sửa Voucher</DialogTitle>
                <DialogContent>
                    {selectedVoucher && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Code Voucher"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedVoucher.codeVoucher}
                            />
                            <TextField
                                margin="dense"
                                label="Mô Tả"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedVoucher.description}
                            />
                            <TextField
                                margin="dense"
                                label="Giảm Giá"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedVoucher.discount}
                            />
                            <TextField
                                margin="dense"
                                label="Loại"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedVoucher.type}
                            />
                            <TextField
                                margin="dense"
                                label="Ngày Bắt Đầu"
                                type="date"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedVoucher.startDate}
                            />
                            <TextField
                                margin="dense"
                                label="Ngày Kết Thúc"
                                type="date"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedVoucher.endDate}
                            />
                            <TextField
                                margin="dense"
                                label="Số Lượng Tối Đa"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedVoucher.maxUsage}
                            />
                            <TextField
                                margin="dense"
                                label="Điều Kiện"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedVoucher.conditions}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleClose} color="primary">Lưu</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default VoucherManagement;
