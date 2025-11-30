import React from 'react';
import { useTheme } from './ThemeContext';
import { Button } from 'pixel-retroui';

const ThemeSelector = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      bg={theme === 'dark' ? 'white' : 'black'}
      textColor={theme === 'dark' ? 'black' : 'white'}
      borderColor={theme === 'dark' ? 'white' : 'black'}
      shadow={theme === 'dark' ? 'white' : 'black'}
      className="btn btn-sm btn-circle"
      onClick={toggleTheme}
      title={theme === 'dark' ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </Button>
  );
};

export default ThemeSelector;
