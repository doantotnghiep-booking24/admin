import  { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,

  TableHead,
  TableRow,
  Paper,
  Typography,
 
  Button,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Chip,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Dữ liệu mẫu cho bảng
const initialBookings = [
  {
    id: 1,
    tourName: 'Tour Biển Đà Nẵng',
    tourCode: 'T001',
    customer: {
      fullName: 'Nguyễn Văn A',
      dateOfBirth: '1990-01-01',
      gender: 'Nam',
      phone: '0901234567',
      idCard: '123456789012',
    },
    tourInfo: {
      adults: 2,
      children: 1,
      discountCode: 'GiamGia20',
      totalPrice: '5.000.000 VNĐ',
      pickupPoint: 'Đà Nẵng',
    },
    status: 'Tiếp nhận',
  },
  // Thêm các đơn đặt khác ở đây
];

const BookingManagement = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [editBookingId, setEditBookingId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchParams, setSearchParams] = useState({
    tourCode: '',
    customerName: '',
    customerPhone: '',
  });

  const handleEdit = (id) => {
    setEditBookingId(id);
    const bookingToEdit = bookings.find((booking) => booking.id === id);
    setSelectedStatus(bookingToEdit.status);
  };

  const handleDelete = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
  };

  const handleChangeStatus = (id, newStatus) => {
    const updatedBookings = bookings.map((booking) => {
      if (booking.id === id) {
        return { ...booking, status: newStatus };
      }
      return booking;
    });
    setBookings(updatedBookings);
  };

  const handleSave = (id) => {
    handleChangeStatus(id, selectedStatus);
    setEditBookingId(null);
  };

  const handleSearch = () => {
    const filteredBookings = initialBookings.filter((booking) => {
      return (
        (searchParams.tourCode === '' || booking.tourCode.includes(searchParams.tourCode)) &&
        (searchParams.customerName === '' || booking.customer.fullName.toLowerCase().includes(searchParams.customerName.toLowerCase())) &&
        (searchParams.customerPhone === '' || booking.customer.phone.includes(searchParams.customerPhone))
      );
    });
    setBookings(filteredBookings);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Tiếp nhận":
        return "default";
      case "Đã thanh toán":
        return "success";
      case "Đã xác nhận":
        return "info";
      case "Đã hủy":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Quản Lý Đơn Đặt Tour
      </Typography>

      {/* Form Tìm Kiếm */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Mã Tour"
            variant="outlined"
            value={searchParams.tourCode}
            onChange={(e) => setSearchParams({ ...searchParams, tourCode: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Tên Khách Hàng"
            variant="outlined"
            value={searchParams.customerName}
            onChange={(e) => setSearchParams({ ...searchParams, customerName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Số Điện Thoại"
            variant="outlined"
            value={searchParams.customerPhone}
            onChange={(e) => setSearchParams({ ...searchParams, customerPhone: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Tìm Kiếm
          </Button>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>STT</Typography>
            </TableCell>
            <TableCell sx={{ minWidth: 200 }}>
              <Typography variant="subtitle2" fontWeight={600}>Tên Tour - Mã Tour</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>Thông Tin Khách Hàng</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>Thông Tin Tour</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>Trạng Thái</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking, index) => (
            <TableRow key={booking.id}>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{index + 1}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1"><strong>{booking.tourName}</strong></Typography>
                <Typography variant="body2">{booking.tourCode}</Typography>
              </TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item xs={12}><strong>Họ và Tên:</strong> {booking.customer.fullName}</Grid>
                  <Grid item xs={12}><strong>Ngày Sinh:</strong> {booking.customer.dateOfBirth}</Grid>
                  <Grid item xs={12}><strong>Giới Tính:</strong> {booking.customer.gender}</Grid>
                  <Grid item xs={12}><strong>Số Điện Thoại:</strong> {booking.customer.phone}</Grid>
                  <Grid item xs={12}><strong>CCCD:</strong> {booking.customer.idCard}</Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item xs={12}><strong>Số Người Lớn:</strong> {booking.tourInfo.adults}</Grid>
                  <Grid item xs={12}><strong>Số Trẻ Em:</strong> {booking.tourInfo.children}</Grid>
                  <Grid item xs={12}><strong>Mã Giảm Giá:</strong> {booking.tourInfo.discountCode}</Grid>
                  <Grid item xs={12}><strong>Tổng Tiền:</strong> {booking.tourInfo.totalPrice}</Grid>
                  <Grid item xs={12}><strong>Điểm Đón:</strong> {booking.tourInfo.pickupPoint}</Grid>
                </Grid>
              </TableCell>
              <TableCell>
                {editBookingId === booking.id ? (
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="Tiếp nhận">Tiếp nhận</MenuItem>
                    <MenuItem value="Đã thanh toán">Đã thanh toán</MenuItem>
                    <MenuItem value="Đã xác nhận">Đã xác nhận</MenuItem>
                    <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                  </Select>
                ) : (
                  <Chip
                    label={booking.status}
                    color={getStatusColor(booking.status)}
                    size="small"
                    sx={{ px: 1 }}
                  />
                )}
              </TableCell>
              <TableCell align="right">
                {editBookingId === booking.id ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleSave(booking.id)}
                  >
                    Lưu
                  </Button>
                ) : (
                  <>
                    <IconButton onClick={() => handleEdit(booking.id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(booking.id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default BookingManagement;
