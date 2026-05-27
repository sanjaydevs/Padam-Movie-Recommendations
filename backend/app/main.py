from fastapi import FastAPI
from app.recommender import recommend_movies
from app.tmdb import fetch_movie_details
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message":"Movie Recommender API"}

@app.get("/recommend")
def recommend(movie:str):
    recommendations = recommend_movies(movie)
    return {
            "movie":movie,
            "recommendation":recommendations
        }

@app.get("/movie")
def movie(movie: str):

    return fetch_movie_details(movie)