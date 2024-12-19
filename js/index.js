var productsGrid = document.getElementById('productsGrid');

if (productsGrid) {
    fetch('https://fakestoreapi.com/products')
    .then(function(response){return response.json()})
    .then(function(data){
        var htmlCollection = ``;
        for (const product of data) {
            htmlCollection+=`<div class="col-md-3">
                    <div class="card m-auto" style="width: 18rem;">
                        <img height="200" src="${product.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title"><a href="#">${product.title.slice(0,20)}</a></h5>
                          <p class="card-text">${product.description.slice(0,20)}</p>
                          <div class="d-flex justify-content-between align-items-center">
                            <span>${product.price}$</span>
                            <button type="button" class="btn bg-transparent border-0"><i class="fa-solid fa-cart-plus"></i></button>
                          </div>
                          <div class="text-center">
                          <button data-product-id="${product.id}" type="button" class="btn text-uppercase quickViewBtn" style="background-color:#98CE00" data-bs-toggle="modal" data-bs-target="#quickViewProductModal">quick view</button>
                          </div>
                        </div>
                    </div>
                </div>`
        }
        productsGrid.innerHTML = htmlCollection;

        let quickViewBtns = document.querySelectorAll('.quickViewBtn');

        quickViewBtns.forEach(function(btn){
            btn.addEventListener('click',function(e){
                var productId = e.target.dataset.productId;

                fetch(`https://fakestoreapi.com/products/${productId}`)
                .then(function(response){return response.json()})
                .then(function(product){
                    
                    var modalBody = document.querySelector('.modal-body');

                    modalBody.innerHTML = `<div class="row flex-column-reverse flex-sm-row">
                <div class="col-md-6">
                    <div>
                        <h2>${product.title}</h2>
                        <p class="lead">${product.description}</p>
                        <h3>${product.price}</h3>
                        <div>
                            <button type="button" class="btn" style="background-color:#98CE00"><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div>
                        <img src="${product.image}" alt="image" class="w-100 img-fluid">
                    </div>
                </div>
            </div>`
                    
                })
                
                
            })
        })
        
    })
}
