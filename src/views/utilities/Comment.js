import { useState } from 'react'; 
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Chip
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
        location: "Đà Nẵng"
    },
    {
        id: 2,
        userName: "Jane Smith",
        email: "janesmith@example.com",
        content: "Tôi đồng ý với ý kiến này!",
        time: "2024-09-19 14:23",
        status: "Hiển thị",
        statusColor: "success",
        location: "Quảng Ngãi"
    },
    {
        id: 3,
        userName: "Mike Johnson",
        email: "mikej@example.com",
        content: "Bài viết này rất hữu ích.",
        time: "2024-09-18 09:45",
        status: "Ẩn",
        statusColor: "error",
        location: "Hà Nội"
    },
];

const CommentManagement = () => {
    const [comments] = useState(initialComments);

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            {/* Tiêu đề được căn giữa */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Bình Luận
            </Typography>

            {/* Bảng Bình Luận */}
            <Table aria-label="bảng bình luận">
                <TableHead>
                    <TableRow>
                    <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                STT
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên địa điểm
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên người dùng
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Email
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Nội dung
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Thời gian
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Trạng thái
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E0F7FA' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>
                                Hành động
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {comments.map((comment, index) => (
                        <TableRow key={comment.id}>
                            <TableCell>
                                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                    {index + 1}
                                </Typography>
                            </TableCell>
                            <TableCell>{comment.location}</TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {comment.userName}
                                </Typography>
                            </TableCell>
                            <TableCell>{comment.email}</TableCell>
                            <TableCell>{comment.content}</TableCell>
                            <TableCell>{comment.time}</TableCell>
                            <TableCell>
                                <Chip
                                    label={comment.status}
                                    color={comment.statusColor}
                                    size="small"
                                    sx={{ px: 1 }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton>
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
        </Paper>
    );
};

export default CommentManagement;
