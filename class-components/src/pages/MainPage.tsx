import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllPokemons, fetchPokemonByName } from "../api";
import type { PokemonDetails } from "../types";
import Search from "../components/Search";
import CardList from "../components/CardList";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import DetailPanel from "../components/DetailPanel";
import useLocalStorage from "../hooks/useLocalStorage";

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchTerm, setSearchTerm] = useLocalStorage("pokemonSearchTerm", "");

  const currentPage = Number(searchParams.get("page") ?? "1");
  const detailsId = searchParams.get("details");

  useEffect(() => {
    fetchData(searchTerm, currentPage);
  }, [currentPage, searchTerm]);

  const fetchData = async (term: string, page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      if (term) {
        const pokemon = await fetchPokemonByName(term);
        setPokemons([pokemon]);
        setHasNextPage(false);
      } else {
        const limit = 20;
        const offset = (page - 1) * limit;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setHasNextPage(data.next !== null);
        const details = await Promise.all(
          data.results.map((p: { name: string }) => fetchPokemonByName(p.name))
        );
        setPokemons(details);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    if (term === searchTerm) return;
    setSearchTerm(term);
    setSearchParams({ page: "1" });
  };

  const handlePageChange = (page: number) => {
    const params: Record<string, string> = { page: String(page) };
    if (detailsId) params.details = detailsId;
    setSearchParams(params);
  };

  const handleCardClick = (id: number) => {
    setSearchParams({ page: String(currentPage), details: String(id) });
  };

  return (
    <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <div style={{ flex: 1 }}>
        <Search onSearch={handleSearch} initialValue={searchTerm} />
        {isLoading && <Spinner />}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {!isLoading && !error && (
          <>
            <CardList pokemons={pokemons} onCardClick={handleCardClick} />
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              hasNextPage={hasNextPage}
            />
          </>
        )}
      </div>
      {detailsId && <DetailPanel />}
    </div>
  );
}

export default MainPage;