// ─── SECTION REVEAL ───
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
},{ threshold: 0.15 });

sections.forEach(section => {
    section.classList.add("reveal");
    observer.observe(section);
});

// ─── PILL NAV ACTIVE INDICATOR ───
const navLinks = document.querySelectorAll(".nav-pill a");
const indicator = document.querySelector(".nav-indicator");
const navPill   = document.querySelector(".nav-pill");

function moveIndicatorTo(link) {
    const pillRect = navPill.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    indicator.style.left  = (linkRect.left - pillRect.left) + "px";
    indicator.style.width = linkRect.width + "px";
}

// Set active link & move indicator
function setActive(link) {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    moveIndicatorTo(link);
}

// Init on first link
window.addEventListener("load", () => {
    const first = navLinks[0];
    setActive(first);
});

// Click
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        setActive(link);
    });
});

// Scroll spy
const sectionEls = Array.from(document.querySelectorAll("section[id]"));
const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const id = entry.target.id;
            const match = document.querySelector(`.nav-pill a[data-section="${id}"]`);
            if(match) setActive(match);
        }
    });
},{ threshold: 0.4 });

sectionEls.forEach(s => scrollObserver.observe(s));

// ─── FORM SUBMIT ───
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    alert("Το μήνυμά σας στάλθηκε! (Demo)");
});