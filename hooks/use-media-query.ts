// /hooks/use-media-query.ts

import { useState, useEffect } from "react"

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)

    // Set initial value
    setMatches(mediaQuery.matches)

    // Add listener for changes
    mediaQuery.addEventListener("change", handler)

    // Clean up listener on unmount
    return () => mediaQuery.removeEventListener("change", handler)
  }, [query])

  return matches
}

export default useMediaQuery
