import { faker } from '@faker-js/faker'

export const generateFakeUser = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  position: faker.person.jobTitle(),
  status: faker.helpers.arrayElement(['Active', 'Inactive', 'On Leave']),
  department: faker.commerce.department(),
  hire_date: faker.date.past({ years: 10 }).toISOString().split('T')[0],
  employee_id: faker.number.int({ min: 1000, max: 9999 }),
  role: faker.helpers.arrayElement(['admin', 'user']),  // <-- Add this line
})

export const mockUsers = Array.from({ length: 10 }, generateFakeUser)


// Function to add a user
export const addUser = (user: any) => {
  user.id = faker.string.uuid()
  mockUsers.push(user)
}

// Function to edit a user
export const editUser = (updatedUser: any) => {
  const index = mockUsers.findIndex(user => user.id === updatedUser.id)
  if (index !== -1) {
    mockUsers[index] = updatedUser
  }
}

// Function to delete a user
export const deleteUser = (userId: string) => {
  const index = mockUsers.findIndex(user => user.id === userId)
  if (index !== -1) {
    mockUsers.splice(index, 1)  // Remove the user without reassigning the array
  }
}


export const mockDocuments = [
  { id: 1, name: 'Document 1', type: 'PDF', owner: 'Alice' },
  { id: 2, name: 'Document 2', type: 'Word', owner: 'Bob' },
  { id: 3, name: 'Document 3', type: 'Excel', owner: 'Charlie' },
];


// Mock folders
export const mockFolders = [
  { id: faker.string.uuid(), name: 'Projects', parentId: null },
  { id: faker.string.uuid(), name: 'Reports', parentId: null },
  { id: faker.string.uuid(), name: 'Team Documents', parentId: null },
]
