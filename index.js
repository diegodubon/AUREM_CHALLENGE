const searchInput = document.getElementById("search-input");
window.onload = function() {
  searchReddit("funny").then(data => {
    let resultDiv = "";
    data.forEach(post => {
      const image = post.preview
        ? post.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
      resultDiv += `  
      <div class="col-sm-4 col-md-12">
        <div class="card-columns">
          <div" class="card center-post">
            <div class="card-body">
            <img style="width:90px; height:90px;" src="${image}" alt="Card image cap">
              <h5 class="card-title">${post.author}</h5>
              <p class="card-text">${post.title}</p>
              <i class="far fa-comment"></i>${post.num_comments} 
              <i class="fas fa-heart"></i>${post.ups} 
              <i class="fas fa-arrow-down"></i>${post.downs}
              </div>
            </div>
          </div>
    </div>`;
    });
    // resultDiv += `</div>`;
    document.getElementById("results").innerHTML = resultDiv;
  });
};
searchInput.addEventListener(
  "keypress",
  function(e) {
    const searchTerm = e.target.value;

    if (searchTerm == "" || searchTerm == null) {
      searchReddit("funny").then(data => console.log(data));
    } else {
      searchReddit(searchTerm).then(results => {
        // let resultDiv = '<div class="card-columns">';

        let resultDiv = "";
        results.forEach(post => {
          const image = post.preview
            ? post.preview.images[0].source.url
            : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
          resultDiv += `  
            <div class="card-columns">
              <div" class="card center-post">
              
                <div class="card-body">
                <img style="width:90px; height:90px;" src="${image}" alt="Card image cap">
                  <h5 class="card-title">${post.author}</h5>
                  <p class="card-text">${post.title}</p>
                  <i class="far fa-comment"></i> ${post.num_comments} 
                  <i class="fas fa-heart"></i> ${post.ups} 
                  <i class="fas fa-arrow-down"></i>${post.downs}
                </div>
              </div>
        </div>`;
        });
        // resultDiv += `</div>`;
        document.getElementById("results").innerHTML = resultDiv;
      });
      // .catch(err => {});
    }
  },
  false
);

function searchReddit(searchTerm) {
  return fetch(`https://www.reddit.com/search.json?q=${searchTerm}`, {
    mode: "cors"
  })
    .then(response => response.json())
    .then(data => data.data.children.map(data => data.data))
    .catch(err => console.log(err));
}
