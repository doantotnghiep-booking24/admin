import { useEffect, useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import validator from 'validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalCustom from '../../modals/ModalCustom';

const initialServices = [
    {
        id: 1,
        Name_Service: "Khách Sạn",
        Price_Service: "500,000 VND"
    },
    {
        id: 2,
        Name_Service: "Ăn Uống",
        Price_Service: "300,000 VND"
    },
    {
        id: 3,
        Name_Service: "Đưa Đón",
        Price_Service: "1,200,000 VND"
    }
];

const ServiceManagement = () => {
    const [services] = useState(initialServices);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [dataService, setDataService] = useState([])
    const [valueInput, setValueInput] = useState({
        _id: null,
        Name_Service: "",
        Price_Service: ''
    })

    const [errors, setErrors] = useState({
        _id: null,
        Name_Service: "",
        Price_Service: ''
    })

    const validateForm = (data) => {
        const newErrors = {};
        //name
        if(validator.isEmpty(data.Name_Service)) {
            newErrors.Name_Service = 'Tên dịch vụ không được để trống'
        }
        // price
        if (!validator.isNumeric(data.Price_Service) || Number(data.Price_Service) <= 0) {
            newErrors.Price_Service = 'Giá dịch vụ không được để trống'
        }
        return newErrors;
    }

    const [isModal, setIsModal] = useState(false)
    const [deletedId, setDeletedId] = useState("")

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleClickOpenEdit = (service) => {
        setEditData(service);
        setValueInput({
            _id: service._id,
            Name_Service: service.Name_Service,
            Price_Service: service.Price_Service
        });
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };


    const getAllService = async () => {
        setIsLoading(true)
        const api = "http://localhost:3001/Services/GetAllService"
        try {
            const res = await axios.get(api, { withCredentials: true})
            const datas = await res.data
            console.log(datas.Services);
            setDataService(datas.Services)
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


    const handleAddService = async () => {
        const validationErrors = validateForm(valueInput);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        setIsLoading(true);  // Bắt đầu loading
    
        const api = "http://localhost:3001/Services/CreateService";
        try {
            const res = await axios.post(api, valueInput, { withCredentials: true });
            handleCloseAdd();
            getAllService();
            notification("success", "Created Service successfully");
        } catch (error) {
            console.log(error);
            notification("error", "Error creating Service");
        } finally {
            setIsLoading(false);  // Kết thúc loading
        }
    };
    
    console.log(valueInput);
    const handleUpdateService = async () => {
        const validationErrors = validateForm(valueInput);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        setIsLoading(true);  // Bắt đầu loading
    
        const api = "http://localhost:3001/Services/UpdateService/";
        try {
            const updatedType = {
                ...editData,
                Name_Service: valueInput.Name_Service || editData.Name_Service,
                Price_Service: valueInput.Price_Service || editData.Price_Service,
            };
            const res = await axios.post(`${api}${editData._id}`, updatedType, { withCredentials: true });
            console.log(res);
            getAllService();
            handleCloseEdit(); // Đóng form edit
            notification("success", "Updated Service successfully");
        } catch (error) {
            console.log(error);
            notification("error", "Error updating Service");
        } finally {
            setIsLoading(false);  // Kết thúc loading
        }
    };
    

    const handleDeleteService = async (id) => {
        const api = "http://localhost:3001/Services/DeleteService/"
        try {
            if (id) {
                const res = await axios.post(`${api}${id}`)
                getAllService()
                notification("success", "Deleted Schedule successfully")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllService();
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
            {/* Tiêu đề căn giữa */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Dịch Vụ
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpenAdd}
                sx={{ mb: 2 }}
            >
                Thêm Dịch Vụ
            </Button>

            {/* Bảng Dịch Vụ */}
            <Table aria-label="bảng dịch vụ">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên Dịch Vụ
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Giá Dịch Vụ
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
                    {dataService.map((service) => (
                        <TableRow key={service._id}>
                            <TableCell>{service._id}</TableCell>
                            <TableCell>{service.Name_Service}</TableCell>
                            <TableCell>{service.Price_Service}</TableCell>
                            <TableCell align="right">
                            <IconButton onClick={() => handleClickOpenEdit(service)}>
                                <EditIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={() => (setIsModal(true), setDeletedId(service._id))}>
                                <DeleteIcon color="secondary" />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Form Thêm Dịch Vụ */}
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Thêm Dịch Vụ</DialogTitle>
                <DialogContent>
                    <TextField
                        name='Name_Service'
                        label="Tên Dịch Vụ"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Name_Service}  
                        helperText={errors.Name_Service} 
                    />
                    <TextField
                    name='Price_Service'
                        label="Giá Dịch Vụ"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Price_Service}
                        helperText={errors.Price_Service}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleAddService} color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : "Thêm"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Dịch Vụ */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Chỉnh Sửa Dịch Vụ</DialogTitle>
                <DialogContent>
                    <TextField
                        name='Name_Service'
                        label="Tên Dịch Vụ"
                        value={valueInput.Name_Service}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Name_Service}
                        helperText={errors.Name_Service}
                    />
                    <TextField
                        name='Price_Service'
                        label="Giá Dịch Vụ"
                        value={valueInput.Price_Service}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleGetValueInput}
                        error={!!errors.Price_Service}
                        helperText={errors.Price_Service}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleUpdateService} color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : "Lưu"}
                    </Button>
                </DialogActions>
            </Dialog>
            <ModalCustom isModal={isModal} setIsModals={(value) => {
                setIsModal(value)
            }} actionId={deletedId} handleAction={(id) => {
                handleDeleteService(id)
            }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn xóa Lịch trình này không!" />
        </Paper>
    );
};

export default ServiceManagement;
