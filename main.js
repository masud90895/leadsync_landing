(function ($) {
    'use strict';
    $(document).ready(function () {
        var header = document.querySelector('header');
        if (header) {
            function updateHeader() {
                if (window.scrollY > 10) {
                    // Add shadow when scrolled
                    header.classList.add('shadow-md');
                    header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                } else {
                    // Remove shadow when at top
                    header.classList.remove('shadow-md');
                    header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                }
            }
            updateHeader();
            window.addEventListener('scroll', updateHeader, { passive: true });
        }

        // Mobile menu toggle
        var openBtn = document.getElementById('mobileMenuButton');
        var closeBtn = document.getElementById('mobileMenuClose');
        var mobileMenu = document.getElementById('mobileMenu');
        var mobileBackdrop = document.getElementById('mobileBackdrop');

        function openMenu() {
            if (!mobileMenu || !mobileBackdrop) return;
            mobileMenu.classList.remove('-translate-x-full');
            mobileBackdrop.classList.remove('opacity-0', 'invisible');
            mobileBackdrop.classList.add('opacity-100');
            document.documentElement.classList.add('overflow-hidden');
            document.body.classList.add('overflow-hidden');
            // Update button aria-label
            if (openBtn) {
                openBtn.setAttribute('aria-label', 'Close menu');
                openBtn.setAttribute('aria-expanded', 'true');
            }
        }

        function closeMenu() {
            if (!mobileMenu || !mobileBackdrop) return;
            mobileMenu.classList.add('-translate-x-full');
            mobileBackdrop.classList.add('opacity-0', 'invisible');
            mobileBackdrop.classList.remove('opacity-100');
            document.documentElement.classList.remove('overflow-hidden');
            document.body.classList.remove('overflow-hidden');
            // Update button aria-label
            if (openBtn) {
                openBtn.setAttribute('aria-label', 'Open menu');
                openBtn.setAttribute('aria-expanded', 'false');
            }
        }

        // Make closeMenu globally accessible for onclick handlers
        window.closeMobileMenu = closeMenu;

        if (openBtn) {
            openBtn.addEventListener('click', function () {
                var isOpen = mobileMenu && !mobileMenu.classList.contains('-translate-x-full');
                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        }
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);
        window.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });

        // Mobile submenu dropdowns
        var dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        dropdownToggles.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetSelector = btn.getAttribute('data-target');
                if (!targetSelector) return;
                var submenu = document.querySelector(targetSelector);
                if (!submenu) return;
                var expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
                // rotate caret
                var icon = btn.querySelector('svg');
                if (icon) icon.classList.toggle('rotate-180');
                // toggle submenu visibility
                submenu.classList.toggle('hidden');
            });
        });

        // Testimonials Slider
        $('.testimonials-slider').slick({
            slidesToShow: 3,
            infinite: true,
            slidesToScroll: 1,
            autoplaySpeed: 2000,
            autoplay: true,
            arrows: false,
            dots: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        });


    })
})(jQuery);
