import { useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Paper,
    Button,
    MenuItem,
    Select
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Dữ liệu đơn hàng mẫu
const initialOrders = [
    {
        id: 1,
        customer: "John Doe",
        status: "Đang chờ xử lý",
        details: "3 sản phẩm - Điện tử",
        statusColor: "warning",
    },
    {
        id: 2,
        customer: "Jane Smith",
        status: "Đã hoàn thành",
        details: "2 sản phẩm - Thời trang",
        statusColor: "success",
    },
    {
        id: 3,
        customer: "Bob Johnson",
        status: "Đã hủy",
        details: "5 sản phẩm - Đồ gia dụng",
        statusColor: "error",
    },
];

const OrderManagement = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [editOrderId, setEditOrderId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');

    const handleEdit = (order) => {
        setEditOrderId(order.id);
        setSelectedStatus(order.status);
    };

    const handleSave = (id) => {
        setOrders(orders.map(order =>
            order.id === id ? { ...order, status: selectedStatus, statusColor: getStatusColor(selectedStatus) } : order
        ));
        setEditOrderId(null); // Thoát chế độ chỉnh sửa
    };

    const handleDelete = (id) => {
        setOrders(orders.filter(order => order.id !== id));
        console.log("Đã xóa đơn hàng với id:", id);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Đang chờ xử lý":
                return "warning";
            case "Đã hoàn thành":
                return "success";
            case "Đã hủy":
                return "error";
            default:
                return "default";
        }
    };

    return (
        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Quản lý Đơn Hàng
            </Typography>
            <Table aria-label="bảng đơn hàng">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Mã Đơn Hàng
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Khách Hàng
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Trạng Thái
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Chi Tiết Đơn Hàng
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
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {order.id}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {order.customer}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {editOrderId === order.id ? (
                                    <Select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        size="small"
                                        sx={{ minWidth: 120 }}
                                    >
                                        <MenuItem value="Đang chờ xử lý">Đang chờ xử lý</MenuItem>
                                        <MenuItem value="Đã hoàn thành">Đã hoàn thành</MenuItem>
                                        <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                                    </Select>
                                ) : (
                                    <Chip
                                        label={order.status}
                                        color={order.statusColor}
                                        size="small"
                                        sx={{ px: 1 }}
                                    />
                                )}
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">
                                    {order.details}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                {editOrderId === order.id ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleSave(order.id)}
                                    >
                                        Lưu
                                    </Button>
                                ) : (
                                    <>
                                        <IconButton onClick={() => handleEdit(order)}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(order.id)}>
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box sx={{ mt: 3 }}>
                <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>
                    Thêm Đơn Hàng Mới
                </Button>
            </Box>
        </Paper>
    );
};

export default OrderManagement;
