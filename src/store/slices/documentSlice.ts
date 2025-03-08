import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Document {
  id: number;
  name: string;
  type: string;
  owner: string;
}

interface DocumentState {
  documents: Document[];
}

const initialState: DocumentState = {
  documents: [],
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    updateDocument: (state, action: PayloadAction<Document>) => {
      const index = state.documents.findIndex(doc => doc.id === action.payload.id);
      if (index !== -1) {
        state.documents[index] = action.payload;
      }
    },
    deleteDocument: (state, action: PayloadAction<number>) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload);
    },
  },
});

export const { setDocuments, addDocument, updateDocument, deleteDocument } = documentSlice.actions;
export default documentSlice.reducer;
