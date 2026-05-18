import './PlayerRow.css';

function PlayerRow({player,index,favorites,onToggleFavorite,rowColors,onRowClick}) {

  let colorClass = '';
  // pintar filas pares
  if (
    rowColors === 'even' && index % 2 === 0
  ) {
    colorClass = 'even';
  }
  // pintar filas impares
  if (
    rowColors === 'odd' && index % 2 !== 0
  ) {
    colorClass = 'odd';
  }

  return (

    <tr
      className={colorClass}
      onClick={() => onRowClick(player)}
    >

      <td>{player.number}</td>
      <td>{player.name}</td>
      <td>{player.position}</td>
      <td>{player.age}</td>
      <td>{player.points}</td>
      <td>

        <button
          className="favorite-btn"
          onClick={(e) => {
            // evita abrir modal
            e.stopPropagation();
            onToggleFavorite(player.id);
          }}
        >
          {
            favorites.includes(player.id)
              ? '★'
              : '☆'
          }
        </button>
      </td>
    </tr>
  );
}

export default PlayerRow;