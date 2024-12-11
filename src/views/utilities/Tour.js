import { useEffect, useState, useMemo } from 'react';
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
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalCustom from '../../modals/ModalCustom';
import validator from 'validator';

import RecyclingIcon from '@mui/icons-material/Recycling';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalRestore from '../../modals/ModalRestore';
const initialTours = [
    {
        id: 1,
        nameTour: "Tour Bãi Biển",
        titleTour: "Khám Phá Bãi Biển Đà Nẵng",
        imageTour: "https://via.placeholder.com/150",
        descriptionTour: "Một tour hấp dẫn tại bãi biển Đà Nẵng.",
        startTour: "Quảng Trị",
        endTour: "Đà Nẵng",
        totalDate: "3 ngày",
        voucher: "10% OFF",
        category: "Đà Nẵng",
        featuredLocation: "Bãi Biển Mỹ Khê",
        typeTour: "2 ngày 1 đêm"
    },
    {
        id: 2,
        nameTour: "Tour Núi Bà Nà",
        titleTour: "Khám Phá Núi Bà Nà",
        imageTour: "https://via.placeholder.com/150",
        descriptionTour: "Một chuyến đi đầy thú vị đến Núi Bà Nà.",
        startTour: "Quảng Trị",
        endTour: "Đà Nẵng",
        totalDate: "2 ngày",
        voucher: "15% OFF",
        category: "Featured Location",
        featuredLocation: "Bãi Biển Mỹ Khê",
        typeTour: "3 ngày 2 đêm"
    },
];

const TourManagement = () => {
    const [tours] = useState(initialTours);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const [images, setImages] = useState([]);
    const [dataSchedule, setDataSchedule] = useState([])
    const [dataCategory, setDataCategory] = useState([])
    const [dataTypeTour, setDataTypeTour] = useState([])
    const [dataVoucher, setDataVoucher] = useState([])
    const [nameImages, setNameImages] = useState([])
    const [dataTours, setDataTours] = useState([])
    const [openTrash, setOpenTrash] = useState(false);
    const [dataTrash, setDataTrash] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [getValueInput, setGetValueInput] = useState({
        Name_Tour: "",
        Price_Tour: "",
        Title_Tour: "",
        Description_Tour: "",
        Start_Tour: "",
        End_Tour: "",
        total_Date: "",
        id_Voucher: "",
        id_Category: "",
        id_Schedule_Travel: "",
        id_Type_Tour: "",
    })

    useEffect(() => {
        getDataManagerSchedule();
        getDataManagerCategory();
        getDataManagerTypeTour();
        getDataManagerVoucher();
        getDataManagerTour();

    }, [])

    const [isModal, setIsModal] = useState(false)
    const [deletedId, setDeletedId] = useState("")
    const [errors, setErrors] = useState({
        Name_Tour: '',
        Title_Tour: '',
        Description_Tour: '',
        Price_Tour: '',
        Start_Tour: '',
        End_Tour: '',
        total_Date: '',
        id_Schedule_Travel: '',
        id_Voucher: '',
        id_Category: '',
        id_Type_Tour: '',
    });

    const validateForm = (data) => {
        const newErrors = {};
        // check tên tour
        if (validator.isEmpty(data.Name_Tour)) {
            newErrors.Name_Tour = 'Tên Tour không được để trống!';
        }

        // check tiêu đề
        if (validator.isEmpty(data.Title_Tour)) {
            newErrors.Title_Tour = 'Tiêu đề không được để trống!';
        }

        // check mô tả
        if (validator.isEmpty(data.Description_Tour)) {
            newErrors.Description_Tour = 'Mô tả không được để trống!';
        }

        if (!validator.isNumeric(String(data.Price_Tour)) || Number(data.Price_Tour) <= 0) {
            newErrors.Price_Tour = 'Giá tour phải là một số hợp lệ!';
        }

        // check địa điểm bắt đầu
        if (validator.isEmpty(data.Start_Tour)) {
            newErrors.Start_Tour = 'Địa điểm bắt đầu không được để trống!';
        }

        // check địa điểm kết thúc
        if (validator.isEmpty(data.End_Tour)) {
            newErrors.End_Tour = 'Địa điểm kết thúc không được để trống!';
        }

        // check tổng ngày
        if (validator.isEmpty(data.total_Date)) {
            newErrors.total_Date = 'Tổng ngày không được để trống!';
        }

        // check lựa chọn lịch trình
        if (validator.isEmpty(data.id_Schedule_Travel)) {
            newErrors.id_Schedule_Travel = 'Bạn cần chọn lịch trình chi tiết!';
        }

        // check lựa chọn voucher
        if (validator.isEmpty(data.id_Voucher)) {
            newErrors.id_Voucher = 'Bạn cần chọn voucher!';
        }

        // check lựa chọn danh mục
        if (validator.isEmpty(data.id_Category)) {
            newErrors.id_Category = 'Bạn cần chọn danh mục!';
        }

        //check lựa chọn loại tour
        if (validator.isEmpty(data.id_Type_Tour)) {
            newErrors.id_Type_Tour = 'Bạn cần chọn loại tour!';
        }
        return newErrors;
    };


    const [isModalRestore, setIsModalRestore] = useState(false)
    const [restoreId, setRestoreId] = useState("")
    const handleAddClickOpen = () => {
        setOpenAdd(true);
    };

    const handleEditClickOpen = (tour) => {
        setSelectedTour(tour);
        setGetValueInput({
            Name_Tour: tour.Name_Tour,
            Price_Tour: tour.Price_Tour,
            Title_Tour: tour.Title_Tour,
            Image_Tour: tour.Image_Tour.map(image => image?.path),
            Description_Tour: tour.Description_Tour,
            Start_Tour: tour.Start_Tour,
            End_Tour: tour.End_Tour,
            total_Date: tour.total_Date,
            id_Voucher: tour.id_Voucher,
            id_Category: tour.id_Category,
            id_Schedule_Travel: tour.id_Schedule_Travel,
            id_Type_Tour: tour.id_Type_Tour
        })
        setOpenEdit(true);
    };


    const handleClose = () => {
        setOpenAdd(false);
        setOpenEdit(false);
        setSelectedTour(null);
        setImages([]);
    };

    const handleImageUpload = (event) => {

        const files = Array.from(event.target.files);
        // Kiểm tra nếu không có ảnh nào được chọn
        if (files.length === 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                Images: "Cần có ít nhất một ảnh"
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                Images: ""
            }));
        }
        setNameImages(files)
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleImageRemove = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const getDataManagerSchedule = async () => {
        const api = "http://localhost:3001/Schedules/GetAllSchedule"
        try {
            const res = await fetch(api, { credentials: "include" })
            const data = await res.json();


            setDataSchedule(data.Schedule_Travel)
        } catch (e) {
            console.log(e);

        }
    }
    const getDataManagerCategory = async () => {
        const api = "http://localhost:3001/V2/Category/getCategories"
        try {
            const res = await axios.get(api, { withCredentials: true });
            setDataCategory(res.data.Categories)
        } catch (error) {
            console.log(error);

        }
    }

    const getDataManagerTypeTour = async () => {
        const api = "http://localhost:3001/V2/TypeTour/GetAllTypeTour"
        try {
            const res = await axios.get(api, { withCredentials: true });
            setDataTypeTour(res.data.TypeTour)


        } catch (error) {
            console.log(error);

        }
    }

    const getDataManagerVoucher = async () => {
        const api = "http://localhost:3001/Vouchers/GetAllVoucher"
        try {
            const res = await axios.get(api, { withCredentials: true });


            setDataVoucher(res.data.Voucher)
        } catch (error) {
            console.log(error);

        }
    }
    const handleValueInput = (e) => {
        const { name, value } = e.target


        setGetValueInput({ ...getValueInput, [name]: value })
    }

    const handleAddNewTour = async () => {
        const errors = validateForm(getValueInput);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setIsLoading(true);  // Bật trạng thái loading

        const api = "http://localhost:3001/V1/Tours/CreateTour/";

        const formData = new FormData();
        for (let i = 0; i < nameImages.length; i++) {
            let file = nameImages[i];
            formData.append("Image_Tour", file);
        }

        formData.append("Name_Tour", getValueInput.Name_Tour);
        formData.append("Price_Tour", getValueInput.Price_Tour);
        formData.append("Title_Tour", getValueInput.Title_Tour);
        formData.append("Description_Tour", getValueInput.Description_Tour);
        formData.append("Start_Tour", getValueInput.Start_Tour);
        formData.append("End_Tour", getValueInput.End_Tour);
        formData.append("total_Date", getValueInput.total_Date);
        formData.append("id_Voucher", getValueInput.id_Voucher);
        formData.append("id_Category", getValueInput.id_Category);
        formData.append("id_Schedule_Travel", getValueInput.id_Schedule_Travel);
        formData.append("id_Type_Tour", getValueInput.id_Type_Tour);

        fetch(api, {
            method: 'POST',
            body: formData,
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                handleClose();
                notification("success", "Created Tour successfully");
                getDataManagerTour();
            })
            .catch(err => {
                console.log(err);
                notification("error", "Failed to create tour");
            })
            .finally(() => {
                setIsLoading(false);  // Tắt trạng thái loading khi xong
            });
    }


    const handleEditTour = async () => {
        const errors = validateForm(getValueInput);

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setIsLoading(true);  // Bật trạng thái loading

        const api = `http://localhost:3001/V1/Tours/Update/${selectedTour._id}`;

        const formData = new FormData();
        // Nếu không có ảnh mới, thì giữ ảnh cũ trong formData
        if (nameImages.length === 0) {
            formData.append("Image_Tour", getValueInput.Image_Location);
        } else {
            // Nếu có ảnh mới, thì gửi các ảnh mới được chọn
            for (let i = 0; i < nameImages.length; i++) {
                formData.append("Image_Tour", nameImages[i]);
            }
        }



        formData.append("Name_Tour", getValueInput.Name_Tour || selectedTour.Name_Tour);
        formData.append("Price_Tour", getValueInput.Price_Tour || selectedTour.Price_Tour);
        formData.append("Title_Tour", getValueInput.Title_Tour || selectedTour.Title_Tour);
        formData.append("Description_Tour", getValueInput.Description_Tour || selectedTour.Description_Tour);
        formData.append("Start_Tour", getValueInput.Start_Tour || selectedTour.Start_Tour);
        formData.append("End_Tour", getValueInput.End_Tour || selectedTour.End_Tour);
        formData.append("total_Date", getValueInput.total_Date || selectedTour.total_Date);
        formData.append("id_Voucher", getValueInput.id_Voucher || selectedTour.id_Voucher);
        formData.append("id_Category", getValueInput.id_Category || selectedTour.id_Category);
        formData.append("id_Schedule_Travel", getValueInput.id_Schedule_Travel || selectedTour.id_Schedule_Travel);
        formData.append("id_Type_Tour", getValueInput.id_Type_Tour || selectedTour.id_Type_Tour);

        fetch(api, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                handleClose();
                getDataManagerTour();
                notification("success", "Updated Tour successfully");
            })
            .catch(err => {
                console.log(err);
                notification("error", "Failed to update tour");
            })
            .finally(() => {
                setIsLoading(false);  // Tắt trạng thái loading khi xong
            });
    }



    const getDataManagerTour = async () => {
        const api = "http://localhost:3001/V1/Tours/GetTours"

        try {
            const res = await axios.get(api, { withCredentials: true })

            const tourData = res.data.Tours.datas.filter(t => t.isDeleted === false)
            console.log(tourData);

            const tourTrash = res.data.Tours.datas.filter(t => t.isDeleted === true)
            setDataTrash(tourTrash)
            setDataTours(tourData);

        } catch (error) {
            console.log(error);

        }
    }

    const handleDele = async (id) => {
        // console.log(id);

        const api = `http://localhost:3001/V1/Tours/Delete/${id}`
        const apiRemove = `http://localhost:3001/V1/Tours/Remove/`
        try {
            if (openTrash) {
                const result = await axios.post(`${apiRemove}${id}`, {}, { withCredentials: true });
                getDataManagerTour()
                notification("success", "Deleted Tour successfully")
            } else {
                const res = await axios.post(api, {}, { withCredentials: true });
                notification("success", "Deleted Tour successfully, if you want to restore. please check into trash can")
                getDataManagerTour()
            }

        } catch (error) {
            console.log(error);
            notification("warning", "Trip have been booked, cannot delete")
        }
    }

    const handleRestore = async (id) => {
        const api = `http://localhost:3001/V1/Tours/Restore/${id}`

        try {
            const result = await axios.post(api, {}, { withCredentials: true });
            getDataManagerTour()
            notification("success", "Khôi phục  Tour thành công")
        } catch (e) {
            console.log(e);

        }

    }

    const getNameTypeTour = (id) => {
        const nameTypeTour = dataTypeTour.find(item => item._id === id)
        return nameTypeTour?.Name_Type

    }

    const getNameCategory = (id) => {
        const nameCate = dataCategory.find(item => item._id === id)
        return nameCate?.Name_Cate
    }
    const getNameVoucher = (id) => {
        const nameVoucher = dataVoucher.find(item => item._id === id)
        return nameVoucher?.Code_Voucher


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
        <>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                    Quản Lý Tour
                </Typography>
                <Box sx={{
                    display: "flex",
                    gap: 2
                }}>
                    {!openTrash && <Button variant="contained" color="primary" onClick={handleAddClickOpen}>
                        Thêm Tour
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


                <Table aria-label="bảng tour" sx={{ mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                                <Typography variant="subtitle2" fontWeight={600}>Id</Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                                <Typography variant="subtitle2" fontWeight={600}>Tên Tour</Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                                <Typography variant="subtitle2" fontWeight={600}>Tiêu Đề</Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                                <Typography variant="subtitle2" fontWeight={600}>Hình Ảnh</Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                                <Typography variant="subtitle2" fontWeight={600}>Mô Tả</Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                                <Typography variant="subtitle2" fontWeight={600}>Voucher</Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                                <Typography variant="subtitle2" fontWeight={600}>Lịch Trình</Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                                <Typography variant="subtitle2" fontWeight={600}>Thông Tin Tour</Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#E3F2FD' }} align="right">
                                <Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {openTrash ? (
                        <TableBody>
                            {dataTrash?.length > 0 ? (
                                dataTrash.map((tour) => (
                                    <TableRow key={tour._id}>
                                        <TableCell>{tour._id.slice(11, -1)}</TableCell>
                                        <TableCell>{tour.Name_Tour}</TableCell>
                                        <TableCell>{tour.Title_Tour}</TableCell>
                                        <TableCell>
                                            {Array.isArray(tour?.Image_Tour) && tour?.Image_Tour.slice(0, 1).map((item, index) => (
                                                <img
                                                    key={index}
                                                    src={item.path}
                                                    alt={tour.Name_Tour || "Tour Image"}
                                                    style={{ width: 50, height: 50 }}
                                                />
                                            ))}
                                        </TableCell>
                                        <TableCell style={{
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            maxWidth: '100px'
                                        }}>
                                            {tour.Description_Tour}
                                        </TableCell>
                                        <TableCell>{getNameVoucher(tour.id_Voucher)}</TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>Điểm bắt đầu:</strong> {tour.Start_Tour}<br />
                                                <strong>Điểm kết thúc:</strong> {tour.End_Tour}<br />
                                                <strong>Tổng ngày:</strong> {tour.total_Date}<br />
                                                <strong>Loại tour:</strong> {getNameTypeTour(tour?.id_Type_Tour)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>Danh Mục:</strong> {getNameCategory(tour?.id_Category)}<br />
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => (setIsModalRestore(true), setRestoreId(tour._id))}>
                                                <RestoreIcon />
                                            </IconButton>
                                            <IconButton onClick={() => (setIsModal(true), setDeletedId(tour._id))}>
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">Thùng rác rỗng</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    ) : (
                        <TableBody>
                            {dataTours?.map((tour) => (
                                <TableRow key={tour._id}>
                                    <TableCell>{tour._id.slice(11, -1)}</TableCell>
                                    <TableCell>{tour.Name_Tour}</TableCell>
                                    <TableCell>{tour.Title_Tour}</TableCell>
                                    <TableCell>
                                        {Array.isArray(tour?.Image_Tour) && tour?.Image_Tour.slice(0, 1).map((item, index) => (
                                            <img
                                                key={index}
                                                src={item.path}
                                                alt={tour.Name_Tour || "Tour Image"}
                                                style={{ width: 50, height: 50 }}
                                            />
                                        ))}
                                    </TableCell>
                                    <TableCell style={{
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        maxWidth: '100px'
                                    }}>
                                        {tour.Description_Tour}
                                    </TableCell>
                                    <TableCell>{getNameVoucher(tour.id_Voucher)}</TableCell>
                                    <TableCell>
                                        <Typography>
                                            <strong>Điểm bắt đầu:</strong> {tour.Start_Tour}<br />
                                            <strong>Điểm kết thúc:</strong> {tour.End_Tour}<br />
                                            <strong>Tổng ngày:</strong> {tour.total_Date}<br />
                                            <strong>Loại tour:</strong> {getNameTypeTour(tour?.id_Type_Tour)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            <strong>Danh Mục:</strong> {getNameCategory(tour?.id_Category)}<br />
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleEditClickOpen(tour)}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => (setIsModal(true), setDeletedId(tour._id))}>
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}

                </Table>

                {/* Form Thêm Tour */}
                <Dialog open={openAdd} onClose={handleClose}>
                    <DialogTitle>Thêm Tour Mới</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Tên Tour"
                            fullWidth
                            variant="outlined"
                            name='Name_Tour'
                            onChange={handleValueInput}
                            error={!!errors.Name_Tour}
                            helperText={errors.Name_Tour}
                        />
                        <TextField
                            margin="dense"
                            label="Tiêu Đề"
                            fullWidth
                            variant="outlined"
                            name='Title_Tour'
                            onChange={handleValueInput}
                            error={!!errors.Title_Tour}
                            helperText={errors.Title_Tour}
                        />
                        <input
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                            style={{ marginBottom: '16px' }}
                        />
                        <Typography error={!!errors.Image_Tour}
                            helperText={errors.Image_Tour}></Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {images.map((image, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <img src={image} alt={`preview-${index}`} style={{ width: '50px', height: 'auto', marginRight: '8px' }} />
                                    <IconButton onClick={() => handleImageRemove(index)}>
                                        <RemoveCircleOutlineIcon color="error" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                        <TextField
                            margin="dense"
                            label="Mô Tả"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={2}
                            name='Description_Tour'
                            onChange={handleValueInput}
                            error={!!errors.Description_Tour}
                            helperText={errors.Description_Tour}
                        />
                        <TextField
                            margin="dense"
                            label="Giá"
                            fullWidth
                            variant="outlined"
                            type='number'
                            name='Price_Tour'
                            onChange={handleValueInput}
                            error={!!errors.Price_Tour}
                            helperText={errors.Price_Tour}
                        />


                        <TextField
                            margin="dense"
                            label="Địa điểm bắt đầu"
                            fullWidth
                            variant="outlined"
                            type='text'
                            name='Start_Tour'
                            onChange={handleValueInput}
                            error={!!errors.Start_Tour}
                            helperText={errors.Start_Tour}
                        />

                        <TextField
                            margin="dense"
                            label="Địa điểm kết thúc"
                            fullWidth
                            variant="outlined"
                            type='text'
                            name='End_Tour'
                            onChange={handleValueInput}
                            error={!!errors.End_Tour}
                            helperText={errors.End_Tour}
                        />
                        <TextField
                            margin="dense"
                            label="Tổng Ngày"
                            fullWidth
                            variant="outlined"
                            name='total_Date'
                            onChange={handleValueInput}
                            error={!!errors.total_Date}
                            helperText={errors.total_Date}
                        />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Lịch trình khởi hành</InputLabel>
                            <Select defaultValue="" name='id_Schedule_Travel' onChange={handleValueInput} error={!!errors.id_Schedule_Travel}
                                helperText={errors.id_Schedule_Travel}>
                                {dataSchedule?.map((item) => <MenuItem key={item._id} value={item._id}>{item.Name_Schedule}</MenuItem>)}
                                {/* <MenuItem value="Vourcher">Đà Nẵng</MenuItem>
                    <MenuItem value="Vourcher">Hà Nội</MenuItem> */}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 1 }}>
                            <InputLabel>Voucher</InputLabel>
                            <Select defaultValue="" name='id_Voucher' onChange={handleValueInput} error={!!errors.id_Voucher}
                                helperText={errors.id_Voucher}>
                                {dataVoucher?.map((item) => <MenuItem key={item._id} value={item._id}>{item.Code_Voucher}</MenuItem>)}
                                {/* <MenuItem value="Vourcher">10%</MenuItem>
                    <MenuItem value="Vourcher">20%</MenuItem> */}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 1 }}>
                            <InputLabel>Danh Mục</InputLabel>
                            <Select defaultValue="" name='id_Category' onChange={handleValueInput} error={!!errors.id_Category}
                                helperText={errors.id_Category}>
                                {dataCategory?.map((item) => <MenuItem key={item._id} value={item._id}>{item.Name_Cate}</MenuItem>)}

                                {/* <MenuItem value="Featured Location">Địa Điểm Nổi Bật</MenuItem> */}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: 1 }}>
                            <InputLabel>Loại Tour</InputLabel>
                            <Select defaultValue="" name='id_Type_Tour' onChange={handleValueInput} error={!!errors.id_Type_Tour}
                                helperText={errors.id_Type_Tour}>
                                {dataTypeTour?.map((item) => <MenuItem key={item._id} value={item._id}>{item.Name_Type}</MenuItem>)}
                                {/* <MenuItem value="2 ngày 1 đêm">2 ngày 1 đêm</MenuItem>
                    <MenuItem value="3 ngày 2 đêm">3 ngày 2 đêm</MenuItem> */}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Hủy</Button>
                        <Button onClick={handleAddNewTour} color="primary" disabled={isLoading}>{isLoading ? <CircularProgress size={24} /> : "Thêm"}</Button>
                    </DialogActions>
                </Dialog>

                {/* Form Chỉnh Sửa Tour */}
                <Dialog open={openEdit} onClose={handleClose}>
                    <DialogTitle>Chỉnh Sửa Tour</DialogTitle>
                    <DialogContent>
                        {selectedTour && (
                            <>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Tên Tour"
                                    fullWidth
                                    variant="outlined"
                                    defaultValue={selectedTour.Name_Tour}
                                    name='Name_Tour'
                                    onChange={handleValueInput}
                                    error={!!errors.Name_Tour}
                                    helperText={errors.Name_Tour}
                                />
                                <TextField
                                    margin="dense"
                                    label="Tiêu Đề"
                                    fullWidth
                                    variant="outlined"
                                    defaultValue={selectedTour.Title_Tour}
                                    name='Title_Tour'
                                    onChange={handleValueInput}
                                    error={!!errors.Title_Tour}
                                    helperText={errors.Title_Tour}
                                />
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleImageUpload}
                                    style={{ marginBottom: '16px' }}
                                />
                                <Typography error={!!errors.Image_Tour}
                                    helperText={errors.Image_Tour}></Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    {getValueInput?.Image_Tour.map((image, index) => (
                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <img src={image} alt={`preview-${index}`} style={{ width: '50px', height: 'auto', marginRight: '8px' }} />
                                            <IconButton onClick={() => handleImageRemove(index)}>
                                                <RemoveCircleOutlineIcon color="error" />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
                                <TextField
                                    margin="dense"
                                    label="Mô Tả"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    defaultValue={selectedTour.Description_Tour}
                                    name='Description_Tour'
                                    onChange={handleValueInput}
                                    error={!!errors.Description_Tour}
                                    helperText={errors.Description_Tour}
                                />
                                <TextField
                                    margin="dense"
                                    label="Giá"
                                    fullWidth
                                    variant="outlined"
                                    type='number'
                                    name='Price_Tour'
                                    onChange={handleValueInput}
                                    defaultValue={selectedTour.Price_Tour}
                                    error={!!errors.Price_Tour}
                                    helperText={errors.Price_Tour}
                                />
                                <TextField
                                    margin="dense"
                                    label="Địa điểm bắt đầu"
                                    fullWidth
                                    variant="outlined"
                                    type='text'
                                    name='Start_Tour'
                                    onChange={handleValueInput}
                                    defaultValue={selectedTour.Start_Tour}
                                    error={!!errors.Start_Tour}
                                    helperText={errors.Start_Tour}
                                />

                                <TextField
                                    margin="dense"
                                    label="Địa điểm kết thúc"
                                    fullWidth
                                    variant="outlined"
                                    type='text'
                                    name='End_Tour'
                                    onChange={handleValueInput}
                                    defaultValue={selectedTour.End_Tour}
                                    error={!!errors.End_Tour}
                                    helperText={errors.End_Tour}
                                />
                                <TextField
                                    margin="dense"
                                    label="Tổng Ngày"
                                    fullWidth
                                    variant="outlined"
                                    name='total_Date'
                                    onChange={handleValueInput}
                                    defaultValue={selectedTour.total_Date}
                                    error={!!errors.total_Date}
                                    helperText={errors.total_Date}
                                />
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel>Lịch trình khởi hành</InputLabel>
                                    <Select defaultValue={selectedTour.id_Schedule_Travel} name='id_Schedule_Travel' onChange={handleValueInput} error={!!errors.id_Schedule_Travel}
                                        helperText={errors.id_Schedule_Travel}>
                                        {dataSchedule?.map((item) => <MenuItem key={item._id} value={item._id}>{item.Name_Schedule}</MenuItem>)}
                                        {/* <MenuItem value="Vourcher">Đà Nẵng</MenuItem>
                    <MenuItem value="Vourcher">Hà Nội</MenuItem> */}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ mt: 1 }}>
                                    <InputLabel>Voucher</InputLabel>
                                    <Select defaultValue={selectedTour.id_Voucher} name='id_Voucher' onChange={handleValueInput} error={!!errors.id_Voucher}
                                        helperText={errors.id_Voucher}>
                                        {dataVoucher?.map((item) => <MenuItem key={item._id} value={item._id}>{item.Discount}</MenuItem>)}
                                        {/* <MenuItem value="Vourcher">10%</MenuItem>
                    <MenuItem value="Vourcher">20%</MenuItem> */}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ mt: 1 }}>
                                    <InputLabel>Danh Mục</InputLabel>
                                    <Select defaultValue={selectedTour.id_Category} name='id_Category' onChange={handleValueInput} error={!!errors.id_Category}
                                        helperText={errors.id_Category}>
                                        {dataCategory?.map((item) => <MenuItem key={item._id} value={item._id}>{item.Name_Cate}</MenuItem>)}

                                        {/* <MenuItem value="Featured Location">Địa Điểm Nổi Bật</MenuItem> */}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{ mt: 1 }}>
                                    <InputLabel>Loại Tour</InputLabel>
                                    <Select defaultValue={selectedTour.id_Type_Tour} name='id_Type_Tour' onChange={handleValueInput} error={!!errors.id_Type_Tour}
                                        helperText={errors.id_Type_Tour}>
                                        {dataTypeTour?.map((item) => <MenuItem key={item._id} value={item._id}>{item.Name_Type}</MenuItem>)}
                                        {/* <MenuItem value="2 ngày 1 đêm">2 ngày 1 đêm</MenuItem>
                    <MenuItem value="3 ngày 2 đêm">3 ngày 2 đêm</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Hủy</Button>
                        <Button onClick={handleEditTour} color="primary" disabled={isLoading}> {isLoading ? <CircularProgress size={24} /> : "Lưu"}</Button>
                    </DialogActions>
                </Dialog>

                <ModalCustom isModal={isModal} setIsModals={(value) => {
                    setIsModal(value)
                }} actionId={deletedId} handleAction={(id) => {
                    handleDele(id)
                }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn xóa Tour này không!" openTrash={openTrash} />

                <ModalRestore isModalRestore={isModalRestore} setIsModalRestore={(value) => {
                    setIsModalRestore(value)
                }} actionId={restoreId} handleAction={(id) => {
                    handleRestore(id)
                }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn khôi phục Tour này không!" />
            </Paper >
        </>


    );
};
export default TourManagement;
