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
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const initialTours = [
    {
        id: 1,
        nameTour: "Tour Bãi Biển",
        titleTour: "Khám Phá Bãi Biển Đà Nẵng",
        imageTour: "https://via.placeholder.com/150",
        descriptionTour: "Một tour hấp dẫn tại bãi biển Đà Nẵng.",
        departureTime: "9:00 AM",
        totalDate: "3 ngày",
        voucher: "10% OFF",
        category: "Đà Nẵng",
        featuredLocation: "Bãi Biển Mỹ Khê",
        typeTour: "2 ngày 1 đêm"
    },
    {
        id: 2,
        nameTour: "Tour Núi Bà Nà",
        titleTour: "Khám Phá Núi Bà Nà",
        imageTour: "https://via.placeholder.com/150",
        descriptionTour: "Một chuyến đi đầy thú vị đến Núi Bà Nà.",
        departureTime: "8:00 AM",
        totalDate: "2 ngày",
        voucher: "15% OFF",
        category: "Featured Location",
        featuredLocation: "Bãi Biển Mỹ Khê",
        typeTour: "3 ngày 2 đêm"
    },
    // Bạn có thể thêm nhiều tour hơn nữa
];

const TourManagement = () => {
    const [tours] = useState(initialTours);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const [images, setImages] = useState([]);

    const handleAddClickOpen = () => {
        setOpenAdd(true);
    };

    const handleEditClickOpen = (tour) => {
        setSelectedTour(tour);
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenAdd(false);
        setOpenEdit(false);
        setSelectedTour(null);
        setImages([]); // Reset hình ảnh khi đóng dialog
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleImageRemove = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };
    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Tour
            </Typography>

            <Button variant="contained" color="primary" onClick={handleAddClickOpen}>
                Thêm Tour
            </Button>

            <Table aria-label="bảng tour" sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Id</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Tên Tour</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Tiêu Đề</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Hình Ảnh</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Mô Tả</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Voucher</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Lịch Trình</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Thông Tin Tour</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tours.map((tour) => (
                        <TableRow key={tour.id}>
                            <TableCell>{tour.id}</TableCell>
                            <TableCell>{tour.nameTour}</TableCell>
                            <TableCell>{tour.titleTour}</TableCell>
                            <TableCell>
                                <img src={tour.imageTour} alt={tour.nameTour} style={{ width: 50, height: 50 }} />
                            </TableCell>
                            <TableCell>{tour.descriptionTour}</TableCell>
                            <TableCell>{tour.voucher}</TableCell>
                            <TableCell>
                                <Typography>
                                    <strong>Thời gian khởi hành:</strong> {tour.departureTime}<br />
                                    <strong>Tổng ngày:</strong> {tour.totalDate}<br />
                                    <strong>Loại tour:</strong> {tour.typeTour}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    <strong>Danh Mục:</strong> {tour.category}<br />
                                    <strong>Địa Điểm Nổi Bật:</strong> {tour.featuredLocation}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEditClickOpen(tour)}>
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

            {/* Form Thêm Tour */}
            <Dialog open={openAdd} onClose={handleClose}>
                <DialogTitle>Thêm Tour Mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên Tour"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Tiêu Đề"
                        fullWidth
                        variant="outlined"
                    />
                  <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        style={{ marginBottom: '16px' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {images.map((image, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <img src={image} alt={`preview-${index}`} style={{ width: '50px', height: 'auto', marginRight: '8px' }} />
                                <IconButton onClick={() => handleImageRemove(index)}>
                                    <RemoveCircleOutlineIcon color="error" />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                    <TextField
                        margin="dense"
                        label="Mô Tả"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={2}
                    />
                    <TextField
                        margin="dense"
                        label="Thời Gian Khởi Hành"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Tổng Ngày"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Voucher"
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel>Danh Mục</InputLabel>
                        <Select defaultValue="">
                            <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
                            <MenuItem value="Featured Location">Địa Điểm Nổi Bật</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel>Địa Điểm Nổi Bật</InputLabel>
                        <Select defaultValue="">
                            <MenuItem value="Bãi Biển Mỹ Khê">Bãi Biển Mỹ Khê</MenuItem>
                            <MenuItem value="Núi Bà Nà">Núi Bà Nà</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel>Loại Tour</InputLabel>
                        <Select defaultValue="">
                            <MenuItem value="2 ngày 1 đêm">2 ngày 1 đêm</MenuItem>
                            <MenuItem value="3 ngày 2 đêm">3 ngày 2 đêm</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleClose} color="primary">Thêm</Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Tour */}
            <Dialog open={openEdit} onClose={handleClose}>
                <DialogTitle>Chỉnh Sửa Tour</DialogTitle>
                <DialogContent>
                    {selectedTour && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Tên Tour"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedTour.nameTour}
                            />
                            <TextField
                                margin="dense"
                                label="Tiêu Đề"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedTour.titleTour}
                            />
                          <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                style={{ marginBottom: '16px' }}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                {images.map((image, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <img src={image} alt={`preview-${index}`} style={{ width: '50px', height: 'auto', marginRight: '8px' }} />
                                        <IconButton onClick={() => handleImageRemove(index)}>
                                            <RemoveCircleOutlineIcon color="error" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                            <TextField
                                margin="dense"
                                label="Mô Tả"
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={2}
                                defaultValue={selectedTour.descriptionTour}
                            />
                            <TextField
                                margin="dense"
                                label="Thời Gian Khởi Hành"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedTour.departureTime}
                            />
                            <TextField
                                margin="dense"
                                label="Tổng Ngày"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedTour.totalDate}
                            />
                            <TextField
                                margin="dense"
                                label="Voucher"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedTour.voucher}
                            />
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel>Danh Mục</InputLabel>
                                <Select defaultValue={selectedTour.category}>
                                    <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
                                    <MenuItem value="Featured Location">Địa Điểm Nổi Bật</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel>Địa Điểm Nổi Bật</InputLabel>
                                <Select defaultValue={selectedTour.featuredLocation}>
                                    <MenuItem value="Bãi Biển Mỹ Khê">Bãi Biển Mỹ Khê</MenuItem>
                                    <MenuItem value="Núi Bà Nà">Núi Bà Nà</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel>Loại Tour</InputLabel>
                                <Select defaultValue={selectedTour.typeTour}>
                                    <MenuItem value="2 ngày 1 đêm">2 ngày 1 đêm</MenuItem>
                                    <MenuItem value="3 ngày 2 đêm">3 ngày 2 đêm</MenuItem>
                                </Select>
                            </FormControl>
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

export default TourManagement;
