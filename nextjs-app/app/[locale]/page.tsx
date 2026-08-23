"use client";
import { useState } from "react";
import { useRouter, usePathname } from "../../navigation";
import { useSearchParams } from "next/navigation";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchPokemonPage, fetchPokemonByName } from "../../lib/api";
import CardList from "../../components/CardList";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import DetailPanel from "../../components/DetailPanel";
import { useTranslations } from "next-intl";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      retry: false,
    },
  },
});

function SearchPage() {
  const t = useTranslations("search");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? "1");
  const detailsId = searchParams.get("details");
  const [searchTerm, setSearchTerm] = useState(
    () => typeof window !== "undefined" ? localStorage.getItem("pokemonSearchTerm") ?? "" : ""
  );
  const [inputValue, setInputValue] = useState(searchTerm);

  const queryKey = searchTerm
    ? ["pokemon", "search", searchTerm]
    : ["pokemon", "page", currentPage];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      if (searchTerm) {
        const pokemon = await fetchPokemonByName(searchTerm);
        return { pokemons: [pokemon], hasNextPage: false };
      }
      return fetchPokemonPage(currentPage);
    },
  });

  const updateParams = (params: Record<string, string>) => {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) current.set(key, value);
      else current.delete(key);
    });
    router.push(`${pathname}?${current.toString()}`);
  };

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (trimmed === searchTerm) return;
    localStorage.setItem("pokemonSearchTerm", trimmed);
    setSearchTerm(trimmed);
    updateParams({ page: "1", details: "" });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: String(page) });
  };

  const handleCardClick = (id: number) => {
    updateParams({ page: String(currentPage), details: String(id) });
  };

  const handleCloseDetail = () => {
    updateParams({ details: "" });
  };

  const pokemons = data?.pokemons ?? [];
  const hasNextPage = data?.hasNextPage ?? false;

  return (
    <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: "10px", padding: "20px", justifyContent: "center" }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t("placeholder")}
            style={{ padding: "8px", fontSize: "16px", width: "300px" }}
          />
          <button
            onClick={handleSearch}
            style={{ padding: "8px 16px", fontSize: "16px" }}
          >
            {t("button")}
          </button>
        </div>
        {isLoading && <Spinner />}
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        )}
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
      {detailsId && (
        <DetailPanel detailsId={detailsId} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage />
    </QueryClientProvider>
  );
}