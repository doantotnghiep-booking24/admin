/* eslint-disable react-hooks/rules-of-hooks */
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
    Badge,
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
    MenuItem,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { toast } from 'react-toastify';
import {
    Box,
    Card,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
    Rating,
    // Tooltip,
} from "@mui/material";
import { IconBellRinging } from '@tabler/icons-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { handleUpdate_StatusTickets, handleGetTickets, handleCustommers, handleVouchers, handleGetUsers, handleConfirmCancleTicket } from '../../service/index.js'
import { useEffect } from 'react';
const ticketManagement = () => {
    const [openBill, setOpenBill] = useState(false);
    const [openBell, setOpenBell] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [custommers, setCustommers] = useState([]);
    const [users, setUser] = useState([]);
    const [voucher, setVoucher] = useState([]);
    const [ticket, SetTicket] = useState([])
    const [valueCus, setValueCus] = useState([])
    const [valueVou, setValueVou] = useState([])
    const handleBillClickOpen = (ticket) => {
        setSelectedBill(ticket);
        setOpenBill(true);
    }
    const handleBillClickOpenBell = () => {
        setOpenBell(true)
    }
    const handleCloseBell = () => {
        setOpenBell(false)
    }
    useEffect(() => {
        const handleGetUser = async () => {
            const res = await handleGetUsers()
            setUser(res.Users)
        }
        handleGetUser()
    }, [])

    useEffect(() => {
        const result = custommers.filter(cus => {
            return cus._id === ticket.id_Custommer
        })
        setValueCus(result)
    }, [])
    
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

        if (res) {
            location.reload()
        }
        setTimeout(() => {
            location.reload()
        }, 1000)
    };
    const HandleConfirmCancleTicket = async (id, idCus) => {
        const res = await handleConfirmCancleTicket(id, idCus)
        if (res) {
            notification("success", "Xác nhận hủy thành công!!!")
            location.reload()
        }

    }
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
console.log(custommers);

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center', fontFamily: 'Arial' }}>
                Quản Lý Vé Đặt Tour
                <IconButton style={{ position: 'absolute', right: 0, marginRight: '60px' }}
                    size="large"
                    aria-label="show 11 new notifications"
                    color="inherit"
                    aria-controls="msgs-menu"
                    aria-haspopup="true"
                    onClick={handleBillClickOpenBell}
                >
                    <Badge variant="dot" color="primary">
                        <IconBellRinging size="21" stroke="1.5" />

                    </Badge>
                </IconButton>
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
                            {custommers.filter(Cus => Cus._id === ticket.id_Custommer).map(user => (
                                <TableCell sx={{ fontSize: '13px',width : '50px', fontFamily: 'Arial' }}>{user ? user.Name_Customer : ''}</TableCell>
                            ))}
                            {ticket.id_Custommer === null && <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>Null</TableCell>}
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>
                                <Typography>
                                    <strong>Điểm đi:</strong> {ticket.Departure_Location}<br /> <br />
                                    <strong>Điểm đến:</strong> {ticket.Destination}<br /><br />
                                    <strong>Ngày khởi hành:</strong> {ticket.Departure_Date.slice(0, 10)}<br /><br />
                                    <strong>Giờ khởi hành:</strong> {ticket.Departure_Time}<br /><br />
                                    <strong>Tổng thời gian:</strong> {ticket.Total_DateTrip}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ fontSize: '13px', fontFamily: 'Arial' }}>{ticket?.Created_at_Booking?.slice(0, 10)}</TableCell>
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
                                        {ticket.Status_Payment !== 'Chưa Thanh Toán' && ticket.Status === 'Đã Xác Nhận' ||  ticket.Status === 'Đã Hoàn Thành' ? <MenuItem disabled={true} value={`Đã Xác Nhận,` + `${ticket._id},` + `${ticket.id_Custommer}`}>Đã Xác nhận</MenuItem> : (ticket.Status_Payment !== 'Chưa Thanh Toán' && ticket.Status !== 'Đã Xác Nhận' ? <MenuItem value={`Đã Xác Nhận,` + `${ticket._id},` + `${ticket.id_Custommer}`}>Đã Xác nhận</MenuItem> : <MenuItem value={`Đã Hủy,` + `${ticket._id},` + `${ticket.id_Custommer}`}>Đã Hủy</MenuItem>)}
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
            {/* Modal Dialog */}
            <Dialog open={openBell} onClose={handleCloseBell} maxWidth="md" fullWidth>
                <DialogTitle
                    style={{ backgroundColor: "#3fd0d4", color: "#fff" }}
                >
                    Danh sách vé yêu cầu hủy
                </DialogTitle>
                <DialogContent
                    dividers
                    style={{
                        padding: "20px 30px",
                        backgroundColor: "#f7f7f7",
                        // display: "flex",
                        // justifyContent: "space-evenly",
                    }}
                >
                    <List>
                        {ticket?.filter(ticket => ticket.isRequestCancel === true).map((ticket, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    padding: 2,
                                    backgroundColor: "#f9f9f9",
                                    borderRadius: 2,
                                    marginY: 1,
                                    boxShadow: 1,
                                    alignItems: "center",
                                    display: "flex",
                                }}
                            >
                                {users?.filter((user) => user._id === ticket.id_user).map(user => (
                                    <div key={user._id}>
                                        <h4>{user.Name}</h4>
                                        <Avatar
                                            src={user?.photoUrl}
                                            // alt={tour.Name_Tour}
                                            sx={{ width: 72, height: 72, marginRight: 3 }}
                                        />
                                    </div>
                                ))}
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" style={{ marginTop: '37px' }} color="textSecondary">
                                            Đã yêu cầu hủy chuyến đi : {ticket.Title_Tour}
                                        </Typography>
                                    }
                                    secondary={
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                marginTop: 1,
                                            }}
                                        >
                                            <Typography variant="body2" color="textSecondary">
                                                Lý do:
                                            </Typography>
                                            {/* <Rating
                                                name="tour-rating"
                                                value={tour.totalReview}
                                                readOnly
                                                precision={0.1}
                                                sx={{ color: "#fbc02d" }}
                                            /> */}
                                        </Box>
                                    }
                                />
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    {/* <DoneIcon/> */}
                                    <div onClick={() => HandleConfirmCancleTicket(ticket._id, ticket.id_Custommer)} style={{ cursor: 'pointer' }}>
                                        <CheckCircleOutlineIcon style={{ lineHeight: '0px', fontSize: '23px', cursor: 'pointer' }} />
                                    </div>
                                    <span onClick={() => HandleConfirmCancleTicket(ticket._id, ticket.id_Custommer)} style={{ cursor: 'pointer' }}>Xác nhận hủy</span>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions style={{ backgroundColor: "#f7f7f7" }}>
                    <Button
                        onClick={handleCloseBell}
                        color="primary"
                        variant="contained"
                        style={{ backgroundColor: "#3fd0d4", color: "#fff" }}
                    >
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>

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
                                    <Typography key={voucher._id}><strong>Phần Trăm Giảm Giá:</strong> {voucher.Discount + '%'}</Typography>
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
