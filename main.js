const slides = [
    {
        image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2019&auto=format&fit=crop",
        tag: "NEW RELEASE",
        title: "VALOR'S PATH:<br>ELDER SCROLLS",
        desc: "Embark on an epic journey through ancient lands. Master the arts of combat and magic in this groundbreaking RPG experience that redefines the genre."
    },
    {
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
        tag: "FEATURED",
        title: "CYBER CORE:<br>NEON DREAMS",
        desc: "Dive into a dystopian future where humanity and technology intertwine. Uncover the secrets of the mega-corporations in this thrilling cyberpunk adventure."
    },
    {
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
        tag: "TOP SELLER",
        title: "STELLAR<br>HORIZONS",
        desc: "Explore the vast reaches of space, build your fleet, and conquer new worlds in this expansive sci-fi strategy epic."
    }
];

let currentSlide = 0;

function updateSlider() {
    const leftIndex = (currentSlide - 1 + slides.length) % slides.length;
    const rightIndex = (currentSlide + 1) % slides.length;

    const leftImg = document.getElementById('slider-left-img');
    const rightImg = document.getElementById('slider-right-img');
    const mainImg = document.getElementById('slider-main-img');
    const content = document.getElementById('slider-content');

    // Fade out content
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';

    setTimeout(() => {
        // Update images
        leftImg.src = slides[leftIndex].image;
        rightImg.src = slides[rightIndex].image;
        mainImg.src = slides[currentSlide].image;

        // Update content
        document.getElementById('slider-tag').innerText = slides[currentSlide].tag;
        document.getElementById('slider-title').innerHTML = slides[currentSlide].title;
        document.getElementById('slider-desc').innerText = slides[currentSlide].desc;

        // Update dots
        updateDots();

        // Fade in content
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 300); // Matches transition duration
}

function updateDots() {
    const dotsContainer = document.getElementById('slider-dots');
    dotsContainer.innerHTML = '';

    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        if (index === currentSlide) {
            dot.className = "w-8 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(107,33,168,0.8)] transition-all";
        } else {
            dot.className = "w-2 h-2 bg-white/30 rounded-full hover:bg-white/60 transition-all cursor-pointer";
            dot.onclick = () => {
                currentSlide = index;
                updateSlider();
            };
        }
        dotsContainer.appendChild(dot);
    });
}

// Event Listeners
document.getElementById('slider-prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
});

document.getElementById('slider-next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
});

// Initialize
updateDots();

// Auto slide
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}, 5000);

// --- Modal Logic ---

const modal = document.getElementById('game-modal');
const modalBox = document.getElementById('game-modal-content-box');
const closeModalBtn = document.getElementById('close-modal');
const modalBackdrop = document.getElementById('game-modal-backdrop');

function openModal(imgSrc, title, genre, rating, price) {
    // Populate data
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-genre').innerText = genre;
    document.getElementById('modal-rating').innerText = rating;
    document.getElementById('modal-price').innerText = price;

    // Show modal
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-95');
    modalBox.classList.add('scale-100');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Add click events to close modal
closeModalBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Add click events to game cards
document.addEventListener('DOMContentLoaded', () => {
    const gameCards = document.querySelectorAll('.group.relative.bg-surface.rounded-2xl.overflow-hidden.cursor-pointer');

    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.querySelector('img').src;
            const rating = card.querySelector('.fa-star + span').innerText;
            const title = card.querySelector('h3').innerText;
            const genre = card.querySelector('p.text-gray-400').innerText;
            const price = card.querySelector('.text-cyan-400.font-bold').innerText;

            openModal(imgSrc, title, genre, rating, price);
        });
    });
});
