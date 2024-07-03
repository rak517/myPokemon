import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PokeDetails from "./PokeDetails";
import './PokeDetailPage.css';

const PokeDetailPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${response.data.id}`);
        const koreanName = speciesResponse.data.names.find((name) => name.language.name === "ko");

        const typesWithKoreanNames = await Promise.all(
          response.data.types.map(async (type) => {
            const typeResponse = await axios.get(type.type.url);
            const koreanTypeName = typeResponse.data.names.find((name) => name.language.name === "ko");
            return {
              ...type,
              type: {
                ...type.type,
                korean_name: koreanTypeName ? koreanTypeName.name : type.type.name
              }
            }
          })
        );

        const abilitiesWithKoreanNames = await Promise.all(
          response.data.abilities.map(async (ability) => {
            const abilityResponse = await axios.get(ability.ability.url);
            const koreanAbilityName = abilityResponse.data.names.find(name => name.language.name === "ko");
            return {
              ...ability,
              ability: {
                ...ability.ability,
                korean_name: koreanAbilityName ? koreanAbilityName.name : ability.ability.name
              }
            }
          })
        );

        const movesWithKoreanNames = await Promise.all(
          response.data.moves.map(async (move) => {
            const moveResponse = await axios.get(move.move.url);
            const KoreanMoveName = moveResponse.data.names.find((name) => name.language.name === "ko");
            return {
              ...move,
              move: {
                ...move.move,
                korean_name: KoreanMoveName ? KoreanMoveName.name : move.move.name
              }
            }
          })
        );

        const gifUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${response.data.id}.gif`;

        const updatePokemonData = {
          id: response.data.id,
          name: response.data.name,
          koreanName: koreanName ? koreanName.name : response.data.name,
          height: response.data.height,
          weight: response.data.weight,
          types: typesWithKoreanNames,
          abilities: abilitiesWithKoreanNames,
          moves: movesWithKoreanNames,
          species: speciesResponse.data.genera.find((genus) => genus.language.name === "ko").genus,
          stats: response.data.stats,
          base_experience: response.data.base_experience,  //기본경험치
          imageUrl: gifUrl
        }

        setPokemon(updatePokemonData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPokemon();
  }, [id]);

  return (
    <div className="pokemon_card">
      <PokeDetails pokemon={pokemon} />
    </div>
  )
}

export default PokeDetailPage