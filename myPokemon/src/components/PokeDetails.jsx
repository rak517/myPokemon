import { useState } from "react"

const PokeDetails = ({ pokemon }) => {
  const [showAllMoves, setShowAllMoves] = useState(false);

  if (!pokemon) {
    return <div>Loading..</div>;
  }

  const renderTypes = () => {
    return pokemon.types.map((type, index) => (
      <span key={type.type.name}>
        {type.type.korean_name}
        {index < pokemon.types.length - 1 ? ', ' : ''}
      </span>
    ))
  }

  const renderAbilities = () => {
    if (!pokemon || !pokemon.abilities) return null;

    return pokemon.abilities.map((ability, index) => (
      <span key={ability.ability.name}>
        {ability.ability.korean_name}
        {index < pokemon.abilities.length - 1 ? ', ' : ''}
      </span>
    ))
  };

  // const renderStats = () => {
  //   return pokemon.stats.map((stat, index) => (
  //     <li key={index}>
  //       <p>{stat.stat.name} : {stat.base_stat}</p>
  //     </li>
  //   ))
  // }
  const statNames = {
    hp: '체력',
    attack: '공격',
    defense: '방어',
    'special-attack': '특수공격',
    'special-defense': '특수방어',
    speed: '스피드'
  }

  const renderStats = () => {
    return pokemon.stats.map((stat, index) => (
      <li key={index}>
        <p>{statNames[stat.stat.name]} : {stat.base_stat}</p>
        <div className="stat_bar">
          <div className="stat_bar_fill" style={{
            width: 0,
            animation: `fill-bar ${stat.base_stat / 20}s forwards`,
            '--final-width': `${stat.base_stat}%`
          }}></div>
        </div>
      </li>
    ))
  }

  const renderMoves = () => {
    const movesToShow = showAllMoves ? pokemon.moves : pokemon.moves.slice(0, 5);
    return movesToShow.map((move, index) => (
      <li key={move.move.name}>{move.move.korean_name}</li>
    ))
  };



  return (
    <div>
      <h2>{pokemon.koreanName} (#{pokemon.id})</h2>
      <img src={pokemon.imageUrl} alt={pokemon.koreanName} />
      <p>신장 : {pokemon.height}</p>
      <p>몸무게 : {pokemon.weight}</p>
      <p>타입 : {renderTypes()}</p>
      <p>능력 : {renderAbilities()}</p>
      <p>종족 : {pokemon.species}</p>
      <p>스탯 : {renderStats()}</p>
      <p>기술: </p>
      <ul>{renderMoves()}</ul>
      {!showAllMoves && pokemon.moves.length > 5 && (
        <p className="show_more" onClick={() => setShowAllMoves(true)}>더보기</p>
      )}
      {showAllMoves && (
        <p className="show_more" onClick={() => setShowAllMoves(false)}>접기</p>
      )}
    </div>
  )
}

export default PokeDetails;