import React, { useState } from 'react';
import { getInitialData } from '../utils';
import NoteInput from './NoteInput';
import NotesList from './NotesList';
import NoteSearch from './NoteSearch';
import useTheme from '../hooks/useTheme';

function NotesApp() {
  // State untuk menyimpan semua catatan
  const [notes, setNotes] = useState(getInitialData());
  // State untuk kata kunci pencarian
  const [keyword, setKeyword] = useState('');
  // Hook untuk mengelola tema aplikasi
  const { theme, toggleTheme } = useTheme();

  // Fungsi untuk menambah catatan baru
  const addNote = (newNote) => {
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };

  // Fungsi untuk menghapus catatan berdasarkan ID
  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  // Fungsi untuk toggle status arsip catatan
  const toggleArchive = (id) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  // Handler untuk mengubah kata kunci pencarian
  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
  };

  // Filter catatan aktif berdasarkan pencarian
  const activeNotes = notes.filter(note => 
    !note.archived && 
    (keyword === '' || note.title.toLowerCase().includes(keyword.toLowerCase()))
  );
  
  // Filter catatan arsip berdasarkan pencarian
  const archivedNotes = notes.filter(note => 
    note.archived && 
    (keyword === '' || note.title.toLowerCase().includes(keyword.toLowerCase()))
  );

  return (
    <div className="note-app">
      {/* Header aplikasi dengan toggle tema */}
      <div className="note-app__header">
        <div className="note-app__header-content">
          <h1>Aplikasi Catatan Pribadi</h1>
          <p>Aplikasi Catatan Pribadi membantu menyimpan dan mengelola catatan penting dengan mudah, praktis, dan aman.</p>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          <span className="icon">{theme === 'light' ? '🌙' : '☀️'}</span>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
      
      <div className="note-app__body">
        {/* Form untuk membuat catatan baru */}
        <NoteInput addNote={addNote} />
        
        {/* Komponen pencarian catatan */}
        <NoteSearch keyword={keyword} onKeywordChange={onKeywordChangeHandler} />
        
        {/* Section catatan aktif */}
        <div className="section-header">
          <h2>Catatan Aktif</h2>
          <span className="note-count">
            {keyword ? `${activeNotes.length} dari ${notes.filter(n => !n.archived).length}` : `${activeNotes.length} catatan`}
          </span>
        </div>
        <NotesList 
          notes={activeNotes} 
          onDelete={deleteNote} 
          onToggleArchive={toggleArchive}
          emptyMessage={keyword ? `Tidak ada catatan ditemukan untuk "${keyword}"` : "Belum ada catatan"}
        />
        
        {/* Section catatan arsip - hanya tampil jika ada catatan arsip */}
        {(archivedNotes.length > 0 || (keyword && notes.filter(n => n.archived).length > 0)) && (
          <>
            <div className="section-header">
              <h2>Arsip</h2>
              <span className="note-count">
                {keyword ? `${archivedNotes.length} dari ${notes.filter(n => n.archived).length}` : `${archivedNotes.length} catatan`}
              </span>
            </div>
            <NotesList 
              notes={archivedNotes} 
              onDelete={deleteNote} 
              onToggleArchive={toggleArchive}
              emptyMessage={keyword ? `Tidak ada catatan arsip ditemukan untuk "${keyword}"` : "Tidak ada catatan di arsip"}
            />
          </>
        )}
      </div>
      
      {/* Footer dengan informasi pembuat */}
      <footer className="note-app__footer">
        <p>Dibuat oleh <strong>R284D5Y0128 Akbar Setiyawan</strong></p>
      </footer>
    </div>
  );
}

export default NotesApp;