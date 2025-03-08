import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextField, MenuItem } from '@mui/material'
import Button from '../components/Button/Button'
import { addUser, updateUser } from '../store/slices/userSlice'
import './UserForm.css';

interface UserFormProps {
  user?: any
  onClose: () => void
}

const userSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  role: Yup.string().required('Role is required'),
  position: Yup.string().required('Position is required'),
  status: Yup.string().required('Status is required'),
  department: Yup.string().required('Department is required'),
})

const UserForm: React.FC<UserFormProps> = ({ user, onClose }) => {
  const dispatch = useDispatch()

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    position: user?.position || '',
    status: user?.status || 'Active',
    department: user?.department || '',
  }

  const handleSubmit = (values: typeof initialValues) => {
    if (user) {
      dispatch(updateUser({ ...user, ...values }))
    } else {
      dispatch(
        addUser({
          id: Math.random().toString(36).substr(2, 9),
          ...values,
        }),
      )
    }
    onClose()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
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
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && typeof errors.email === 'string' ? errors.email : undefined}
          />

          <TextField
            fullWidth
            name="position"
            label="Position"
            value={values.position}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.position && Boolean(errors.position)}
            helperText={touched.position && typeof errors.position === 'string' ? errors.position : undefined}
          />

<TextField
  fullWidth
  select
  name="status"
  label="Status"
  value={values.status}
  onChange={handleChange}
  onBlur={handleBlur}
  error={touched.status && Boolean(errors.status)}
  helperText={touched.status && typeof errors.status === 'string' ? errors.status : undefined}
>
  <MenuItem value="Active">Active</MenuItem>
  <MenuItem value="Inactive">Inactive</MenuItem> 
  <MenuItem value="On Leave">On Leave</MenuItem>
  <MenuItem value="Remote">Remote</MenuItem>
</TextField>


          <TextField
            fullWidth
            name="department"
            label="Department"
            value={values.department}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.department && Boolean(errors.department)}
            helperText={touched.department && typeof errors.department === 'string' ? errors.department : undefined}
          />

          <TextField
            fullWidth
            select
            name="role"
            label="Role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.role && Boolean(errors.role)}
            helperText={touched.role && typeof errors.role === 'string' ? errors.role : undefined}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <div className="flex justify-end space-x-2">
            {/* <Button type="button" onClick={onClose} color="inherit">
              Cancel
            </Button> */}
            <Button type="submit" variant="contained" color="primary">
              {user ? 'Update' : 'Create'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default UserForm
