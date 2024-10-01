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

const initialLocations = [
    {
        id: 1,
        nameLocation: "Địa Điểm 1",
        addressLocation: "123 Đường ABC, Đà Nẵng",
        imageLocation: "https://via.placeholder.com/150",
        typeLocation: "Cảnh Quan",
        national: "Việt Nam",
        cityLocation: "Đà Nẵng",
    },
    {
        id: 2,
        nameLocation: "Địa Điểm 2",
        addressLocation: "456 Đường DEF, Đà Nẵng",
        imageLocation: "https://via.placeholder.com/150",
        typeLocation: "Di Tích",
        national: "Việt Nam",
        cityLocation: "Đà Nẵng",
    },
    // Thêm nhiều địa điểm khác nếu cần
];

const LocationManagement = () => {
    const [locations] = useState(initialLocations);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleAddClickOpen = () => {
        setOpenAdd(true);
    };

    const handleEditClickOpen = (location) => {
        setSelectedLocation(location);
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenAdd(false);
        setOpenEdit(false);
        setSelectedLocation(null);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Địa Điểm
            </Typography>

            <Button variant="contained" color="primary" onClick={handleAddClickOpen}>
                Thêm Địa Điểm
            </Button>

            <Table aria-label="bảng địa điểm" sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Id</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Tên Địa Điểm</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Địa Chỉ</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Hình Ảnh</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Loại</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Quốc Gia</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Thành Phố</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {locations.map((location) => (
                        <TableRow key={location.id}>
                            <TableCell>{location.id}</TableCell>
                            <TableCell>{location.nameLocation}</TableCell>
                            <TableCell>{location.addressLocation}</TableCell>
                            <TableCell>
                                <img src={location.imageLocation} alt={location.nameLocation} style={{ width: '50px', height: 'auto' }} />
                            </TableCell>
                            <TableCell>{location.typeLocation}</TableCell>
                            <TableCell>{location.national}</TableCell>
                            <TableCell>{location.cityLocation}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEditClickOpen(location)}>
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

            {/* Form Thêm Địa Điểm */}
            <Dialog open={openAdd} onClose={handleClose}>
                <DialogTitle>Thêm Địa Điểm Mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên Địa Điểm"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Địa Chỉ"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Hình Ảnh URL"
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
                        label="Quốc Gia"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Thành Phố"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleClose} color="primary">Thêm</Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Địa Điểm */}
            <Dialog open={openEdit} onClose={handleClose}>
                <DialogTitle>Chỉnh Sửa Địa Điểm</DialogTitle>
                <DialogContent>
                    {selectedLocation && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Tên Địa Điểm"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.nameLocation}
                            />
                            <TextField
                                margin="dense"
                                label="Địa Chỉ"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.addressLocation}
                            />
                            <TextField
                                margin="dense"
                                label="Hình Ảnh URL"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.imageLocation}
                            />
                            <TextField
                                margin="dense"
                                label="Loại"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.typeLocation}
                            />
                            <TextField
                                margin="dense"
                                label="Quốc Gia"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.national}
                            />
                            <TextField
                                margin="dense"
                                label="Thành Phố"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.cityLocation}
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

export default LocationManagement;
