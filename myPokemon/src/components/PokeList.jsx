import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './PokeList.css';

const PokeList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      // axios로 리스트 불러오기
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      // 불러온 데이터 allPokemons에 저장
      const allPokemons = response.data.results;

      // allPokemons에 저장된 데이터를 하나씩 불러서 상세정보 가져오기(이름, 번호, 이미지) 
      const pokemonsWithDetails = await Promise.all(
        allPokemons.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonResponse.data.id}`);
          const koreanName = speciesResponse.data.names.find(name => name.language.name === 'ko'); // 한국이름 없으면 영어이름으로 표시

          const gifUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonResponse.data.id}.gif`;
          // 상세정보 객체로 저장
          return {
            id: pokemonResponse.data.id,
            name: pokemonResponse.data.name,
            koreanName: koreanName ? koreanName.name : pokemon.name,
            //imageUrl: pokemonResponse.data.sprites.front_default
            imageUrl: gifUrl
          }
        })
      )
      // 상세정보 업데이트
      setPokemons(pokemonsWithDetails);
    }
    // 마운트와 업데이트시 fetchPokemons 실행
    fetchPokemons();
  }, [])


  return (
    <div className="List">
      {
        pokemons.map((pokemons) => (
          <div key={pokemons.id} className="pokemon_item">
            {/* 상세페이지 이동 */}
            <Link to={`/pokemon/${pokemons.id}`} className="pokemon_link">
              <img src={pokemons.imageUrl} alt={pokemons.koreanName} />
              <p className="pokemon_name">{pokemons.koreanName}</p>
              <p className="pokemon_id">#{pokemons.id}</p>
            </Link>
            <button>내 도감에 추가</button>
          </div>
        ))
      }
    </div>
  )
}

export default PokeList;