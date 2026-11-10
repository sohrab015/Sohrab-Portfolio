"use strict";

const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const themeLabel = themeBtn.querySelector(".theme-label");



let theme = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", theme);

themeLabel.textContent = theme === "dark" ? "Light" : "Dark";

themeBtn.addEventListener("click", function () {
    let currentTheme = root.getAttribute("data-theme");

    let newTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    themeLabel.textContent = newTheme === "dark" ? "Light" : "Dark";
});





const menuBtn = document.getElementById("menuToggle");
const nav = document.getElementById("siteNav");

menuBtn.addEventListener("click", function () {
    nav.classList.toggle("open");

    menuBtn.setAttribute(
        "aria-expanded",
        nav.classList.contains("open")
    );
});

nav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
    }
});





const links = nav.querySelectorAll("a");

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            links.forEach(function (link) {
                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + entry.target.id) {
                    link.classList.add("active");
                }
            });

        }

    });
}, { rootMargin: "-40% 0px -55% 0px" });

links.forEach(function (link) {
    const section = document.querySelector(link.getAttribute("href"));

    if (section) {
        observer.observe(section);
    }
});


// 4. Copy Email
const copyBtn = document.getElementById("copyEmail");
const status = document.getElementById("copyStatus");

copyBtn.addEventListener("click", function () {
    const email = copyBtn.getAttribute("data-email");

    navigator.clipboard.writeText(email)
        .then(function () {
            copyBtn.textContent = "Copied!";
            status.textContent = "Email copied successfully!";

            setTimeout(function () {
                copyBtn.textContent = "Copy Email";
            }, 1800);
        })
        .catch(function () {
            copyBtn.textContent = "Copy failed";
            status.textContent = "Could not copy email!";
        });
});


// 5. Footer Year
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}
