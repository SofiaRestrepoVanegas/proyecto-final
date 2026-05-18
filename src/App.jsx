import { useEffect, useMemo, useState } from 'react';
import players from './data/players';
import SearchBar from './components/SearchBar/SearchBar';
import PlayerTable from './components/PlayerTable/PlayerTable';
import Pagination from './components/Pagination/Pagination';
import StatsPanel from './components/StatsPanel/StatsPanel';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import SearchHistory from './components/SearchHistory/SearchHistory';
import Modal from './components/Modal/Modal';
import './App.css';

function App() {
//busquedad
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
// paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
// tema
  const [darkMode, setDarkMode] = useState(false);
// favoritos
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
// modal
  const [selectedPlayer, setSelectedPlayer] = useState(null);
// historial
  const [searchHistory, setSearchHistory] = useState([]);
// colores filas
  const [rowColors, setRowColors] = useState('none');
// ordenamiento
  const [sortConfig, setSortConfig] = useState({key: null,direction: 'none'});

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode',JSON.stringify(darkMode) );
  }, [darkMode]);

  // favoritos
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites',JSON.stringify(favorites));
  }, [favorites]);

  // historial
  useEffect(() => {
    const savedHistory = localStorage.getItem('history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('history',JSON.stringify(searchHistory));
  }, [searchHistory]);

  // guardar historial
  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 2) {
      setSearchHistory((prev) => {
        const updated = [debouncedSearch,...prev.filter((item) => item !==
           debouncedSearch)];
        return updated.slice(0, 5);
      });
    }
  }, [debouncedSearch]);

  // reset pagina
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  // filtrar
  let filteredPlayers = players.filter((player) =>
    player.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  // favoritos
  if (showOnlyFavorites) {
    filteredPlayers = filteredPlayers.filter((player) =>
      favorites.includes(player.id)
    );
  }

  // ordenar
  if (sortConfig.direction !== 'none') {
    filteredPlayers.sort((a, b) => {

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc'
          ? -1
          : 1;
      }

      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc'
          ? 1
          : -1;
      }
      return 0;
    });
  }

  // paginacion
  const totalPages = Math.ceil(
    filteredPlayers.length / itemsPerPage
  );

  const start =
    (currentPage - 1) * itemsPerPage;

  const currentPlayers = filteredPlayers.slice(start,
    start + itemsPerPage
  );

  // favoritos
  const toggleFavorite = (id) => {

    if (favorites.includes(id)) {
      setFavorites(
        favorites.filter((fav) => fav !== id)
      );

    } else {
      setFavorites([...favorites, id]);
    }
  };

  // ordenar
  const handleSort = (key) => {
    let direction = 'asc';
    if (
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';

    } else if (
      sortConfig.key === key && sortConfig.direction === 'desc'
    ) {
      direction = 'none';
    }

    setSortConfig({ key, direction });
  };

  // estadisticas
  const stats = useMemo(() => {
    const total = filteredPlayers.length;
    const avgAge =filteredPlayers.reduce(
        (acc, player) => acc + player.age,
        0
      ) / total || 0;

    const topScorer = filteredPlayers.reduce(
      (best, player) =>
        player.points > best.points
          ? player
          : best,
      filteredPlayers[0] || {}
    );

    const positions = {};
    filteredPlayers.forEach((player) => {
      positions[player.position] =
        (positions[player.position] || 0) + 1;
    });

    return {total,avgAge,topScorer,positions};
  }, [filteredPlayers]);

  return (

    <div className={darkMode ? 'app dark' : 'app'}>
      <div className='container-box'>
        <div className='header'>
          <h1>Central de Rendimiento</h1>
          <p>Administra jugadores y estadísticas</p>
        </div>

        <ThemeToggle
          darkMode={darkMode}
          onToggle={() => setDarkMode(!darkMode)}/>

        <SearchBar
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          onClear={() => setSearchTerm('')}
          resultsCount={filteredPlayers.length}/>

        <StatsPanel stats={stats} />

        <div className='buttons-row'>
          <button
            className='btn btn-primary'
            onClick={() => setRowColors('even')}
          >
            Filas pares
          </button>

          <button
            className='btn btn-warning'
            onClick={() => setRowColors('odd')}
          >
            Filas impares
          </button>

          <button
            className='btn btn-danger'
            onClick={() => setRowColors('none')}
          >
            Limpiar
          </button>

          <button
            className='btn btn-success'
            onClick={() =>setShowOnlyFavorites(!showOnlyFavorites)}
          >
            Favoritos ({favorites.length})
          </button>
        </div>

        <PlayerTable
          players={currentPlayers}
          onSort={handleSort}
          sortConfig={sortConfig}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          rowColors={rowColors}
          onRowClick={setSelectedPlayer}/>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={filteredPlayers.length}/>

        <SearchHistory
          history={searchHistory}
          onSelectSearch={setSearchTerm}
          onClearHistory={() =>setSearchHistory([])
          }/>

        <Modal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}/>
      </div>
    </div>
  );
}

export default App;