import { useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const initialSchedules = [
    { id: 1, Departure_Time: '08:00 AM', Location: 'Đà Nẵng', Means_of_Transport: 'Xe buýt', Work: 'Tham quan Bà Nà Hills' },
    { id: 2, Departure_Time: '09:00 AM', Location: 'Hội An', Means_of_Transport: 'Xe máy', Work: 'Khám phá phố cổ' },
    { id: 3, Departure_Time: '10:00 AM', Location: 'Huế', Means_of_Transport: 'Ô tô', Work: 'Tham quan Đại Nội' }
];

const ScheduleManagement = () => {
    const [schedules] = useState(initialSchedules);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState(null);

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleClickOpenEdit = (schedule) => {
        setEditData(schedule);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Lịch Trình
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpenAdd}
                sx={{ mb: 2 }}
            >
                Thêm Lịch Trình
            </Button>

            <Table aria-label="bảng lịch trình">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Thời Gian Khởi Hành
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Địa Điểm
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Phương Tiện Giao Thông
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Công Việc
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
                    {schedules.map((schedule) => (
                        <TableRow key={schedule.id}>
                            <TableCell>{schedule.id}</TableCell>
                            <TableCell>{schedule.Departure_Time}</TableCell>
                            <TableCell>{schedule.Location}</TableCell>
                            <TableCell>{schedule.Means_of_Transport}</TableCell>
                            <TableCell>{schedule.Work}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleClickOpenEdit(schedule)}>
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

            {/* Form Thêm Lịch Trình */}
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Thêm Lịch Trình</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Thời Gian Khởi Hành"
                        fullWidth
                        type="time"
                        sx={{ mb: 2 }}
                        InputProps={{
                            startAdornment: (
                                <AccessTimeIcon sx={{ marginRight: 1 }} />
                            )
                        }}
                    />
                    <TextField
                        label="Địa Điểm"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Phương Tiện Giao Thông"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Công Việc"
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

            {/* Form Chỉnh Sửa Lịch Trình */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Chỉnh Sửa Lịch Trình</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Thời Gian Khởi Hành"
                        value={editData ? editData.Departure_Time : ''}
                        fullWidth
                        type="time"
                        sx={{ mb: 2 }}
                        InputProps={{
                            startAdornment: (
                                <AccessTimeIcon sx={{ marginRight: 1 }} />
                            )
                        }}
                    />
                    <TextField
                        label="Địa Điểm"
                        value={editData ? editData.Location : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Phương Tiện Giao Thông"
                        value={editData ? editData.Means_of_Transport : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Công Việc"
                        value={editData ? editData.Work : ''}
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

export default ScheduleManagement;
