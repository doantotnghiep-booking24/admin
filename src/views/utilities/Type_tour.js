import { useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Button, TextField, Dialog, DialogActions, DialogContent,
    DialogTitle, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialTourTypes = [
    { id: 1, Name_Type: "Du lịch mạo hiểm" },
    { id: 2, Name_Type: "Du lịch văn hóa" },
    { id: 3, Name_Type: "Du lịch sinh thái" },
];

const TourTypeManagement = () => {
    const [tourTypes] = useState(initialTourTypes);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    const handleOpenAddDialog = () => setOpenAddDialog(true);
    const handleCloseAddDialog = () => setOpenAddDialog(false);

    const handleOpenEditDialog = (type) => {
        setSelectedType(type);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        setSelectedType(null);
        setOpenEditDialog(false);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            {/* Tiêu đề căn giữa */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Loại Tour
            </Typography>

            {/* Nút thêm loại tour nằm bên dưới tiêu đề */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
                <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
                    Thêm Loại Tour
                </Button>
            </Box>

            <Table aria-label="bảng loại tour">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên Loại Tour
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>
                                Hành động
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tourTypes.map((type) => (
                        <TableRow key={type.id}>
                            <TableCell>
                                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                    {type.id}
                                </Typography>
                            </TableCell>
                            <TableCell>{type.Name_Type}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleOpenEditDialog(type)}>
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

            {/* Form thêm loại tour */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                <DialogTitle>Thêm Loại Tour</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên Loại Tour"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleCloseAddDialog} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Form sửa loại tour */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Sửa Loại Tour</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên Loại Tour"
                        type="text"
                        fullWidth
                        variant="outlined"
                        defaultValue={selectedType?.Name_Type}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default TourTypeManagement;
