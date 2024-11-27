const API_KEY = "6c273fcb2a95445a8f44877d43367af8";
let newsList = [];
const menus = document.querySelectorAll(".menus button");

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("ddd", data);
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("NO result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
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
      (news) => `<div class="row news">
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

const errorRender = (errorMessage) => {
  const errorHTML = ` <div class="alert alert-danger" rol="alert">
    ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

getLatestNews();

const paginationRender = () => {
  // totalResults,
  // page,
  // pageSize,
  // groupSize,

  // pageGroup,
  const pageGroup = Math.ceil(page / groupSize);
  // lastPage
  const lastPage = pageGroup * groupSize;
  // firstPage
  const firstPage = lastPage - (groupSize - 1);

  let paginationHTML = ``;

  for (let i = firstPage; i < lastPage; i++) {
    paginationHTML += `<li class="page-item">
        <a class="page-link" href="#">
          ${i}
        </a>
      </li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
  // <nav aria-label="Page navigation example">
  //   <ul class="pagination">
  // <li class="page-item">
  //   <a class="page-link" href="#">
  //     Previous
  //   </a>
  //     </li>
  // <li class="page-item">
  //   <a class="page-link" href="#">
  //     1
  //   </a>
  // </li>
  //     <li class="page-item">
  //       <a class="page-link" href="#">
  //         2
  //       </a>
  //     </li>
  //     <li class="page-item">
  //       <a class="page-link" href="#">
  //         3
  //       </a>
  //     </li>
  //     <li class="page-item">
  //       <a class="page-link" href="#">
  //         Next
  //       </a>
  //     </li>
  //   </ul>
  // </nav>;
};

// 1. 버튼들에 클릭이벤트주기
// 2. 카테고리별 뉴스가져오기
// 3. 그 뉴스를 보여주기

// 페이지네이션
// pageSize(한 페이지에 보여줄 데이터 갯수 ) = 20
// page(현재 어떤 페이지를 보고 있는지) = 3
// totalResults(전체 데이터 총 갯수) = 101

// 상황예시
// totalResults = 101
// pageSize = 10
// page = 3
// groupSize(페이지네이션을 5개씩만 보여줄것이다) = 5
// totalPage = totalResults / pageSize = 10.1개 올림해서 11개
// pageGroup(내가 속해있는 페이지그룹) = page / groupSize = 속한 그룹
