import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Button, Dialog, DialogContent, Divider, InputAdornment, IconButton, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import StatusField from './StatusField'
import { toast } from 'react-toastify'
import { instance } from 'src/configs/axios'
import getJobPostingData from 'src/api/getJobPostingData'
import { Application, UserApplicationType } from 'src/types/Application'
import { initialStatusData } from 'src/static/initalData'
import { validateApplication, validateURL } from 'src/@core/utils/validate'
import { isAxiosError } from 'axios'
import { ErrorResponseDataType } from 'src/types/ErrorResponseDataType'
import { useQueryClient } from '@tanstack/react-query'
import { userApplications } from 'src/static/key'

interface ApplicationFormProps {
  applicationData?: UserApplicationType
  handleModal: () => void
}

export default function ApplicationForm({ applicationData, handleModal }: ApplicationFormProps) {
  // ** State
  const queryClient = useQueryClient()
  const theme = useTheme()
  const [application, setApplication] = useState<Application>({
    link: applicationData?.link ?? '',
    title: applicationData?.title ?? '',
    platform: applicationData?.platform ?? '',
    status: [initialStatusData],
    note: applicationData?.note ?? ''
  })
  const [error, setError] = useState<Partial<Application>>({})

  // ** validate form
  const validate = () => {
    const { isError, error } = validateApplication(application)
    if (isError) {
      setError(error)

      return true
    }

    return false
  }

  // ** handle form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (!validate()) {
        await instance.post('/application/save', application)
        setError({})
        queryClient.invalidateQueries({ queryKey: [userApplications] })
        handleModal()
      }
    } catch (error) {
      toast.error('서버 요청 중 오류 발생하였습니다')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setApplication({ ...application, [name]: value })
  }

  // ** handle status
  const updateStatusAtIndex = (index: number) => (updateStatus: typeof initialStatusData) => {
    setApplication(oldApplication => {
      const updatedApplication = { ...oldApplication }
      updatedApplication.status[index] = updateStatus

      return updatedApplication
    })
  }

  const deleteStatusAtIndex = (index: number) => () => {
    setApplication(oldApplication => {
      const updatedApplication = { ...oldApplication }
      updatedApplication.status.splice(index, 1)

      return updatedApplication
    })
  }

  const addStatus = () => {
    if (application.status.length > 6) return toast.error('최대 7개까지 추가 가능합니다', { theme: theme.palette.mode })

    setApplication(oldApplication => ({
      ...oldApplication,
      status: [initialStatusData, ...oldApplication.status]
    }))
  }

  // ** fetch
  const fetchJobPostingData = async () => {
    const error = validateURL(application.link)
    if (error) return setError({ link: error })

    try {
      const response = await getJobPostingData(application.link)

      setApplication(prevState => ({
        ...prevState,
        title: response.data.ogTitle ?? '',
        platform: response.data.ogSiteName ?? ''
      }))
      setError({})
    } catch (error) {
      if (isAxiosError<ErrorResponseDataType>(error)) {
        setError({
          link: error.response?.data.message
        })
      }
    }
  }

  return (
    <Dialog open>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <Typography variant='h6' gutterBottom style={{ fontWeight: 'bold', margin: 0, color: 'text.primary' }}>
                지원 이력 추가하기
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleModal} color='inherit' aria-label='Close'>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
          <Grid container justifyContent='space-between' spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={!!error.link}
                id='link'
                name='link'
                label='채용 공고 링크'
                helperText={!!error.link ? error.link : '채용공고 링크를 통해 채용 정보를 가져올 수 있습니다.'}
                variant='standard'
                value={application.link}
                onChange={e => handleChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Button type='button' onClick={fetchJobPostingData} sx={{ fontWeight: 'bold' }}>
                        조회하기
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={!!error.title}
                helperText={!!error.title && error.title}
                id='title'
                name='title'
                label='공고명'
                variant='standard'
                value={application.title}
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                error={!!error.platform}
                id='platform'
                name='platform'
                label='플랫폼'
                variant='standard'
                value={application.platform}
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                id='note'
                name='note'
                label='메모'
                variant='standard'
                value={application.note}
                onChange={e => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' gutterBottom style={{ fontWeight: 'bold', margin: 0 }}>
              진행 상황
            </Typography>
            <Button onClick={addStatus} sx={{ fontWeight: 'bold' }}>
              진행 상황 추가
            </Button>
          </Grid>
          <Grid container justifyContent='space-between' alignItems='center' sx={{ marginTop: '10px' }}>
            {application.status.map((status, idx) => (
              <Grid item xs={12} key={idx} sx={{ marginTop: '10px' }}>
                <StatusField
                  index={idx}
                  statusData={status}
                  updateStatusAtIndex={updateStatusAtIndex(idx)}
                  deleteStatusAtIndex={deleteStatusAtIndex(idx)}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container justifyContent='flex-end' marginTop='20px'>
            <Button type='submit' variant='outlined' sx={{ fontWeight: 'bold' }}>
              저장하기
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  )
}
