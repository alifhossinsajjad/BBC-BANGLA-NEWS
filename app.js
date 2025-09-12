const categoryContainer = document.getElementById("categoryContainer");

const newsContainer = document.getElementById("newsContainer");

const bookmarkContainer = document.getElementById("bookmarkContainer");

const bookmarkcount = document.getElementById("bookmarkcount");

let bookmarks = [];

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCatergory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCatergory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
            <li id="${cat.id}" class="hover:border-b-5 border-red-500 cursor-pointer">${cat.title}</li>
            
            `;
  });

  categoryContainer.addEventListener("click", (e) => {
    const allli = document.querySelectorAll("li");
    allli.forEach((li) => {
      li.classList.remove("border-b-5");
    });
    if (e.target.localName === "li") {
      e.target.classList.add("border-b-5");
      loadNewsByCategory(e.target.id);
    }
  });
};

const loadNewsByCategory = (categoryId) => {
  // console.log(categoryId);
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      showNewsByCategory(data.articles);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showNewsByCategory = (articles) => {
  console.log(articles);
  newsContainer.innerHTML = " ";
  articles.forEach((article) => {
    newsContainer.innerHTML += `
        <div class ="">
        <div >
            <img src="${article.image.srcset[5].url}" alt ="">
        </div>
        <div id ="${article.id}" class="p-3">
        <h1 class="text-2xl mt-2">${article.title}
        </h1>
        <p>${article.time}</P>
        <button class ="btn m-3">Bookmark</Button>
        </div>
        </div>
        
        `;
  });
};

newsContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Bookmark") {
    handleBookmarks(e)
  }
});

const handleBookmarks = (e) => {
  const title = e.target.parentNode.children[0].innerText;

  const id = e.target.parentNode.id;

  bookmarks.push({
    title: title,
    id: id,
  });
  
  showBookmarks(bookmarks);
};

const showBookmarks = (bookmarks) => {
  bookmarkContainer.innerHTML = "";
  bookmarks.forEach(bookmark => {
    bookmarkContainer.innerHTML += `
    <div class= "border rounded-xl my-2 p-4 flex">
    <h1>${bookmark.title}</h1>
    <button onclick="deltetHandleBookmarks('${bookmark.id}')" class="cursor-pointer"><i class="fa-solid fa-xmark" style="color: #ff0000;"></i></button>
     </div>
    `
  })

  bookmarkcount.innerHTML = bookmarks.length
}


const deltetHandleBookmarks = (bookmarkId) => {
  console.log(bookmarkId);
  const filterBookmarks = bookmarks.filter(bookmarks => bookmarks.id !== bookmarkId)
  bookmarks = filterBookmarks ;
  showBookmarks(bookmarks);

}

loadCategory();
loadNewsByCategory("main");
showBookmarks();

// 2nd way to fetch api with async await funciton

// const loadCategoryAsync = async () => {
//     try{
//         const res = fetch("https://news-api-fs.vercel.app/api/categories");
//         const data = (await res).json();
//         console/log(data)
//     }
//     catch (error){
//         console.log(error);
//     }
// };
