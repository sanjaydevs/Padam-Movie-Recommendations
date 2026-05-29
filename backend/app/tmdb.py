import os
import requests
import re
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")

BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"


def clean_movie_title(title: str):

    year_match = re.search(r"\((\d{4})\)", title)

    year = None

    if year_match:
        year = year_match.group(1)

    title = re.sub(r"\(\d{4}\)", "", title).strip()

    if title.endswith(", The"):
        title = f"The {title[:-5].strip()}"

    elif title.endswith(", A"):
        title = f"A {title[:-3].strip()}"

    elif title.endswith(", An"):
        title = f"An {title[:-4].strip()}"

    return title.strip(), year


def fetch_tmdb_poster(movie_name):

    clean_title, year = clean_movie_title(movie_name)

    url = "https://api.themoviedb.org/3/search/movie"

    params = {
        "api_key": API_KEY,
        "query": clean_title
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=5
        )

        data = response.json()

        if not data.get("results"):
            return None

        best_match = None

        for movie in data["results"]:

            title = movie.get("title", "").lower()

            release_date = movie.get(
                "release_date",
                ""
            )

            poster_path = movie.get("poster_path")

            if clean_title.lower() == title:

                if (
                    year
                    and release_date.startswith(year)
                    and poster_path
                ):

                    best_match = movie
                    break

                elif poster_path:
                    best_match = movie

        if not best_match:

            for movie in data["results"]:

                if movie.get("poster_path"):
                    best_match = movie
                    break

        if not best_match:
            return None

        return {
            "poster": (
                BASE_IMAGE_URL
                + best_match["poster_path"]
            )
        }

    except Exception as e:
        print(e)

    return None