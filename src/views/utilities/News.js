import { useState } from 'react';
import {
    Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Modal, TextField, Button, CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialPosts = [
    { id: "1", title: "Bài viết 1", content: "Nội dung bài viết 1", image: "https://via.placeholder.com/150" },
    { id: "2", title: "Bài viết 2", content: "Nội dung bài viết 2", image: "https://via.placeholder.com/150" },
    { id: "3", title: "Bài viết 3", content: "Nội dung bài viết 3", image: "https://via.placeholder.com/150" },
];

const PostManagement = () => {
    const [postList, setPostList] = useState(initialPosts); // Danh sách bài viết
    const [openModal, setOpenModal] = useState(false); // Kiểm soát modal
    const [currentPost, setCurrentPost] = useState(null); // Bài viết hiện tại được chọn
    const [selectedImage, setSelectedImage] = useState(null); // Hình ảnh đã chọn

    // Mở modal và khởi tạo giá trị cho form
    const handleEdit = (post) => {
        setCurrentPost(post);
        setSelectedImage(null);
        setOpenModal(true);
    };

    // Xóa bài viết
    const handleDelete = (id) => {
        setPostList(postList.filter(post => post.id !== id));
    };

    // Lưu bài viết (chỉnh sửa hoặc thêm mới)
    const handleSave = () => {
        let updatedPost = { ...currentPost };

        const reader = new FileReader();
        if (selectedImage) {
            reader.onload = () => {
                updatedPost.image = reader.result;
                if (!updatedPost.id) {
                    updatedPost.id = (postList.length + 1).toString(); // Tạo ID mới
                    setPostList([...postList, updatedPost]); // Thêm bài viết mới
                } else {
                    setPostList(postList.map(post => post.id === currentPost.id ? updatedPost : post)); // Cập nhật bài viết
                }
                setOpenModal(false);
            };
            reader.readAsDataURL(selectedImage);
        } else {
            if (!updatedPost.id) {
                updatedPost.id = (postList.length + 1).toString();
                setPostList([...postList, updatedPost]); // Thêm bài viết mới nếu không có ID
            } else {
                setPostList(postList.map(post => post.id === currentPost.id ? updatedPost : post)); // Cập nhật bài viết
            }
            setOpenModal(false);
        }
    };

    const handleChange = (e) => {
        setCurrentPost({
            ...currentPost,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]); // Thay đổi hình ảnh đã chọn
    };

    const handleImageRemove = () => {
        setCurrentPost({
            ...currentPost,
            image: null // Xóa hình ảnh hiện tại
        });
    };

    return (
        <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 1, overflowX: 'auto' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Quản lý Bài Viết
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => setCurrentPost({ id: '', title: '', content: '', image: '' }) || setOpenModal(true)}
            >
                Thêm Bài Viết
            </Button>
            <Table aria-label="simple table" sx={{ whiteSpace: "nowrap" }}>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Mã</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Tiêu đề</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Hình ảnh</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>Nội dung</Typography></TableCell>
                        <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Hành động</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {postList.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{post.id}</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>{post.title}</Typography></TableCell>
                            <TableCell>
                                {post.image ? (
                                    <CardMedia component="img" image={post.image} alt={post.title} sx={{ width: 100, height: 75 }} />
                                ) : (
                                    <Typography variant="body2">Không có hình ảnh</Typography>
                                )}
                            </TableCell>
                            <TableCell><Typography variant="body2">{post.content}</Typography></TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEdit(post)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(post.id)}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Modal thêm hoặc chỉnh sửa bài viết */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" gutterBottom>{currentPost?.id ? 'Chỉnh sửa Bài Viết' : 'Thêm Bài Viết'}</Typography>
                    {currentPost && (
                        <Box component="form">
                            <TextField
                                fullWidth
                                label="Tiêu đề"
                                name="title"
                                value={currentPost.title}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Nội dung"
                                name="content"
                                multiline
                                rows={6} // Cho phép nhập nhiều dòng
                                value={currentPost.content}
                                onChange={handleChange}
                                inputProps={{
                                    maxLength: 5000, // Thêm maxLength nếu bạn muốn giới hạn (có thể bỏ qua)
                                }}
                                sx={{ mb: 2 }}
                            />
                            {currentPost.image ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <CardMedia
                                        component="img"
                                        image={currentPost.image}
                                        alt={currentPost.title}
                                        sx={{ width: 100, height: 75, mr: 2 }}
                                    />
                                    <Button variant="contained" color="secondary" onClick={handleImageRemove}>
                                        Xóa Hình Ảnh
                                    </Button>
                                </Box>
                            ) : (
                                <Typography variant="body2" sx={{ mb: 2 }}>Không có hình ảnh</Typography>
                            )}
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ mb: 2 }}
                            >
                                Upload Hình ảnh (JPEG)
                                <input
                                    type="file"
                                    accept="image/jpeg"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </Button>
                            {selectedImage && (
                                <Typography variant="body2">{selectedImage.name}</Typography>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 1 }}>
                                    {currentPost?.id ? 'Lưu' : 'Thêm'}
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => setOpenModal(false)}>
                                    Hủy
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default PostManagement;
