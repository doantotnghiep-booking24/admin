import { useState, useEffect } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';
import ModalCustom from '../../modals/ModalCustom';
import { toast } from 'react-toastify';
import validator from 'validator';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RecyclingIcon from '@mui/icons-material/Recycling';
import ModalRestore from '../../modals/ModalRestore';
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

    const [errors, setErrors] = useState({
        Name_Schedule: "",
        Location_map: "",
        Time_Morning_Schedule: "",
        Text_Schedule_Morning: "",
        Time_Noon_Schedule: "",
        Text_Schedule_Noon: "",
        Time_Afternoon_Schedule: "",
        Text_Schedule_Afternoon: "",
    })

    const validateForm = (data) => {
        const newErrors = {};
        // name
        if (validator.isEmpty(data.Name_Schedule)) {
            newErrors.Name_Schedule = 'Tên lịch trình không được để trống!'
        }
        // location map
        if (validator.isEmpty(data.Location_map)) {
            newErrors.Location_map = 'Vị trí trê bản đồ không được để trống!'
        }
        // Tgian buổi sáng
        if (validator.isEmpty(data.Time_Morning_Schedule)) {
            newErrors.Time_Morning_Schedule = 'Thời giann buổi sáng không được để trống'
        }
        // Lịch trình buổi sáng
        if (validator.isEmpty(data.Text_Schedule_Morning)) {
            newErrors.Text_Schedule_Morning = 'Lịch trình buổi sáng không được bỏ trống'
        }
        // Thời gian buổi trưa
        if (validator.isEmpty(data.Time_Noon_Schedule)) {
            newErrors.Time_Noon_Schedule = 'Thời gian buổi trưa không được để trống'
        }
        // lịch trình buổi trưa
        if (validator.isEmpty(data.Text_Schedule_Noon)) {
            newErrors.Text_Schedule_Noon = 'Lịch trình buổi trưa không được để trống'
        }
        // thời gian buổi chiều
        if (validator.isEmpty(data.Time_Afternoon_Schedule)) {
            newErrors.Time_Afternoon_Schedule = 'Thời gian buổi chiều không được bỏ trống'
        }
        // lịch trình buổi chiều 
        if (validator.isEmpty(data.Text_Schedule_Afternoon)) {
            newErrors.Text_Schedule_Afternoon = 'Lịch trình buổi chiều không được để trống';
        }
        return newErrors;
    }


    const [isModal, setIsModal] = useState(false)
    const [deletedId, setDeletedId] = useState("")
    const [openTrash, setOpenTrash] = useState(false);
    const [scheduleTrash, setScheduleTrash] = useState([])
    const [isModalRestore, setIsModalRestore] = useState(false);
    const [restoreId, setRestoreId] = useState("")
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
            const res = await axios.get(api, { withCredentials: true })
            const datas = await res.data
            const dataUndelete = datas.Schedule_Travel.filter(t => t.isDeleted === false);
            const dataDeleted = datas.Schedule_Travel.filter(t => t.isDeleted === true);
            setScheduleTrash(dataDeleted);
            setDataSchedule(dataUndelete)
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
    const handleAddSchedule = async () => {
        const errors = validateForm(valueInput);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        setIsLoading(true); // Bắt đầu loading
    
        const api = "http://localhost:3001/Schedules/CreateSchedule";
        try {
            const res = await axios.post(api, valueInput, { withCredentials: true });
            handleCloseAdd();
            getAllSchedule();
            notification("success", "Created Schedule successfully");
        } catch (error) {
            console.log(error);
            notification("error", "Error creating Schedule");
        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    };
    
    const handleUpdateSchedule = async () => {
        const errors = validateForm(valueInput);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        setIsLoading(true); // Bắt đầu loading
    
        const api = "http://localhost:3001/Schedules/UpdateSchedule/";
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
            const res = await axios.post(`${api}${editData._id}`, updatedType, { withCredentials: true });
            console.log(res);
            getAllSchedule();
            handleCloseEdit(); // Đóng form edit
            notification("success", "Updated Schedule successfully");
        } catch (error) {
            console.log(error);
            notification("error", "Error updating Schedule");
        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    };
    
    const handleDeleteSchedule = async (id) => {
        const api = "http://localhost:3001/Schedules/DeleteSchedule/"
        const apiRemove = "http://localhost:3001/Schedules/RemoveSchedule/"
        try {
            if (id) {
                if (openTrash) {
                    const res = await axios.post(`${api}${id}`, {}, { withCredentials: true })
                    await getAllSchedule()
                    notification("success", "Deleted Schedule successfully")
                } else {
                    const res = await axios.post(`${apiRemove}${id}`, {}, { withCredentials: true })
                    await getAllSchedule()
                    notification("success", "Deleted Schedule successfully")
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRestore = async (id) => {
        const api = `http://localhost:3001/Schedules/RemoveSchedule/${id}`

        try {
            const result = await axios.post(api, {}, { withCredentials: true });
            await getAllSchedule()
            notification("success", "Khôi phục  Tour thành công")
        } catch (e) {
            console.log(e);

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



            <Box sx={{
                display: "flex",
                gap: 2,
                mb: 2
            }}>
                {!openTrash && <Button variant="contained" color="primary" onClick={handleClickOpenAdd}>
                    Thêm Lịch Trình
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
                {openTrash ? <TableBody>

                    {scheduleTrash?.length > 0 ? scheduleTrash?.map((schedule) => (
                        <TableRow key={schedule._id}>
                            <TableCell>{schedule._id}</TableCell>
                            <TableCell>{schedule.Name_Schedule}</TableCell>
                            <TableCell>{schedule.Location_map}</TableCell>
                            <TableCell>{schedule.Shedule_Morning[0].Time_Morning_Schedule} - {schedule.Shedule_Morning[0].Text_Schedule_Morning}</TableCell>
                            <TableCell>{schedule.Shedule_Noon[0].Time_Noon_Schedule} - {schedule.Shedule_Noon[0].Text_Schedule_Noon}</TableCell>
                            <TableCell>{schedule.Shedule_Afternoon[0].Time_Afternoon_Schedule} - {schedule.Shedule_Afternoon[0].Text_Schedule_Afternoon}</TableCell>

                            <TableCell align="right">
                                <IconButton onClick={() => (setRestoreId(schedule._id), setIsModalRestore(true))}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => (setIsModal(true), setDeletedId(schedule._id))}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )) : <TableRow>
                        <TableCell colSpan={10} align="center">Thùng rác rỗng</TableCell>
                    </TableRow>}

                </TableBody> : <TableBody>


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
                </TableBody>}

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
                        error={!!errors.Name_Schedule}
                        helperText={errors.Name_Schedule}
                    />
                    <TextField
                        name='Location_map'
                        label="Vị trí trên bản đồ"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Location_map}
                        helperText={errors.Location_map}
                    />
                    <TextField
                        name='Time_Morning_Schedule'
                        label="Thời gian buổi sáng"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Time_Morning_Schedule}
                        helperText={errors.Time_Morning_Schedule}
                    />

                    <TextField
                        name='Text_Schedule_Morning'
                        label="Buổi sáng làm gì"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Text_Schedule_Morning}
                        helperText={errors.Text_Schedule_Morning}
                    />

                    <TextField
                        name='Time_Noon_Schedule'
                        label="Thời gian buổi trưa"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Time_Noon_Schedule}
                        helperText={errors.Time_Noon_Schedule}
                    />

                    <TextField
                        name='Text_Schedule_Noon'
                        label="Buổi trưa làm gì"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Text_Schedule_Noon}
                        helperText={errors.Text_Schedule_Noon}
                    />
                    <TextField
                        name='Time_Afternoon_Schedule'
                        label="Thời gian buổi chiều"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Time_Afternoon_Schedule}
                        helperText={errors.Time_Afternoon_Schedule}
                    />

                    <TextField
                        name='Text_Schedule_Afternoon'
                        label="Buổi chiều làm gì"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Text_Schedule_Afternoon}
                        helperText={errors.Text_Schedule_Afternoon}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleAddSchedule} color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : "Thêm"}
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
                        error={!!errors.Name_Schedule}
                        helperText={errors.Name_Schedule}
                    />
                    <TextField
                        name='Location_map'
                        label="Vị trí trên bản đồ"
                        defaultValue={editData ? editData.Location_map
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Location_map}
                        helperText={errors.Location_map}
                    />
                    <TextField
                        name='Time_Morning_Schedule'
                        label="Thời gian buổi sáng"
                        defaultValue={editData ? editData.Time_Morning_Schedule
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Time_Morning_Schedule}
                        helperText={errors.Time_Morning_Schedule}
                    />
                    <TextField
                        name='Text_Schedule_Morning'
                        label="Buổi sáng làm gì"
                        defaultValue={editData ? editData.Text_Schedule_Morning
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Text_Schedule_Morning}
                        helperText={errors.Text_Schedule_Morning}
                    />

                    <TextField
                        name='Time_Noon_Schedule'
                        label="Thời gian buổi trưa"
                        defaultValue={editData ? editData.Time_Noon_Schedule
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Time_Noon_Schedule}
                        helperText={errors.Time_Noon_Schedule}
                    />
                    <TextField
                        name='Text_Schedule_Noon'
                        label="Buổi trưa làm gì"
                        defaultValue={editData ? editData.Text_Schedule_Noon
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Text_Schedule_Noon}
                        helperText={errors.Text_Schedule_Noon}
                    />
                    <TextField
                        name='Time_Afternoon_Schedule'
                        label="Thời gian buổi chiều"
                        defaultValue={editData ? editData.Time_Afternoon_Schedule
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Time_Afternoon_Schedule}
                        helperText={errors.Time_Afternoon_Schedule}
                    />
                    <TextField
                        name='Text_Schedule_Afternoon'
                        label="Buổi chiều làm gì"
                        defaultValue={editData ? editData.Text_Schedule_Afternoon
                            : ''}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Text_Schedule_Afternoon}
                        helperText={errors.Text_Schedule_Afternoon}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleUpdateSchedule} color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : "Lưu"}
                    </Button>
                </DialogActions>
            </Dialog>
            <ModalCustom isModal={isModal} setIsModals={(value) => {
                setIsModal(value)
            }} actionId={deletedId} handleAction={(id) => {
                handleDeleteSchedule(id)
            }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn xóa Lịch trình này không!" openTrash={openTrash}/>
            <ModalRestore isModalRestore={isModalRestore} setIsModalRestore={(value) => {
                setIsModalRestore(value)
            }} actionId={restoreId} handleAction={(id) => {
                handleRestore(id)
            }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn khôi phục Lịch trình này không!" />
        </Paper>
    );
};

export default ScheduleManagement;
