import { useState } from 'react';
import {
    Typography, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Chip, Button, MenuItem, Select, TextField, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialComments = [
    {
        id: 1,
        userName: "John Doe",
        email: "johndoe@example.com",
        content: "Bình luận rất hay!",
        time: "2024-09-20 10:15",
        status: "Hiển thị",
        statusColor: "success",
        location: "Đà Nẵng" // Thêm trường địa điểm
    },
    {
        id: 2,
        userName: "Jane Smith",
        email: "janesmith@example.com",
        content: "Tôi đồng ý với ý kiến này!",
        time: "2024-09-19 14:23",
        status: "Hiển thị",
        statusColor: "success",
        location: "Quảng Ngãi" // Thêm trường địa điểm
    },
    {
        id: 3,
        userName: "Mike Johnson",
        email: "mikej@example.com",
        content: "Bài viết này rất hữu ích.",
        time: "2024-09-18 09:45",
        status: "Ẩn",
        statusColor: "error",
        location: "Hà Nội" // Thêm trường địa điểm
    },
];

const CommentManagement = () => {
    const [comments, setComments] = useState(initialComments);
    const [filteredComments, setFilteredComments] = useState(initialComments);
    const [editCommentId, setEditCommentId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [searchParams, setSearchParams] = useState({
        id: '',
        userName: '',
        email: '',
        location: '', // Thêm trường địa điểm vào tìm kiếm
    });

    const handleEdit = (comment) => {
        setEditCommentId(comment.id);
        setSelectedStatus(comment.status);
    };

    const handleSave = (id) => {
        setComments(comments.map(comment =>
            comment.id === id ? { ...comment, status: selectedStatus, statusColor: getStatusColor(selectedStatus) } : comment
        ));
        setEditCommentId(null); // Thoát chế độ chỉnh sửa
    };

    const handleDeleteComment = (id) => {
        setComments(comments.filter(comment => comment.id !== id));
        setFilteredComments(filteredComments.filter(comment => comment.id !== id));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Hiển thị":
                return "success";
            case "Ẩn":
                return "error";
            default:
                return "default";
        }
    };

    // Xử lý tìm kiếm
    const handleSearch = () => {
        const filtered = comments.filter(comment => {
            return (
                (searchParams.id === '' || comment.id === parseInt(searchParams.id)) &&
                (searchParams.userName === '' || comment.userName.toLowerCase().includes(searchParams.userName.toLowerCase())) &&
                (searchParams.email === '' || comment.email.toLowerCase().includes(searchParams.email.toLowerCase())) &&
                (searchParams.location === '' || comment.location.toLowerCase().includes(searchParams.location.toLowerCase())) // Lọc theo địa điểm
            );
        });
        setFilteredComments(filtered);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Quản Lý Bình Luận
            </Typography>

            {/* Form Tìm Kiếm */}
            <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="ID Khách Hàng"
                            variant="outlined"
                            value={searchParams.id}
                            onChange={(e) => setSearchParams({ ...searchParams, id: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Tên Người Bình Luận"
                            variant="outlined"
                            value={searchParams.userName}
                            onChange={(e) => setSearchParams({ ...searchParams, userName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={searchParams.email}
                            onChange={(e) => setSearchParams({ ...searchParams, email: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Tên Địa Điểm"
                            variant="outlined"
                            value={searchParams.location}
                            onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ height: '100%' }}
                            onClick={handleSearch}
                        >
                            Tìm Kiếm
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Bảng Bình Luận */}
            <Table aria-label="bảng bình luận">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                STT
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên địa điểm
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên người dùng
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Email
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Nội dung
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Thời gian
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Trạng thái
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="subtitle2" fontWeight={600}>
                                Hành động
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredComments.map((comment, index) => (
                        <TableRow key={comment.id}>
                            <TableCell>
                                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                    {index + 1}
                                </Typography>
                            </TableCell>
                            <TableCell>{comment.location}</TableCell> {/* Thêm cột địa điểm */}
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {comment.userName}
                                </Typography>
                            </TableCell>
                            <TableCell>{comment.email}</TableCell>
                            <TableCell>{comment.content}</TableCell>
                            <TableCell>{comment.time}</TableCell>
                            <TableCell>
                                {editCommentId === comment.id ? (
                                    <Select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        size="small"
                                        sx={{ minWidth: 120 }}
                                    >
                                        <MenuItem value="Hiển thị">Hiển thị</MenuItem>
                                        <MenuItem value="Ẩn">Ẩn</MenuItem>
                                    </Select>
                                ) : (
                                    <Chip
                                        label={comment.status}
                                        color={comment.statusColor}
                                        size="small"
                                        sx={{ px: 1 }}
                                    />
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {editCommentId === comment.id ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleSave(comment.id)}
                                    >
                                        Lưu
                                    </Button>
                                ) : (
                                    <>
                                        <IconButton onClick={() => handleEdit(comment)}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteComment(comment.id)}>
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default CommentManagement;
