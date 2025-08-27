const choose = document.querySelector('.choose');
const chooseBtn = document.querySelector('.choose__btn');
const chooseNums = document.querySelectorAll('.choose__select-num');
const chooseLines = document.querySelectorAll('.choose__select-line');
const choosePaths = document.querySelectorAll('.choose__select-line path');
function toggleActive(index, state) {
    chooseNums[index].classList.toggle('active', state);
    chooseLines[index].classList.toggle('active', state);
}
choosePaths.forEach((path, index) => {
    path.addEventListener('mouseenter', () => toggleActive(index, true));
    path.addEventListener('mouseleave', () => toggleActive(index, false));
    path.addEventListener('click', () => {
        choose.classList.add('choosed');
    });
});
chooseNums.forEach((num, index) => {
    num.addEventListener('mouseenter', () => toggleActive(index, true));
    num.addEventListener('mouseleave', () => toggleActive(index, false));
    num.addEventListener('click', () => {
        choose.classList.add('choosed');
    });
});
chooseBtn.addEventListener('click', () => {
    choose.classList.remove('choosed');
    chooseNums.forEach(n => n.classList.remove('active'));
    chooseLines.forEach(l => l.classList.remove('active'));
});



document.addEventListener("DOMContentLoaded", function () {
    const rooms = document.querySelectorAll(".choose__rooms-line");
    function isMobile() {
        return window.innerWidth < 768;
    }
    rooms.forEach(room => {
        const path = room.querySelector("svg path");
        const closeBtn = room.querySelector(".lands__select-close");
        if (!isMobile()) {
            path.addEventListener("mouseenter", () => {
                room.classList.add("active");
            });
            room.addEventListener("mouseleave", () => {
                room.classList.remove("active");
            });
        } else {
            path.addEventListener("click", (e) => {
                e.stopPropagation();
                rooms.forEach(r => r.classList.remove("active"));
                let existingOverlay = document.querySelector('.lands-overlay');
                if (existingOverlay) {
                    existingOverlay.remove();
                }
                room.classList.add("active");
                const overlay = document.createElement('div');
                overlay.classList.add('lands-overlay');
                document.body.appendChild(overlay);
                setTimeout(() => overlay.classList.add('visible'), 10);
                overlay.onclick = () => {
                    room.classList.remove('active');
                    overlay.classList.remove('visible');
                    setTimeout(() => overlay.remove(), 200);
                };
            });
            if (closeBtn) {
                closeBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    room.classList.remove("active");
                    const existingOverlay = document.querySelector('.lands-overlay');
                    if (existingOverlay) {
                        existingOverlay.classList.remove("visible");
                        setTimeout(() => existingOverlay.remove(), 200);
                    }
                });
            }
        }
    });
});
