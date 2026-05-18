#  Basketball
## Descripción del proyecto

Aplicación desarrollada en React para administrar jugadores de basketball.

El proyecto permite:
- buscar jugadores
- ordenar jugadores
- usar paginación
- guardar favoritos
- visualizar estadísticas
- usar modo oscuro y claro
- abrir un modal con información detallada
- guardar historial de búsquedas

# 👥 Integrantes

- Valentina Vargas
- Sofia Restrepo

# 🤖 IA utilizada

- ChatGPT 
- Gemini

##  2. Instrucciones de Instalación y Despliegue Local

Para clonar, instalar y poner a correr este proyecto en el entorno local, ejecutamos los siguientes comandos:

### Paso A: Clonar el repositorio
```bash
git clone https://github.com/SofiaRestrepoVanegas/proyecto-final

### Paso B: Navegar al directorio del proyecto
Bash
cd examen-basketball-react

### Paso C: Instalar las dependencias del sistema
Bash
npm install

### Paso D: Iniciar el servidor de desarrollo
Bash
npm run dev
```

# 🎣 Lista de Hooks utilizados

## useState

Lo utilizamos para manejar estados dinamicos dentro de la aplicacion.
- Se implemento para:
- busqueda
- favoritos
- paginacion
- historial
- modal
- modo oscuro
- ordenamiento
- colores de filas

Ejemplo:
```jsx
const [favorites, setFavorites] = useState([]);
```
---

## useEffect

Lo utilizamos para manejar efectos secundarios.
Funciones realizadas:
- debounce de busqueda
- guardar informacion en localStorage
- recuperar datos guardados
- actualizar historial
- resetear paginacion

Ejemplo:

```jsx
useEffect(() => {
  localStorage.setItem('favorites',JSON.stringify(favorites) );
}, [favorites]);
```

---

## useMemo

Lo utilizamos para optimizar calculos y evitar renders innecesarios.

Se implemento para:
- total de jugadores
- promedio de edad
- lider anotador
- posiciones

Ejemplo:

```jsx
const stats = useMemo(() => {
  return {
    total: filteredPlayers.length
  };
}, [filteredPlayers]);
```
