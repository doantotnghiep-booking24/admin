import { useEffect, useState } from 'react';
import { Box, Card, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Statistics() {
    const [data, setData] = useState({
        totalTours: 0,
        totalNews: 0,
        totalTickets: 0,
        totalRevenue: 0,
        totalAmount: 0, 
    });

    const [totalRevenueData, setTotalRevenueData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/Statistics')
            .then(response => {
                setData(response.data);
                setTotalRevenueData(response.data.totalRevenue); 
            })
            .catch(error => console.error(error));
    }, []);

    const pieData = {
        labels: ['Tất cả chuyến đi', 'Tất cả bài viết', 'Tất cả vé đã đặt'],
        datasets: [
            {
                data: [data.totalTours, data.totalNews, data.totalTickets],
                backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726'],
                hoverBackgroundColor: ['#64b5f6', '#81c784', '#ffb74d'],
            }
        ]
    };

    const barData = {
        labels: totalRevenueData.map(revenue => {
            const date = new Date(revenue._id);
            return `${date.getDate()}/${date.getMonth() + 1}`; 
        }),
        datasets: [
            {
                label: 'Vé chuyến đi theo ngày',
                data: totalRevenueData.map(revenue => revenue.totalRevenuePerDay),
                backgroundColor: '#42a5f5',
                borderColor: '#1e88e5',
                borderWidth: 1,
            }
        ]
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
            <Grid container spacing={3}>

                <Grid item xs={12} md={3}>
                    <Card sx={{ padding: 3, boxShadow: 3, backgroundColor: '#ffffff', borderRadius: 2 }}>
                        <Typography variant="h6" color="textSecondary">Tất cả chuyến đi</Typography>
                        <Typography variant="h4" color="primary">{data.totalTours}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{ padding: 3, boxShadow: 3, backgroundColor: '#ffffff', borderRadius: 2 }}>
                        <Typography variant="h6" color="textSecondary">Tất cả bài viết</Typography>
                        <Typography variant="h4" color="primary">{data.totalNews}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{ padding: 3, boxShadow: 3, backgroundColor: '#ffffff', borderRadius: 2 }}>
                        <Typography variant="h6" color="textSecondary">Tất cả vé đã đặt</Typography>
                        <Typography variant="h4" color="primary">{data.totalTickets}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{ padding: 3, boxShadow: 3, backgroundColor: '#ffffff', borderRadius: 2 }}>
                        <Typography variant="h6" color="textSecondary">Tổng tiền</Typography>
                        <Typography variant="h4" color="primary">{data.totalAmount.toLocaleString("vi-VN")} VND</Typography> 
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 4, boxShadow: 2, backgroundColor: '#ffffff', borderRadius: 2 }}>
                        <Typography variant="h6" align="center" color="textSecondary">Thống kê tổng quan</Typography>
                        <Pie data={pieData} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 4, boxShadow: 2, backgroundColor: '#ffffff', borderRadius: 2 }}>
                        <Typography variant="h6" align="center" color="textSecondary">Biểu đồ tổng hợp vé theo từng ngày</Typography>
                        <Bar data={barData} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Statistics;
