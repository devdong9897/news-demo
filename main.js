const API_KEY = "6c273fcb2a95445a8f44877d43367af8";
let news = [];

const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log(news);
};

getLatestNews();
