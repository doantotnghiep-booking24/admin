import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Rating,
  // Tooltip,
} from "@mui/material";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArticleIcon from "@mui/icons-material/Article";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, ChartTooltip, Legend);

function Statistics() {
  const [data, setData] = useState({
    totalTours: 0,
    totalNews: 0,
    totalTickets: 0,
    totalRevenue: 0,
    totalAmount: 0,
    topRatedTours: [],
    topRatedTourCount: 0,
    topToursByBookings: [],
  });
  const [totalRevenueData, setTotalRevenueData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Statistics")
      .then((response) => {
        setData(response.data);
        setTotalRevenueData(response.data.totalRevenue);
      })
      .catch((error) => console.error(error));
  }, []);

  const pieData = {
    labels: ["Chuyến đi", "Bài viết", "Vé đã đặt"],
    datasets: [
      {
        data: [data.totalTours, data.totalNews, data.totalTickets],
        backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726"],
        hoverBackgroundColor: ["#64b5f6", "#81c784", "#ffb74d"],
      },
    ],
  };

  const barData = {
    labels: totalRevenueData.map((revenue) => {
      const date = new Date(revenue._id);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: totalRevenueData.map((revenue) => revenue.totalRevenuePerDay),
        backgroundColor: "#5e35b1",
        borderColor: "#4527a0",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 4 },
        backgroundColor: "#f9fafc",
        borderRadius: 2,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" align="center" sx={{ fontWeight: 700, marginBottom: 4 }}>
        Trang Thống Kê
      </Typography>
      <Grid container spacing={3}>
        {[
          {
            label: "Tất cả chuyến đi",
            value: data.totalTours,
            icon: <EventAvailableIcon sx={{ fontSize: 40, color: "#42a5f5" }} />,
          },
          {
            label: "Tất cả bài viết",
            value: data.totalNews,
            icon: <ArticleIcon sx={{ fontSize: 40, color: "#66bb6a" }} />,
          },
          {
            label: "Tất cả vé đã đặt",
            value: data.totalTickets,
            icon: <TrendingUpIcon sx={{ fontSize: 40, color: "#ffa726" }} />,
          },
          {
            label: "Tổng doanh thu",
            value: data.totalAmount.toLocaleString("vi-VN") + " VND",
            icon: <TrendingUpIcon sx={{ fontSize: 40, color: "#5e35b1" }} />,
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                padding: 3,
                boxShadow: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: `linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 100%)`,
                borderRadius: 2,
              }}
            >
              <Box>{item.icon}</Box>
              <Box textAlign="right">
                <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: 600 }}>
                  {item.label}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                  {item.value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 4,
              boxShadow: 3,
              background: `linear-gradient(135deg, rgba(250,250,250,1) 0%, rgba(240,240,240,1) 100%)`,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Thống kê tổng quan
            </Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 4,
              boxShadow: 3,
              background: `linear-gradient(135deg, rgba(250,250,250,1) 0%, rgba(240,240,240,1) 100%)`,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Biểu đồ doanh thu theo ngày
            </Typography>
            <Bar data={barData} />
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12} marginTop={4}>
          <Paper
            sx={{
              padding: 4,
              boxShadow: 3,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              Top Chuyến Đi Được Đánh Giá Cao Nhất
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              sx={{ marginBottom: 2 }}
            >
              Tổng số chuyến đi được đánh giá cao: {data.topRatedTourCount}
            </Typography>
            <List>
              {data.topRatedTours.map((tour, index) => (
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
                  <Avatar
                    src={tour?.Image_Tour[0]?.path}
                    alt={tour.Name_Tour}
                    sx={{ width: 72, height: 72, marginRight: 3 }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" color="primary">
                        {tour.Name_Tour}
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
                          Đánh giá:
                        </Typography>
                        <Rating
                          name="tour-rating"
                          value={tour.totalReview}
                          readOnly
                          precision={0.1}
                          sx={{ color: "#fbc02d" }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 4,
              boxShadow: 3,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              Top Chuyến Đi Được Đặt Vé Nhiều Nhất
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <List>
              {data.topToursByBookings.map((tour, index) => (
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
                  <Avatar
                    src={tour.Image_Tour?.[0]?.path || ""}
                    alt={tour.Name_Tour}
                    sx={{ width: 72, height: 72, marginRight: 3 }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" color="primary">
                        {tour.Name_Tour}
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
                          Số vé đã được đặt: {tour.bookingCount}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
    </Box>
  );
}

export default Statistics;
