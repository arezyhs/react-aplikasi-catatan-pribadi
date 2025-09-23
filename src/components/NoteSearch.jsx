import React from 'react';

function NoteSearch({ keyword, onKeywordChange }) {
  // Fungsi untuk mengosongkan input pencarian
  const clearSearch = () => {
    onKeywordChange('');
  };

  return (
    <div className="note-search">
      <div className="note-search__wrapper">
        <input
          type="text"
          placeholder="Cari catatan berdasarkan judul..."
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="note-search__input"
        />
        {/* Tombol X untuk clear search, muncul kalau ada keyword */}
        {keyword && (
          <button
            type="button"
            className="note-search__clear"
            onClick={clearSearch}
            title="Hapus pencarian"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default NoteSearch;