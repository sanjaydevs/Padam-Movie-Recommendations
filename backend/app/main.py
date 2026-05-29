from fastapi import FastAPI
from app.recommender_content import recommend_content
from app.recommender_collaborative import recommend_collaborative
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
    return {"message": "Movie Recommender API"}

@app.get("/recommend")
def recommend(
    movie: str,
    type: str = "content"
):

    if type == "collaborative":
        recommendations = (
            recommend_collaborative(movie)
        )

    else:
        recommendations = (
            recommend_content(movie)
        )

    return {
        "movie": movie,
        "type": type,
        "recommendation": recommendations
    }