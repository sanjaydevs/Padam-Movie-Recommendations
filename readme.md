#  Padam — Movie Recommendations

> A content-based movie recommendation engine with a full-stack web interface, powered by machine learning.

[padam-movie-recommendations.vercel.app](https://padam-movie-recommendations.vercel.app)

---

##  Overview

**Padam** is a movie recommendation system that suggests films based on content similarity. Given a movie you like, Padam analyzes its metadata — genres, cast, crew, keywords, and plot — to surface the most similar titles from its dataset. The project combines machine learning (built in Python/Jupyter) with a modern TypeScript frontend and a Python backend API.

---

##  Features

-  **Content-Based Filtering** — Recommends movies similar to your selection using cosine similarity on TF-IDF / feature vectors
-  **Collaborative Filtering** — Suggests movies based on user behavior patterns, recommending titles that like-minded viewers have enjoyed
-  **Search & Select** — Find any movie in the dataset and instantly get recommendations
-  **Fast API Backend** — Python-powered REST API serving recommendations in real time
-  **Modern Frontend** — Built with TypeScript for a smooth, responsive user experience
-  **Exploratory Notebooks** — Jupyter notebooks documenting the ML pipeline and experiments

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Machine Learning | Python, Jupyter Notebook, scikit-learn, pandas, numpy |
| Backend | Python (FastAPI / Flask) |
| Frontend | TypeScript |
| Deployment | Vercel |

---

##  Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/sanjaydevs/Padam---Movie-Recommendations.git
cd Padam---Movie-Recommendations
```

### 2. Set up the Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 3. Set up the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. (Optional) Explore the Notebooks

```bash
cd notebooks
jupyter notebook
```
To tune the model, change the parameters in the notebook, downlaod the new pickle files and replace them in the backend/artifacts foler
---

##  How It Works

1. **Data Processing** — Movie metadata (title, genres, keywords, cast, crew) is loaded from the datasets and cleaned.
2. **Feature Engineering** — A combined feature vector is created for each movie.
3. **Vectorization** — The text features are transformed using TF-IDF or CountVectorizer.
4. **Similarity Computation** — Cosine similarity is computed between all movie vectors and stored for fast lookup.
5. **API Layer** — The backend exposes an endpoint that takes a movie title and returns the top N most similar movies.
6. **Frontend** — The TypeScript UI queries the API and displays results in an intuitive interface.

---

##  License

This project is open source. See the repository for details.

---


**Sanjay** — [@sanjaydevs](https://github.com/sanjaydevs)

---

*Made with ❤️ and a love for movies.*
