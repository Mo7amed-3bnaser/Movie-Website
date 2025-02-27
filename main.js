document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const banner = document.querySelector('.banner');
    const content = document.querySelector('.content');
    const playBtn = document.querySelector('.play');
    const itemWidth = 220; // عرض الصورة + المسافة بينها
    
    let currentIndex = 0;
    
    // معلومات الأفلام
    const movies = [
        {
            background: 'url(./image/movies/bg-little-mermaid.jpg)',
            title: './image/the-little-mermaid-title.png',
            year: '2025',
            age: '12+',
            duration: '2h 28m',
            rating: 'pg-13',
            description: 'A young mermaid princess makes a Faustian bargain in an attempt to become human and win a prince\'s love.'
        },
        {
            background: 'url(./image/movies/65.jpg)',
            title: './image/65-title.png',
            year: '2023',
            age: '15+',
            duration: '1h 55m',
            rating: 'pg-13',
            description: 'An astronaut crashes on a mysterious planet only to discover he\'s not alone.'
        },
        {
            background: 'url(./image/movies/bg-the-covenant.jpeg)',
            title: './image/the-covenant-title.png',
            year: '2023',
            age: '16+',
            duration: '2h 3m',
            rating: 'R',
            description: 'During the war in Afghanistan, a local interpreter risks his own life to carry an injured sergeant across miles of grueling terrain.'
        },
        {
            background: 'url(./image/movies/the-black-demon.jpg)',
            title: './image/black-demon-title.png',
            year: '2023',
            age: '14+',
            duration: '1h 40m',
            rating: 'pg-13',
            description: 'An offshore oil rig worker must protect his family from a terrifying megalodon shark lurking in the waters.'
        },
        {
            background: 'url(./image/movies/the-tank.jpeg)',
            title: './image/the-tank-title.png',
            year: '2023',
            age: '18+',
            duration: '1h 45m',
            rating: 'R',
            description: 'A family discovers a mysterious tank of water in their new home, unleashing a terrifying evil.'
        }
    ];

    function updateContent(index) {
        const content = document.querySelector('.content');
        const movieInfo = movies[index];
        
        // تحديث الخلفية بشكل متزامن مع المحتوى
        gsap.to(banner, {
            duration: 0.5,
            backgroundImage: movieInfo.background,
            ease: "power2.out"
        });

        // تحديث المحتوى بدون إخفاء
        gsap.to(content, {
            duration: 0.3,
            opacity: 0,
            y: 20,
            ease: "power2.out",
            onComplete: () => {
                // تحديث المحتوى
                document.querySelector('.movie-title').src = movieInfo.title;
                document.querySelector('.content h4').innerHTML = `
                    <span>${movieInfo.year}</span>
                    <span><i>${movieInfo.age}</i></span>
                    <span>${movieInfo.duration}</span>
                    <span>${movieInfo.rating}</span>
                `;
                document.querySelector('.content p').textContent = movieInfo.description;
                
                // إظهار المحتوى الجديد
                gsap.to(content, {
                    duration: 0.3,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out"
                });
            }
        });
    }

    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${offset}px)`;
    }

    // التحكم بأزرار التنقل
    nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 3) { // عرض 3 صور في المرة الواحدة
            currentIndex++;
            updateCarousel();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // إضافة خاصية الضغط على الصور
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            const movieInfo = movies[index];
            banner.style.backgroundImage = movieInfo.background;
            updateContent(index);
        });
    });
    
    // إضافة معالج حدث للزر Watch Trailer
    playBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const movieInfo = movies[currentIndex];
        // يمكنك إضافة كود لفتح الفيديو هنا
        alert(`Playing trailer for ${movieInfo.title}`);
    });
    
    // التهيئة الأولية
    updateCarousel();
});

// تعديل تأثيرات الناف بار عند السكرول
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '8px 100px';
        header.style.background = 'rgba(0, 0, 0, 0.1)';  /* تعتيم خفيف جداً عند السكرول */
    } else {
        header.style.padding = '12px 100px';
        header.style.background = 'rgba(0, 0, 0, 0.05)';  /* شفافية عالية جداً */
    }
});

// إضافة الكلاس active للقائمة النشطة
const navLinks = document.querySelectorAll('.nav li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
