// ** React Imports
import { useState, Fragment } from 'react'
import { toast } from 'react-toastify'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

// ** Types Imports
import { Button, Collapse, Grid, IconButton } from '@mui/material'
import useUserApplicationList from 'src/hooks/queries/useUserApplicationList'
import { UserApplicationType } from 'src/types/Application'
import { statusColorOption } from 'src/static/statusOption'
import { isAxiosError } from 'axios'
import { ErrorResponseDataType } from 'src/types/ErrorResponseDataType'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Pencil from 'mdi-material-ui/Pencil'
import Delete from 'mdi-material-ui/Delete'
import AlertDialog from 'src/@core/components/alert-dialog/AlertDialog'
import deleteUserApplicationData from 'src/api/deleteUserApplicationData'
import { useQueryClient } from '@tanstack/react-query'
import { userApplications } from 'src/static/key'

interface DashboardTableProps {
  handleModal: () => void
}

interface RowProps {
  application: UserApplicationType
}

const Row = ({ application }: RowProps) => {
  // ** State
  const [collapseOpen, setCollapseOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const queryClient = useQueryClient()

  // ** AlertDialog
  const handleDialog = () => {
    setAlertDialogOpen(!alertDialogOpen)
  }

  const handleDialogDisagree = () => {
    handleDialog()
  }

  const handleDialogAgree = async () => {
    try {
      await deleteUserApplicationData(application.id)
      handleDialog()
      queryClient.invalidateQueries({ queryKey: [userApplications] })
    } catch (err) {
      if (isAxiosError<ErrorResponseDataType>(err)) {
        toast.error('서버와 통신 중 에러가 발생했습니다.')
      }
    }
  }

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setCollapseOpen(!collapseOpen)}>
            {collapseOpen ? <ChevronUp /> : <ChevronDown />}
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
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important', borderBottom: 'none' }}>
          <Collapse in={collapseOpen} timeout='auto'>
            <Grid container spacing={6}>
              <Grid item sx={{ mx: 13, my: 4 }}>
                <Box sx={{ mx: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h6' gutterBottom component='div'>
                      Files
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                      <Button
                        color='info'
                        size='small'
                        startIcon={<Pencil />}
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        수정하기
                      </Button>
                      <Button
                        color='error'
                        size='small'
                        startIcon={<Delete />}
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                        onClick={handleDialog}
                      >
                        삭제하기
                      </Button>
                    </Box>
                  </Box>
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
                <Box sx={{ m: 4 }}>
                  What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content here', making it look like
                  readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                  default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
                  humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply
                  random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000
                  years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one
                  of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites
                  of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from
                  sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
                  Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
                  Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                  section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                  interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                  reproduced in their exact original form, accompanied by English versions from the 1914 translation by
                  H. Rackham.
                </Box>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
      <AlertDialog
        title='지원 정보 삭제'
        content={application.title}
        isOpen={alertDialogOpen}
        handleDisagree={handleDialogDisagree}
        handleAgree={handleDialogAgree}
      />
    </Fragment>
  )
}

const ApplicationTable = ({ handleModal }: DashboardTableProps) => {
  const { data: applications } = useUserApplicationList()

  return (
    <Paper sx={{ borderRadius: '0px', width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 2000 }}>
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
    </Paper>
  )
}

export default ApplicationTable
