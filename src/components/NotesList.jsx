import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onToggleArchive, emptyMessage }) {
  // Cek kalau notes kosong, tampilin pesan kosong
  if (notes.length === 0) {
    return (
      <div className="notes-list__empty-message">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="notes-list">
      {/* Loop semua notes dan render sebagai NoteItem */}
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onToggleArchive={onToggleArchive}
        />
      ))}
    </div>
  );
}

export default NotesList;