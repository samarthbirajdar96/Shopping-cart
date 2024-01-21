const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];
  
  const productsList = document.getElementById('productsList');
  const cartList = document.querySelector('.cart-list');
  const emptyCartMsg = document.getElementById('emptyCartMsg');
  const cartTotal = document.getElementById('cartTotal');
  
  // Initialize products list
  Products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.className = 'product-item';
    listItem.innerHTML = `
    
      ${product.name}

      <span class="info">${product.price}</span>
        <button id="btn" onclick="addToCart(${product.id})">+ </button>
        <span id="productCount${product.id}">0</span>
        <button id="bt" onclick="removeFromCart(${product.id})">- </button>
   
    `;
    productsList.appendChild(listItem);
  });
  
  // Initialize cart
  let cart = [];
  
  function addToCart(productId) {
    const product = Products.find(p => p.id === productId);
    if (product) {
      const existingCartItem = cart.find(item => item.id === productId);
      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCartUI();
    }
  }
  
  function removeFromCart(productId) {
    const existingCartItem = cart.find(item => item.id === productId);
    if (existingCartItem) {
      existingCartItem.quantity--;

      const productCountSpan = document.getElementById(`productCount${productId}`);
        if (productCountSpan) {
            productCountSpan.textContent = existingCartItem.quantity;
        }

      if (existingCartItem.quantity === 0) {
        cart = cart.filter(item => item.id !== productId);
      }
      updateCartUI();
    }
  }
  
  function updateCartUI() {
    emptyCartMsg.style.display = cart.length === 0 ? 'block' : 'none';
    cartList.innerHTML = '';
    let total = 0;
  
    cart.forEach(item => {
      const listItem = document.createElement('li');
      listItem.className = 'cart-item';
      listItem.innerHTML = `
        <span>${item.name}</span>
        <span> ${item.quantity}x${item.price}</span>
      `;
      cartList.appendChild(listItem);
      total += item.price * item.quantity;
  
      // Update product count next to buttons
      const productCountSpan = document.getElementById(`productCount${item.id}`);
      if (productCountSpan) {
        productCountSpan.textContent = item.quantity;
      }
    });
  
    cartTotal.textContent = total;
  }