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
import { toast } from 'react-toastify';
import validator from 'validator';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RecyclingIcon from '@mui/icons-material/Recycling';
import ModalRestore from '../../modals/ModalRestore';
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

    const [errors, setErrors] = useState({
        Name_Type: '',
    })

    const validateForm = (data) => {
        const newErrors = {};
        // name
        if (validator.isEmpty(data.Name_Type)) {
            newErrors.Name_Type = 'Tên địa điểm không được để trống!'
        }
        return newErrors;
    }


    const [isModal, setIsModal] = useState(false)
    const [deletedId, setDeletedId] = useState("")
    const [openTrash, setOpenTrash] = useState(false);
    const [typeTourTrash, setTypeTourTrash] = useState([])
    const [isModalRestore, setIsModalRestore] = useState(false);
    const [restoreId, setRestoreId] = useState("")

    useEffect(() => {
        getAllTypeTours();
    }, [])
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
            const res = await axios.get(api, { withCredentials: true })
            const datas = await res.data
            const { TypeTour } = datas
            const typeTourDeleted = TypeTour.filter(t => t.isDeleted === true);
            const typeTourUndeleted = TypeTour.filter(t => t.isDeleted === false);
            setTypeTourTrash(typeTourDeleted)

            
            setTypeTours(typeTourUndeleted)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    const handleGetValueInput = (e) => {
        const { name, value } = e.target;
        setValueInput({ ...valueInput, [name]: value })
    }

    const handleAddTypeTours = async () => {
        const errors = validateForm(valueInput);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        setIsLoading(true);  // Bắt đầu loading
    
        const api = "http://localhost:3001/V2/TypeTour/CreateTypeTour";
    
        try {
            const res = await axios.post(api, valueInput, { withCredentials: true });
            setOpenAddDialog(false);
            getAllTypeTours();
            notification("success", "Created Type Tour successfully");
        } catch (error) {
            console.log(error);
            notification("error", "Error creating Type Tour");
        } finally {
            setIsLoading(false);  // Kết thúc loading
        }
    };
    
    const handleUpdateTypeTour = async () => {
        const errors = validateForm(valueInput);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        setIsLoading(true);  // Bắt đầu loading
    
        const api = "http://localhost:3001/V2/TypeTour/UpdateTypeTour/";
    
        try {
            const updatedType = valueInput.Name_Type === "" ? { Name_Type: selectedType.Name_Type } : valueInput;
            const res = await axios.post(`${api}${selectedType._id}`, updatedType, { withCredentials: true });
            setOpenEditDialog(false);
            getAllTypeTours();
            notification("success", "Updated Type Tour successfully");
        } catch (error) {
            console.log(error);
            notification("error", "Error updating Type Tour");
        } finally {
            setIsLoading(false);  // Kết thúc loading
        }
    };
    

    const handleDeleteTypeTour = async (id) => {
        const api = "http://localhost:3001/V2/TypeTour/DeleteTypeTour/"
        const apiRemove = 'http://localhost:3001/V2/TypeTour/RemoveTypeTour/'
        try {
            if (id) {
                if (openTrash) {
                    const res = await axios.post(`${api}${id}`, {}, { withCredentials: true })
                    await getAllTypeTours()
                    notification("success", "Deleted Type Tour successfully")
                } else {
                    const res = await axios.post(`${apiRemove}${id}`, {}, { withCredentials: true })
                    await getAllTypeTours()
                    notification("success", "Deleted Type Tour successfully")
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRestore = async (id) => {
        const api = `http://localhost:3001/V2/TypeTour/RestoreTypeTour/${id}`

        try {
            const result = await axios.post(api, {}, { withCredentials: true });
            await getAllTypeTours()
            notification("success", "Khôi phục  Tour thành công")
        } catch (e) {
            console.log(e);

        }

    }

    const notification = (status, message) => {
        return toast[status](message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }


    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            {/* Tiêu đề căn giữa */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Loại Tour
            </Typography>

            {/* Nút thêm loại tour nằm bên dưới tiêu đề */}
            <Box sx={{
                display: "flex",
                gap: 2,
                marginBottom: 3
            }}>
                {!openTrash && <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
                    Thêm Loại Tour
                </Button>}

                <Button variant="contained" sx={{
                    bgcolor: openTrash ? "blue" : "red"
                }} onClick={() => setOpenTrash(!openTrash)} >
                    {openTrash ? (
                        <>
                            Quay lại
                            <ArrowBackIcon sx={{ fontSize: "17px" }} />
                        </>
                    ) : (
                        <>
                            Thùng rác
                            <RecyclingIcon sx={{ fontSize: "17px" }} />
                        </>
                    )}
                </Button></Box>

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
                {openTrash ? <TableBody>
                    {isLoading && <CircularProgress />}
                    {typeTourTrash.length > 0 ? typeTourTrash?.map((type) => (
                        <TableRow key={type._id}>
                            <TableCell>
                                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                    {type._id}
                                </Typography>
                            </TableCell>
                            <TableCell>{type.Name_Type}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => (setIsModalRestore(true), setRestoreId(type._id))}>
                                    <RestoreIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => (setIsModal(true), setDeletedId(type._id))}>
                                    <DeleteForeverIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )) : <TableRow>
                        <TableCell colSpan={10} align="center">Thùng rác rỗng</TableCell>
                    </TableRow>}

                </TableBody> : <TableBody>
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
                </TableBody>}

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
                        error={!!errors.Name_Type}
                        helperText={errors.Name_Type}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleAddTypeTours} color="primary" disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : "Thêm"}
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
                        error={!!errors.Name_Type}
                        helperText={errors.Name_Type}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleUpdateTypeTour} color="primary" disabled={isLoading} >
                    {isLoading ? <CircularProgress size={24} /> : "Lưu"}
                    </Button>
                </DialogActions>
            </Dialog>
            <ModalCustom isModal={isModal} setIsModals={(value) => {
                setIsModal(value)
            }} actionId={deletedId} handleAction={(id) => {
                handleDeleteTypeTour(id)
            }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn xóa Loại Tour này không!" />
            <ModalRestore isModalRestore={isModalRestore} setIsModalRestore={(value) => {
                setIsModalRestore(value)
            }} actionId={restoreId} handleAction={(id) => {
                handleRestore(id)
            }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn khôi phục Loại Tour này không!" />
        </Paper>
    );
};

export default TourTypeManagement;
