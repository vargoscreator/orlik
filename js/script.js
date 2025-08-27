document.addEventListener("DOMContentLoaded", function () {
    const sliderImagesSlider = new Swiper(".sliderImages__slider", {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
        freeModeMomentum: false,
        speed: 2000,
    });
});

const headerTransparent = document.querySelector('.header-transparent');
if(headerTransparent){
    function checkScroll() {
        if (window.scrollY > 0) {
            headerTransparent?.classList.add('scrolled');
        } else {
            headerTransparent?.classList.remove('scrolled');
        }
    }
    checkScroll();
    window.addEventListener('resize', checkScroll);
    window.addEventListener('scroll', checkScroll);
}

const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
headerBurger.addEventListener('click', () => {
    headerMenu.classList.toggle('show');
    if(headerTransparent) headerTransparent.classList.toggle('menu-show');
});


if(document.querySelector(".bungalovPopup")){
    const bungalovOpenBtns = document.querySelectorAll(".bungalov__btn");
    const bungalovPopup = document.querySelector(".bungalovPopup");
    const bungalovCloseBtn = document.querySelector(".bungalovPopup__close");
    const body = document.querySelector(".body");
    bungalovOpenBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            bungalovPopup.classList.add("active");
            body.classList.add("no-scroll");
        });
    });
    bungalovCloseBtn.addEventListener("click", () => {
        bungalovPopup.classList.remove("active");
        body.classList.remove("no-scroll");
    });
}


if (document.querySelector(".lands")) {
    const landsPopupOpenBtns = document.querySelectorAll(".lands__table-block");
    const landsPopup = document.querySelector(".landsPopup");
    const landsPopupCloseBtn = document.querySelector(".landsPopup__close");
    const body = document.querySelector(".body");
    landsPopupOpenBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            landsPopup.classList.add("active");
            body.classList.add("no-scroll");
        });
    });

    function bindPaths() {
        const landsPaths = document.querySelectorAll(".lands__select-bg path");
        landsPaths.forEach((path, index) => {
            if (index === landsPaths.length - 1) return;
            path.addEventListener("click", () => {
                if (window.innerWidth > 768) {
                    console.log(123);
                    landsPopup.classList.add("active");
                    body.classList.add("no-scroll");
                }
            });
        });
    }
    bindPaths();
    landsPopupCloseBtn.addEventListener("click", () => {
        landsPopup.classList.remove("active");
        body.classList.remove("no-scroll");
    });

    const items = document.querySelectorAll('.lands__select-item');
    function enableDesktopMode() {
        items.forEach(item => {
            const path = item.querySelector('.lands__select-bg path');
            const content = item.querySelector('.lands__select-content');
            item.onmouseenter = () => item.classList.add('show');
            content.onmouseenter = () => item.classList.add('show');
            item.onmouseleave = () => item.classList.remove('show');
        });
    }
    function enableMobileMode() {
        items.forEach((item, index) => {
        const path = item.querySelector('.lands__select-bg path');
        const closeBtn = item.querySelector('.lands__select-close');

        path.onclick = (e) => {
            e.stopPropagation();
            let existingOverlay = document.querySelector('.lands-overlay');
            const isLast = index === items.length - 1;
            if (!item.classList.contains('show')) {
                items.forEach(i => i.classList.remove('show'));
                if (existingOverlay) existingOverlay.remove();

                item.classList.add('show');

                if (!isLast) {
                    const overlay = document.createElement('div');
                    overlay.classList.add('lands-overlay');
                    document.body.appendChild(overlay);
                    setTimeout(() => overlay.classList.add('visible'), 10);

                    overlay.onclick = () => {
                        item.classList.remove('show');
                        overlay.classList.remove('visible');
                        setTimeout(() => overlay.remove(), 200);
                    };
                }
            } else {
                item.classList.remove('show');
                if (existingOverlay) {
                    existingOverlay.classList.remove('visible');
                    setTimeout(() => existingOverlay.remove(), 200);
                }
            }
        };

        if (closeBtn) {
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                item.classList.remove('show');
                const existingOverlay = document.querySelector('.lands-overlay');
                if (existingOverlay) {
                    existingOverlay.classList.remove('visible');
                    setTimeout(() => existingOverlay.remove(), 200);
                }
            };
        }

        item.onclick = (e) => {
            if (!e.target.closest('.lands__select-content')) {
                item.classList.remove('show');
                const existingOverlay = document.querySelector('.lands-overlay');
                if (existingOverlay) {
                    existingOverlay.classList.remove('visible');
                    setTimeout(() => existingOverlay.remove(), 200);
                }
            }
        };
    });

        items.forEach(item => {
            const detailsBtn = item.querySelector('.lands__select-details');
            if(detailsBtn){
                detailsBtn.onclick = (e) => {
                    e.stopPropagation();
                    item.classList.remove('show');
                    const existingOverlay = document.querySelector('.lands-overlay');
                    if(existingOverlay){
                        existingOverlay.classList.remove('visible');
                        setTimeout(() => existingOverlay.remove(), 200);
                    }
                    landsPopup.classList.add('active');
                    body.classList.add('no-scroll');
                };
            }
        });


        document.addEventListener('click', (e) => {
            if (!e.target.closest('.lands__select-item')) {
                items.forEach(i => i.classList.remove('show'));
                const existingOverlay = document.querySelector('.lands-overlay');
                if (existingOverlay) {
                    existingOverlay.classList.remove('visible');
                    setTimeout(() => existingOverlay.remove(), 200);
                }
            }
        });
    }


    function handleHover() {
        if (window.innerWidth >= 768) {
            enableDesktopMode();
        } else {
            enableMobileMode();
        }
    }
    handleHover();
    window.addEventListener('resize', () => {
    items.forEach(item => {
        const path = item.querySelector('.lands__select-bg path');
        const content = item.querySelector('.lands__select-content');
        const closeBtn = item.querySelector('.lands__select-close');
        path.onclick = null;
        if(closeBtn){
            closeBtn.onclick = null;
        }
        item.onclick = null;
        item.onmouseenter = null;
        item.onmouseleave = null;
        content.onmouseenter = null;
    });
    items.forEach(i => i.classList.remove('show'));
        const existingOverlay = document.querySelector('.lands-overlay');
        if (existingOverlay) existingOverlay.remove();
        handleHover();
    });

}

if(document.querySelector(".lands__selectmap")){
    const landsSelectmapBtn = document.querySelector(".lands__selectmap-show");
    const landsSelectmap = document.querySelector(".lands__selectmap");
    landsSelectmapBtn.addEventListener("click", () => {
        landsSelectmap.classList.toggle("showed");
    });
}


if(document.querySelector('.hero__content')){
    const heroContent = document.querySelector('.hero__content');
    const clouds = document.querySelectorAll('.hero__cloud');
    const cloudSettings = [
        { speed: 0.3, maxX: 600 },
        { speed: 0.5, maxX: 200 },
        { speed: 0.2, maxX: 300 }
    ];
    const initialOffset = window.innerWidth > 768 ? 90 : 30; 
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const translateY = Math.min(scrollY * 0.5, initialOffset);
        heroContent.style.transform = `translateY(${initialOffset - translateY}px)`;
        clouds.forEach((cloud, i) => {
            const moveX = -Math.min(scrollY * cloudSettings[i].speed, cloudSettings[i].maxX);
            cloud.style.transform = `translateX(${moveX}px)`;
        });
    });
}



if (document.querySelector('.hero__btn')) {
    const heroBtn = document.querySelector('.hero__btn');
    const heroContent = document.querySelector('.hero__content');
    heroBtn.addEventListener('mouseenter', () => {
        heroBtn.classList.add('hovered');
        heroContent.classList.add('showed');
    });
    heroBtn.addEventListener('mouseleave', () => {
        heroBtn.classList.remove('hovered');
        heroContent.classList.remove('showed');
    });
}


if (document.querySelector('.animate-horizontal-wrapper')) {
    const animationWrapper = document.querySelector('.animate-horizontal-wrapper');
    const itemsContainer = animationWrapper.querySelector('.animate-horizontal');
    const textItems = itemsContainer.querySelectorAll('span');
    let activeIndex = 0;
    function showNextItem() {
        const currentItem = textItems[activeIndex];
        animationWrapper.style.width = currentItem.offsetWidth + 'px';
        itemsContainer.style.transform = `translateX(-${currentItem.offsetLeft}px)`;
        activeIndex = (activeIndex + 1) % textItems.length;
    }
    animationWrapper.style.width = textItems[0].offsetWidth + 'px';
    setInterval(showNextItem, 2000);
}

if (document.querySelector('.animate-vertical-wrapper')) {
    const animationWrapper = document.querySelector('.animate-vertical-wrapper');
    const itemsContainer = animationWrapper.querySelector('.animate-vertical');
    const textItems = itemsContainer.querySelectorAll('span');
    let activeIndex = 0;
    function showNextItem() {
        const currentItem = textItems[activeIndex];
        animationWrapper.style.height = currentItem.offsetHeight + 'px';
        itemsContainer.style.transform = `translateY(-${currentItem.offsetTop}px)`;
        activeIndex = (activeIndex + 1) % textItems.length;
    }
    animationWrapper.style.height = textItems[0].offsetHeight + 'px';
    setInterval(showNextItem, 2000);
}