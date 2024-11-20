import { useRef, useState } from 'react';
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
    Grid,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { handleUpdate_StatusTickets, handleGetTickets, handleCustommers, handleVouchers } from '../../service/index.js'
import { useEffect } from 'react';
const ticketManagement = () => {
    const [openBill, setOpenBill] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [custommers, setCustommers] = useState([]);
    const [voucher, setVoucher] = useState([]);
    const [ticket, SetTicket] = useState([])
    const [valueCus, setValueCus] = useState([])
    const [valueVou, setValueVou] = useState([])
    const handleBillClickOpen = (ticket) => {
        setSelectedBill(ticket);
        setOpenBill(true);
    }
    useEffect(() => {
        const result = custommers.filter(cus => {
            return cus._id === ticket.id_Custommer
        })
        setValueCus(result)
    },[])
    useEffect(() => {
        const result_voucher = voucher.filter(voucher => {
            return voucher.Condition.Min_tour_value === ticket.Price_Tour
        })
        setValueVou(result_voucher)
    }, [])
    useEffect(() => {
        const handleGetTicket = async () => {
            const res = await handleGetTickets()
            SetTicket(res.Tickets)
        }
        handleGetTicket()
    }, [])
    useEffect(() => {
        const callUsers = async () => {
            const res = await handleCustommers()
            setCustommers(res.Custommer)
        }
        callUsers()
    }, [])
    useEffect(() => {
        const callVouchers = async () => {
            const res = await handleVouchers()
            setVoucher(res.Voucher)
        }
        callVouchers()
    }, [])
    const handleClose = () => {
        setOpenBill(false);
        setSelectedBill(null);
    };
    const handleChange = async (event) => {
        const selectValue = event.target.value
        const result = selectValue.split(',')
        console.log(result);
        
        const data = {
            Status: result[0],
            id_Ticket: result[1],
            id_Custommer: result[2]
        }
        const res = await handleUpdate_StatusTickets(data)
        console.log(res);
        
        if(res){
            location.reload()
        }
        setTimeout(() => {
            location.reload()
        }, 1000)
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Đã Thanh Toán":
                return "success";
            case "Chưa Thanh Toán":
                return "warning";
            case "Tiếp Nhận":
                return "primary";
            case "Đã Xác Nhận":
                return "primary";
            case "Đã hủy":
                return "error";
            default:
                return "default";
        }
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center', fontFamily: 'Arial' }}>
                Quản Lý Vé Đặt Tour
            </Typography>

            <Table aria-label="bảng vé đặt tour" sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        {['STT', 'Tên Chuyến Đi', 'Thông Tin Khách Hàng', 'Thông Tin Tour', 'Ngày Tạo', 'Trạng Thái Thanh Toán', 'Trạng Thái', 'Action', 'Chi Tiết'].map((header) => (
                            <TableCell key={header} sx={{ backgroundColor: '#E3F2FD', fontSize: '14px', fontFamily: 'Arial' }}>
                                <Typography variant="subtitle2" style={{ width: '100%' }} fontWeight={600}>{header}</Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ticket?.map((ticket, index) => (
                        <TableRow key={ticket.id}>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>{index}</TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>{ticket.Title_Tour}</TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>mail</TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>
                                <Typography>
                                    <strong>Điểm đi:</strong> {ticket.Departure_Location}<br /> <br />
                                    <strong>Điểm đến:</strong> {ticket.Destination}<br /><br />
                                    <strong>Ngày khởi hành:</strong> {ticket.Departure_Date.slice(0, 10)}<br /><br />
                                    <strong>Giờ khởi hành:</strong> {ticket.Departure_Time}<br /><br />
                                    <strong>Tổng thời gian:</strong> {ticket.Total_DateTrip}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>{ticket.Created_at_Booking?.slice(0, 10)}</TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>
                                <Chip
                                    label={ticket.Status_Payment}
                                    color={getStatusColor(ticket.Status_Payment)}
                                    size="small"
                                    sx={{ px: 1 }}
                                />
                            </TableCell>
                            <TableCell style={{ width: '120px' }} sx={{ fontSize: '13px', fontFamily: 'Arial', fontWeight: 'bold' }}>{ticket.Status}</TableCell>
                            <TableCell sx={{ fontSize: '40px', fontFamily: 'Arial' }}>
                                <FormControl style={{ minWidth: '130px', minHeight: '50px' }}>
                                    <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={ticket.Status}
                                        color={getStatusColor(ticket?.Status)}
                                        label={ticket?.Status}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={`Đã Xác Nhận,` + `${ticket._id},` + `${ticket.id_Custommer}`}>Đã Xác nhận</MenuItem>
                                        <MenuItem value={`Đã Hủy,` + `${ticket._id},` + `${ticket.id_Custommer}`}>Đã Hủy</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            {/* <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>{ticket.Payment_Method}</TableCell> */}
                            <TableCell align="right">
                                <IconButton onClick={() => handleBillClickOpen(ticket)}>
                                    <VisibilityIcon color="primary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openBill} onClose={handleClose}>
                <DialogTitle sx={{ fontFamily: 'Arial', textAlign: 'center' }}>Hóa Đơn</DialogTitle>
                <DialogContent sx={{ fontFamily: 'Arial' }}>
                    {selectedBill && (
                        <Grid container spacing={2}>
                            {valueCus && valueCus.map(((cus, index) => (
                                <Grid item xs={12} key={index}>
                                    <Typography variant="h6" sx={{ fontFamily: 'Arial' }}>Thông Tin Khách Hàng</Typography>
                                    <Typography><strong>Tên:</strong> {cus?.Name_Customer}</Typography>
                                    <Typography><strong>Ngày Sinh:</strong> {cus?.Date_Of_Birth}</Typography>
                                    <Typography><strong>Giới Tính:</strong> {cus?.Sex_Customer}</Typography>
                                    <Typography><strong>Số Điện Thoại:</strong> {cus?.Phone_Number}</Typography>
                                    <Typography><strong>CCCD:</strong> {cus?.Citizen_Identification}</Typography>
                                    <Typography><strong>Địa Chỉ:</strong> {cus?.Address}</Typography>
                                </Grid>
                            )))}
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mt: 2, fontFamily: 'Arial' }}>Chi Tiết Vé</Typography>
                                <Typography><strong>Giá Vé Gốc:</strong> {selectedBill.Price_Tour} VND</Typography>
                                <Typography><strong>Giá Vé Sau Khi Giảm:</strong> {selectedBill.After_Discount > 0 ? selectedBill.After_Discount : selectedBill.Price_Tour} VND</Typography>
                                <Typography><strong>Số Lượng Người Lớn:</strong> {selectedBill.Adult}</Typography>
                                <Typography><strong>Số Lượng Trẻ Em:</strong> {selectedBill.Children}</Typography>
                                {valueVou && valueVou.map(voucher => (
                                    <Typography><strong>Phần Trăm Giảm Giá:</strong> {voucher.Discount + '%'}</Typography>
                                ))}
                                <Typography><strong>Tổng Số Người:</strong> {selectedBill.Adult + selectedBill.Children}</Typography>
                                <Typography><strong>Giá Vé Người Lớn :</strong> {selectedBill.After_Discount > 0 ? selectedBill.Adult_fare + '( Đã bao gồm giảm giá)' : selectedBill.Adult_fare}</Typography>
                                <Typography><strong>Giá Vé Trẻ Em:</strong> {selectedBill.After_Discount > 0 ? selectedBill.Children_fare + '( Đã bao gồm giảm giá)' : selectedBill.Children_fare}</Typography>
                                <Typography><strong>Tổng Giá:</strong> {selectedBill.Total_price} VND</Typography>
                                <Typography><strong>Mã Voucher:</strong> {selectedBill?.id_Voucher}</Typography>
                                <Typography><strong>Tổng Giá Sau Giảm Giá:</strong> {selectedBill.Total_price} VND</Typography>
                                <Typography><strong>Số Tiền Giảm Giá:</strong> {selectedBill.After_Discount > 0 ? selectedBill.Price_Tour - selectedBill.After_Discount + 'VND' : 'Vé này không bao gồm giảm giá !'}</Typography>
                                <Typography><strong>Tổng Số Tiền Phải Trả:</strong> {selectedBill.Total_price} VND</Typography>
                                <Typography><strong>Ngày Tạo:</strong> {selectedBill.Created_at_Booking.slice(0, 10)}</Typography>
                                <Typography><strong>Thời Gian Tạo:</strong> {selectedBill.Created_at_Booking.slice(11, 16)}</Typography>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Đóng</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ticketManagement;
