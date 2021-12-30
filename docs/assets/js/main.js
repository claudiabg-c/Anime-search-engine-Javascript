"use strict";const searchText=document.querySelector(".searchtext"),searchBtn=document.querySelector(".searchbtn"),animeList=document.querySelector(".animelist"),favorites=document.querySelector(".favorites"),favsInLocal=document.querySelector(".favsinlocal");let allResults=[],favoriteAnimes=[],favoritesInLocal=[];function handleSearchBtn(e){e.preventDefault(),searchText.value.length>=3&&fetch("https://api.jikan.moe/v3/search/anime?q="+searchText.value).then(e=>e.json()).then(e=>{allResults=e.results,paintResults()})}function paintResults(){animeList.innerHTML="";for(let e of allResults)"https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620"===e.image_url?animeList.innerHTML+=`<li class="anime" id="${e.mal_id}"><img src="https://via.placeholder.com/210x295/567891/891234/?text=${e.type}" alt="${e.title}"><h2 class="animetitle">${e.title}</h2></li>`:animeList.innerHTML+=`<li class="anime" id="${e.mal_id}"><img src="${e.image_url}" alt="${e.title}"><h2 class="animetitle">${e.title}</h2></li>`;getFavorite()}function getFavorite(){const e=document.querySelectorAll(".anime");for(const l of e){function t(){"pink"===l.style.backgroundColor?(l.style.backgroundColor="grey",l.style.border="10px solid grey",l.style.color="pink"):(l.style.backgroundColor="pink",l.style.border="10px solid pink",l.style.color="grey")}function n(e){let t=e.currentTarget;if("grey"===l.style.backgroundColor)favoriteAnimes.push(`<li class="favorite">${t.innerHTML}<button class="deletebtn">X</button></li>`);else{const e=favoriteAnimes.indexOf(""+t.innerHTML);favoriteAnimes.splice(e,1)}favorites.innerHTML=""+favoriteAnimes,favorites.style.color="#891234",localStorage.setItem("favs",JSON.stringify(favoriteAnimes)),getDeleteBtn()}l.style.backgroundColor="pink",l.style.color="grey",l.style.border="10px solid pink",l.addEventListener("click",t),l.addEventListener("click",n)}}function getDeleteBtn(){const e=document.querySelectorAll(".favorite");for(let n of e){function t(){n.innerHTML=""}n.addEventListener("click",t)}}const savedFavs=JSON.parse(localStorage.getItem("favs"));favoritesInLocal=savedFavs,favsInLocal.innerHTML=favoritesInLocal,favsInLocal.style.color="#891234",searchBtn.addEventListener("click",handleSearchBtn);