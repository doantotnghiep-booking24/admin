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
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


const initialArticles = [
    {
        id: 1,
        nameNew: "Bài Viết Về Đà Nẵng",
        titleNew: "Khám Phá Thành Phố Đà Nẵng",
        contentNew: "Đà Nẵng là một thành phố du lịch nổi tiếng với bãi biển đẹp và nhiều địa điểm tham quan.",
        imageNew: ["https://via.placeholder.com/150"],
        createdAt: "2024-10-01"
    },
    {
        id: 2,
        nameNew: "Bài Viết Về Hà Nội",
        titleNew: "Khám Phá Thủ Đô Hà Nội",
        contentNew: "Hà Nội không chỉ nổi tiếng với ẩm thực mà còn với văn hóa và lịch sử lâu đời.",
        imageNew: ["https://via.placeholder.com/150"],
        createdAt: "2024-10-01"
    },
    // Bạn có thể thêm nhiều bài viết hơn nữa
];

const ArticleManagement = () => {
    const [articles] = useState(initialArticles);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [newImages, setNewImages] = useState([]);
    const [nameImages, setNameImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [dataNews, setDataNews] = useState([])
    const [news, setNews] = useState({
        Name: "",
        Title: "",
        Content: ""
    })




    const handleAddClickOpen = () => {
        setOpenAdd(true);
        setNewImages([]);
    };


    const handleEditClickOpen = (item) => {
        setSelectedArticle(item);
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenAdd(false);
        setOpenEdit(false);
        setSelectedArticle(null);
        setNewImages([]); // Reset images on close
    };

    const handleImageChange = async (event) => {
        const files = Array.from(event.target.files)
        setNameImages(files)

        const filesDisplay = files.map(item => URL.createObjectURL(item))


        setNewImages(filesDisplay);

    };

    const handleRemoveImage = (index) => {
        setNewImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleAddNews = async () => {
        const api = "http://localhost:3001/News/CreateNew"
        const formData = new FormData();
        for (let i = 0; i < nameImages.length; i++) {
            let file = nameImages[i];
            formData.append("Image", file)
        }
        formData.append("Name", news.Name)
        formData.append("Title", news.Title)
        formData.append("Content", news.Content)

        fetch('http://localhost:3001/News/CreateNew', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })


    }
    const handleGetValueInput = (e) => {
        const { name, value } = e.target
        setNews({ ...news, [name]: value })
    }

    const getNewsData = async () => {
        const api = "http://localhost:3001/News/GetAllNews"
        setIsLoading(true)
        try {
            const res = await axios.get(api);
            const datas = await res.data;
            const { Featured_Location } = datas

            setDataNews(Featured_Location)

        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateNews = async () => {
        setIsLoading(true);
        const formData = new FormData();
        for (let i = 0; i < nameImages.length; i++) {
            formData.append("Image", nameImages[i]);
        }
        formData.append("Name", news.Name === "" ? selectedArticle.Name : news.Name);
        formData.append("Title", news.Title === "" ? selectedArticle.Name : news.Title);
        formData.append("Content", news.Content === "" ? selectedArticle.Content : news.Content);

        try {
            await axios.post(`http://localhost:3001/News/UpdateNew/${selectedArticle._id}`, formData);
            getNewsData()
            setOpenEdit(false);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }
    };

    const handleDeleteNews = async (id) => {
        const api = "http://localhost:3001/News/DeleteNew/"
        try {
            const res = await axios.post(`${api}${id}`)
            getNewsData()

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getNewsData();
    }, [])



    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Bài Viết
            </Typography>

            <Button variant="contained" color="primary" onClick={handleAddClickOpen}>
                Thêm Bài Viết
            </Button>

            <Table aria-label="bảng bài viết" sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Id</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Tên Bài Viết</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Tiêu Đề</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Hình Ảnh</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Nội Dung</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Ngày Tạo</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataNews?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item._id}</TableCell>
                            <TableCell>{item.Name}</TableCell>
                            <TableCell>{item.Title}</TableCell>
                            <TableCell>
                                {item?.Image?.slice(0, 1).map((image, index) => (
                                    <img key={index} src={image.path} alt={item.nameNew} style={{ width: 50, height: 50, marginRight: 5 }} />
                                ))}
                            </TableCell>
                            <TableCell>{item.Content}</TableCell>
                            <TableCell>{item.Cretate_At}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEditClickOpen(item)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteNews(item._id)}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Form Thêm Bài Viết */}
            <Dialog open={openAdd} onClose={handleClose}>
                <DialogTitle>Thêm Bài Viết Mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên Bài Viết"
                        fullWidth
                        variant="outlined"
                        name='Name'

                        onChange={(e) => handleGetValueInput(e)}
                    />
                    <TextField
                        margin="dense"
                        label="Tiêu Đề"
                        fullWidth
                        variant="outlined"
                        name='Title'

                        onChange={(e) => handleGetValueInput(e)}
                    />
                    <TextField
                        margin="dense"
                        label="Nội Dung"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        name='Content'

                        onChange={(e) => handleGetValueInput(e)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        multiple="multiple"
                        onChange={(e) => handleImageChange(e)}
                    />
                    <div style={{ marginTop: '10px' }}>
                        {newImages.map((image, index) => (
                            <div key={index} style={{ display: 'inline-block', position: 'relative', marginRight: '10px' }}>
                                <img src={image} alt={`Preview ${index}`} style={{ width: 50, height: 50 }} />
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveImage(index)}
                                    style={{ position: 'absolute', top: 0, right: 0 }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </div>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleAddNews} color="primary">Thêm</Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Bài Viết */}
            <Dialog open={openEdit} onClose={handleClose}>
                <DialogTitle>Chỉnh Sửa Bài Viết</DialogTitle>
                <DialogContent>
                    {selectedArticle && (
                        <>
                            <TextField
                                name='Name'
                                autoFocus
                                margin="dense"
                                label="Tên Bài Viết"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => handleGetValueInput(e)}
                                defaultValue={selectedArticle?.Name}
                            />
                            <TextField
                                name="Title"
                                margin="dense"
                                label="Tiêu Đề"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => handleGetValueInput(e)}
                                defaultValue={selectedArticle.Title}
                            />
                            <TextField
                                name="Content"
                                margin="dense"
                                label="Nội Dung"
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={4}
                                onChange={(e) => handleGetValueInput(e)}
                                defaultValue={selectedArticle.Content}
                            />
                            <div>
                                <Typography variant="subtitle2" sx={{ mt: 2 }}>Hình Ảnh Hiện Tại:</Typography>
                                {selectedArticle?.Image?.map((image, index) => (
                                    <div key={index} style={{ display: 'inline-block', position: 'relative', marginRight: '10px' }}>
                                        <img src={image.path} alt={selectedArticle.Name} style={{ width: 50, height: 50 }} />
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                const updatedImages = selectedArticle.imageNew.filter((_, i) => i !== index);
                                                setSelectedArticle(prev => ({ ...prev, imageNew: updatedImages }));
                                            }}
                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                            <Typography variant="subtitle2" sx={{ mt: 2 }}>Tải Lên Hình Ảnh Mới:</Typography>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                            <div style={{ marginTop: '10px' }}>
                                {newImages.map((image, index) => (
                                    <div key={index} style={{ display: 'inline-block', position: 'relative', marginRight: '10px' }}>
                                        <img src={image} alt={`Preview ${index}`} style={{ width: 50, height: 50 }} />
                                        <IconButton
                                            size="small"
                                            onClick={() => handleRemoveImage(index)}
                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleUpdateNews} color="primary">Lưu</Button>
                </DialogActions>
            </Dialog>

        </Paper>
    );
};

export default ArticleManagement;
