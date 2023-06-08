var _a;
console.log("Welcome!");
console.log("Please contact us at contact@meijerdesign.nl");
var wrapper = document.body.children.item(0);
var footer = wrapper === null || wrapper === void 0 ? void 0 : wrapper.children.item(0);
var nav = document.body.children.item(1);
var button = document.body.children.item(2);
var navOpen = false;
if (wrapper && nav && button) {
    button.addEventListener("click", function () {
        if (navOpen) {
            wrapper.classList.remove("fade");
            nav.classList.remove("navOpen");
            button.classList.remove("closeButton");
        }
        else {
            wrapper.classList.add("fade");
            nav.classList.add("navOpen");
            button.classList.add("closeButton");
        }
        navOpen = !navOpen;
    });
    wrapper.addEventListener("click", function () {
        if (navOpen) {
            navOpen = !navOpen;
            wrapper.classList.remove("fade");
            nav.classList.remove("navOpen");
            button.classList.remove("closeButton");
        }
    });
}
// Catch submit event, prevent refresh
var grecaptcha;
var formElem = document.querySelector("form");
document.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(formElem || undefined);
    sessionStorage.setItem("formSubmitted", "submitted");
    fetch("https://6vepad8o23.execute-api.eu-central-1.amazonaws.com/default/ContactFormBelieveInTalking", {
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
    }).then(function (response) {
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
var copyRightDiv = (_a = footer === null || footer === void 0 ? void 0 : footer.children.item(0)) === null || _a === void 0 ? void 0 : _a.children.item(1);
if (copyRightDiv) {
    copyRightDiv.innerHTML = new Date().getFullYear().toString();
}
