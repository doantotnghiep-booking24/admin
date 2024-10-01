import { useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialCustomers = [
    {
        id: 1,
        Name_Customer: "Nguyễn Văn A",
        Date_Of_Birth: "1990-01-15",
        Sex_Customer: "Nam",
        Phone_Number: "0901234567",
        Citizen_Identification: "0123456789",
        Address: "123 Đường ABC, Quận 1, TP.HCM"
    },
    {
        id: 2,
        Name_Customer: "Trần Thị B",
        Date_Of_Birth: "1985-07-20",
        Sex_Customer: "Nữ",
        Phone_Number: "0909876543",
        Citizen_Identification: "9876543210",
        Address: "456 Đường XYZ, Quận 3, TP.HCM"
    },
    {
        id: 3,
        Name_Customer: "Phạm Văn C",
        Date_Of_Birth: "1992-12-30",
        Sex_Customer: "Nam",
        Phone_Number: "0912345678",
        Citizen_Identification: "3456789123",
        Address: "789 Đường DEF, Quận 5, TP.HCM"
    }
];

const CustomerManagement = () => {
    const [customers] = useState(initialCustomers);

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            {/* Tiêu đề căn giữa */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quản Lý Khách Hàng
            </Typography>

            <Table aria-label="bảng khách hàng">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Tên Khách Hàng
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Ngày Sinh
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Giới Tính
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Số Điện Thoại
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                CMND/CCCD
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#E3F2FD' }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Địa Chỉ
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
                    {customers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell>
                                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                    {customer.id}
                                </Typography>
                            </TableCell>
                            <TableCell>{customer.Name_Customer}</TableCell>
                            <TableCell>{customer.Date_Of_Birth}</TableCell>
                            <TableCell>{customer.Sex_Customer}</TableCell>
                            <TableCell>{customer.Phone_Number}</TableCell>
                            <TableCell>{customer.Citizen_Identification}</TableCell>
                            <TableCell>{customer.Address}</TableCell>
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

export default CustomerManagement;
 