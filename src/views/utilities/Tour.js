import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
  Typography,
  Box,
  TextField,
  Grid,
  Chip,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Dữ liệu mẫu cho bảng
const initialTours = [
  {
    id: 1,
    code: 'T001',
    title: 'Tour Biển Đà Nẵng',
    image: 'https://example.com/image1.jpeg',
    itinerary: {
      description: 'Tour 2 ngày 1 đêm',
      startLocation: 'Đà Nẵng',
      endLocation: 'Đà Nẵng',
      totalPrice: '3.000.000 VNĐ',
    },
    info: {
      location: 'Đà Nẵng',
      transportService: 'Xe du lịch',
      startDate: '2024-10-01',
      endDate: '2024-10-03',
      departureTime: '08:00',
      arrivalTime: '20:00',
    },
    status: 'Xác nhận',
    statusColor: 'success', // Thêm màu cho trạng thái
  },
  // Thêm các tour khác ở đây
];

const TourManagement = () => {
  const [tours, setTours] = useState(initialTours);
  const [filteredTours, setFilteredTours] = useState(initialTours);
  const [searchParams, setSearchParams] = useState({
    title: '',
    startDate: '',
    endDate: '',
  });
  const [editTourId, setEditTourId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleEdit = (id) => {
    setEditTourId(id);
    const tourToEdit = tours.find(tour => tour.id === id);
    setSelectedStatus(tourToEdit.status);
  };

  const handleDelete = (id) => {
    const updatedTours = tours.filter(tour => tour.id !== id);
    setTours(updatedTours);
    setFilteredTours(updatedTours);
  };

  const handleChangeStatus = (id, newStatus) => {
    const updatedTours = tours.map((tour) => {
      if (tour.id === id) {
        return { ...tour, status: newStatus };
      }
      return tour;
    });
    setTours(updatedTours);
  };

  const handleSave = (id) => {
    handleChangeStatus(id, selectedStatus);
    setEditTourId(null);
  };

  // Xử lý tìm kiếm
  const handleSearch = () => {
    const filtered = tours.filter(tour => {
      const titleMatch = tour.title.toLowerCase().includes(searchParams.title.toLowerCase());
      const startDateMatch = searchParams.startDate ? tour.info.startDate === searchParams.startDate : true;
      const endDateMatch = searchParams.endDate ? tour.info.endDate === searchParams.endDate : true;

      return titleMatch && startDateMatch && endDateMatch;
    });
    setFilteredTours(filtered);
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
      <Box p={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Quản lý Tour
        </Typography>
      </Box>
      
      {/* Form Tìm Kiếm */}
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Tiêu đề Tour"
              variant="outlined"
              value={searchParams.title}
              onChange={(e) => setSearchParams({ ...searchParams, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Ngày bắt đầu"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={searchParams.startDate}
              onChange={(e) => setSearchParams({ ...searchParams, startDate: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Ngày kết thúc"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={searchParams.endDate}
              onChange={(e) => setSearchParams({ ...searchParams, endDate: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Tìm Kiếm
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Mã tour</TableCell>
            <TableCell>Tiêu đề tour</TableCell>
            <TableCell>Hình ảnh</TableCell>
            <TableCell>Lịch trình</TableCell>
            <TableCell>Thông tin</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTours.map((tour, index) => (
            <TableRow key={tour.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{tour.code}</TableCell>
              <TableCell>{tour.title}</TableCell>
              <TableCell>
                <img src={tour.image} alt={tour.title} style={{ width: '100px', height: 'auto', borderRadius: '8px' }} />
              </TableCell>
              <TableCell>
                <Typography variant="body2"><strong>Mô tả:</strong> {tour.itinerary.description}</Typography>
                <Typography variant="body2"><strong>Vị trí bắt đầu:</strong> {tour.itinerary.startLocation}</Typography>
                <Typography variant="body2"><strong>Vị trí kết thúc:</strong> {tour.itinerary.endLocation}</Typography>
                <Typography variant="body2"><strong>Tổng giá:</strong> {tour.itinerary.totalPrice}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2"><strong>Địa điểm:</strong> {tour.info.location}</Typography>
                <Typography variant="body2"><strong>Dịch vụ di chuyển:</strong> {tour.info.transportService}</Typography>
                <Typography variant="body2"><strong>Ngày bắt đầu:</strong> {tour.info.startDate}</Typography>
                <Typography variant="body2"><strong>Ngày kết thúc:</strong> {tour.info.endDate}</Typography>
                <Typography variant="body2"><strong>Thời gian khởi hành:</strong> {tour.info.departureTime}</Typography>
                <Typography variant="body2"><strong>Thời gian đến nơi:</strong> {tour.info.arrivalTime}</Typography>
              </TableCell>
              <TableCell>
                {editTourId === tour.id ? (
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="Xác nhận">Xác nhận</MenuItem>
                    <MenuItem value="Khởi tạo">Khởi tạo</MenuItem>
                    <MenuItem value="Hủy">Hủy</MenuItem>
                  </Select>
                ) : (
                  <Chip
                    label={tour.status}
                    color={tour.statusColor}
                    size="small"
                    sx={{ px: 1 }}
                  />
                )}
              </TableCell>
              <TableCell align="right">
                {editTourId === tour.id ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleSave(tour.id)}
                  >
                    Lưu
                  </Button>
                ) : (
                  <>
                    <IconButton onClick={() => handleEdit(tour.id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(tour.id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TourManagement;
