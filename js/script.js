const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzU4ZDNlODFhZjUxNDU5ZDNhNDJmZjJjMDE3ZjVlYyIsInN1YiI6IjYyZjMxY2E1NDFhZDhkMDA3ZjMxMWNmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uEAmzrjpZHVROK1Q8v-2CrZwOUVliBuAOitOPcPj6NI'
    }
};

const movieCardBox = document.querySelector(".movieCardBox");
console.log(movieCardBox);

fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options)
    .then(response => response.json())
    .then(response => {
        let results = response.results;
        for (let i = 0; i < results.length; i++) {
            let title = results[i].title;
            let overview = results[i].overview;
            let voteAverage = results[i].vote_average;
            let posterPath = results[i].poster_path;
            let id = results[i].id;

            let movieCard = document.createElement('li');
            movieCard.className = 'movieCard';
            movieCard.id = `${id}`
            movieCard.innerHTML = `
                <img class="movieImage" src="https://image.tmdb.org/t/p/original${posterPath}" alt="">
                <p class="movieTitle">${title}</p>
                <p class="movieOverview">${overview}</p>
                <p class="movieAverage">Rating : ${voteAverage}</p>
            `
            movieCardBox.appendChild(movieCard);
        }

        function clickMovieCard(event) {
            event.stopPropagation()
            console.log(event.target.id)
            if (event.target.id == ''){
                alert('이 영화의 ID는 '+ event.target.closest('.movieCard').id + '입니다!');
            } else {
                alert('이 영화의 ID는 '+ event.target.id + '입니다!')
            }
        }
        document.querySelectorAll(".movieCard").forEach((item) => {
            item.addEventListener("click", clickMovieCard);

        });

        // 검색 기능
        const searchBtn = document.querySelector("#searchBtn");
        const searchInput = document.querySelector("#searchInput");
        const movieCardList = document.querySelectorAll(".movieCard");
        searchInput.focus();
        
        function clickSearchBtn(){
            const searchValue = document.querySelector('#searchInput').value.toLowerCase();
            const searchFilter = [...movieCardList].filter((item)=>{
                item.style.display='none';
                const title = item.querySelector('.movieTitle').innerHTML.toLowerCase();
                let searchResult = title.indexOf(searchValue);
                return searchResult !== -1;
            })
            for (let i=0; i<searchFilter.length; i++){
                searchFilter[i].style.display = 'block';
            }
        }
        searchBtn.addEventListener("click", clickSearchBtn);
        searchInput.addEventListener("keyup", function (event){
            if (event.keyCode === 13){
                clickSearchBtn()
            }
        })

    })
    .catch(err => console.error(err));