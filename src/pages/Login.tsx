import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Paper, Typography, MenuItem } from '@mui/material'
import { login } from '../store/slices/authSlice'
import { AppDispatch } from '../store/store'

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().oneOf(['admin', 'user'], 'Select a valid role').required('Role is required'),
})

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleLogin = (values: { username: string; password: string; role: string }) => {
    if (values.role === 'admin' && values.username === 'admin' && values.password === 'admin123') {
      dispatch(login({ id: '1', username: values.username, email: 'admin@example.com', role: 'admin' }))
      navigate('/users')
    } else if (values.role === 'user' && values.username === 'user' && values.password === 'user123') {
      dispatch(login({ id: '2', username: values.username, email: 'user@example.com', role: 'user' }))
      navigate('/documents')
    }
  }

  return (
    <div className="login-container">
      <Paper className="login-form">
        <Typography variant="h4" className="login-title">
          Login
        </Typography>
        <Formik
          initialValues={{ username: '', password: '', role: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <TextField
                fullWidth
                name="role"
                select
                label="Select Role"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.role && Boolean(errors.role)}
                helperText={touched.role && errors.role}
                sx={{ mb: 2 }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </TextField>
              <TextField
                fullWidth
                name="username"
                label="Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                name="password"
                type="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" fullWidth className="login-button">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  )
}

export default Login
