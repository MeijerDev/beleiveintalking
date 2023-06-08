console.log("Welcome!");
console.log("Please contact us at contact@meijerdesign.nl");

const wrapper = document.body.children.item(0);
const footer = wrapper?.children.item(0);
const nav = document.body.children.item(1);
const button = document.body.children.item(2);
var navOpen = false;

if (wrapper && nav && button) {
    button.addEventListener("click", () => {
        if (navOpen) {
            wrapper.classList.remove("fade");
            nav.classList.remove("navOpen");
            button.classList.remove("closeButton");
        } else {
            wrapper.classList.add("fade");
            nav.classList.add("navOpen");
            button.classList.add("closeButton");
        }
        navOpen = !navOpen;
    });

    wrapper.addEventListener("click", () => {
        if (navOpen) {
            navOpen = !navOpen;
            wrapper.classList.remove("fade");
            nav.classList.remove("navOpen");
            button.classList.remove("closeButton");
        }
    })
}

// Catch submit event, prevent refresh
var grecaptcha;
const formElem = document.querySelector("form");
document.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(formElem || undefined);

    sessionStorage.setItem("formSubmitted", "submitted");

    fetch("CONTACT_ENDPOINT", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        }),
    }).then((response) => {
        if (response.status) {
            console.log("submitted");
            console.log(response);
            return;
        }
        throw new Error("Could not submit request");
    })
        .catch(function (error) {
            console.error(error);
        });
});

// Set correct year footer
const copyRightDiv = footer?.children.item(0)?.children.item(1);
if (copyRightDiv) {
    copyRightDiv.innerHTML = new Date().getFullYear().toString();
}