# 📚 Aprendizaje del proyecto 

## a. ¿Que es useState y cuando usarlo?

### 📖 Explicacion
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


## b. ¿Qué es useEffect y sus casos de uso?

### 📖 Explicacion
El useEffect es un hook que sirve para ejecutar acciones automaticas dentro de un componente.
Estas acciones se llaman efectos secundarios porque ocurren despues del render.

Se utiliza para:

- guardar datos
- hacer búsquedas
- usar temporizadores
- trabajar con localStorage
- ejecutar código automáticamente
---
### 🔄 Ciclo de vida

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


### c ¿Qué es useMemo y cuándo usarlo?

Explicación teórica:
El "useMemo" es un hook de React que sirve para optimizar el rendimiento de la aplicación. Su función es "memorizar" el resultado de un cálculo matemático o un proceso pesado para que no se tenga que volver a repetir innecesariamente cada vez que el componente se vuelve a dibujar (renderizar). Solo vuelve a hacer el cálculo si los datos de los que depende cambian.

---

#### 💡 Diferencia con useCallback:
Aunque ambos sirven para optimizar y memorizar, tienen una diferencia fundamental:
* **"useMemo":Memoriza el resultado de un cálculo o un valor (un número, un arreglo, un objeto filtrado).
* **"useCallback": Memoriza una función entera para que no se vuelva a crear desde cero en memoria cada vez que el componente se renderiza.

En resumen: "useMemo" recuerda un dato, mientras que "useCallback" recuerda una acción.

---

### 📊 Ejemplo de optimización de nuestro proyecto:

En nuestro archivo principal "App.jsx", tenemos una sección donde calculamos las estadísticas globales de los jugadores de baloncesto (como el promedio total de puntos, rebotes y asistencias de la lista filtrada). 

Como recorrer toda la lista de deportistas y hacer sumas y divisiones es un proceso pesado, usamos "useMemo" para que React solo recalculé estas estadísticas cuando la lista de jugadores filtrados ("filteredPlayers") cambie (por ejemplo, al usar el buscador). Si el usuario hace otra cosa que no altere la lista (como abrir el modal de detalles o cambiar al modo oscuro), React usa el resultado que ya tenía guardado en memoria y la aplicación va súper rápida.

```javascript
// Usamos useMemo para calcular las estadisticas globales sin ralentizar la pagina
const stats = useMemo(() => {
  if (filteredPlayers.length === 0) return { avgPoints: 0, avgRebounds: 0, avgAssists: 0 };

  const totalPoints = filteredPlayers.reduce((sum, p) => sum + p.points, 0);
  const totalRebounds = filteredPlayers.reduce((sum, p) => sum + p.rebounds, 0);
  const totalAssists = filteredPlayers.reduce((sum, p) => sum + p.assists, 0);

  return {
    avgPoints: (totalPoints / filteredPlayers.length).toFixed(1),
    avgRebounds: (totalRebounds / filteredPlayers.length).toFixed(1),
    avgAssists: (totalAssists / filteredPlayers.length).toFixed(1)
  };
}, [filteredPlayers]); // Solo se vuelve a calcular si filteredPlayers cambia