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
    Box,
    FormControl,
    Select,
    InputLabel,
    MenuItem

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import ModalCustom from '../../modals/ModalCustom';
import { toast } from 'react-toastify';
const initialLocations = [
    {
        id: 1,
        nameLocation: "Địa Điểm 1",
        addressLocation: "123 Đường ABC, Đà Nẵng",
        imageLocation: "https://via.placeholder.com/150",
        typeLocation: "Cảnh Quan",
        national: "Việt Nam",
        cityLocation: "Đà Nẵng",
    },
    {
        id: 2,
        nameLocation: "Địa Điểm 2",
        addressLocation: "456 Đường DEF, Đà Nẵng",
        imageLocation: "https://via.placeholder.com/150",
        typeLocation: "Di Tích",
        national: "Việt Nam",
        cityLocation: "Đà Nẵng",
    },
    // Thêm nhiều địa điểm khác nếu cần
];

const LocationManagement = () => {
    const [locations] = useState(initialLocations);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [dataLocation, setDataLocation] = useState([])
    const [images, setImages] = useState([]);
    const [nameImages, setNameImages] = useState([]);
    const [dataTour, setDataTours] = useState([])
    const [location, setLocation] = useState({

        Name_Location: "",

        Address_Location: "",

        Description: "",
        Type_Location: "",

        Nationnal: "",

        City_Location: "",
        id_tour: ""
    })
    const [isModal, setIsModal] = useState(false)
    const [deletedId, setDeletedId] = useState("")

    const handleAddClickOpen = () => {
        setOpenAdd(true);
    };

    const handleEditClickOpen = (location) => {
        setSelectedLocation(location);
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenAdd(false);
        setOpenEdit(false);
        setSelectedLocation(null);
        setImages([]);
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setNameImages(files)
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setImages(imageUrls);
    };

    const handleImageRemove = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const getDataManagerLocation = async () => {
        const api = "http://localhost:3001/V2/Featured_Location/GetFeatured_Location"

        try {
            const res = await axios.get(api)
            setDataLocation(res.data.Featured_Location)

        } catch (error) {
            console.log(error);

        }
    }
    const handleDeleteLocation = async (id) => {
        const api = `http://localhost:3001/V2/Featured_Location/DeleteFeatured_Location/${id}`

        try {
            const res = await axios.post(api)
            getDataManagerLocation();
            notification("success", "Deleted News successfully")
        } catch (error) {
            console.log(error);

        }
    }

    const handleGetValueInput = (e) => {
        const { name, value } = e.target
        setLocation({ ...location, [name]: value })
    }


    const handleAddLocation = async () => {
        const api = "http://localhost:3001/V2/Featured_Location/CreateFeatured_Location"
        const formData = new FormData();
        for (let i = 0; i < nameImages.length; i++) {
            let file = nameImages[i];
            formData.append("Image_Location", file)
        }
        formData.append("Name_Location", location.Name_Location)
        formData.append("Address_Location", location.Address_Location)
        formData.append("Description", location.Description)
        formData.append("Type_Location", location.Type_Location)
        formData.append("Nationnal", location.Nationnal)
        formData.append("City_Location", location.City_Location)
        formData.append("id_tour", location.id_tour)

        fetch(api, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                getDataManagerLocation()
                handleClose()
                notification("success", "Created News successfully")
            })
            .catch(err => {
                console.log(err);
            })


    }

    const handleUpdateNews = async () => {
        const formData = new FormData();
        for (let i = 0; i < nameImages.length; i++) {
            formData.append("Image_Location", nameImages[i]);
        }
        formData.append("Name_Location", location.Name_Location || selectedLocation.Name_Location)
        formData.append("Address_Location", location.Address_Location || selectedLocation.Address_Location)
        formData.append("Description", location.Description || selectedLocation.Description)
        formData.append("Type_Location", location.Type_Location || selectedLocation.Type_Location)
        formData.append("Nationnal", location.Nationnal || selectedLocation.Nationnal)
        formData.append("City_Location", location.City_Location || selectedLocation.City_Location)
        formData.append("id_tour", location.id_tour || selectedLocation.id_tour)
        try {
            await axios.post(`http://localhost:3001/V2/Featured_Location/UpdateFeatured_Location/${selectedLocation._id}`, formData);
            getDataManagerLocation()
            handleClose()
            notification("success", "Updated News successfully")
        } catch (err) {
            console.error(err);
        }
    };


    const getDataManagerTour = async () => {
        const api = "http://localhost:3001/V1/Tours/GetTours"

        try {
            const res = await axios.get(api)
            setDataTours(res.data.Tours.datas)
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        getDataManagerLocation();
        getDataManagerTour()
    }, [])
    const displayTourById = (id) => {
        const tours = dataTour.find(d => d._id === id);
        return tours?.Name_Tour
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Địa Điểm
            </Typography>

            <Button variant="contained" color="primary" onClick={handleAddClickOpen}>
                Thêm Địa Điểm
            </Button>

            <Table aria-label="bảng địa điểm" sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Id</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Tour</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Tên Địa Điểm</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Địa Chỉ</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Hình Ảnh</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Loại</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Quốc Gia</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Thành Phố</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataLocation.map((location) => (
                        <TableRow key={location._id}>
                            <TableCell>{location._id}</TableCell>
                            <TableCell>{displayTourById(location?.id_tour)}</TableCell>
                            <TableCell>{location.Name_Location}</TableCell>
                            <TableCell>{location.Address_Location}</TableCell>
                            <TableCell>
                                {location?.Image_Location?.slice(0, 1).map((item) => <img key={item.path} src={item.path} alt={location.originalname} style={{ width: '50px', height: 'auto' }} />)}

                            </TableCell>
                            <TableCell>{location.Type_Location}</TableCell>
                            <TableCell>{location.Nationnal}</TableCell>
                            <TableCell>{location.City_Location}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEditClickOpen(location)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => (setIsModal(true), setDeletedId(location._id))}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Form Thêm Địa Điểm */}
            <Dialog open={openAdd} onClose={handleClose}>
                <DialogTitle>Thêm Địa Điểm Mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên Địa Điểm"
                        fullWidth
                        variant="outlined"
                        name="Name_Location"
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        margin="dense"
                        label="Địa Chỉ"
                        fullWidth
                        variant="outlined"
                        name="Address_Location"
                        onChange={handleGetValueInput}
                    />
                    <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        style={{ marginBottom: '16px' }}
                    />
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
                        label="Mô tả"
                        fullWidth
                        variant="outlined"
                        name="Description"
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        margin="dense"
                        label="Loại"
                        fullWidth
                        variant="outlined"
                        name="Type_Location"
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        margin="dense"
                        label="Quốc Gia"
                        fullWidth
                        variant="outlined"
                        name="Nationnal"
                        onChange={handleGetValueInput}
                    />
                    <TextField
                        margin="dense"
                        label="Thành Phố"
                        fullWidth
                        variant="outlined"
                        name="City_Location"
                        onChange={handleGetValueInput}
                    />

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Lịch trình khởi hành</InputLabel>
                        <Select defaultValue="" name='id_tour' onChange={handleGetValueInput}>
                            {dataTour.map((item) => <MenuItem key={item._id} value={item._id}>{item.Name_Tour}</MenuItem>)}
                            {/* <MenuItem value="Vourcher">Đà Nẵng</MenuItem>
                            <MenuItem value="Vourcher">Hà Nội</MenuItem> */}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleAddLocation} color="primary">Thêm</Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Địa Điểm */}
            <Dialog open={openEdit} onClose={handleClose}>
                <DialogTitle>Chỉnh Sửa Địa Điểm</DialogTitle>
                <DialogContent>
                    {selectedLocation && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Tên Địa Điểm"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.Name_Location}
                                name="Name_Location"
                                onChange={handleGetValueInput}
                            />
                            <TextField
                                margin="dense"
                                label="Địa Chỉ"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.Address_Location}
                                name="Address_Location"
                                onChange={handleGetValueInput}
                            />
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                style={{ marginBottom: '16px' }}
                            />
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
                                label="Mô tả"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.Description}
                                name="Description"
                                onChange={handleGetValueInput}
                            />
                            <TextField
                                margin="dense"
                                label="Loại"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.Type_Location}
                                name="Type_Location"
                                onChange={handleGetValueInput}
                            />
                            <TextField
                                margin="dense"
                                label="Quốc Gia"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.Nationnal}
                                name="Nationnal"
                                onChange={handleGetValueInput}
                            />
                            <TextField
                                margin="dense"
                                label="Thành Phố"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedLocation.City_Location}
                                name="City_Location"
                                onChange={handleGetValueInput}
                            />
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Lịch trình khởi hành</InputLabel>
                                <Select defaultValue={selectedLocation.id_tour} name='id_tour' onChange={handleGetValueInput}>
                                    {dataTour.map((item) => <MenuItem key={item._id} value={item._id}>{item.Name_Tour}</MenuItem>)}
                                    {/* <MenuItem value="Vourcher">Đà Nẵng</MenuItem>
                            <MenuItem value="Vourcher">Hà Nội</MenuItem> */}
                                </Select>
                            </FormControl>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleUpdateNews} color="primary">Lưu</Button>
                </DialogActions>
            </Dialog>

            <ModalCustom isModal={isModal} setIsModals={(value) => {
                setIsModal(value)
            }} actionId={deletedId} handleAction={(id) => {
                handleDeleteLocation(id)
            }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn xóa Địa điểm này không!" />
        </Paper>
    );
};

export default LocationManagement;
