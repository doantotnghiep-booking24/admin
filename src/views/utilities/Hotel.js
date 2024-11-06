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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalCustom from '../../modals/ModalCustom';


const HotelManagement = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [images, setImages] = useState([]);
    const [dataHotel, setDataHotel] = useState([])
    const [nameImages, setNameImages] = useState([])
    const [getValueInput, setGetValueInput] = useState({
        Name_Hotel: '', Price_Hotel: '', Adress_Hotel: '', Description_Hotel: '', Image_Hotel: ''
    })

    const [isModal, setIsModal] = useState(false)
    const [deletedId, setDeletedId] = useState("")
    const handleAddClickOpen = () => {
        setOpenAdd(true);
    };
    const handleEditClickOpen = (hotel) => {
        setSelectedHotel(hotel);
        setOpenEdit(true);
    };
    const handleClose = () => {
        setOpenAdd(false);
        setOpenEdit(false);
        setSelectedHotel(null);
        setImages([]);
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setNameImages(files)
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleImageRemove = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const getDataHotel = async () => {
        const api = "http://localhost:3001/Hotel/GetHotel"
        try {
            const res = await axios.get(api)
            setDataHotel(res?.data?.Hotel)
        } catch (e) {
            console.log(e);

        }
    }
    const handleValueInput = (e) => {
        const { name, value } = e.target


        setGetValueInput({ ...getValueInput, [name]: value })
    }


    const handleAddNewHotel = async () => {
        const api = "http://localhost:3001/Hotel/CreateHotel"
        const formData = new FormData();
        for (let i = 0; i < nameImages.length; i++) {
            let file = nameImages[i];
            formData.append("Image_Hotel", file)
        }
        formData.append("Name_Hotel", getValueInput.Name_Hotel)
        formData.append("Price_Hotel", getValueInput.Price_Hotel)
        formData.append("Image_Hotel", getValueInput.Image_Hotel)
        formData.append("Description_Hotel", getValueInput.Description_Hotel)
        formData.append("Adress_Hotel", getValueInput.Adress_Hotel)
        fetch(api, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                handleClose()
                notification("success", "Created Hotel successfully")
                getDataHotel();
            })
            .catch(err => {
                console.log(err);
            })

    }

    const handleEditHotel = async () => {
        const api = `http://localhost:3001/Hotel/UpdateHotel/${selectedHotel._id}`;
        const formData = new FormData();

        for (let i = 0; i < nameImages.length; i++) {
            let file = nameImages[i];
            formData.append("Image_Hotel", file)
        }
        formData.append("Name_Hotel", getValueInput.Name_Hotel || selectedHotel.Name_Hotel)
        formData.append("Price_Hotel", getValueInput.Price_Hotel || selectedHotel.Price_Hotel)
        formData.append("Image_Hotel", getValueInput.Image_Hotel || selectedHotel.Image_Hotel)
        formData.append("Description_Hotel", getValueInput.Description_Hotel || selectedHotel.Description_Hotel)
        formData.append("Adress_Hotel", getValueInput.Adress_Hotel || selectedHotel.Adress_Hotel)
        fetch(api, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })

            .then(res => res.json())
            .then(data => {
                console.log(data);
                handleClose()
                getDataHotel();
                notification("success", "Updated Hotel successfully")
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handleDele = async (id) => {
        const api = "http://localhost:3001/Hotel/DeleteHotel/"
        try {
            const res = await axios.post(`${api}${id}`);
            getDataHotel()
            notification("success", "Deleted Hotel successfully")
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getDataHotel();

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
                Quản Lý Hotel
            </Typography>

            <Button variant="contained" color="primary" onClick={handleAddClickOpen}>
                Thêm Hotel
            </Button>

            <Table aria-label="bảng Hotel" sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>STT</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Tên Khách Sạn</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Hình Ảnh</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Giá</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Đia Chỉ</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Mô Tả</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataHotel?.map((hotel) => (
                        <TableRow key={hotel._id}>
                            <TableCell>{hotel._id}</TableCell>
                            <TableCell>{hotel.Name_Hotel}</TableCell>
                            <TableCell>
                                {Array.isArray(hotel?.Image_Hotel) && hotel?.Image_Hotel.slice(0, 1).map((item, index) => (
                                    <img
                                        key={index}
                                        src={item.path}
                                        alt={hotel.Name_Hotel || "Hotel Image"}
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
                                {hotel.Description_Hotel}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEditClickOpen(hotel)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => (setIsModal(true), setDeletedId(hotel._id))}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Form Thêm Hotel */}
            <Dialog open={openAdd} onClose={handleClose}>
                <DialogTitle>Thêm Khách Sạn Mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên Hotel"
                        fullWidth
                        variant="outlined"
                        name='Name_Hotel'
                        onChange={handleValueInput}
                    />
                    <TextField
                        margin="dense"
                        label="Giá"
                        fullWidth
                        variant="outlined"
                        name='Price_Hotel'
                        onChange={handleValueInput}
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
                        label="Địa Chỉ"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={2}
                        name='Adress_Hotel'
                        onChange={handleValueInput}
                    />
                    <TextField
                        margin="dense"
                        label="Mô Tả"
                        fullWidth
                        variant="outlined"
                        multiline
                        type='number'
                        name='Description_Hotel'
                        onChange={handleValueInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleAddNewHotel} color="primary">Thêm</Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Hotel */}
            <Dialog open={openEdit} onClose={handleClose}>
                <DialogTitle>Chỉnh Sửa Hotel</DialogTitle>
                <DialogContent>
                    {selectedHotel && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Tên Hotel"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedHotel.Name_Hotel}
                                name='Name_Hotel'
                                onChange={handleValueInput}
                            />
                            <TextField
                                margin="dense"
                                label="Giá"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedHotel.Price_Hotel}
                                name='Price_Hotel'
                                onChange={handleValueInput}
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
                                label="Địa Chỉ"
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={2}
                                defaultValue={selectedHotel.Description_Hotel}
                                name='Adress_Hotel'
                                onChange={handleValueInput}
                            />
                            <TextField
                                margin="dense"
                                label="Mô Tả"
                                fullWidth
                                multiline
                                variant="outlined"
                                type='number'
                                name='Description_Hotel'
                                onChange={handleValueInput}
                                defaultValue={selectedHotel.Price_Hotel}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleEditHotel} color="primary">Lưu</Button>
                </DialogActions>
            </Dialog>

            <ModalCustom isModal={isModal} setIsModals={(value) => {
                setIsModal(value)
            }} actionId={deletedId} handleAction={(id) => {
                handleDele(id)
            }} cancelText="Hủy" confirmText="Đồng ý" description="Bạn có muốn xóa khách sạn này không này không ?" />
        </Paper >
    );
};

export default HotelManagement;
