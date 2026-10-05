# Document Management System · Frontend

Web client for a microservices document management system, built as a team project at ENSIA. The backend services (storage on MinIO with Spring Boot, Kafka messaging, and a Gemini-based translation service) live in the [team organization](https://github.com/Document-Management-System-org).

## Features

- Login with protected routes
- Document list and create/edit form
- User management (list and form)
- Shared layout: navbar, sidebar, reusable table and modal components
- Mock data mode for working on the UI without the backend running

## Stack

React 19 · TypeScript · Redux Toolkit · React Router · Material UI · Formik + Yup · Axios

## Structure

```
src/api/         axios client and API modules (auth, documents, users, mocks)
src/store/       Redux slices for auth, documents and users
src/pages/       Login, DocumentList, DocumentForm, UserList, UserForm
src/components/  Layout, Navbar, Sidebar, Table, Modal, ProtectedRoute
```

## Run it

```bash
npm install
npm start        # http://localhost:3000
```
