

        // Timeline Data
        const timelineData = [
            { 
                year: 2010, 
                title: "Charity Founded", 
                description: "Let's Play was born in Bangalore with just 20 children and a dream to make a difference. Our founders Sarah Johnson and Michael Chen started with a simple playground in their neighborhood.",
                details: "What began as weekend play sessions in a local park has grown into a comprehensive support system for children across the region. Our first volunteers were neighbors and friends who believed in the power of play."
            },
            { 
                year: 2012, 
                title: "First Learning Center", 
                description: "Opened our first community center for after-school programs, tutoring, and safe play spaces.",
                details: "The Learning Center became a beacon of hope, offering homework help, nutritious snacks, and a place where children could just be kids. We served 150 children in our first year of operation."
            },
            { 
                year: 2015, 
                title: "500+ Children Served", 
                description: "Reached the incredible milestone of serving over 500 children thanks to our growing volunteer network.",
                details: "This milestone represented not just numbers, but 500 individual stories of growth, laughter, and dreams coming true. Our volunteer base had grown to over 100 dedicated individuals."
            },
            { 
                year: 2018, 
                title: "International Day Camp", 
                description: "Hosted our first international collaboration with a play camp in Nepal, expanding our global reach.",
                details: "This cross-cultural exchange program allowed children from different countries to connect through play and learning. It marked the beginning of our international outreach efforts."
            },
            { 
                year: 2021, 
                title: "Online Tutoring Launch", 
                description: "Adapted to the pandemic by launching comprehensive remote learning and virtual play sessions.",
                details: "When COVID-19 hit, we quickly pivoted to digital platforms, ensuring no child was left behind. Our online programs reached children in remote areas who had never had access to our services before."
            },
            { 
                year: 2024, 
                title: "1,000th Child Sponsored", 
                description: "Celebrated supporting our 1,000th child through our comprehensive sponsorship program.",
                details: "This milestone represents over a decade of dedication, community support, and the power of collective action. Each sponsored child receives educational support, mentorship, and access to all our programs."
            }
        ];

        // Navigation functionality
        function initNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            const pages = document.querySelectorAll('.page');
            const mobileToggle = document.querySelector('.mobile-toggle');
            const navMenu = document.querySelector('.nav-menu');

            // Page switching
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetPage = link.getAttribute('data-page');
                    
                    // Update active nav link
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Switch pages
                    pages.forEach(page => {
                        page.classList.remove('active');
                        if (page.id === targetPage) {
                            page.classList.add('active');
                        }
                    });
                    
                    // Close mobile menu
                    navMenu.classList.remove('active');
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    // Initialize timeline if switching to milestones
                    if (targetPage === 'milestones') {
                        setTimeout(() => {
                            initTimeline();
                            observeTimelineItems();
                        }, 100);
                    }
                });
            });

            // Mobile menu toggle
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Footer navigation links
            const footerLinks = document.querySelectorAll('a[data-page]');
            footerLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetPage = link.getAttribute('data-page');
                    
                    // Find and click the corresponding nav link
                    const navLink = document.querySelector(`.nav-link[data-page="${targetPage}"]`);
                    if (navLink) {
                        navLink.click();
                    }
                });
            });
        }

        // Timeline functionality
        function initTimeline() {
            const timeline = document.getElementById('timeline');
            if (!timeline) return;
            
            timeline.innerHTML = '';
            
            timelineData.forEach((item, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                timelineItem.setAttribute('data-index', index);
                
                timelineItem.innerHTML = `
                    <div class="timeline-content" onclick="openModal(${index})">
                        <h3 class="timeline-title">${item.title}</h3>
                        <p class="timeline-description">${item.description}</p>
                    </div>
                    <div class="timeline-year">${item.year}</div>
                `;
                
                timeline.appendChild(timelineItem);
            });
        }

        // Timeline animation on scroll
        function observeTimelineItems() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            });
            
            timelineItems.forEach(item => {
                observer.observe(item);
            });
        }

        // Modal functionality
        function openModal(index) {
            const modal = document.getElementById('timeline-modal');
            const modalBody = document.getElementById('modal-body');
            const item = timelineData[index];
            
            modalBody.innerHTML = `
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="background: #ff6b35; color: white; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; margin: 0 auto 1rem; box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);">
                        ${item.year}
                    </div>
                    <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.8rem;">${item.title}</h2>
                    <p style="color: #666; font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem;">${item.description}</p>
                    <p style="color: #555; line-height: 1.7;">${item.details}</p>
                </div>
            `;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const modal = document.getElementById('timeline-modal');
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        // Back to top functionality
        function initBackToTop() {
            const backToTopButton = document.getElementById('backToTop');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }
            });
            
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Fade in animation for elements
        function initFadeInAnimations() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            fadeElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Smooth navbar background on scroll
        function initNavbarScroll() {
            const navbar = document.querySelector('.navbar');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                }
            });
        }

        // Close modal when clicking outside
        function initModalClose() {
            const modal = document.getElementById('timeline-modal');
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    closeModal();
                }
            });
        }

        // Initialize all functionality when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initNavigation();
            initBackToTop();
            initFadeInAnimations();
            initNavbarScroll();
            initModalClose();
            
            // Initialize timeline if starting on milestones page
            const currentPage = document.querySelector('.page.active');
            if (currentPage && currentPage.id === 'milestones') {
                initTimeline();
                observeTimelineItems();
            }
        });

        // Add some interactive hover effects
        document.addEventListener('DOMContentLoaded', () => {
            // Add hover effect to mission cards
            const missionCards = document.querySelectorAll('.mission-card');
            missionCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-15px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(-10px) scale(1)';
                });
            });
            
            // Add parallax effect to hero section
            const hero = document.querySelector('.hero');
            if (hero) {
                window.addEventListener('scroll', () => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.5;
                    hero.style.transform = `translateY(${rate}px)`;
                });
            }
        });
   
