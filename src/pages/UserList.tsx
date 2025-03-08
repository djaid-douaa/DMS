import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField } from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import Table from '../components/Table/Table'
import Modal from '../components/Modal/Modal'
import UserForm from './UserForm'
import { RootState } from '../store/store'
import { setUsers, deleteUser } from '../store/slices/userSlice'
import { mockUsers } from '../api/mockData'
import './UserList.css';

const UserList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{ [key: string]: any } | null>(null)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const users = useSelector((state: RootState) => state.users.users)

  useEffect(() => {
    dispatch(setUsers(mockUsers))
  }, [dispatch])

  const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'position', label: 'Position', sortable: true },
    {
      id: 'status',
      label: 'Status',
      sortable: true,
      render: (row: any) => (
        <span className={`status ${
          row.status === 'Active' ? 'active' :
          row.status === 'Inactive' ? 'inactive' : 'pending'
        }`}>
          {row.status}
        </span>
      )
    },
    { id: 'department', label: 'Department', sortable: true },
    { id: 'hire_date', label: 'Hire Date', sortable: true },
    { id: 'employee_id', label: 'Employee ID', sortable: true },
    {
      id: 'actions',
      label: 'Actions',
      render: (row: any) => (
        <button onClick={() => handleDelete(row)} className="trash-icon">
          <DeleteIcon />
        </button>
      )
    }
  ]

  const handleEdit = (user: any) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleDelete = (user: any) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      dispatch(deleteUser(user.id))
    }
  }

  const filteredUsers = users.filter(user => 
    Object.values(user).some(value => 
      value && value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="space-y-4 p-4">
      {/* Search Bar & Add Button in the Same Line */}
      <div className="search-add-container">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-field"
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
          className="add-button"
        >
          Add User
        </Button>
      </div>

      {/* Use CSS to hide the Table's search bar */}
      <div className="hide-table-search">
        <Table 
          columns={columns} 
          data={filteredUsers} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>

      {/* Modal for Adding/Editing User */}
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedUser(null)
        }}
        title={selectedUser ? 'Edit User' : 'Add User'}
      >
        <UserForm
          user={selectedUser}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedUser(null)
          }}
        />
      </Modal>
    </div>
  )
}

export default UserList