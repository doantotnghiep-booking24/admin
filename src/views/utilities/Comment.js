import { useState } from 'react';
import {
    Typography, 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Paper,
    Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

// Dữ liệu mẫu cho bình luận
const initialComments = [
    {
        id: 1,
        userId: "101",
        userName: "John Doe",
        content: "Chuyến tour này thật tuyệt vời!",
        status: "Hoạt động",
    },
    {
        id: 2,
        userId: "102",
        userName: "Jane Smith",
        content: "Tôi thực sự rất thích trải nghiệm này.",
        status: "Hoạt động",
    },
    {
        id: 3,
        userId: "103",
        userName: "Chris Brown",
        content: "Có một số vấn đề với việc đặt tour.",
        status: "Bị chặn",
    },
];

const CommentManagement = () => {
    const [comments, setComments] = useState(initialComments);

    const handleDelete = (id) => {
        setComments(comments.filter(comment => comment.id !== id));
        console.log("Đã xóa bình luận với id:", id);
    };

    const handleBlock = (id) => {
        setComments(comments.map(comment => 
            comment.id === id ? { ...comment, status: "Bị chặn" } : comment
        ));
        console.log("Đã chặn bình luận với id:", id);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Quản lý Bình luận
            </Typography>
            <Table aria-label="comment table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                ID Người dùng
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên Người dùng
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Nội dung Bình luận
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
                    {comments.map((comment) => (
                        <TableRow key={comment.id}>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {comment.userId}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {comment.userName}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                    {comment.content}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={comment.status}
                                    color={comment.status === "Bị chặn" ? "error" : "success"}
                                    size="small"
                                    sx={{ px: 1 }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleDelete(comment.id)}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                                <IconButton onClick={() => handleBlock(comment.id)}>
                                    <BlockIcon color="error" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default CommentManagement;
