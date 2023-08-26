// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import useUserProfile from 'src/hooks/queries/useUserProfile'

import ApplicationForm from 'src/@core/components/modal/ApplicationForm'

const Dashboard = () => {
  const { data: user } = useUserProfile()

  console.log(user)

  return (
    <ApexChartWrapper>
      <ApplicationForm />
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
