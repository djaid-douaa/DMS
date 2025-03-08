import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material'
import { Close } from '@mui/icons-material'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  onSubmit?: () => void
  submitLabel?: string
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = 'Save',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      className="rounded-lg"
    >
      <DialogTitle className="flex justify-between items-center">
        {title}
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        {onSubmit && (
          <Button onClick={onSubmit} variant="contained" color="primary">
            {submitLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default Modal