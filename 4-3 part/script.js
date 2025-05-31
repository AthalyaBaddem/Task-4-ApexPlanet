// Sample product data array
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'electronics',
    price: 79.99,
    rating: 4.5,
    image: 'https://images-na.ssl-images-amazon.com/images/I/71KplMgfSIL._AC_SL1500_.jpg'
  },
  {
    id: 2,
    name: 'Smartwatch',
    category: 'electronics',
    price: 149.99,
    rating: 4.2,
    image: 'https://tse2.mm.bing.net/th?id=OIP.WGOZNjuNIvkVixSj9rQBcAHaIs&pid=Api&P=0&h=180'
  },
  {
    id: 3,
    name: 'Men’s T-Shirt',
    category: 'clothing',
    price: 19.99,
    rating: 4.0,
    image: 'https://i5.walmartimages.com/asr/8f824291-cde7-475f-a092-4af43f3f2109_1.928d8edb6624da7ad080a30744a466ed.jpeg'
  },
  {
    id: 4,
    name: 'Women’s Jacket',
    category: 'clothing',
    price: 59.99,
    rating: 4.7,
    image: 'https://i5.walmartimages.com/asr/5ae5fcd7-ab4b-4b66-b3cd-9dc4c282bb90.43ca4a768015c0ca35a9ace9ead5fe55.jpeg'
  },
  {
    id: 5,
    name: 'Classic Novel',
    category: 'books',
    price: 12.5,
    rating: 4.9,
    image: 'https://i.dailymail.co.uk/1s/2022/03/02/01/54828855-0-image-a-3_1646184600349.jpg'
  },
  {
    id: 6,
    name: 'Cooking Recipe Book',
    category: 'books',
    price: 22.0,
    rating: 4.3,
    image: 'https://tse1.mm.bing.net/th?id=OIP.T8fuvSFJYwYpcfJKy82cdQHaHa&pid=Api&P=0&h=180'
  }
];

const productsGrid = document.getElementById('productsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const sortBy = document.getElementById('sortBy');

// Initial render
window.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
});

// Filter & sort event listeners
categoryFilter.addEventListener('change', handleFilterSort);
sortBy.addEventListener('change', handleFilterSort);

function handleFilterSort() {
  let filtered = [...products];

  // 1. Filter by category
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  // 2. Sort
  const sortValue = sortBy.value;
  if (sortValue === 'priceAsc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'priceDesc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortValue === 'ratingDesc') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filtered);
}

function renderProducts(list) {
  productsGrid.innerHTML = '';

  if (list.length === 0) {
    productsGrid.innerHTML = '<p>No products found.</p>';
    return;
  }

  list.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    // Image
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.classList.add('product-image');

    // Info container
    const info = document.createElement('div');
    info.classList.add('product-info');

    const title = document.createElement('h3');
    title.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = `$${product.price.toFixed(2)}`;
    price.classList.add('price');

    const rating = document.createElement('p');
    rating.textContent = `⭐ ${product.rating.toFixed(1)}`;
    rating.classList.add('rating');

    const btn = document.createElement('button');
    btn.textContent = 'Add to Cart';

    info.appendChild(title);
    info.appendChild(price);
    info.appendChild(rating);
    info.appendChild(btn);

    card.appendChild(img);
    card.appendChild(info);

    productsGrid.appendChild(card);
  });
}
