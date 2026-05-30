import pickle
import pandas as pd
from app.tmdb import fetch_tmdb_poster

movies = None
titles = None
model = None
vectors = None


def load_models():
    global movies, titles, model, vectors

    if movies is None:

        print("=" * 50)
        print("Starting content model loading...")
        print("=" * 50)

        print("Loading movies.pkl...")
        movies = pickle.load(
            open(
                "app/artifacts/content_based/movies.pkl",
                "rb"
            )
        )
        print("✓ movies.pkl loaded")

        print("Loading titles.pkl...")
        titles = pickle.load(
        open(
            "app/artifacts/content_based/titles.pkl",
            "rb"
        )
)
        print("✓ titles.pkl loaded")

        print("Loading model.pkl...")
        model = pickle.load(
            open(
                "app/artifacts/content_based/model.pkl",
                "rb"
            )
        )
        print("✓ model.pkl loaded")

        print("Loading vectors.pkl...")
        vectors = pickle.load(
            open(
                "app/artifacts/content_based/vectors.pkl",
                "rb"
            )
        )
        print("✓ vectors.pkl loaded")

        print("=" * 50)
        print("All content artifacts loaded successfully")
        print("=" * 50)

def recommend_content(movie):
    load_models()
    
    movie = movie.lower()

    matches = titles[
        titles['title']
        .fillna('')
        .str.lower()
        .str.contains(movie)
    ]

    if matches.empty:
        return []

    movie_index = matches.index[0]

    distances, indices = model.kneighbors(
        vectors[movie_index],
        n_neighbors=11
    )

    recommended_movies = []

    for i in indices[0][1:]:

        movie_data = movies.iloc[i]

        tmdb_data = fetch_tmdb_poster(movie_data.title)

        poster_url = None

        #TMDB live poster
        if tmdb_data and tmdb_data.get("poster"):

            poster_url = tmdb_data["poster"]

        #local dataset poster
        elif (
            pd.notna(movie_data.poster_path)
            and str(movie_data.poster_path).startswith("/")
        ):

            poster_url = (
                f"https://image.tmdb.org/t/p/w500"
                f"{movie_data.poster_path}"
            )

        recommended_movies.append({
            "id": int(movie_data.id),

            "title": movie_data.title,

            "overview": (
                " ".join(movie_data.overview)
                if isinstance(movie_data.overview, list)
                else movie_data.overview
            ),
            
            'poster' : poster_url,

            "rating": (
                float(movie_data.vote_average)
                if pd.notna(movie_data.vote_average)
                else None
            ),

            "release_date": movie_data.release_date,

            "genres": (
                ", ".join(movie_data.genres)
                if isinstance(movie_data.genres, list)
                else movie_data.genres
            ),
            
            "runtime": (
                int(movie_data['runtime'])
                if pd.notna(movie_data['runtime'])
                else None
            ),
            
        })

    return recommended_movies