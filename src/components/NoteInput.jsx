import React, { useState } from 'react';

function NoteInput({ addNote }) {
  // State untuk input judul dan isi catatan
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // Batas maksimal karakter untuk judul
  const maxTitleLength = 50;

  // Handler untuk input judul dengan pembatasan karakter
  const onTitleChange = (event) => {
    const value = event.target.value;
    // Pakai state untuk limitasi, bukan atribut maxlength
    if (value.length <= maxTitleLength) {
      setTitle(value);
    }
  };

  // Handler untuk input isi catatan
  const onBodyChange = (event) => {
    setBody(event.target.value);
  };

  // Handler ketika form disubmit
  const onSubmit = (event) => {
    event.preventDefault();
    
    // Validasi input tidak boleh kosong
    if (title.trim() === '' || body.trim() === '') {
      return;
    }

    // Buat objek catatan baru
    const newNote = {
      id: +new Date(), // ID unik menggunakan timestamp
      title: title.trim(),
      body: body.trim(),
      archived: false,
      createdAt: new Date().toISOString(),
    };

    addNote(newNote);
    // Reset form setelah berhasil
    setTitle('');
    setBody('');
  };

  // Hitung sisa karakter yang bisa digunakan
  const remainingChars = maxTitleLength - title.length;
  
  // Fungsi untuk menampilkan pesan sisa karakter dengan styling berbeda
  const getCharLimitDisplay = () => {
    if (remainingChars > 10) {
      return `${remainingChars} karakter tersisa`;
    } else if (remainingChars > 0) {
      return `⚠️ ${remainingChars} karakter tersisa`;
    } else {
      return `✋ Batas karakter tercapai`;
    }
  };

  // Fungsi untuk menentukan class CSS berdasarkan sisa karakter
  const getCharLimitClass = () => {
    if (remainingChars <= 0) return 'char-limit-danger';
    if (remainingChars <= 10) return 'char-limit-warning';
    return '';
  };

  return (
    <div className="note-input">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Judul catatan..."
          value={title}
          onChange={onTitleChange}
          className="note-input__title"
        />
        <p className={`note-input__title__char-limit ${getCharLimitClass()}`}>
          {getCharLimitDisplay()}
        </p>
        <textarea
          placeholder="Tulis sesuatu..."
          value={body}
          onChange={onBodyChange}
          className="note-input__body"
        />
        <button type="submit" disabled={title.trim() === '' || body.trim() === ''}>
          Simpan
        </button>
      </form>
    </div>
  );
}

export default NoteInput;