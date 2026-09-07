const BASE = 'https://www.omdbapi.com/'

function getApiKey(){
  const key = import.meta.env.VITE_OMDB_API_KEY
  if(!key){
    throw new Error('Missing API key. Please set VITE_OMDB_API_KEY in your .env file.')
  }
  return key
}

export async function searchMovies(searchTerm){
  try{
    const key = getApiKey()
    const url = `${BASE}?apikey=${key}&s=${encodeURIComponent(searchTerm)}`
    const res = await fetch(url)
    if(!res.ok) throw new Error('Network response was not ok')
    const data = await res.json()
    if(data.Response === 'False'){
      // Normalize no-results
      if(data.Error && data.Error.toLowerCase().includes('movie')){
        return []
      }
      throw new Error(data.Error || 'Unexpected API response')
    }
    // Map and normalize
    return data.Search.map(item => ({
      imdbID: item.imdbID,
      title: item.Title || 'Untitled',
      year: item.Year || 'N/A',
      type: item.Type || 'movie',
      poster: item.Poster || 'N/A'
    }))
  }catch(err){
    if(err.message && err.message.includes('Missing API key')) throw err
    throw new Error('Failed to search movies. Please try again.')
  }
}

export async function getMovieDetails(imdbID){
  try{
    const key = getApiKey()
    const url = `${BASE}?apikey=${key}&i=${encodeURIComponent(imdbID)}&plot=full`
    const res = await fetch(url)
    if(!res.ok) throw new Error('Network response was not ok')
    const data = await res.json()
    if(data.Response === 'False'){
      throw new Error(data.Error || 'Movie details not found')
    }
    // normalize fields
    return {
      imdbID: data.imdbID,
      title: data.Title || 'Untitled',
      year: data.Year || 'N/A',
      genre: data.Genre || 'N/A',
      runtime: data.Runtime || 'N/A',
      rating: data.imdbRating && data.imdbRating !== 'N/A' ? data.imdbRating : 'N/A',
      plot: data.Plot && data.Plot !== 'N/A' ? data.Plot : 'Plot information is not available.',
      director: data.Director || 'N/A',
      actors: data.Actors || 'N/A',
      poster: data.Poster || 'N/A'
    }
  }catch(err){
    if(err.message && err.message.includes('Missing API key')) throw err
    throw new Error('Failed to load movie details. Please try again.')
  }
}
