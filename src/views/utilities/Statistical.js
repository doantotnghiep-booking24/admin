
import { Grid, Paper, Typography,  } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticsDashboard = () => {
  // Sample data
  const totalTickets = 120;
  const totalRevenue = 3500000;

  const chartData = {
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
    datasets: [
      {
        label: 'Revenue by Category',
        data: [1200000, 900000, 1500000, 700000, 500000],
        backgroundColor: ['#3f51b5', '#2196f3', '#00bcd4', '#009688', '#4caf50'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh Thu Theo Danh Mục',
      },
    },
  };

  return (
    <Grid container spacing={4}>
      {/* Tổng Số Vé Khách Hàng Đặt */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">Tổng Số Vé Khách Hàng Đặt</Typography>
          <Typography variant="h4" color="primary">{totalTickets}</Typography>
        </Paper>
      </Grid>

      {/* Tổng Doanh Thu */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">Tổng Doanh Thu</Typography>
          <Typography variant="h4" color="primary">{totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography>
        </Paper>
      </Grid>

      {/* Biểu Đồ Doanh Thu Theo Danh Mục */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>Biểu Đồ Danh Mục</Typography>
          <Bar data={chartData} options={chartOptions} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StatisticsDashboard;
