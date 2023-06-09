console.log("Welcome!");
console.log("Please contact us at contact@meijerdesign.nl");

const wrapper = document.body.children.item(0);
const footer = wrapper?.children.item(0);
const nav = document.body.children.item(1);
const button = document.body.children.item(2);
var navOpen = false;

// Menu logic
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

// If form submitted adjust links
const split = window.location.href.split("/");
const submitUrl = [...split.slice(0, split.length - 1), "submitted.html"].join("/");
const submitted = sessionStorage.getItem("formSubmitted") === "submitted";
if (submitted) document.querySelectorAll("a").forEach((a) => a.href.indexOf("contact.html") > 0 ? a.href = submitUrl : false);

// If form submitted, redirect user to submitted page
if (submitted && window.location.href.indexOf("contact.html") != -1) window.location.href = submitUrl;

// Contact Form
var textareaStr = "";
const formElem = document.querySelector("form");
document.querySelector("textarea")?.addEventListener("input", () => {
    const area = document.querySelector("textarea");
    if (!area) return;

    if (area.value.length >= 400) {
        area.value = textareaStr;
        formElem?.children?.item(6)?.classList.add("max-characters");
    } else {
        formElem?.children?.item(6)?.classList.remove("max-characters");
        textareaStr = area?.value || "";
    }
});
document.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(formElem || undefined);

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
            sessionStorage.setItem("formSubmitted", "submitted");
            window.location.href = submitUrl;
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