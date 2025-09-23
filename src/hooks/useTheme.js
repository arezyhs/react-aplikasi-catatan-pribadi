import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Cek localStorage dulu, baru sistem preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Cek preferensi sistem user (dark mode atau light mode)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default ke light kalau gak ada indikasi apa-apa
    return 'light';
  });

  useEffect(() => {
    // Apply tema ke document root
    document.documentElement.setAttribute('data-theme', theme);
    // Simpan pilihan tema biar gak ilang pas refresh
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fungsi buat ganti tema (toggle light <-> dark)
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

export default useTheme;