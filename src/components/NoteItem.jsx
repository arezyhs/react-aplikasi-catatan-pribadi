import React from 'react';
import { showFormattedDate } from '../utils';

function NoteItem({ note, onDelete, onToggleArchive }) {
  // Handler untuk hapus catatan dengan konfirmasi dulu
  const onDeleteHandler = () => {
    // Kasih konfirmasi biar gak salah klik
    if (window.confirm(`Yakin mau hapus catatan "${note.title}"? Gak bisa dibalikin lho!`)) {
      onDelete(note.id);
    }
  };

  // Handler untuk pindah catatan ke arsip atau kebalikannya
  const onToggleArchiveHandler = () => {
    onToggleArchive(note.id);
  };

  return (
    <div className="note-item">
      <div className="note-item__content">
        <h3 className="note-item__title">{note.title}</h3>
        <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
        <p className="note-item__body">{note.body}</p>
      </div>
      <div className="note-item__action">
        <button
          type="button"
          className="note-item__archive-button"
          onClick={onToggleArchiveHandler}
          title={note.archived ? 'Pindah ke catatan aktif' : 'Arsipkan catatan ini'}
        >
          {note.archived ? 'Batalkan Arsip' : 'Arsipkan'}
        </button>
        <button
          type="button"
          className="note-item__delete-button"
          onClick={onDeleteHandler}
          title="Hapus catatan ini secara permanen"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

export default NoteItem;