const API_KEY = "6c273fcb2a95445a8f44877d43367af8";
let newsList = [];
const menus = document.querySelectorAll(".menus button");

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
);

const getNews = async () => {
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

const getLatestNews = async () => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  );
  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => ` <div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src=${news.urlToImage}
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}다</h2>
            <p>${news.description}</p>
            <div>${news.source.name} * ${news.publishedAt}</div>
          </div>
        </div>`
    )
    .join(" ");

  document.getElementById("news-board").innerHTML = newsHTML;
};
getLatestNews();

// 1. 버튼들에 클릭이벤트주기
// 2. 카테고리별 뉴스가져오기
// 3. 그 뉴스를 보여주기
