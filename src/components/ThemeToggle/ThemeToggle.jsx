import './ThemeToggle.css';

function ThemeToggle({ darkMode, onToggle }) {

  return (
    <div className="theme-toggle">

      <button onClick={onToggle}>
        {darkMode ? ' Modo Oscuro' : 'Modo Claro'}
      </button>

    </div>
  );
}

export default ThemeToggle;