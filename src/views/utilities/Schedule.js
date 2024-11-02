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
        Name_Schedule: "Đà Nẵng",
        Location_map: "16.058571464796255, 108.13758074122495",
        Time_Morning_Schedule: "08:00 AM",
        Text_Schedule_Morning: "Tham quan Bà Nà Hills",
        Time_Noon_Schedule: "12:00 PM",
        Text_Schedule_Noon: "Ăn trưa tại nhà hàng địa phương",
        Time_Afternoon_Schedule: "02:00 PM",
        Text_Schedule_Afternoon: "Tham quan phố cổ",
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
        Name_Schedule: "",
        Location_map: "",
        Time_Morning_Schedule: "",
        Text_Schedule_Morning: "",
        Time_Noon_Schedule: "",
        Text_Schedule_Noon: "",
        Time_Afternoon_Schedule: "",
        Text_Schedule_Afternoon: "",

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
            console.log(datas.Schedule_Travel);
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
                Name_Schedule: valueInput.Name_Schedule || editData.Name_Schedule,
                Location_map: valueInput.Location_map || editData.Location_map,
                Time_Morning_Schedule: valueInput.Time_Morning_Schedule || editData.Time_Morning_Schedule,
                Text_Schedule_Morning: valueInput.Text_Schedule_Morning || editData.Text_Schedule_Morning,
                Time_Noon_Schedule: valueInput.Time_Noon_Schedule || editData.Time_Noon_Schedule,
                Text_Schedule_Noon: valueInput.Text_Schedule_Noon || editData.Text_Schedule_Noon,
                Time_Afternoon_Schedule: valueInput.Time_Afternoon_Schedule || editData.Time_Afternoon_Schedule,
                Text_Schedule_Afternoon: valueInput.Text_Schedule_Afternoon || editData.Text_Schedule_Afternoon,
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
                                Tên lịch trình
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Vị trí trên bản đồ
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Buổi sáng
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Biểu trưa
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Buổi chiều
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
                        <TableRow key={schedule._id}>
                            <TableCell>{schedule._id}</TableCell>
                            <TableCell>{schedule.Name_Schedule}</TableCell>
                            <TableCell>{schedule.Location_map}</TableCell>
                            <TableCell>{schedule.Shedule_Morning[0].Time_Morning_Schedule} - {schedule.Shedule_Morning[0].Text_Schedule_Morning}</TableCell>
                            <TableCell>{schedule.Shedule_Noon[0].Time_Noon_Schedule} - {schedule.Shedule_Noon[0].Text_Schedule_Noon}</TableCell>
                            <TableCell>{schedule.Shedule_Afternoon[0].Time_Afternoon_Schedule} - {schedule.Shedule_Afternoon[0].Text_Schedule_Afternoon}</TableCell>

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
                        name='Name_Schedule'
                        label="Tên lịch trình"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        name='Location_map'
                        label="Vị trí trên bản đồ"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        name='Time_Morning_Schedule'
                        label="Thời gian buổi sáng"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />

                    <TextField
                        name='Text_Schedule_Morning'
                        label="Buổi sáng làm gì"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />

                    <TextField
                        name='Time_Noon_Schedule'
                        label="Thời gian buổi trưa"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />

                    <TextField
                        name='Text_Schedule_Noon'
                        label="Buổi trưa làm gì"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        name='Time_Afternoon_Schedule'
                        label="Thời gian buổi chiều"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />

                    <TextField
                        name='Text_Schedule_Afternoon'
                        label="Buổi chiều làm gì"
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
                        name='Name_Schedule'
                        label="Tên lịch trình"
                        defaultValue={editData ? editData.Name_Schedule : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        name='Location_map'
                        label="Vị trí trên bản đồ"
                        defaultValue={editData ? editData.Location_map
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        name='Time_Morning_Schedule'
                        label="Thời gian buổi sáng"
                        defaultValue={editData ? editData.Time_Morning_Schedule
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        name='Text_Schedule_Morning'
                        label="Buổi sáng làm gì"
                        defaultValue={editData ? editData.Text_Schedule_Morning
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />

                    <TextField
                        name='Time_Noon_Schedule'
                        label="Thời gian buổi trưa"
                        defaultValue={editData ? editData.Time_Noon_Schedule
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        name='Text_Schedule_Noon'
                        label="Buổi trưa làm gì"
                        defaultValue={editData ? editData.Text_Schedule_Noon
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    /><TextField
                        name='Time_Afternoon_Schedule'
                        label="Thời gian buổi chiều"
                        defaultValue={editData ? editData.Time_Afternoon_Schedule
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        name='Text_Schedule_Afternoon'
                        label="Buổi chiều làm gì"
                        defaultValue={editData ? editData.Text_Schedule_Afternoon
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
