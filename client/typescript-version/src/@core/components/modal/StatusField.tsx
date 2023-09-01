import React from 'react'
import { statusColorOption, statusOptions } from 'src/static/statusOption'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FormControl, Chip, InputLabel, MenuItem, Select, Divider, SelectChangeEvent } from '@mui/material'
import dayjs from 'dayjs'
import Grid from '@mui/material/Grid'
import { initialStatusData } from 'src/static/initalData'
import DeleteIcon from '@mui/icons-material/Delete'

interface StatusFieldProps {
  statusData: {
    status: string
    date: dayjs.Dayjs
  }
  updateStatusAtIndex: (updateStatus: typeof initialStatusData) => void
  deleteStatusAtIndex: () => void
  index: number
}

const StatusField = ({ statusData, updateStatusAtIndex, deleteStatusAtIndex, index }: StatusFieldProps) => {
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value as string
    updateStatusAtIndex({ status: newStatus, date: statusData.date })
  }

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    // 날짜를 업데이트하기 위해 상태 업데이트 함수 호출
    updateStatusAtIndex({ status: statusData.status, date: date || dayjs() })
  }

  return (
    <div>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={4}>
          <FormControl required sx={{ m: 1, width: 170 }} size='medium'>
            <InputLabel>진행 상황</InputLabel>
            <Select
              label='진행'
              value={statusData.status}
              onChange={handleStatusChange}
              sx={{ textAlign: 'center' }}
              renderValue={() => (
                <div>
                  <Chip
                    label={statusData.status}
                    color={statusColorOption(statusData.status)}
                    sx={{
                      height: 24,
                      boxSizing: 'content-box',
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
        <Grid item xs={10} sm={6}>
          <DatePicker
            sx={{
              width: '250px'
            }}
            label='진행 날짜 *'
            defaultValue={statusData.date}
            onChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          {index === 0 ? null : (
            <DeleteIcon
              onClick={deleteStatusAtIndex}
              sx={{
                ':hover': {
                  cursor: 'pointer' // hover 시에 커서를 포인터로 변경
                }
              }}
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default StatusField
