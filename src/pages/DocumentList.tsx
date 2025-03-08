import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, TextField } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Table from '../components/Table/Table';
import Modal from '../components/Modal/Modal';
import DocumentForm from './DocumentForm';
import { RootState } from '../store/store';
import { setDocuments, deleteDocument } from '../store/slices/documentSlice';
import { mockDocuments } from '../api/mockData';
import './doc.css'; // Assuming you'll create this CSS file

const DocumentList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{ id: number; name: string; type: string; owner: string } | null>(null);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const documents = useSelector((state: RootState) => state.documents.documents);

  useEffect(() => {
    const formattedDocuments = mockDocuments.map((doc) => ({
      ...doc,
      id: Number(doc.id), // Convert id to number
    }));
    dispatch(setDocuments(formattedDocuments));
  }, [dispatch]);

  const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'type', label: 'Type', sortable: true },
    { id: 'owner', label: 'Owner', sortable: true },
    {
      id: 'actions',
      label: 'Actions',
      render: (row: any) => (
        <button onClick={() => handleDelete(row)} className="trash-icon">
          <DeleteIcon />
        </button>
      )
    }
  ];

  const handleEdit = useCallback((document: { id: number; name: string; type: string; owner: string }) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback((document: { id: number }) => {
    if (window.confirm(`Are you sure you want to delete "${document.id}"?`)) {
      dispatch(deleteDocument(document.id));
    }
  }, [dispatch]);

  const handleBulkSelect = useCallback((selectedDocuments: { id: number }[]) => {
    console.log('Selected documents:', selectedDocuments);
  }, []);

  // Filter documents based on search term
  const filteredDocuments = documents.filter(doc => 
    Object.values(doc).some(value => 
      value !== null && 
      value !== undefined && 
      value.toString().toLowerCase().includes(search.toLowerCase())
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
          Add Document
        </Button>
      </div>

      {/* Use a container to hide the Table's internal search */}
      <div className="hide-table-search">
        <Table 
          columns={columns} 
          data={filteredDocuments} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          onBulkSelect={handleBulkSelect} 
        />
      </div>

      <Modal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedDocument ? 'Edit Document' : 'Add Document'}
      >
        <DocumentForm 
          document={selectedDocument} 
          onClose={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};

export default DocumentList;