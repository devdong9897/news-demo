const API_KEY = "6c273fcb2a95445a8f44877d43367af8";

const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
};

getLatestNews();
