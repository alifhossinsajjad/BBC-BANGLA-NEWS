
const categoryContainer = document.getElementById("categoryContainer")


const loadCategory = () => {
    fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res)=>res.json())
    .then((data) => {
        const categories = data.categories
        showCatrgory(categories);
       
    })
    .catch((err) => {
        console.log(err);
    });
    
}


const showCatrgory = (categories) =>{
    categories.forEach(cat => {
            categoryContainer.innerHTML +=`
            <li id="${cat.id}" class="hover:border-b-5 border-red-500 cursor-pointer">${cat.title}</li>
            
            `
        });

        categoryContainer.addEventListener("click", (e) => {
            const allli = document.querySelectorAll('li');
            allli.forEach(li => {
                li.classList.remove("border-b-5")
            })
            if(e.target.localName === 'li'){
                e.target.classList.add("border-b-5")
            }
        })
}







loadCategory();





















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
