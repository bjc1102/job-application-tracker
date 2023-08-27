import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Button, Dialog, DialogContent, Divider, InputAdornment, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import StatusField from './StatusField'

interface ApplicationFormProps {
  open: boolean
  handleModal: () => void
}

export default function ApplicationForm({ open, handleModal }: ApplicationFormProps) {
  const [application, setApplication] = useState({
    link: '',
    title: '',
    platform: '',
    fileInfo: '',
    status: []
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setApplication({ ...application, [name]: value })
  }

  console.log(application)

  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={open}>
        <DialogContent>
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
          <Grid container justifyContent='space-between' spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id='link'
                name='link'
                label='채용 공고 링크'
                helperText='채용공고 링크를 통해 채용 정보를 가져올 수 있습니다.'
                variant='standard'
                value={application.link}
                onChange={e => handleChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Button type='submit' sx={{ fontWeight: 'bold' }}>
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
                required
                id='title'
                name='title'
                label='공고명'
                variant='standard'
                value={application.title}
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                required
                id='platform'
                name='platform'
                label='플랫폼'
                variant='standard'
                value={application.platform}
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                required
                id='fileInfo'
                name='fileInfo'
                label='제출한 파일'
                variant='standard'
                value={application.fileInfo}
                onChange={e => handleChange(e)}
                helperText='제출한 파일은 ,로 구분'
              />
            </Grid>
          </Grid>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' gutterBottom style={{ fontWeight: 'bold', margin: 0 }}>
              진행 상황
            </Typography>
            <Button sx={{ fontWeight: 'bold' }}>진행 상황 추가</Button>
          </Grid>
          <Grid container justifyContent='space-between' alignItems='center' sx={{ marginTop: '10px' }}>
            <Grid item xs={12}>
              <StatusField />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container justifyContent='flex-end' marginTop='20px'>
            <Button type='submit' variant='outlined' sx={{ fontWeight: 'bold' }}>
              저장하기
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </form>
  )
}
