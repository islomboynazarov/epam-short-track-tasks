// import React from "react";
// import type { AppState } from "./types";
// import { fetchAllPokemons, fetchPokemonByName } from "./api";
// import Search from "./components/Search";
// import CardList from "./components/CardList";
// import Spinner from "./components/Spinner";
// import ErrorBoundary from "./components/ErrorBoundary";
// import ErrorButton from "./components/ErrorButton";

// const STORAGE_KEY = "pokemonSearchTerm";

// class App extends React.Component<Record<string, never>, AppState> {
//   constructor(props: Record<string, never>) {
//     super(props);
//     this.state = {
//       pokemons: [],
//       searchTerm: localStorage.getItem(STORAGE_KEY) ?? "",
//       isLoading: false,
//       error: null,
//     };
//   }

//   componentDidMount(): void {
//     this.fetchData(this.state.searchTerm);
//   }

//   fetchData = async (term: string): Promise<void> => {
//     this.setState({ isLoading: true, error: null });
//     try {
//       if (term) {
//         const pokemon = await fetchPokemonByName(term);
//         this.setState({ pokemons: [pokemon], isLoading: false });
//       } else {
//         const pokemons = await fetchAllPokemons();
//         this.setState({ pokemons, isLoading: false });
//       }
//     } catch (err) {
//       const message = err instanceof Error ? err.message : "Something went wrong";
//       this.setState({ error: message, isLoading: false });
//     }
//   };

//   handleSearch = (term: string): void => {
//     if (term === this.state.searchTerm) return;
//     localStorage.setItem(STORAGE_KEY, term);
//     this.setState({ searchTerm: term }, () => {
//       this.fetchData(term);
//     });
//   };

//   render() {
//     const { pokemons, searchTerm, isLoading, error } = this.state;

//     return (
//       <ErrorBoundary>
//         <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
//           <header style={{ borderBottom: "2px solid #ccc", paddingBottom: "20px" }}>
//             <h1 style={{ textAlign: "center" }}>Pokemon Search</h1>
//             <Search onSearch={this.handleSearch} initialValue={searchTerm} />
//           </header>
//           <main style={{ paddingTop: "20px", minHeight: "400px" }}>
//             {isLoading && <Spinner />}
//             {error && (
//               <p style={{ color: "red", textAlign: "center" }}>{error}</p>
//             )}
//             {!isLoading && !error && <CardList pokemons={pokemons} />}
//           </main>
//           <ErrorButton />
//         </div>
//       </ErrorBoundary>
//     );
//   }
// }

// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ErrorBoundary from "./components/ErrorBoundary";
// import ErrorButton from "./components/ErrorButton";
// import Navigation from "./components/Navigation";
// import MainPage from "./pages/MainPage";
// import AboutPage from "./pages/AboutPage";
// import NotFoundPage from "./pages/NotFoundPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <ErrorBoundary>
//         <Navigation />
//         <Routes>
//           <Route path="/" element={<MainPage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//         <ErrorButton />
//       </ErrorBoundary>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ErrorBoundary from "./components/ErrorBoundary";
// import ErrorButton from "./components/ErrorButton";
// import Navigation from "./components/Navigation";
// import MainPage from "./pages/MainPage";
// import AboutPage from "./pages/AboutPage";
// import NotFoundPage from "./pages/NotFoundPage";
// import Flyout from "./components/Flyout";
// import { ThemeProvider } from "./context/ThemeContext";

// function App() {
//   return (
//     <BrowserRouter>
//       <ThemeProvider>
//         <ErrorBoundary>
//           <Navigation />
//           <Routes>
//             <Route path="/" element={<MainPage />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="*" element={<NotFoundPage />} />
//           </Routes>
//           <Flyout />
//           <ErrorButton />
//         </ErrorBoundary>
//       </ThemeProvider>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorButton from "./components/ErrorButton";
import Navigation from "./components/Navigation";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import Flyout from "./components/Flyout";
import { ThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number(import.meta.env.VITE_CACHE_TTL) || 300000,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <ErrorBoundary>
            <Navigation />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Flyout />
            <ErrorButton />
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;