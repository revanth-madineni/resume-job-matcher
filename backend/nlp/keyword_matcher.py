from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def cosine_score(text_a: str, text_b: str) -> float:
    """Return cosine similarity [0, 1] between two documents."""
    if not text_a.strip() or not text_b.strip():
        return 0.0
    vec = TfidfVectorizer(stop_words="english")
    tfidf = vec.fit_transform([text_a, text_b])
    score = cosine_similarity(tfidf[0], tfidf[1])[0][0]
    return float(score)
