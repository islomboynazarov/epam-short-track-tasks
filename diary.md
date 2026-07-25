Converting class components to functional ones with hooks felt less like a refactor and more like a translation — the logic stayed 
identical but the syntax became dramatically shorter, and what previously required a constructor, lifecycle methods, and `this.setState` 
collapsed into a few `useState` and `useEffect` calls that read much more naturally. Adding React Router was the genuinely new part: 
understanding that URL state and component state need to stay in sync meant rethinking how pagination and the detail panel work — instead 
of storing the current page in component state, it lives in the URL via `useSearchParams`, which means the back button works for free and 
users can share links to specific pages and pokemon details. The tests needed updating because the architecture changed — `fetchAllPokemons`
is no longer called directly from `App`, and the new components like `DetailPanel` and `Pagination` needed their own test files to keep 
coverage above 80%. The hardest test to fix was "does not fetch again if search term hasn't changed" — the solution was to create the spy 
after the initial load rather than before, so only calls triggered by the button click were counted.
