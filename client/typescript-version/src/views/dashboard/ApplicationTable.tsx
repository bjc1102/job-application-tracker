// ** React Imports
import { useState, Fragment } from 'react'

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
import { Button, Collapse, Grid, IconButton } from '@mui/material'
import useUserApplicationList from 'src/hooks/queries/useUserApplicationList'
import { UserApplicationType } from 'src/types/Application'
import { statusColorOption } from 'src/static/statusOption'
import { styled } from '@mui/material/styles'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

interface DashboardTableProps {
  handleModal: () => void
}

interface RowProps {
  application: UserApplicationType
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

const Row = ({ application }: RowProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
          <a href={application.link} target='_blank' rel='noreferrer'>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.775rem !important' }}>{application.title}</Typography>
            </Box>
          </a>
        </TableCell>
        <TableCell align='center'>{application.platform}</TableCell>
        <TableCell align='center'>
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
        <TableCell align='center'>{application.histories[0].status_create_date}</TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important', borderBottom: 'none' }}>
          <Collapse in={open} timeout='auto'>
            <Grid container spacing={6}>
              <Grid item sx={{ m: 4 }}>
                <Box sx={{ m: 4 }}>
                  <Typography variant='h6' gutterBottom component='div'>
                    Files
                  </Typography>
                  {application.files.map((v, index) => (
                    <span key={index}>
                      {v.file_info}
                      {index < application.files.length - 1 && ', '}
                    </span>
                  ))}
                </Box>
                <Box sx={{ m: 4 }}>
                  <Typography variant='h6' gutterBottom component='div'>
                    History
                  </Typography>
                  <Table size='small' aria-label='purchases'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>채용단계날짜</TableCell>
                        <TableCell align='center'>채용단계</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {application.histories.map(historyRow => (
                        <TableRow key={historyRow.id}>
                          <TableCell align='center'>{historyRow.status_create_date}</TableCell>
                          <TableCell align='center'>
                            <Chip
                              label={historyRow.status}
                              color={statusColorOption(historyRow.status)}
                              sx={{
                                height: 24,
                                fontSize: '0.75rem',
                                textTransform: 'capitalize',
                                '& .MuiChip-label': { fontWeight: 500 }
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const ApplicationTable = ({ handleModal }: DashboardTableProps) => {
  const { data: applications } = useUserApplicationList()

  return (
    <Card sx={{ borderRadius: '0px' }}>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} stickyHeader aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>공고명</TableCell>
              <TableCell align='center'>지원 플랫폼</TableCell>
              <TableCell align='center'>최근진행상황</TableCell>
              <TableCell align='center'>진행일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications?.map(row => {
              return <Row key={row.id} application={row} />
            })}
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
