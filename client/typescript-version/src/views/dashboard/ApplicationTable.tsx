// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { Button } from '@mui/material'
import useUserApplicationList from 'src/hooks/queries/useUserApplicationList'
import { UserApplicationType } from 'src/types/Application'
import { statusColorOption } from 'src/static/statusOption'
import { styled } from '@mui/material/styles'

// const statusObj: StatusObj = {
//   applied: { color: 'info' },
//   rejected: { color: 'error' },
//   current: { color: 'primary' },
//   resigned: { color: 'warning' },
//   professional: { color: 'success' }
// }

interface DashboardTableProps {
  handleModal: () => void
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: `${theme.palette.action.hover}`
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const ApplicationTable = ({ handleModal }: DashboardTableProps) => {
  const { data: applications } = useUserApplicationList()

  return (
    <Card sx={{ borderRadius: '0px' }}>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} stickyHeader aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>공고명</TableCell>
              <TableCell>지원 플랫폼</TableCell>
              <TableCell>제출 파일</TableCell>
              <TableCell>진행상황</TableCell>
              <TableCell>진행일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications?.map((application: UserApplicationType) => (
              <StyledTableRow hover key={application.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <a href={application.link} target='_blank' rel='noreferrer'>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {application.title}
                      </Typography>
                    </Box>
                  </a>
                </TableCell>
                <TableCell>{application.platform}</TableCell>
                <TableCell>
                  {application.files.map((v, index) => (
                    <span key={index}>
                      {v.file_info}
                      {index < application.files.length - 1 && ', '}
                    </span>
                  ))}
                </TableCell>
                <TableCell>{application.histories[0].status_create_date}</TableCell>
                <TableCell>
                  <Chip
                    label={application.histories[0].status}
                    color={statusColorOption(application.histories[0].status)}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant='outlined'
        color='primary'
        onClick={handleModal}
        sx={{ marginTop: 2, width: '100%', borderRadius: '0px' }} // 버튼 스타일을 조정하고 width를 100%로 설정합니다.
      >
        추가하기
      </Button>
    </Card>
  )
}

export default ApplicationTable
