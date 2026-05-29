import pickle
import pandas as pd
from app.tmdb import fetch_tmdb_poster

movies = pickle.load(
    open('app/artifacts/content_based/movies.pkl', 'rb')
)

new_data = pickle.load(
    open('app/artifacts/content_based/new_data.pkl', 'rb')
)

model = pickle.load(
    open('app/artifacts/content_based/model.pkl', 'rb')
)

vectors = pickle.load(
    open('app/artifacts/content_based/vectors.pkl', 'rb')
)

def recommend_content(movie):
    
    movie = movie.lower()

    matches = new_data[
        new_data['title']
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