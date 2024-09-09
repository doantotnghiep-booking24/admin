import { useState } from 'react';
import {
    Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
    MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const initialTours = [
    {
        id: "1",
        name: "Khám Phá Bali",
        location: "Bali, Indonesia",
        startDate: "2023-12-01",
        endDate: "2023-12-07",
        status: "Hoạt động"
    },
    {
        id: "2",
        name: "Khám Phá Tokyo",
        location: "Tokyo, Nhật Bản",
        startDate: "2024-01-15",
        endDate: "2024-01-20",
        status: "Không hoạt động"
    },
    {
        id: "3",
        name: "Cuộc Phiêu Lưu Safari",
        location: "Nairobi, Kenya",
        startDate: "2024-02-10",
        endDate: "2024-02-17",
        status: "Hoạt động"
    },
];

const TourManagement = () => {
    const [tours, setTours] = useState(initialTours);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editTour, setEditTour] = useState(null);

    const handleEdit = (tour) => {
        setEditTour(tour);
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        setTours(tours.filter(tour => tour.id !== id));
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditTour(null);
    };

    const handleSave = () => {
        setTours(tours.map(tour => tour.id === editTour.id ? editTour : tour));
        handleCloseDialog();
    };

    return (
        <Box
            sx={{
                p: 2,
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: 1,
                overflowX: 'auto'
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                Quản lý Tour
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ mb: 2 }}
                onClick={() => setEditTour({ id: '', name: '', location: '', startDate: '', endDate: '', status: '' })}
            >
                Thêm Tour
            </Button>
            <Table
                aria-label="simple table"
                sx={{ whiteSpace: "nowrap" }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Mã Tour</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Tên Tour</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Địa điểm</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Ngày Khởi Hành</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Ngày Kết Thúc</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Trạng Thái</Typography></TableCell>
                        <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tours.map((tour) => (
                        <TableRow key={tour.id}>
                            <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{tour.id}</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>{tour.name}</Typography></TableCell>
                            <TableCell><Typography color="textSecondary" variant="subtitle2" fontWeight={400}>{tour.location}</Typography></TableCell>
                            <TableCell><Typography color="textSecondary" variant="subtitle2" fontWeight={400}>{tour.startDate}</Typography></TableCell>
                            <TableCell><Typography color="textSecondary" variant="subtitle2" fontWeight={400}>{tour.endDate}</Typography></TableCell>
                            <TableCell>
                                <Typography color={tour.status === "Hoạt động" ? "green" : "red"}>
                                    {tour.status}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEdit(tour)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(tour.id)}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Hộp thoại chỉnh sửa/thêm */}
            {editTour && (
                <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>{editTour.id ? "Chỉnh Sửa Tour" : "Thêm Tour"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Tên Tour"
                            fullWidth
                            value={editTour.name}
                            onChange={(e) => setEditTour({ ...editTour, name: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Địa điểm"
                            fullWidth
                            value={editTour.location}
                            onChange={(e) => setEditTour({ ...editTour, location: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Ngày Khởi Hành"
                            type="date"
                            fullWidth
                            value={editTour.startDate}
                            onChange={(e) => setEditTour({ ...editTour, startDate: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            margin="dense"
                            label="Ngày Kết Thúc"
                            type="date"
                            fullWidth
                            value={editTour.endDate}
                            onChange={(e) => setEditTour({ ...editTour, endDate: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                        />

                        {/* Dropdown Trạng Thái */}
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Trạng Thái</InputLabel>
                            <Select
                                value={editTour.status}
                                onChange={(e) => setEditTour({ ...editTour, status: e.target.value })}
                                label="Trạng Thái"
                            >
                                <MenuItem value="Hoạt động">Hoạt động</MenuItem>
                                <MenuItem value="Không hoạt động">Không hoạt động</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
                        <Button onClick={handleSave} color="primary">{editTour.id ? "Lưu" : "Thêm"}</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default TourManagement;
