import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextField, Button as MuiButton } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import Button from '../components/Button/Button'
import { addDocument, updateDocument } from '../store/slices/documentSlice';

interface DocumentFormProps {
  document?: any
  onClose: () => void
}

const documentSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required'),
  owner: Yup.string().required('Owner is required'),
})

const DocumentForm: React.FC<DocumentFormProps> = ({ document, onClose }) => {
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const initialValues: {
    name: string
    type: string
    owner: string
    file: File | null
  } = {
    name: document?.name || '',
    type: document?.type || '',
    owner: document?.owner || '',
    file: null,
  }

  const handleSubmit = (values: typeof initialValues) => {
    if (document) {
      dispatch(updateDocument({ ...document, ...values }));
    } else {
      dispatch(
        addDocument({
          id: Date.now(), // Generates a unique number as ID
          ...values,
        })
      );
    }
    onClose();
  };
  

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={documentSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
        <Form className="space-y-4">
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && typeof errors.name === 'string' ? errors.name : undefined}
            />

          <TextField
            fullWidth
            name="type"
            label="Type"
            value={values.type}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.type && Boolean(errors.type)}
            helperText={touched.type && typeof errors.type === 'string' ? errors.type : undefined}
          />

          <TextField
            fullWidth
            name="owner"
            label="Owner"
            value={values.owner}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.owner && Boolean(errors.owner)}
            helperText={touched.owner && typeof errors.owner === 'string' ? errors.owner : undefined}
            />

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0]
              if (file) {
                setFieldValue('file', file)
              }
            }}
          />

          <MuiButton
            variant="outlined"
            startIcon={<CloudUpload />}
            onClick={() => fileInputRef.current?.click()}
            fullWidth
          >
            Upload Document
          </MuiButton>

          {values.file && (
            <p className="text-sm text-gray-600">
              Selected file: {values.file.name}
            </p>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {document ? 'Update' : 'Create'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default DocumentForm