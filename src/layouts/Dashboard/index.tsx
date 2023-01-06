import { Box } from "@mui/material";
import Header from "../../Components/Header";

const Dashboard = () => {
    return (
        <Box m="20px">
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Header title="Dashboard" subtitle="Welcome to dashboard"/>
            </Box>
            <div>
                Dashboard
            </div>
        </Box>
    )
}

export default Dashboard;