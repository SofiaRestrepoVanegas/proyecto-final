### a
 ¿Qué es useState y cuándo usarlo?

Explicación teórica:
El useState es un hook de React que sirve para crear una "variable de estado", a diferencia de una variable normal de JavaScript (como un "let" o un "const"), cuando el valor de una variable de estado cambia, React se da cuenta automáticamente y vuelve a dibujar (renderizar) la pantalla para mostrar el nuevo dato. 

Lo usamos siempre que un componente necesite recordar algún dato que cambie por las acciones del usuario, como escribir en un buscador, hacer clic en un botón, cambiar un color o abrir una ventana.

---

### 💡 Ejemplos de nuestro proyecto:

#### 1. Para el cambio de tema (ThemeToggle.jsx y App.jsx)
Usamos un estado booleano (verdadero o falso) llamado "darkMode" en nuestro archivo principal. Este estado se lo pasamos como propiedad al componente del botón para que sepa si debe mostrar el texto de "Modo Oscuro" o "Modo Claro", y cambie las clases de CSS según la elección del usuario.

javascript
// Así creamos el estado en App.jsx
const [darkMode, setDarkMode] = useState(false);

// Así lo usamos en el botón de ThemeToggle.jsx para mostrar el texto interactivo
<button onClick={onToggle}>
  {darkMode ? ' Modo Oscuro' : 'Modo Claro'}
</button>

## 2. Para la barra de búsqueda (SearchBar.jsx)
Usamos el estado para guardar el texto que el usuario va escribiendo letra por letra. Cada vez que el estado cambia, la lista completa de jugadores se filtra en tiempo real.
// Así guardamos lo que se escribe en el buscador
const [searchTerm, setSearchTerm] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');

## 3. Para abrir y cerrar la ventana de detalles (Modal.jsx)
Usamos un estado que inicialmente está vacío ("null"). Cuando el usuario hace clic sobre una fila de la tabla para ver a un deportista, el estado guarda los datos de ese jugador específico y eso hace que la ventana emergente aparezca con su información.
// Estado para controlar el jugador seleccionado en el modal
const [selectedPlayer, setSelectedPlayer] = useState(null);

