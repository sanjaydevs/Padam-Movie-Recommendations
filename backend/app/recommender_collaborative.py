# import pickle
# import pandas as pd
# from app.tmdb import fetch_tmdb_poster

# movies = pickle.load(
#     open(
#         'app/artifacts/collab_based/collaborative_movies.pkl',
#         'rb'
#     )
# )

# model = pickle.load(
#     open(
#         'app/artifacts/collab_based/collaborative_model.pkl',
#         'rb'
#     )
# )

# sparse_matrix = pickle.load(
#     open(
#         'app/artifacts/collab_based/collaborative_sparse.pkl',
#         'rb'
#     )
# )

# movie_ids = pickle.load(
#     open(
#         "app/artifacts/collab_based/movie_ids.pkl",
#         "rb"
#     )
# )
# movie_id_to_index = pickle.load(
#     open(
#         'app/artifacts/collab_based/movie_id_to_index.pkl',
#         'rb'
#     )
# )

# def recommend_collaborative(movie_name):

#     matches = movies[
#         movies['title']
#         .fillna('')
#         .str.lower()
#         .str.contains(
#             movie_name.lower()
#         )
#     ]

#     if matches.empty:

#         print("Movie not found")

#         return []

#     movie_id = matches.iloc[0]['id']

#     print("TMDB Movie ID:", movie_id)

#     if movie_id not in movie_id_to_index:

#         print("Movie not present in collaborative matrix")

#         return []

#     movie_index = movie_id_to_index[
#         movie_id
#     ]

#     distances, indices = model.kneighbors(
#         sparse_matrix[movie_index],
#         n_neighbors=11
#     )

#     recommendations = []

#     for i in range(
#         1,
#         len(indices[0])
#     ):

#         similar_movie_index = indices[0][i]

#         similar_movie_id = (
#             movie_ids[
#                 similar_movie_index
#             ]
#         )

#         movie_data = movies[
#             movies['id']
#             == similar_movie_id
#         ]

#         if movie_data.empty:
#             continue

#         movie_data = movie_data.iloc[0]

#         #Poster

#         tmdb_data = fetch_tmdb_poster(
#             movie_data.title
#         )

#         poster_url = None

#         #live TMDB poster
#         if (
#             tmdb_data
#             and tmdb_data.get("poster")
#         ):

#             poster_url = tmdb_data["poster"]

#         #local dataset poster
#         elif (
#             pd.notna(
#                 movie_data['poster_path']
#             )
#             and str(
#                 movie_data['poster_path']
#             ).startswith("/")
#         ):

#             poster_url = (
#                 "https://image.tmdb.org/t/p/w500"
#                 + movie_data[
#                     'poster_path'
#                 ]
#             )

#         recommendations.append({

#             "id":
#                 int(movie_data['id']),

#             "title":
#                 movie_data['title'],

#             "overview":
#                 movie_data['overview'],

#             "poster":
#                 poster_url,

#             "rating":
#                 (
#                     round(
#                         float(
#                             movie_data[
#                                 'vote_average'
#                             ]
#                         ),
#                         1
#                     )
#                     if pd.notna(
#                         movie_data[
#                             'vote_average'
#                         ]
#                     )
#                     else None
#                 ),

#             "release_date":
#                 movie_data[
#                     'release_date'
#                 ],

#             "runtime":
#                 (
#                     int(
#                         movie_data[
#                             'runtime'
#                         ]
#                     )
#                     if pd.notna(
#                         movie_data[
#                             'runtime'
#                         ]
#                     )
#                     else None
#                 ),

#             "distance":
#                 round(
#                     float(
#                         distances[0][i]
#                     ),
#                     3
#                 )
#         })

#     return recommendations