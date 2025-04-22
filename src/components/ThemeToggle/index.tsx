import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks';
import { Button } from '@/ui';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      size="sm"
      className="!p-2"
      icon={isDark ? Sun : Moon}
      aria-label="Toggle theme"
    />
  );
}
