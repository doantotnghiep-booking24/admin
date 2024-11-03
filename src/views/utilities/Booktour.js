import  { useState } from 'react';
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
    Grid,
    Chip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const initialBookings = [
    {
        id: 1,
        tour: "Tour Đà Nẵng - Mã: TD01",
        customerInfo: {
            name: "Nguyễn Văn A",
            email: "a.nguyen@example.com",
        },
        tourInfo: {
            departureLocation: "Đà Nẵng",
            destination: "Hội An",
            departureDate: "2024-10-10",
            departureTime: "08:00 AM",
            totalDateTrip: "2 ngày 1 đêm",
        },
        createdAt: "2024-10-01",
        statusPayment: "Đã thanh toán",
        paymentMethod: "Tiền mặt",
        billDetails: {
            nameCustomer: "Nguyễn Văn A",
            dateOfBirth: "1990-01-01",
            sexCustomer: "Nam",
            phoneNumber: "0123456789",
            citizenIdentification: "123456789",
            address: "123 Đường ABC, Đà Nẵng",
            unitPrices: 1000000,
            numberOfAdult: 2,
            numberOfChildren: 1,
            totalOfPeople: 3,
            totalPrice: 2000000,
            codeVoucher: "VOUCHER20",
            totalPriceAfterDiscount: 1800000,
            discountAmount: 200000,
            finalAmount: 1800000,
            createdAt: "2024-10-01",
        },
    },
];

const BookingManagement = () => {
    const [bookings] = useState(initialBookings);
    const [openBill, setOpenBill] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    const handleBillClickOpen = (booking) => {
        setSelectedBill(booking.billDetails);
        setOpenBill(true);
    };

    const handleClose = () => {
        setOpenBill(false);
        setSelectedBill(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Đã thanh toán":
                return "success";
            case "Chưa thanh toán":
                return "warning";
            case "Đã hủy":
                return "error";
            default:
                return "default";
        }
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center', fontFamily: 'Arial' }}>
                Quản Lý Vé Đặt Tour
            </Typography>

            <Table aria-label="bảng vé đặt tour" sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        {['ID', 'Tên Tour - Mã Tour', 'Thông Tin Khách Hàng', 'Thông Tin Tour', 'Ngày Tạo', 'Trạng Thái', 'Phương Thức Thanh Toán', 'BILL'].map((header) => (
                            <TableCell key={header} sx={{ backgroundColor: '#E3F2FD', fontSize: '14px', fontFamily: 'Arial' }}>
                                <Typography variant="subtitle2" fontWeight={600}>{header}</Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>{booking.id}</TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>{booking.tour}</TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>{booking.customerInfo.name} - {booking.customerInfo.email}</TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>
                                <Typography>
                                    <strong>Điểm đi:</strong> {booking.tourInfo.departureLocation}<br />
                                    <strong>Điểm đến:</strong> {booking.tourInfo.destination}<br />
                                    <strong>Ngày khởi hành:</strong> {booking.tourInfo.departureDate}<br />
                                    <strong>Giờ khởi hành:</strong> {booking.tourInfo.departureTime}<br />
                                    <strong>Tổng thời gian:</strong> {booking.tourInfo.totalDateTrip}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>{booking.createdAt}</TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>
                                <Chip
                                    label={booking.statusPayment}
                                    color={getStatusColor(booking.statusPayment)}
                                    size="small"
                                    sx={{ px: 1 }}
                                />
                            </TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>{booking.paymentMethod}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleBillClickOpen(booking)}>
                                    <VisibilityIcon color="primary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openBill} onClose={handleClose}>
                <DialogTitle sx={{ fontFamily: 'Arial' }}>Hóa Đơn</DialogTitle>
                <DialogContent sx={{ fontFamily: 'Arial' }}>
                    {selectedBill && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ fontFamily: 'Arial' }}>Thông Tin Khách Hàng</Typography>
                                <Typography><strong>Tên:</strong> {selectedBill.nameCustomer}</Typography>
                                <Typography><strong>Ngày Sinh:</strong> {selectedBill.dateOfBirth}</Typography>
                                <Typography><strong>Giới Tính:</strong> {selectedBill.sexCustomer}</Typography>
                                <Typography><strong>Số Điện Thoại:</strong> {selectedBill.phoneNumber}</Typography>
                                <Typography><strong>CCCD:</strong> {selectedBill.citizenIdentification}</Typography>
                                <Typography><strong>Địa Chỉ:</strong> {selectedBill.address}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mt: 2, fontFamily: 'Arial' }}>Chi Tiết Vé</Typography>
                                <Typography><strong>Giá Đơn Vị:</strong> {selectedBill.unitPrices.toLocaleString()} VNĐ</Typography>
                                <Typography><strong>Số Lượng Người Lớn:</strong> {selectedBill.numberOfAdult}</Typography>
                                <Typography><strong>Số Lượng Trẻ Em:</strong> {selectedBill.numberOfChildren}</Typography>
                                <Typography><strong>Tổng Số Người:</strong> {selectedBill.totalOfPeople}</Typography>
                                <Typography><strong>Tổng Giá:</strong> {selectedBill.totalPrice.toLocaleString()} VNĐ</Typography>
                                <Typography><strong>Mã Voucher:</strong> {selectedBill.codeVoucher}</Typography>
                                <Typography><strong>Tổng Giá Sau Giảm Giá:</strong> {selectedBill.totalPriceAfterDiscount.toLocaleString()} VNĐ</Typography>
                                <Typography><strong>Số Tiền Giảm Giá:</strong> {selectedBill.discountAmount.toLocaleString()} VNĐ</Typography>
                                <Typography><strong>Tổng Số Tiền Phải Trả:</strong> {selectedBill.finalAmount.toLocaleString()} VNĐ</Typography>
                                <Typography><strong>Ngày Tạo:</strong> {selectedBill.createdAt}</Typography>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Đóng</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default BookingManagement;
