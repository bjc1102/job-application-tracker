import React, { useState } from 'react'
import { statusColorOption, statusOptions } from 'src/static/statusOption'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FormControl, Chip, InputLabel, MenuItem, Select, Divider, SelectChangeEvent } from '@mui/material'
import dayjs from 'dayjs'
import Grid from '@mui/material/Grid'

const StatusField = () => {
  const [selectedOptions, setSelectedOptions] = useState('')

  const handleOptionSelect = (event: SelectChangeEvent<string>) => {
    setSelectedOptions(event.target.value)
  }

  return (
    <div>
      <Grid container spacing={2}>
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
        <Grid item xs={10} sm={6}>
          <DatePicker
            sx={{
              width: '250px'
            }}
            label='진행 날짜'
            defaultValue={dayjs()}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default StatusField
