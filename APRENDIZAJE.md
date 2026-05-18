# 📚 Aprendizaje del proyecto 

<<<<<<< HEAD
Explicación teórica:
=======
### a. ¿Que es useState y cuando usarlo?

## 📖 Explicacion
>>>>>>> f903003970f931179ea68364d4248a156b64cd1b
El useState es un hook de React que sirve para crear una "variable de estado", a diferencia de una variable normal de JavaScript (como un "let" o un "const"), cuando el valor de una variable de estado cambia, React se da cuenta automáticamente y vuelve a dibujar (renderizar) la pantalla para mostrar el nuevo dato. 

Lo usamos siempre que un componente necesite recordar algún dato que cambie por las acciones del usuario, como escribir en un buscador, hacer clic en un boton, cambiar un color o abrir una ventana.

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
Usamos un estado que inicialmente esta vacio ("null"). Cuando el usuario hace clic sobre una fila de la tabla para ver a un deportista, el estado guarda los datos de ese jugador específico y eso hace que la ventana emergente aparezca con su información.
// Estado para controlar el jugador seleccionado en el modal
const [selectedPlayer, setSelectedPlayer] = useState(null);

=======
### b. ¿Qué es useEffect y sus casos de uso?

## 📖 Explicacion
El useEffect es un hook que sirve para ejecutar acciones automaticas dentro de un componente.
Estas acciones se llaman efectos secundarios porque ocurren despues del render.

Se utiliza para:

- guardar datos
- hacer búsquedas
- usar temporizadores
- trabajar con localStorage
- ejecutar código automáticamente
---
# 🔄 Ciclo de vida

El useEffect reemplaza metodos antiguos de React como:

- componentDidMount
- componentDidUpdate
- componentWillUnmount

Con este hook se puede controlar cuando ejecutar una accion.

---
# Diferencia entre dependencias

## 1. Sin array de dependencias

```jsx
useEffect(() => {
  console.log('Render');
});
```

Se ejecuta cada vez que el componente renderiza.

---

## 2. Con array vacio `[]`

```jsx
useEffect(() => {
  console.log('Solo una vez');
}, []);
```

Se ejecuta una sola vez cuando el componente se monta.

Esto se usa mucho para:
- cargar datos
- recuperar información
- inicializar configuraciones

---

## 3. Con dependencias `[dep]`

```jsx
useEffect(() => {
  console.log('Cambio');
}, [searchTerm]);
```

Se ejecuta solamente cuando cambia searchTerm.
Esto ayuda a optimizar rendimiento.

---

# 🧹 Cleanup function

El cleanup es una funcion de limpieza.

Sirve para:
- eliminar timers
- cancelar procesos
- limpiar eventos
- evitar errores y fugas de memoria

---

# ✅ Ejemplo del proyecto

```jsx
useEffect(() => {

  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300);

  return () => clearTimeout(timer);

}, [searchTerm]);
```

## 🔍 ¿Que hace?

1. El usuario escribe
2. Se crea un temporizador
3. Si vuelve a escribir rapido:
   - el cleanup elimina el timer anterior
4. Solo se ejecuta la última búsqueda

Esto mejora el rendimiento de la aplicacion.

---
>>>>>>> f903003970f931179ea68364d4248a156b64cd1b

