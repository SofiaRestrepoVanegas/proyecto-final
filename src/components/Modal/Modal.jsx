import './Modal.css';

function Modal({ player, onClose }) {

  if (!player) {
    return null;
  }

  return (

    <div className='modal-overlay' onClick={onClose}>
      <div
        className='modal-box'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='modal-close'
          onClick={onClose}
        >
          X
        </button>

        <h2>{player.name}</h2>
        <p>Número: {player.number}</p>
        <p>Posición: {player.position}</p>
        <p>Edad: {player.age}</p>
        <p>Puntos: {player.points}</p>
      </div>
    </div>
  );
}

export default Modal;