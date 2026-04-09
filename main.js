$(document).ready(function() {
    // --- Slider Logic ---
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
    let autoSlideInterval;

    function updateSlider() {
        const leftIndex = (currentSlide - 1 + slides.length) % slides.length;
        const rightIndex = (currentSlide + 1) % slides.length;

        const $content = $('#slider-content');

        // Fade out content
        $content.css({ opacity: '0', transform: 'translateY(20px)' });

        setTimeout(() => {
            // Update images
            $('#slider-left-img').attr('src', slides[leftIndex].image);
            $('#slider-right-img').attr('src', slides[rightIndex].image);
            $('#slider-main-img').attr('src', slides[currentSlide].image);

            // Update content
            $('#slider-tag').text(slides[currentSlide].tag);
            $('#slider-title').html(slides[currentSlide].title);
            $('#slider-desc').text(slides[currentSlide].desc);

            // Update dots
            updateDots();

            // Fade in content
            $content.css({ opacity: '1', transform: 'translateY(0)' });
        }, 300); // Matches transition duration
    }

    function updateDots() {
        const $dotsContainer = $('#slider-dots');
        $dotsContainer.empty();

        $.each(slides, function(index) {
            const $dot = $('<button></button>');
            if (index === currentSlide) {
                $dot.addClass("w-8 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(107,33,168,0.8)] transition-all");
            } else {
                $dot.addClass("w-2 h-2 bg-white/30 rounded-full hover:bg-white/60 transition-all cursor-pointer");
                $dot.on('click', function() {
                    currentSlide = index;
                    updateSlider();
                    resetAutoSlide();
                });
            }
            $dotsContainer.append($dot);
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event Listeners for Slider Controls
    $('#slider-prev').on('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
        resetAutoSlide();
    });

    $('#slider-next').on('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
        resetAutoSlide();
    });

    // Initialize Slider
    updateDots();
    startAutoSlide();


    // --- Modal Logic ---
    const $modal = $('#game-modal');
    const $modalBox = $('#game-modal-content-box');

    function openModal(imgSrc, title, genre, rating, price) {
        // Populate data
        $('#modal-img').attr('src', imgSrc);
        $('#modal-title').text(title);
        $('#modal-genre').text(genre);
        $('#modal-rating').text(rating);
        $('#modal-price').text(price);

        // Show modal
        $modal.removeClass('opacity-0 pointer-events-none');
        $modalBox.removeClass('scale-95').addClass('scale-100');
        $('body').css('overflow', 'hidden'); // Prevent scrolling
    }

    function closeModal() {
        $modal.addClass('opacity-0 pointer-events-none');
        $modalBox.removeClass('scale-100').addClass('scale-95');
        $('body').css('overflow', 'auto'); // Re-enable scrolling
    }

    // Add click events to close modal
    $('#close-modal, #game-modal-backdrop').on('click', closeModal);

    // Add click events to game cards
    $('.group.relative.bg-surface.rounded-2xl.overflow-hidden.cursor-pointer').on('click', function() {
        const $card = $(this);
        const imgSrc = $card.find('img').attr('src');
        const rating = $card.find('.fa-star + span').text();
        const title = $card.find('h3').text();
        const genre = $card.find('p.text-gray-400').text();
        const price = $card.find('.text-cyan-400.font-bold').text();

        openModal(imgSrc, title, genre, rating, price);
    });
});
