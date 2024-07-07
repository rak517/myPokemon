import './MyPokedex.css';

const MyPokedex = ({ myPokedex, removeMyPokedex }) => {

  return (
    <div className="MyPokedex">
      <h2>나만의 도감</h2>
      <div className="favorite_list">
        {
          myPokedex.map((pokemon) => (
            <div className="favorite_poke" key={pokemon.id}>
              <img src={pokemon.imageUrl} alt={pokemon.koreanName} />
              <p className="favorite_name">{pokemon.koreanName}</p>
              <p className="favorite_id">#{pokemon.id}</p>
              <button onClick={() => removeMyPokedex(pokemon.id)}>삭제</button>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default MyPokedex;