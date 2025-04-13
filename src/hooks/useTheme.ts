import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export const useTheme = () => {
  const { isDark, setIsDark } = useStore();

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return {
    isDark,
    toggleTheme,
  };
};
