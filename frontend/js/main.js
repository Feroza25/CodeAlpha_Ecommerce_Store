const productList = document.getElementById('product-list');

// Sample 10 products
const products = [
  { _id: "1", name: "Laptop", description: "High performance laptop", price: 1200, image: "https://via.placeholder.com/150" },
  { _id: "2", name: "Smartphone", description: "Latest model smartphone", price: 800, image: "https://via.placeholder.com/150" },
  { _id: "3", name: "Headphones", description: "Noise-cancelling headphones", price: 200, image: "https://via.placeholder.com/150" },
  { _id: "4", name: "Smartwatch", description: "Feature-packed smartwatch", price: 250, image: "https://via.placeholder.com/150" },
  { _id: "5", name: "Camera", description: "Professional DSLR camera", price: 1500, image: "https://via.placeholder.com/150" },
  { _id: "6", name: "Tablet", description: "High-resolution tablet", price: 600, image: "https://via.placeholder.com/150" },
  { _id: "7", name: "Keyboard", description: "Mechanical keyboard", price: 100, image: "https://via.placeholder.com/150" },
  { _id: "8", name: "Mouse", description: "Wireless mouse", price: 50, image: "https://via.placeholder.com/150" },
  { _id: "9", name: "Speaker", description: "Bluetooth speaker", price: 120, image: "https://via.placeholder.com/150" },
  { _id: "10", name: "Monitor", description: "4K UHD monitor", price: 400, image: "https://via.placeholder.com/150" }
];

products.forEach(product => {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <img src="${product.image}" width="150">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p>Price: $${product.price}</p>
    <button class="btn" onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

// Cart functions
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const exist = cart.find(item => item.id === id);
  if (exist) exist.quantity += 1;
  else cart.push({ id, name, price, quantity: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart`);
}
