import pickle
import pandas as pd
from app.tmdb import fetch_tmdb_poster
from sklearn.neighbors import NearestNeighbors

movies = None
sparse_matrix = None
model = None
movie_ids = None
movie_id_to_index = None


def load_collab():

    global movies
    global sparse_matrix
    global model
    global movie_ids
    global movie_id_to_index

    if movies is None:

        print("=" * 50)
        print("Starting collaborative model loading...")
        print("=" * 50)

        print("Loading collaborative_movies.pkl...")
        movies = pickle.load(
            open(
                'app/artifacts/collab_based/collaborative_movies.pkl',
                'rb'
            )
        )
        print("✓ collaborative_movies.pkl loaded")

        print("Loading collaborative_sparse.pkl...")
        sparse_matrix = pickle.load(
            open(
                'app/artifacts/collab_based/collaborative_sparse.pkl',
                'rb'
            )
        )
        print("✓ collaborative_sparse.pkl loaded")

        print("Building NearestNeighbors model...")
        
        model = NearestNeighbors(
            metric="cosine",
            algorithm="brute"
        )

        model.fit(sparse_matrix)
        print("✓ model built")

        print("Loading movie_ids.pkl...")
        movie_ids = pickle.load(
            open(
                'app/artifacts/collab_based/movie_ids.pkl',
                'rb'
            )
        )
        print("✓ movie_ids.pkl loaded")

        print("Loading movie_id_to_index.pkl...")
        movie_id_to_index = pickle.load(
            open(
                'app/artifacts/collab_based/movie_id_to_index.pkl',
                'rb'
            )
        )
        print("✓ movie_id_to_index.pkl loaded")

        print("=" * 50)
        print("All collaborative artifacts loaded successfully")
        print("=" * 50)

def recommend_collaborative(movie_name):
    load_collab()
    
    matches = movies[
        movies['title']
        .fillna('')
        .str.lower()
        .str.contains(
            movie_name.lower()
        )
    ]

    if matches.empty:

        print("Movie not found")

        return []

    movie_id = matches.iloc[0]['id']

    print("TMDB Movie ID:", movie_id)

    if movie_id not in movie_id_to_index:

        print("Movie not present in collaborative matrix")

        return []

    movie_index = movie_id_to_index[
        movie_id
    ]

    distances, indices = model.kneighbors(
        sparse_matrix[movie_index],
        n_neighbors=11
    )

    recommendations = []

    for i in range(
        1,
        len(indices[0])
    ):

        similar_movie_index = indices[0][i]

        similar_movie_id = movie_ids[
          similar_movie_index
      ]

        movie_data = movies[
            movies['id']
            == similar_movie_id
        ]

        if movie_data.empty:
            continue

        movie_data = movie_data.iloc[0]

        poster_url = None

        if (
            pd.notna(
                movie_data['poster_path']
            )
            and str(
                movie_data['poster_path']
            ).startswith("/")
        ):

            poster_url = (
                "https://image.tmdb.org/t/p/w500"
                + movie_data[
                    'poster_path'
                ]
            )

        recommendations.append({

            "id":
                int(movie_data['id']),

            "title":
                movie_data['title'],

            "overview":
                movie_data['overview'],

            "poster":
                poster_url,

            "rating":
                (
                    round(
                        float(
                            movie_data[
                                'vote_average'
                            ]
                        ),
                        1
                    )
                    if pd.notna(
                        movie_data[
                            'vote_average'
                        ]
                    )
                    else None
                ),

            "release_date":
                movie_data[
                    'release_date'
                ],

            "runtime":
                (
                    int(
                        movie_data[
                            'runtime'
                        ]
                    )
                    if pd.notna(
                        movie_data[
                            'runtime'
                        ]
                    )
                    else None
                ),

            "distance":
                round(
                    float(
                        distances[0][i]
                    ),
                    3
                )
        })

    return recommendations