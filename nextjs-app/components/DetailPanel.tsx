"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { fetchPokemonById } from "../lib/api";
import type { PokemonDetailFull } from "../types";
import Spinner from "./Spinner";

interface DetailPanelProps {
  detailsId: string;
  onClose: () => void;
}

export default function DetailPanel({ detailsId, onClose }: DetailPanelProps) {
  const t = useTranslations("ai");
  const locale = useLocale();
  const [pokemon, setPokemon] = useState<PokemonDetailFull | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [explanation, setExplanation] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [lastExplainedId, setLastExplainedId] = useState<string | null>(null);
  const [lastExplainedLocale, setLastExplainedLocale] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setExplanation(null);
    setAiError(null);
    fetchPokemonById(Number(detailsId))
      .then((data) => {
        setPokemon(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [detailsId]);

  const handleExplain = async () => {
    if (!pokemon) return;
    if (
      lastExplainedId === detailsId &&
      lastExplainedLocale === locale &&
      explanation
    ) return;

    setAiLoading(true);
    setAiError(null);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pokemon: {
            name: pokemon.name,
            id: pokemon.id,
            types: pokemon.types,
            abilities: pokemon.abilities,
            height: pokemon.height,
            weight: pokemon.weight,
          },
          locale,
        }),
      });

      const data = await response.json() as { explanation?: string; error?: string };

      if (!response.ok) {
        setAiError(data.error ?? t("error"));
      } else {
        setExplanation(data.explanation ?? null);
        setLastExplainedId(detailsId);
        setLastExplainedLocale(locale);
      }
    } catch {
      setAiError(t("error"));
    } finally {
      setAiLoading(false);
    }
  };

  const handleRegenerate = () => {
    setLastExplainedId(null);
    setLastExplainedLocale(null);
    setExplanation(null);
    handleExplain();
  };

  return (
    <div style={{ width: "300px", borderLeft: "2px solid #ccc", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <button onClick={onClose}>Close ✕</button>
      </div>
      {isLoading && <Spinner />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pokemon && !isLoading && (
        <div>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={96}
            height={96}
          />
          <h2>{pokemon.name}</h2>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Types: {pokemon.types.join(", ")}</p>
          <p>Abilities: {pokemon.abilities.join(", ")}</p>

          <div style={{ marginTop: "16px" }}>
            {!explanation && !aiLoading && (
              <button
                onClick={handleExplain}
                disabled={aiLoading}
                style={{ padding: "8px 16px", cursor: "pointer", width: "100%" }}
              >
                {t("explain")}
              </button>
            )}

            {aiLoading && (
              <p style={{ fontStyle: "italic" }}>{t("loading")}</p>
            )}

            {aiError && !aiLoading && (
              <div>
                <p style={{ color: "red" }}>{aiError}</p>
                <button
                  onClick={handleExplain}
                  style={{ padding: "8px 16px", cursor: "pointer" }}
                >
                  {t("retry")}
                </button>
              </div>
            )}

            {explanation && !aiLoading && (
              <div style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}>
                <p style={{ margin: 0 }}>{explanation}</p>
                <p style={{
                  fontSize: "11px",
                  color: "#888",
                  marginTop: "8px",
                  fontStyle: "italic",
                }}>
                  {t("disclaimer")}
                </p>
                <button
                  onClick={handleRegenerate}
                  style={{ marginTop: "8px", padding: "6px 12px", cursor: "pointer" }}
                >
                  {t("regenerate")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}