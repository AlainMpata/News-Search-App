const apiKey = "7db671b637a14d41a8cd586d32b796d5";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById ('search-input');
const searchButton = document.getElementById ('search-button');
const searchInput = document.getElementById ('search-input');

async function fecthRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    }catch(error){
        console.error("Error fecthing random news", error);
        return [];
    }
}
// For button click
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== ""){
        try{
            const articles = await fecthNewsQuery (query)
            displayBlogs(articles)
        }catch (error){
            console.log("Error fetching news by query", error)
        }
    }
})

// For Enter key press in input field
searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // optional: prevents form submission if inside a form
        const query = searchField.value.trim();
        if (query !== "") {
            try {
                const articles = await fecthNewsQuery(query);
                displayBlogs(articles);
            } catch (error) {
                console.log("Error fetching news by query", error);
            }
        }
    }
});

async function fecthNewsQuery (query) {
  try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    }catch(error){
        console.error("Error fecthing random news", error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement ("img");
        //img.src = article.urlToImage;
        if (article.urlToImage) {
    img.src = article.urlToImage;
} else {
    img.style.display = "none"; // or use a placeholder image
   
}
        img.alt = article.title;
        const title = document.createElement ("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + "..." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement ("p")
        const truncatedDes = article.title.length > 160 ? article.description.slice(0,160) + "..." : article.description;
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => { window.open(article.url, "-blank");

        });

        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fecthRandomNews ();
        displayBlogs(articles); 

    } catch (error){
        console.error("Error fetching random news", error);
    }
}) ();