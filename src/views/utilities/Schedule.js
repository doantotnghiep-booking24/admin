import { useState, useEffect } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';
import ModalCustom from '../../modals/ModalCustom';
import { toast } from 'react-toastify';
const initialSchedules = [
    {
        id: 1,
        Name_Schedule: "hanoi", Departure_Time: '08:00 AM', Location: 'Đà Nẵng', Means_of_Transport: 'Xe buýt', Work: 'Tham quan Bà Nà Hills'
    },

];

const ScheduleManagement = () => {
    const [schedules] = useState(initialSchedules);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [dataSchedule, setDataSchedule] = useState([])
    const [valueInput, setValueInput] = useState({
        _id: null,

        Location: "",
        means_of_transport: "",

    })

    const [isModal, setIsModal] = useState(false)
    const [deletedId, setDeletedId] = useState("")

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

    const getAllSchedule = async () => {
        setIsLoading(true)
        const api = "http://localhost:3001/Schedules/GetAllSchedule"
        try {
            const res = await axios.get(api)
            const datas = await res.data

            setDataSchedule(datas.Schedule_Travel)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddTypeTours = async () => {
        const api = "http://localhost:3001/Schedules/CreateSchedule"
        try {
            const res = await axios.post(api, valueInput)
            handleCloseAdd()
            getAllSchedule()
            notification("success", "Created Schedule successfully")
        } catch (error) {
            console.log(error);

        }

    }

    const handleGetValueInput = (e) => {
        const { name, value } = e.target;
        setValueInput({ ...valueInput, [name]: value })
    }
    const handleUpdateTypeTour = async () => {
        const api = "http://localhost:3001/Schedules/UpdateSchedule/"
        try {
            const updatedType = {
                ...editData,
                Location: valueInput.Location || editData.Location,
                means_of_transport: valueInput.means_of_transport || editData.means_of_transport,
              
            };
            const res = await axios.post(`${api}${editData._id}`, updatedType)
            console.log(res);
            getAllSchedule();
            handleCloseEdit();  // Đóng form edit
            notification("success", "Updated Schedule successfully")

        } catch (error) {
            console.log(error);

        }
    }

    const handleDeleteSchedule = async (id) => {
        const api = "http://localhost:3001/Schedules/DeleteSchedule/"
        try {
            if (id) {
                const res = await axios.post(`${api}${id}`)
                getAllSchedule()
                notification("success", "Deleted Schedule successfully")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllSchedule();
    }, [])
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
                                Địa Điểm
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Phương Tiện Giao Thông
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
                    {dataSchedule.map((schedule) => (
                        <TableRow key={schedule.id}>
                            <TableCell>{schedule._id}</TableCell>
                        
                           
                            <TableCell>{schedule.Location}</TableCell>
                            <TableCell>{schedule.means_of_transport}</TableCell>
                          
                            <TableCell align="right">
                                <IconButton onClick={() => handleClickOpenEdit(schedule)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => (setIsModal(true), setDeletedId(schedule._id))}>
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
                        name='Location'
                        label="Địa Điểm"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        name='means_of_transport'
                        label="Phương Tiện Giao Thông"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleAddTypeTours} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Lịch Trình */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Chỉnh Sửa Lịch Trình</DialogTitle>
                <DialogContent>
                   
                   

                    <TextField
                        name='Location'
                        label="Địa Điểm"
                        defaultValue={editData ? editData.Location : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        name='means_of_transport'
                        label="Phương Tiện Giao Thông"
                        defaultValue={editData ? editData.means_of_transport
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
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
                handleDeleteSchedule(id)
            }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn xóa Lịch trình này không!" />
        </Paper>
    );
};

export default ScheduleManagement;
