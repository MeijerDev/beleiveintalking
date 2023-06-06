console.log("Welcome!");
console.log("Please contact us at contact@meijerdesign.nl");

const wrapper = document.body.children.item(0);
const nav = document.body.children.item(1);
const button = document.body.children.item(2);

var navOpen = false;

if (wrapper && nav && button) {
    button.addEventListener("click", () => {
        if (navOpen) {
            document.body.classList.remove("hideScrollBar");
            nav.classList.remove("navOpen");
            button.classList.remove("closeButton");
        } else {
            document.body.classList.add("hideScrollBar");
            nav.classList.add("navOpen");
            button.classList.add("closeButton");
        }
        navOpen = !navOpen;
    });

    wrapper.addEventListener("click", () => {
        if (navOpen) {
            navOpen = !navOpen;
            document.body.classList.remove("hideScrollBar");
            nav.classList.remove("navOpen");
            button.classList.remove("closeButton");
        }
    })
}