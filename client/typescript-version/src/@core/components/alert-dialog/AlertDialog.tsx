import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface AlertDialogProps {
  title: string
  content: string
  isOpen: boolean
  handleAgree: () => void
  handleDisagree: () => void
}

export default function AlertDialog({ title, content, isOpen, handleAgree, handleDisagree }: AlertDialogProps) {
  return (
    <Dialog open={isOpen} onClose={handleDisagree}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleAgree}>
          확인
        </Button>
        <Button color='secondary' onClick={handleDisagree} autoFocus>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  )
}
