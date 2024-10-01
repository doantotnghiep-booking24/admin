import { useState } from 'react';
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

    const handleAddClickOpen = () => {
        setOpenAdd(true);
        setNewImages([]); // Reset images when opening the add dialog
    };

    const handleEditClickOpen = (article) => {
        setSelectedArticle(article);
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenAdd(false);
        setOpenEdit(false);
        setSelectedArticle(null);
        setNewImages([]); // Reset images on close
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files).map(file => URL.createObjectURL(file));
        setNewImages(files);
    };

    const handleRemoveImage = (index) => {
        setNewImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

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
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Id</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Tên Bài Viết</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Tiêu Đề</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Hình Ảnh</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Nội Dung</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>Ngày Tạo</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {articles.map((article) => (
                        <TableRow key={article.id}>
                            <TableCell>{article.id}</TableCell>
                            <TableCell>{article.nameNew}</TableCell>
                            <TableCell>{article.titleNew}</TableCell>
                            <TableCell>
                                {article.imageNew.map((image, index) => (
                                    <img key={index} src={image} alt={article.nameNew} style={{ width: 50, height: 50, marginRight: 5 }} />
                                ))}
                            </TableCell>
                            <TableCell>{article.contentNew}</TableCell>
                            <TableCell>{article.createdAt}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEditClickOpen(article)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton>
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
                    />
                    <TextField
                        margin="dense"
                        label="Tiêu Đề"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Nội Dung"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                    />
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleClose} color="primary">Thêm</Button>
                </DialogActions>
            </Dialog>

            {/* Form Chỉnh Sửa Bài Viết */}
<Dialog open={openEdit} onClose={handleClose}>
    <DialogTitle>Chỉnh Sửa Bài Viết</DialogTitle>
    <DialogContent>
        {selectedArticle && (
            <>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Tên Bài Viết"
                    fullWidth
                    variant="outlined"
                    defaultValue={selectedArticle.nameNew}
                />
                <TextField
                    margin="dense"
                    label="Tiêu Đề"
                    fullWidth
                    variant="outlined"
                    defaultValue={selectedArticle.titleNew}
                />
                <TextField
                    margin="dense"
                    label="Nội Dung"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    defaultValue={selectedArticle.contentNew}
                />
                <div>
                    <Typography variant="subtitle2" sx={{ mt: 2 }}>Hình Ảnh Hiện Tại:</Typography>
                    {selectedArticle.imageNew.map((image, index) => (
                        <div key={index} style={{ display: 'inline-block', position: 'relative', marginRight: '10px' }}>
                            <img src={image} alt={selectedArticle.nameNew} style={{ width: 50, height: 50 }} />
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
        <Button onClick={handleClose} color="primary">Lưu</Button>
    </DialogActions>
</Dialog>

        </Paper>
    );
};

export default ArticleManagement;
