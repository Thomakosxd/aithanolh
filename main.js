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

// ─── FORM SUBMIT (Formspree) ───
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    const statusEl = contactForm.querySelector(".form-status");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        submitBtn.disabled = true;
        submitBtn.textContent = "Αποστολή...";
        if (statusEl) statusEl.textContent = "";

        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" },
        })
            .then((response) => {
                if (response.ok) {
                    if (statusEl) {
                        statusEl.textContent = "✓ Το μήνυμά σας στάλθηκε! Θα επικοινωνήσουμε σύντομα μαζί σας.";
                        statusEl.style.color = "#d6b25d";
                    }
                    contactForm.reset();
                } else {
                    throw new Error("Submission failed");
                }
            })
            .catch(() => {
                if (statusEl) {
                    statusEl.textContent = "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή στείλτε μας email απευθείας.";
                    statusEl.style.color = "#e57373";
                }
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Αποστολή";
            });
    });
}

const target = new Date("2026-07-04T14:30:00").getTime();

function updateCountdown() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML =
            "<h2>🎉 The performance has started!</h2>";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);