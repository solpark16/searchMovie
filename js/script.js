const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzU4ZDNlODFhZjUxNDU5ZDNhNDJmZjJjMDE3ZjVlYyIsInN1YiI6IjYyZjMxY2E1NDFhZDhkMDA3ZjMxMWNmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uEAmzrjpZHVROK1Q8v-2CrZwOUVliBuAOitOPcPj6NI"
  }
};

const movieCardBox = document.querySelector(".movieCardBox");
const movieListBox = document.querySelector(".movieListBox");

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json())
  .then((response) => {
    let results = response.results;
    for (let i = 0; i < results.length; i++) {
      // 변수에 i번째 요소 넣기
      let title = results[i].title;
      let overview = results[i].overview;
      let voteAverage = results[i].vote_average;
      let posterPath = results[i].poster_path;
      let id = results[i].id;

      // 카드 제작 및 넣기
      let movieCard = document.createElement("li");
      movieCard.className = "movieCard";
      movieCard.id = `${id}`;
      movieCard.innerHTML = `
                <img class="movieImage" src="https://image.tmdb.org/t/p/original${posterPath}" alt="">
                <p class="movieTitle">${title}</p>
                <p class="movieOverview">${overview}</p>
                <p class="movieAverage">Rating : ${voteAverage.toFixed(2)}/10</p>
            `;
      movieCardBox.appendChild(movieCard);

      // 좌측 공간에 제목 넣기
      let movieList = document.createElement("li");
      movieList.className = "movieList";
      movieList.id = `${id}`;
      movieList.innerHTML = `${title}`;
      movieListBox.appendChild(movieList);
    }
    // const movieCardBox = document.querySelector(".movieCardBox");
    const movieCardList = document.querySelectorAll(".movieCard");
    // 카드 클릭 시 알럿 기능
    function clickMovieCard(event) {
      if (event.target === movieCardBox) return;
      if (event.target.matches(".movieCard")) {
        alert("이 영화의 ID는 " + event.target.id + "입니다!");
      } else {
        alert("이 영화의 ID는 " + event.target.parentNode.id + "입니다!");
      }
    }
    movieCardBox.addEventListener("click", () => {
      clickMovieCard(event);
    });

    // 리스트 클릭 시 해당 카드 나오는 기능
    function clickMovieList(event) {
      event.stopPropagation();
      const clickedList = [...movieCardList].forEach((item) => {
        item.style.display = "none";
        if (item.id === event.target.id) {
          item.style.display = "block";
        }
      });
    }

    document.querySelectorAll(".movieList").forEach((item) => {
      item.addEventListener("click", clickMovieList);
    });

    // 검색 기능
    const searchForm = document.querySelector(".search");
    const searchInput = document.querySelector("#searchInput");

    searchInput.focus();

    function clickSearchBtn() {
      const searchValue = document.querySelector("#searchInput").value.toLowerCase();
      const searchFilter = [...movieCardList].filter((item) => {
        item.style.display = "none";
        const title = item.querySelector(".movieTitle").innerHTML.toLowerCase();
        let searchResult = title.indexOf(searchValue);
        return searchResult !== -1;
      });
      if (searchFilter.length === 0) {
        alert("검색 결과가 없습니다.");
      }
      for (let i = 0; i < searchFilter.length; i++) {
        searchFilter[i].style.display = "block";
      }
    }
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clickSearchBtn(event);
    });
  })
  .catch((err) => console.error(err));
