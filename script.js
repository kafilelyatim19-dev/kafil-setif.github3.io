document.addEventListener('DOMContentLoaded', () => {

    // إظهار المحتوى بعد تحميل الصفحة لإزالة تأثير الـ "loading"
    const contentToLoad = document.querySelectorAll('.loading');
    contentToLoad.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });

    // وظيفة عداد الإحصائيات
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-item-new h3');
        const statsSection = document.getElementById('statistics');
        
        let isAnimated = false;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isAnimated) {
                    counters.forEach(counter => {
                        const target = +counter.parentElement.getAttribute('data-target');
                        const speed = 200; // سرعة العداد
                        let current = 0;

                        const updateCounter = () => {
                            const increment = target / speed;
                            if (current < target) {
                                current += increment;
                                counter.innerText = Math.ceil(current);
                                setTimeout(updateCounter, 1);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                    });
                    isAnimated = true;
                }
            });
        }, { threshold: 0.5 }); // تشغيل العداد عند ظهور نصف القسم

        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // تشغيل العداد عند تحميل الصفحة
    animateCounters();

    // وظيفة القائمة الجانبية في الهاتف المحمول
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuToggle && mobileMenu && closeMenu && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });

        menuOverlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    }

});