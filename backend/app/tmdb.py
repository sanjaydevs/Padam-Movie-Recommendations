import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")

BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"

def fetch_movie_details(movie_name):
    url = "https://api.themoviedb.org/3/search/movie"
    
    params = {
        "api_key":API_KEY,
        "query":movie_name
    }
    
    try:
        response = requests.get(url, params=params, timeout=5)
        data = response.json()
        
        if data['results']:
            movie = data['results'][0]
            poster_path = movie.get("poster_path")
            
            poster_url=None
            
            if poster_path :
                poster_url = BASE_IMAGE_URL + poster_path
                
            return {
                "title": movie.get("title"),
                "overview": movie.get("overview"),
                "poster": poster_url,
                "release_date": movie.get("release_date"),
                "rating": movie.get("vote_average")
            }
        
    except Exception as e:
        print(e)

    return None