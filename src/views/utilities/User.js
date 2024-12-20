import { useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleGetUsers } from "../../service";
import { useEffect } from "react";
import { toast } from "react-toastify";
// Dữ liệu cứng ban đầu

const CustomerManagement = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [custommer, setCustommers] = useState([]);
  // Mở form chỉnh sửa
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setOpenEdit(true);
  };

  const handleUpdateRole = async () => {
    const dataUP = {
      role: selectedCustomer.role,
    };
    try {
      const res = await fetch(
        `http://localhost:3001/User/Edit-User/${selectedCustomer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUP),
        },
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log(data.data.role);
        setSelectedCustomer((prev) => ({
          ...prev,
          role: data.data.role,
        }));
        setCustommers((prev) =>
          prev.map((i) => {
            if (i._id === selectedCustomer._id) {
              return {
                ...i,
                role: data.data.role,
              };
            } else {
              return i;
            }
          })
        );
        handleCloseEdit();
        notification("success", "Edit successfully");
      } else {
        console.error("Failed to update user:", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    });
  };
  // Đóng form chỉnh sửa
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  useEffect(() => {
    const handleCallUser = async () => {
      const res = await handleGetUsers();
      setCustommers(res.Users);
    };
    handleCallUser();
  }, [selectedCustomer.role]);

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
      {/* Tiêu đề được căn giữa */}
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
      >
        Quản Lý Users
      </Typography>

      {/* Bảng khách hàng */}
      <Table aria-label="bảng user">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "#E3F2FD" }}>
              <Typography variant="subtitle2" fontWeight={600}>
                STT
              </Typography>
            </TableCell>
            <TableCell sx={{ backgroundColor: "#E3F2FD" }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Tên khách hàng
              </Typography>
            </TableCell>
            <TableCell sx={{ backgroundColor: "#E3F2FD" }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Email
              </Typography>
            </TableCell>
            <TableCell sx={{ backgroundColor: "#E3F2FD" }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Mật khẩu
              </Typography>
            </TableCell>
            <TableCell sx={{ backgroundColor: "#E3F2FD" }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Vai trò
              </Typography>
            </TableCell>
            <TableCell sx={{ backgroundColor: "#E3F2FD" }} align="right">
              <Typography variant="subtitle2" fontWeight={600}>
                Hành động
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {custommer.map((customer, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>{customer.Name}</TableCell>
              <TableCell>{customer.Email}</TableCell>
              <TableCell>{customer.Password}</TableCell>
              <TableCell>{customer.role}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEdit(customer)}>
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

      {/* Form chỉnh sửa khách hàng */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Chỉnh sửa khách hàng</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên khách hàng"
            fullWidth
            variant="outlined"
            value={selectedCustomer.Name}
            onChange={(e) =>
              setSelectedCustomer({ ...selectedCustomer, Name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            value={selectedCustomer.Email}
            onChange={(e) =>
              setSelectedCustomer({
                ...selectedCustomer,
                Email: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Mật khẩu"
            fullWidth
            variant="outlined"
            value={selectedCustomer.Password}
            onChange={(e) =>
              setSelectedCustomer({
                ...selectedCustomer,
                Password: e.target.value,
              })
            }
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Vai trò</InputLabel>
            <Select
              value={selectedCustomer.role}
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  role: e.target.value,
                })
              }
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Staff">Nhân viên</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">
            Đóng
          </Button>
          <Button onClick={handleUpdateRole} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CustomerManagement;
