const searchField = document.getElementById('inputField');
const showimg = document.getElementById('img-show');
const message = document.getElementById('error-message');
const loadAllImage = async () => {
    document.getElementById('spinner').style.display = "block";
    const url = `https://api.unsplash.com/photos?client_id=mHoAZX7HArMpwfbIwC_clfnrCRwfXmtLwl9f88gx4fk&query`;

    const res = await fetch(url);
    const data = await res.json();
    setTimeout(() => { showimg }, 5000);
    displayImage(data);
}
loadAllImage();
const loadImage = async () => {
    const searchText = searchField;
    const searchResult = searchText.value;
    showimg.textContent = "";
    if(searchResult === ""){
        message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  Please Search Field Not Empty!!.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
setTimeout(() => { document.getElementById('error-message').style.display = 'none'; }, 5000);
    }else{
        document.getElementById('spinner').style.display = "block"
        const url = `https://api.unsplash.com/search/photos?client_id=mHoAZX7HArMpwfbIwC_clfnrCRwfXmtLwl9f88gx4fk&query=${searchResult}`;
        const res = await fetch(url);
        const data = await res.json();
        displayImage(data.results);
    }
}
const displayImage = (results) => {
    const img = showimg;
    img.textContent = "";
    message.textContent = "";
    if(results.length === 0){
        message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        No Result Found!!.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
setTimeout(() => { document.getElementById('error-message').style.display = 'none'; }, 5000);
document.getElementById('spinner').style.display = "none";
    }else{
        results.forEach(photo => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card v-100">
                    <a href="${photo.urls.full}" download><img src="${photo.urls.full}"
                        class="card-img-top" alt="${photo.alt_description}"></a>
                    <div class="card-body">
                    <h5 class="card-title">${photo.alt_description}</h5>
                </div>
                </div>`;
        img.appendChild(div);
        document.getElementById('spinner').style.display = "none";
    });
    }
}