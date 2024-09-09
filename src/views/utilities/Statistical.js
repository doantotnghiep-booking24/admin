
import {
    Typography, Box,
    Card, CardContent,
    Grid, Divider
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dữ liệu ví dụ cho biểu đồ
const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
        {
            label: 'Doanh Thu',
            data: [10, 20, 30, 40, 50],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: (context) => `Doanh Thu: ${context.raw}`,
            },
        },
    },
};

const StatisticsDashboard = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Bảng Điều Khiển Thống Kê
            </Typography>
            <Grid container spacing={3}>
                {/* Thẻ Thống Kê 1 */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Tổng Doanh Thu
                            </Typography>
                            <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                                $50,000
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Thẻ Thống Kê 2 */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Khách Hàng Mới
                            </Typography>
                            <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                                150
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Thẻ Thống Kê 3 */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Doanh Thu Tổng
                            </Typography>
                            <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                                $120,000
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Tổng Quan Doanh Thu
                </Typography>
                <Bar data={data} options={options} />
            </Box>
        </Box>
    );
};

export default StatisticsDashboard;
