import PlayerRow from '../PlayerRow/PlayerRow';
import './PlayerTable.css';

function PlayerTable({players,onSort,sortConfig,favorites,onToggleFavorite,rowColors,onRowClick}) {

  const getArrow = (key) => {

    if (sortConfig.key !== key) {
      return '';
    }
    if (sortConfig.direction === 'asc') {
      return ' ↑';
    }
    if (sortConfig.direction === 'desc') {
      return ' ↓';
    }
    return '';
  };

  return (

    <table className='table-box'>
      <thead>
        <tr>
          <th onClick={() => onSort('number')}>
            # {getArrow('number')}
          </th>
          <th onClick={() => onSort('name')}>
            Jugador {getArrow('name')}
          </th>
          <th onClick={() => onSort('position')}>
            Posición {getArrow('position')}
          </th>
          <th onClick={() => onSort('age')}>
            Edad {getArrow('age')}
          </th>
          <th onClick={() => onSort('points')}>
            PTS {getArrow('points')}
          </th>

          <th>Fav</th>
        </tr>
      </thead>

      <tbody>

        {players.map((player, index) => (

          <PlayerRow
            key={player.id}
            player={player}
            index={index}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            rowColors={rowColors}
            onRowClick={onRowClick}/>
        ))}
      </tbody>
    </table>
  );
}

export default PlayerTable;