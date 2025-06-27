import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * TODO: Implement this function to:
   * 1. Call your backend API at http://localhost:3001/api/pokemon/{name}
   * 2. Handle loading state (before/during fetch)
   * 3. Handle success state (set pokemon data)
   * 4. Handle error state (Pokemon not found, network errors, etc.)
   */
  const fetchPokemon = async () => {
      const cleanedQuery = query.trim().toLowerCase();
      if (!cleanedQuery) return;

      setLoading(true);
      setError(null);
      setPokemon(null);

      try {
          const response = await fetch(`http://localhost:3001/api/pokemon/${cleanedQuery}`);
          throw new Error("Placeholder error.");
      }
      catch (err)
      {
          console.error('Fetch error:', err);
          setError(err.message);
      }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Pokémon Explorer</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a Pokémon name"
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button
          onClick={fetchPokemon}
          disabled={loading || !query.trim()}
          style={{ padding: "8px 16px" }}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
      )}

      {pokemon && (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "20px",
          }}
        >
          <h2>{pokemon.name}</h2>
          {pokemon.sprite && (
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              style={{ maxWidth: "200px" }}
            />
          )}
          <div>
            <strong>Types:</strong> {pokemon.types?.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}
