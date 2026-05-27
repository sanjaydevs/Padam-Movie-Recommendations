import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
from app.tmdb import fetch_movie_details

movies = pd.read_csv("app/data/movies.csv")
ratings = pd.read_csv("app/data/ratings.csv")

final_dataset=ratings.pivot(index='movieId',columns='userId',values='rating')
final_dataset.fillna(0,inplace=True)

no_user_voted = ratings.groupby("movieId")["rating"].agg('count')
no_movies_voted = ratings.groupby("userId")["rating"].agg('count')
final_dataset = final_dataset.loc[no_user_voted[no_user_voted > 10].index, :]
final_dataset = final_dataset.loc[: ,no_movies_voted[no_movies_voted > 50].index]

csr_data = csr_matrix(final_dataset.values)
final_dataset.reset_index(inplace=True)

knn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=20, n_jobs=-1)
knn.fit(csr_data)

def recommend_movies(movie_name):
  movie_list = movies[movies['title'].str.contains(movie_name, case=False, na=False)]
  if len(movie_list):
    movie_id = movie_list.iloc[0]['movieId']
    movie_data = final_dataset[final_dataset['movieId'] == movie_id]
    if movie_data.empty:
        return []
    
    movie_idx = movie_data.index[0]
    distance, indices = knn.kneighbors(csr_data[movie_idx], n_neighbors=10+1)
    rec_movies_indices = sorted(list(zip(indices.squeeze().tolist(),distance.squeeze().tolist())),key=lambda x: x[1])[:]
    
    recommended_movies = []
    
    for val in rec_movies_indices:
      recommended_movie_id = final_dataset.iloc[val[0]]['movieId']
      idx=movies[movies['movieId'] == recommended_movie_id].index
      movie_title = movies.iloc[idx]['title'].values[0]
      
      clean_title = movie_title.split('(')[0].strip()
      
      movie_details = fetch_movie_details(clean_title)
      recommended_movies.append({
        "title": movie_title,
        "distance": float(val[1]),
        "poster": movie_details.get("poster") if movie_details else None,
        "overview": movie_details.get("overview") if movie_details else None,
        "rating": movie_details.get("rating") if movie_details else None,
        "release_date": movie_details.get("release_date") if movie_details else None,
    })
      
    return recommended_movies
  else:
    return []