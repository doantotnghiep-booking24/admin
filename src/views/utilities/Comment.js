import { useEffect, useState } from 'react';
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
    const [dataComment, setDataComment] = useState([]);
    const [dataTour, setDataTour] = useState([]);
    const [dataUser, setDataUser] = useState([]);

    const getDataComment = async () => {
        try {
            const result = await fetch('http://localhost:3001/V1/Review/GetAllReview', { credentials: "include" });
            const data = await result.json();


            setDataComment(data)
        } catch (error) {
            console.log(error);
        }
    }

    const getDataTour = async () => {
        try {
            const result = await fetch('http://localhost:3001/V1/Tours/GetTours', { credentials: "include" });
            const data = await result.json();


            setDataTour(data.Tours.datas)
        } catch (error) {
            console.log(error);
        }
    }

    const getDataUser = async () => {
        try {
            const result = await fetch('http://localhost:3001/User/GetAllUsers', { credentials: "include" });
            const data = await result.json();


            setDataUser(data.Users)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        getDataComment();
        getDataUser();
        getDataTour();
    }, [])
    console.log(dataUser);



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
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                STT
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên địa điểm
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên người dùng
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Email
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Nội dung
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Thời gian
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Trạng thái
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }} align="right">
                            <Typography variant="subtitle2" fontWeight={600}>
                                Hành động
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataComment.map((comment, index) => (
                        <TableRow key={comment._id}>
                            <TableCell>
                                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                    {index + 1}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {dataTour.filter(i => i._id === comment.tourId).map(i =>
                                    i.Name_Tour ? i.Name_Tour : "Chua co ten"
                                )}
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {dataUser.filter(i => i._id === comment.userId).map(i =>
                                        i.Name ? i.Name : "Chua co ten"
                                    )}

                                </Typography>
                            </TableCell>
                            <TableCell>{dataUser.filter(i => i._id === comment.userId).map(i =>
                                i.Email ? i.Email : "Chua co ten"
                            )}
                            </TableCell>
                            <TableCell>{comment.content}</TableCell>
                            <TableCell>{comment.
                                Created_At}</TableCell>
                            <TableCell>
                                <Chip
                                    label={comment.isDeleted ? 
                                        "Xóa" : "Hiển thị"
                                    }
                                    color={comment.isDeleted ? "info": "error"}
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
