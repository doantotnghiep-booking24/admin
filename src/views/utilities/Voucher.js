import { useEffect, useState } from 'react';
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
    Box
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
const initialVouchers = [
    {
        id: 1,
        codeVoucher: "VOUCHER1",
        description: "Giảm giá 10% cho đơn hàng trên 500k",
        discount: "10%",
        type: "Giảm Giá",
        startDate: "2024-10-01",
        endDate: "2024-10-10",
        maxUsage: 100,
        conditions: "Áp dụng cho khách hàng mới",
    },
    {
        id: 2,
        codeVoucher: "VOUCHER2",
        description: "Giảm giá 15% cho đơn hàng trên 1 triệu",
        discount: "15%",
        type: "Giảm Giá",
        startDate: "2024-10-05",
        endDate: "2024-10-15",
        maxUsage: 50,
        conditions: "Áp dụng cho tất cả khách hàng",
    },
    // Bạn có thể thêm nhiều voucher hơn nữa
];

const VoucherManagement = () => {
    const [vouchers] = useState(initialVouchers);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [valueInput, setValueInput] = useState({

        Code_Voucher: '',
        Description: '',
        Discount: '',
        Type: '',
        Start_Date: '',
        End_Date: '',
        Max_Usage: '',
        Condition: ''
    })
    const [dataVoucher, setDataVoucher] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [deletedId, setDeletedId] = useState("")
    const [errors, setErrors] = useState({
        Code_Voucher: '',
        Description: '',
        Discount: '',
        Type: '',
        Start_Date: '',
        End_Date: '',
        Max_Usage: '',
        Condition: ''
    });
    const validateForm = (data) => {
   
        
        const newErrors = {};
        if (validator.isEmpty(data.Code_Voucher)) {
            newErrors.Code_Voucher = 'Mã code không được để trống!';
        }
        if (validator.isEmpty(data.Description)) {
            newErrors.Description = 'Mô tả không được để trống!';
        }
        if (validator.isNumeric(data.Discount)) {
            newErrors.Discount = 'Giảm giá không được để trống!';
        }
        if (!validator.isDate(data.Start_Date)) {
            newErrors.Start_Date = 'Ngày bắt đầu không hợp lệ!';
        }
        if (!validator.isDate(data.End_Date)) {
            newErrors.End_Date = 'Ngày kết thúc không hợp lệ!';
        }
        if (!validator.isNumeric(data.Max_Usage)) {
            newErrors.Max_Usage = 'Giới hạn sử dụng phải là số!';
        }
        if (validator.isEmpty(data.Condition)) {
            newErrors.Condition = 'Điều kiện không được bỏ trống';
        }
        if (validator.isEmpty(data.Type)) {
            newErrors.Type = 'Loại voucher không được để trống'
        }
        return newErrors;
    };


    const [openTrash, setOpenTrash] = useState(false);
    const [voucherTrash, setVoucherTrash] = useState([])
    const [isModalRestore, setIsModalRestore] = useState(false);
    const [restoreId, setRestoreId] = useState("")
    const handleAddClickOpen = () => {
        setOpenAdd(true);
    };

    const handleEditClickOpen = (voucher) => {

        setValueInput({
            Code_Voucher: voucher.Code_Voucher,
            Description: voucher.Description,
            Discount: voucher.Discount,
            Type: voucher.Type,
            Start_Date: voucher.Start_Date,
            End_Date: voucher.End_Date,
            Max_Usage: voucher.Max_Usage,
            Condition: voucher.Condition
        }); // Đặt giá trị input cho dialog chỉnh sửa

        setSelectedVoucher(voucher);
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenAdd(false);
        setOpenEdit(false);
        setSelectedVoucher(null);
    };

    const handleGetValueInput = (e) => {
        const { name, value } = e.target;
        setValueInput({ ...valueInput, [name]: value })
    }

    const getAllVoucher = async () => {

        const api = "http://localhost:3001/Vouchers/GetAllVoucher"
        try {
            const res = await axios.get(api)
            const datas = await res.data;
            const dataVoucherUnDeleted = datas.Voucher.filter(t => t.isDeleted === false)
            const voucherDeleted = datas.Voucher.filter(t => t.isDeleted === true)
            setVoucherTrash(voucherDeleted)
            setDataVoucher(dataVoucherUnDeleted)


        } catch (error) {
            console.log(error);
        }
    }

    const handleAddVoucher = async () => {
        const errors = validateForm(valueInput);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setIsLoading(true); // Bắt đầu loading

        const api = "http://localhost:3001/Vouchers/CreateVoucher";
        try {
            const res = await axios.post(api, valueInput, { withCredentials: true });
            setValueInput({});
            getAllVoucher();
            handleClose();
            notification("success", "Created Voucher successfully");
        } catch (error) {
            console.log(error);
            notification("error", "Error creating Voucher");
        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    };

    const handleUpdateVoucher = async () => {
        
        // const errors = validateForm(valueInput);
        // if (Object.keys(errors).length > 0) {
        //     setErrors(errors);
        //     return;
        // }
        const api = "http://localhost:3001/Vouchers/UpdateVoucher/"
        try {
            const updatedType = {
                Code_Voucher: valueInput.Code_Voucher || selectedVoucher.Code_Voucher,
                Description: valueInput.Description || selectedVoucher.Description,
                Discount: valueInput.Discount || selectedVoucher.Discount,
                Type: valueInput.Type || selectedVoucher.Type,
                Start_Date: valueInput.Start_Date || selectedVoucher.Start_Date,
                End_Date: valueInput.End_Date || selectedVoucher.End_Date,
                Max_Usage: valueInput.Max_Usage || selectedVoucher.Max_Usage,
                Condition: valueInput.Condition || selectedVoucher.Condition,
            };

            const res = await axios.post(`${api}${selectedVoucher._id}`, updatedType, { withCredentials: true });
            console.log(res);
            getAllVoucher();
            handleClose();
            notification("success", "Updated Voucher successfully");
        } catch (error) {
            console.log(error);
            notification("error", "Error updating Voucher");
        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    };



    const handleDeleteVoucher = async (id) => {
        const api = "http://localhost:3001/Vouchers/DeleteVoucher/"
        const apiRemove = "http://localhost:3001/Vouchers/RemoveVoucher/"
        try {
            if (id) {
                if (openTrash) {
                    const res = await axios.post(`${api}${id}`, {}, { withCredentials: true })

                    await getAllVoucher();
                    notification("success", "Deleted Voucher successfully")
                } else {
                    const res = await axios.post(`${apiRemove}${id}`, {}, { withCredentials: true })
                    await getAllVoucher();
                    notification("success", "Deleted Voucher successfully")
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRestore = async (id) => {
        const api = `http://localhost:3001/Vouchers/RestoreVoucher/${id}`

        try {
            const result = await axios.post(api, {}, { withCredentials: true });
            await getAllVoucher()
            notification("success", "Khôi phục  Tour thành công")
        } catch (e) {
            console.log(e);

        }

    }
    useEffect(() => {
        getAllVoucher();
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
                Quản Lý Voucher
            </Typography>



            <Box sx={{
                display: "flex",
                gap: 2
            }}>
                {!openTrash && <Button variant="contained" color="primary" onClick={handleAddClickOpen}>
                    Thêm Khuyến mãi
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

            <Table aria-label="bảng voucher" sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Id</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Code Voucher</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Mô Tả</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Giảm Giá</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Loại</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Ngày Bắt Đầu</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Ngày Kết Thúc</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Số Lượng Tối Đa</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Điều Kiện</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>

                {openTrash ? (
                    <TableBody>
                        {voucherTrash?.length > 0 ? (
                            voucherTrash.map((voucher) => (
                                <TableRow key={voucher._id}>
                                    <TableCell>{voucher._id}</TableCell>
                                    <TableCell>{voucher.Code_Voucher}</TableCell>
                                    <TableCell>{voucher.Description}</TableCell>
                                    <TableCell>{voucher.Discount}</TableCell>
                                    <TableCell>{voucher.Type}</TableCell>
                                    <TableCell>{voucher.Start_Date}</TableCell>
                                    <TableCell>{voucher.End_Date}</TableCell>
                                    <TableCell>{voucher.Max_Usage}</TableCell>
                                    <TableCell>
                                        {`Yêu cầu tên tour: ${voucher.Condition?.Name_tour || ''}, ${voucher.Condition?.Min_tour_value || ''}, ${voucher.Condition?.Tour_categories || ''}`}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => (setRestoreId(voucher._id), setIsModalRestore(true))}>
                                            <RestoreIcon />
                                        </IconButton>
                                        <IconButton onClick={() => (setIsModal(true), setDeletedId(voucher._id))}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={10} align="center">Thùng rác rỗng</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                ) : (
                    <TableBody>
                        {dataVoucher?.map((voucher) => (
                            <TableRow key={voucher._id}>
                                <TableCell>{voucher._id}</TableCell>
                                <TableCell>{voucher.Code_Voucher}</TableCell>
                                <TableCell>{voucher.Description}</TableCell>
                                <TableCell>{voucher.Discount}</TableCell>
                                <TableCell>{voucher.Type}</TableCell>
                                <TableCell>{voucher.Start_Date}</TableCell>
                                <TableCell>{voucher.End_Date}</TableCell>
                                <TableCell>{voucher.Max_Usage}</TableCell>
                                <TableCell>
                                    {`Yêu cầu tên tour: ${voucher.Condition?.Name_tour || ''}, ${voucher.Condition?.Min_tour_value || ''}, ${voucher.Condition?.Tour_categories || ''}`}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEditClickOpen(voucher)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => (setIsModal(true), setDeletedId(voucher._id))}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}


            </Table>

            {/* Form Thêm Voucher */}
            <Dialog open={openAdd} onClose={handleClose}>
                <DialogTitle>Thêm Voucher Mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Code Voucher"
                        fullWidth
                        variant="outlined"
                        name='Code_Voucher'
                        onChange={handleGetValueInput}
                        error={!!errors.Code_Voucher}
                        helperText={errors.Code_Voucher}
                    />
                    <TextField
                        margin="dense"
                        label="Mô Tả"
                        fullWidth
                        variant="outlined"
                        name="Description"
                        onChange={handleGetValueInput}
                        error={!!errors.Description}
                        helperText={errors.Description}

                    />
                    <TextField
                        margin="dense"
                        label="Giảm Giá"
                        fullWidth
                        variant="outlined"
                        name="Discount"
                        onChange={handleGetValueInput}
                        error={!!errors.Discount}
                        helperText={errors.Discount}
                    />
                    <TextField
                        margin="dense"
                        label="Loại"
                        fullWidth
                        variant="outlined"
                        name='Type'
                        onChange={handleGetValueInput}
                        error={!!errors.Type}
                        helperText={errors.Type}
                    />
                    <TextField
                        margin="dense"
                        label="Ngày Bắt Đầu"
                        type="date"
                        fullWidth
                        variant="outlined"
                        name='Start_Date'
                        onChange={handleGetValueInput}
                        error={!!errors.Start_Date}
                        helperText={errors.Start_Date}
                    />
                    <TextField
                        margin="dense"
                        label="Ngày Kết Thúc"
                        type="date"
                        fullWidth
                        variant="outlined"
                        name="End_Date"
                        onChange={handleGetValueInput}
                        error={!!errors.End_Date}
                        helperText={errors.End_Date}
                    />
                    <TextField
                        margin="dense"
                        label="Số Lượng Tối Đa"
                        fullWidth
                        variant="outlined"
                        onChange={handleGetValueInput}
                        name='Max_Usage'
                        error={!!errors.Max_Usage}
                        helperText={errors.Max_Usage}
                    />
                    <TextField
                        margin="dense"
                        label="Điều Kiện"
                        fullWidth
                        variant="outlined"
                        name='Condition'
                        onChange={handleGetValueInput}
                        error={!!errors.Condition}
                        helperText={errors.Condition}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleAddVoucher} color="primary" disabled={isLoading} > {isLoading ? <CircularProgress size={24} /> : "Thêm"} </Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Voucher */}
            <Dialog open={openEdit} onClose={handleClose}>
                <DialogTitle>Chỉnh Sửa Voucher</DialogTitle>
                <DialogContent>
                    {selectedVoucher && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Code Voucher"
                                fullWidth
                                variant="outlined"
                                name='Code_Voucher'
                                value={valueInput.Code_Voucher}
                                onChange={handleGetValueInput}
                                error={!!errors.Code_Voucher}
                                helperText={errors.Code_Voucher}
                            />
                            <TextField
                                margin="dense"
                                label="Mô Tả"
                                fullWidth
                                variant="outlined"
                                name="Description"
                                value={valueInput.Description}
                                onChange={handleGetValueInput}
                                error={!!errors.Description}
                                helperText={errors.Description}
                            />
                            <TextField
                                margin="dense"
                                label="Giảm Giá"
                                fullWidth
                                variant="outlined"
                                name="Discount"
                                value={valueInput.Discount}
                                onChange={handleGetValueInput}
                                error={!!errors.Discount}
                                helperText={errors.Discount}
                            />
                            <TextField
                                margin="dense"
                                label="Loại"
                                fullWidth
                                variant="outlined"
                                name="Type"
                                value={valueInput.Type}
                                onChange={handleGetValueInput}
                                error={!!errors.Type}
                                helperText={errors.Type}
                            />
                            <TextField
                                margin="dense"
                                label="Ngày Bắt Đầu"
                                fullWidth
                                type='date'
                                variant="outlined"
                                name="Start_Date"
                                value={valueInput.Start_Date}
                                onChange={handleGetValueInput}
                                error={!!errors.Start_Date}
                                helperText={errors.Start_Date}
                            />
                            <TextField
                                margin="dense"
                                label="Ngày Kết Thúc"
                                fullWidth
                                type='date'
                                variant="outlined"
                                name="End_Date"
                                value={valueInput.End_Date}
                                onChange={handleGetValueInput}
                                error={!!errors.End_Date}
                                helperText={errors.End_Date}
                            />
                            <TextField
                                margin="dense"
                                label="Số Lượng Tối Đa"
                                fullWidth
                                variant="outlined"
                                name="Max_Usage"
                                value={valueInput.Max_Usage}
                                onChange={handleGetValueInput}
                                error={!!errors.Max_Usage}
                                helperText={errors.Max_Usage}
                            />
                            <TextField
                                margin="dense"
                                label="Điều Kiện"
                                fullWidth
                                variant="outlined"
                                name="Condition"
                                value={valueInput.Condition.
                                    Name_tour}
                                onChange={handleGetValueInput}
                                error={!!errors.Condition}
                                helperText={errors.Condition}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleUpdateVoucher} color="primary" disabled={isLoading}> {isLoading ? <CircularProgress size={24} /> : "Lưu"}</Button>
                </DialogActions>
            </Dialog>

            <ModalCustom isModal={isModal} setIsModals={(value) => {
                setIsModal(value)
            }} actionId={deletedId} handleAction={(id) => {
                handleDeleteVoucher(id)
            }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn xóa Voucher này không!" openTrash={openTrash} />

            <ModalRestore isModalRestore={isModalRestore} setIsModalRestore={(value) => {
                setIsModalRestore(value)
            }} actionId={restoreId} handleAction={(id) => {
                handleRestore(id)
            }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn khôi phục Voucher này không!" />
        </Paper>
    );
};

export default VoucherManagement;
