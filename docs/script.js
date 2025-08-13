document.addEventListener("DOMContentLoaded", function() {


    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        // Agar 50 pixels se zyada scroll kiya hai
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- NAVBAR ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Dropdown toggle for mobile
    const dropdownToggles = document.querySelectorAll('.nav-item > a:has(+ .dropdown)');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                e.preventDefault();
                const parentItem = toggle.parentElement;
                parentItem.classList.toggle('active');
            }
        });
    });

    // --- HERO CAROUSEL ---
    const carouselData = [
        { title: "SAVINGS ACCOUNTS", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cupiditate suscipit, magnam libero velit esse sapiente officia inventore!" },
        { title: "BANKING SOLUTIONS", text: "A small river named Duden flows by their place and supplies it with the necessary regelialia." },
        { title: "FINANCING SOLUTIONS", text: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life." }
    ];
    const carouselTitle = document.getElementById('carousel-title');
    const carouselText = document.getElementById('carousel-text');
    const carouselIndicators = document.querySelectorAll('.text-carousel-section .indicator');
    let heroCurrentIndex = 0;

    function updateHeroCarousel() {
        const content = document.querySelector('.carousel-content');
        content.style.opacity = '0';

        setTimeout(() => {
            heroCurrentIndex = (heroCurrentIndex + 1) % carouselData.length;
            carouselTitle.textContent = carouselData[heroCurrentIndex].title;
            carouselText.textContent = carouselData[heroCurrentIndex].text;

            carouselIndicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === heroCurrentIndex);
            });

            content.style.opacity = '1';
        }, 500);
    }
    if (carouselTitle) {
      setInterval(updateHeroCarousel, 5000);
    }

    // --- GALLERY ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        });
    });

    if (lightbox) {
        lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // --- HOW IT WORKS SLIDER ---
    const worksSlides = document.querySelectorAll('.works-slide');
    const worksPrev = document.getElementById('works-prev');
    const worksNext = document.getElementById('works-next');
    let worksCurrentSlide = 0;

    function showWorksSlide(index) {
        worksSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    if (worksSlides.length > 0) {
        worksNext.addEventListener('click', () => {
            worksCurrentSlide = (worksCurrentSlide + 1) % worksSlides.length;
            showWorksSlide(worksCurrentSlide);
        });
        worksPrev.addEventListener('click', () => {
            worksCurrentSlide = (worksCurrentSlide - 1 + worksSlides.length) % worksSlides.length;
            showWorksSlide(worksCurrentSlide);
        });
        showWorksSlide(0);
    }

    // --- TESTIMONIALS SLIDER ---
    const testimonialsData = [
        { name: "Robert Spears", quote: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life...", img: "https://preview.colorlib.com/theme/banker/images/person_1.jpg.webp" },
        { name: "Bruce Rogers", quote: "The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli...", img: "https://preview.colorlib.com/theme/banker/images/person_2.jpg.webp" },
        { name: "John Smith", quote: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", img: "https://preview.colorlib.com/theme/banker/images/person_3.jpg.webp" },
    ];

    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const testimonialsDots = document.querySelector('.testimonials-dots');
    let testimonialCurrentIndex = 0;
    
    if (testimonialsWrapper) {
        testimonialsData.forEach((testimonial, index) => {
            // Create Card
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <blockquote>"${testimonial.quote}"</blockquote>
                <div class="testimonial-author">
                    <img src="${testimonial.img}" alt="${testimonial.name}">
                    <span>${testimonial.name}</span>
                </div>
            `;
            testimonialsWrapper.appendChild(card);
            
            // Create Dot
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(index));
            testimonialsDots.appendChild(dot);
        });

        const dots = testimonialsDots.querySelectorAll('.dot');
        function showTestimonial(index) {
            testimonialsWrapper.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            testimonialCurrentIndex = index;
        }

        setInterval(() => {
            let nextIndex = (testimonialCurrentIndex + 1) % testimonialsData.length;
            showTestimonial(nextIndex);
        }, 6000);
    }

    // --- FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    // --- CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const fields = [
                { id: 'firstName', name: 'First Name' },
                { id: 'lastName', name: 'Last Name' },
                { id: 'email', name: 'Email', type: 'email' },
                { id: 'subject', name: 'Subject' },
                { id: 'message', name: 'Message' }
            ];

            fields.forEach(field => {
                const input = document.getElementById(field.id);
                const errorSpan = input.nextElementSibling;
                errorSpan.textContent = '';
                if (input.value.trim() === '') {
                    isValid = false;
                    errorSpan.textContent = `${field.name} is required.`;
                } else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
                    isValid = false;
                    errorSpan.textContent = 'Please enter a valid email address.';
                }
            });

            if (isValid) {
                alert('Message sent successfully!');
                contactForm.reset();
            }
        });
    }
});