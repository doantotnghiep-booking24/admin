import { useEffect, useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Button, TextField, Dialog, DialogActions, DialogContent,
    DialogTitle, Box
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import ModalCustom from '../../modals/ModalCustom';

const initialTourTypes = [
    { id: 1, Name_Type: "Du lịch mạo hiểm" },
    { id: 2, Name_Type: "Du lịch văn hóa" },
    { id: 3, Name_Type: "Du lịch sinh thái" },
];

const TourTypeManagement = () => {
    const [tourTypes] = useState(initialTourTypes)
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [typeTours, setTypeTours] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [valueInput, setValueInput] = useState({
        Name_Type: ""
    })
    const [isModal, setIsModal] = useState(false)
    const [deletedId, setDeletedId] = useState("")
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
    const getAllTypeTours = async () => {
        setIsLoading(true)
        const api = "http://localhost:3001/V2/TypeTour/GetAllTypeTour"
        try {
            const res = await axios.get(api)
            const datas = await res.data
            const { TypeTour } = datas

            setTypeTours(TypeTour)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddTypeTours = async () => {
        const api = "http://localhost:3001/V2/TypeTour/CreateTypeTour"

        try {
            const res = await axios.post(api, valueInput)
            setOpenAddDialog(false)
            getAllTypeTours()

        } catch (error) {
            console.log(error);

        }

    }

    const handleGetValueInput = (e) => {
        const { name, value } = e.target;
        setValueInput({ ...valueInput, [name]: value })
    }
    const handleUpdateTypeTour = async () => {
        const api = "http://localhost:3001/V2/TypeTour/UpdateTypeTour/"
        try {

            const updatedType = valueInput.Name_Type === "" ? { Name_Type: selectedType.Name_Type } : valueInput;
            const res = await axios.post(`${api}${selectedType._id}`, updatedType)
            setOpenEditDialog(false)
            getAllTypeTours()

        } catch (error) {
            console.log(error);

        }
    }

    const handleDeleteTypeTour = async (id) => {
        const api = "http://localhost:3001/V2/TypeTour/DeleteTypeTour/"
        try {
            if (id) {
                const res = await axios.post(`${api}${id}`)
                getAllTypeTours()
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllTypeTours();
    }, [])



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
                    {isLoading && <CircularProgress />}
                    {typeTours?.map((type) => (
                        <TableRow key={type._id}>
                            <TableCell>
                                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                    {type._id}
                                </Typography>
                            </TableCell>
                            <TableCell>{type.Name_Type}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleOpenEditDialog(type)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => (setIsModal(true), setDeletedId(type._id))}>
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
                        name="Name_Type"

                        onChange={handleGetValueInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleAddTypeTours} color="primary">
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
                        name="Name_Type"
                        onChange={handleGetValueInput}
                        defaultValue={selectedType?.Name_Type}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleUpdateTypeTour} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
            <ModalCustom isModal={isModal} setIsModals={(value) => {
                setIsModal(value)
            }} actionId={deletedId} handleAction={(id) => {
                handleDeleteTypeTour(id)
            }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn xóa Loại Tour này không!" />
        </Paper>
    );
};

export default TourTypeManagement;
