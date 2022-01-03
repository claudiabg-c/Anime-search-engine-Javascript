"use strict";const searchText=document.querySelector(".js-searchtext"),searchBtn=document.querySelector(".js-searchbtn"),animeList=document.querySelector(".js-animelist"),favorites=document.querySelector(".js-favorites"),resetFavs=document.querySelector(".js-resetfavs");let allResults=[],favoriteAnimes=[];function handleSearchBtn(e){e.preventDefault(),searchText.value.length>=3&&fetch("https://api.jikan.moe/v3/search/anime?q="+searchText.value).then(e=>e.json()).then(e=>{allResults=e.results,getDataFromEachResult(),findItInFavorites(),giveTheColor()})}function getHtmlAnimeList(e,t,i,s){let a=`<li class="js-anime" id="${e}">`;return a+="https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620"===t||null===t?`<img src="${s}" alt="${i}">`:`<img src="${t}" alt="${i}">`,a+=`<h2 class="js-animetitle animetitle">${i}</h2>`,a+="</li>",a}function getDataFromEachResult(){animeList.innerHTML="";for(let e of allResults){const t="https://via.placeholder.com/210x295/567891/891234/?text="+e.type,i=getHtmlAnimeList(e.mal_id,e.image_url,e.title,t);animeList.innerHTML+=i;const s=document.querySelectorAll(".js-anime");for(let e of s)e.addEventListener("click",handleFavorites)}}function getHtmlFavList(e){let t=`<li class="js-favorite" id="${e.id}">`;return t+=`<img src="${e.img}" alt="${e.name}">`,t+=`<h2 class="js-animetitle animetitle">${e.name}</h2>`,t+=`<button class="js-deletebtn deletebtn" id="${e.id}">X</button>`,t+="</li>",t}function printFavorites(){favorites.innerHTML="";for(const e of favoriteAnimes)favorites.innerHTML+=getHtmlFavList(e);const e=document.querySelectorAll(".js-deletebtn");for(const t of e)t.addEventListener("click",deleteEachFavorite),t.addEventListener("click",deleteFavoriteFromLocal);""!==favorites.innerHTML&&resetFavs.classList.remove("hidden")}function handleFavorites(e){let t,i,s=e.currentTarget;const a=document.querySelectorAll(".js-anime");for(const e of favoriteAnimes)e.id===s.id&&(t=e);if(void 0===t){for(const e of a)e.id===s.id&&(s.classList.remove("notselected"),s.classList.add("selected"),i=e);favoriteAnimes.push({id:i.id,img:i.childNodes[0].currentSrc,name:i.childNodes[1].innerHTML})}else{const e=favoriteAnimes.indexOf(t);favoriteAnimes.splice(e,1),s.classList.remove("selected")}printFavorites(),saveInLocalStorage(),readLocalStorage(),giveTheColor()}function deleteEachFavorite(e){let t,i=e.currentTarget;for(const e of favoriteAnimes)e.id===i.id&&(t=e);if(t.id==t.id){const e=favoriteAnimes.indexOf(t);favoriteAnimes.splice(e,1),printFavorites()}}function saveInLocalStorage(){const e=JSON.stringify(favoriteAnimes);localStorage.setItem("favorites",e)}function readLocalStorage(){const e=localStorage.getItem("favorites");null!==e&&(favoriteAnimes=JSON.parse(e),resetFavs.classList.remove("hidden"),printFavorites(),"[]"===e&&resetFavs.classList.add("hidden"))}function findItInFavorites(){let e=JSON.parse(localStorage.getItem("favorites"));if(null!==e)for(const t of e){if(void 0!==allResults.find(e=>""+e.mal_id===t.id))return!0}return!0}function giveTheColor(){if(!0===findItInFavorites())for(const e of allResults){const t=document.getElementById(e.mal_id),i=document.querySelectorAll(".js-anime");for(const e of i)e.classList.add("selected");t.classList.add("notselected")}}function deleteFavoriteFromLocal(e){let t,i=e.currentTarget,s=JSON.parse(localStorage.getItem("favorites"));for(const e of s)if(e.id===i.id){t=e;let i=s.indexOf(t);s.splice(i,1);const a=JSON.stringify(s);localStorage.setItem("favorites",a)}readLocalStorage(),giveTheColor()}function handleResetFavorites(){favorites.innerHTML="",favoriteAnimes=[],localStorage.removeItem("favorites"),resetFavs.classList.add("hidden"),giveTheColor()}searchBtn.addEventListener("click",handleSearchBtn),readLocalStorage(),resetFavs.addEventListener("click",handleResetFavorites);