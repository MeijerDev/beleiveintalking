var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;
console.log("Welcome!");
console.log("Please contact us at contact@meijerdesign.nl");
var wrapper = document.body.children.item(0);
var footer = wrapper === null || wrapper === void 0 ? void 0 : wrapper.children.item(0);
var nav = document.body.children.item(1);
var button = document.body.children.item(2);
var navOpen = false;
// Menu logic
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
// If form submitted adjust links
var split = window.location.href.split("/");
var submitUrl = __spreadArray(__spreadArray([], split.slice(0, split.length - 1), true), ["submitted.html"], false).join("/");
var submitted = sessionStorage.getItem("formSubmitted") === "submitted";
if (submitted)
    document.querySelectorAll("a").forEach(function (a) { return a.href.indexOf("contact.html") > 0 ? a.href = submitUrl : false; });
// If form submitted, redirect user to submitted page
if (submitted && window.location.href.indexOf("contact.html") != -1)
    window.location.href = submitUrl;
// Contact Form
var textareaStr = "";
var formElem = document.querySelector("form");
(_a = document.querySelector("textarea")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", function () {
    var _a, _b, _c, _d;
    var area = document.querySelector("textarea");
    if (!area)
        return;
    if (area.value.length >= 400) {
        area.value = textareaStr;
        (_b = (_a = formElem === null || formElem === void 0 ? void 0 : formElem.children) === null || _a === void 0 ? void 0 : _a.item(6)) === null || _b === void 0 ? void 0 : _b.classList.add("max-characters");
    }
    else {
        (_d = (_c = formElem === null || formElem === void 0 ? void 0 : formElem.children) === null || _c === void 0 ? void 0 : _c.item(6)) === null || _d === void 0 ? void 0 : _d.classList.remove("max-characters");
        textareaStr = (area === null || area === void 0 ? void 0 : area.value) || "";
    }
});
document.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(formElem || undefined);
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
var copyRightDiv = (_b = footer === null || footer === void 0 ? void 0 : footer.children.item(0)) === null || _b === void 0 ? void 0 : _b.children.item(1);
if (copyRightDiv) {
    copyRightDiv.innerHTML = new Date().getFullYear().toString();
}
