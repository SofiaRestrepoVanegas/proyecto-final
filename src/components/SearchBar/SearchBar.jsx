import './SearchBar.css';

function SearchBar({value,onChange,onClear,resultsCount}) {
  return (

    <div className="search">
      <div className="search__box">

        <input
          type="text"
          placeholder="Buscar jugador..."
          value={value}
          onChange={onChange}
        />

        <button onClick={onClear}>
          X
        </button>

      </div>

      <p>
        Mostrando {resultsCount} resultados
      </p>

    </div>
  );
}

export default SearchBar;