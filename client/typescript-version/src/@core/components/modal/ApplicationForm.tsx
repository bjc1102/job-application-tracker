import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { statusColorOption, statusOptions } from 'src/static/statusOption'

export default function ApplicationForm() {
  const [selectedOptions, setSelectedOptions] = React.useState('')

  const handleOptionSelect = (event: SelectChangeEvent<string>) => {
    setSelectedOptions(event.target.value)
  }

  return (
    <Dialog open>
      <DialogContent>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='h6' gutterBottom style={{ fontWeight: 'bold', margin: 0 }}>
              지원 이력 추가하기
            </Typography>
          </Grid>
          <Grid item>
            <IconButton edge='end' color='inherit' aria-label='Close'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id='link'
              name='link'
              label='채용 공고 링크'
              helperText='채용공고 링크를 통해 채용 정보를 가져올 수 있습니다.'
              variant='standard'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Button>조회하기</Button>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth id='title' name='title' label='공고명' variant='standard' />
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom style={{ fontWeight: 'bold', margin: 0 }}>
              진행 상황
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl required sx={{ m: 1, minWidth: 120 }} size='small'>
              <InputLabel>진행 상황</InputLabel>
              <Select
                label='진행'
                value={selectedOptions}
                onChange={handleOptionSelect}
                sx={{ textAlign: 'center' }}
                renderValue={() => (
                  <div>
                    <Chip
                      label={selectedOptions}
                      color={statusColorOption(selectedOptions)}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </div>
                )}
              >
                {statusOptions.map((option, index) =>
                  option === '' ? (
                    <Divider key={index} />
                  ) : (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              required
              id='country'
              name='country'
              label='Country'
              fullWidth
              autoComplete='shipping country'
              variant='standard'
            />
          </Grid>
          <Grid container justifyContent='flex-end' marginTop='20px'>
            <Button>저장하기</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
