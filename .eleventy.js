require('dotenv').config()

module.exports = (eleventyConfig) => {

    eleventyConfig.addCollection("pages", async () => {

        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic " + Buffer.from("Cppio_voVO6Me3UPXIYwqQ..:a5O5oq8LntWtwtVLw2SBLw..").toString("base64"));
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("grant_type", "client_credentials");

            var answer = await fetch("https://hl7offzwezq2cal-db202103270929.adb.uk-london-1.oraclecloudapps.com/ords/api/oauth/token", {
                method: "POST",
                headers: myHeaders,
                body: urlencoded,
                redirect: "follow"
            });
            var result = await answer.json();
            const token = result?.access_token;

            myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);

            answer = await fetch("https://hl7offzwezq2cal-db202103270929.adb.uk-london-1.oraclecloudapps.com/ords/api/auth/content/believeintalking.com", {
                method: 'GET',
                headers: myHeaders,
            });
            result = await answer.json();
            // console.log(result);
            return result;
        } catch (err) {
            console.log("error while fetching website parts: ", err);
        }
    });

    eleventyConfig.addPassthroughCopy(process.env.TEMPLATE + "/style.css");
    eleventyConfig.addPassthroughCopy(process.env.TEMPLATE + "/index.js");
    eleventyConfig.addFilter("addCss", (url) => {
        return url + "?v=" + Date.now();
    })
    eleventyConfig.addFilter("addScript", (url) => {
        return url + "?v=" + Date.now();
    });
    eleventyConfig.addPassthroughCopy("TEMPLATES/" + process.env.TEMPLATE + "/*.jpg");
    eleventyConfig.addPassthroughCopy("TEMPLATES/" + process.env.TEMPLATE + "/*.png");
    eleventyConfig.addPassthroughCopy("TEMPLATES/" + process.env.TEMPLATE + "/*.svg");
    eleventyConfig.addPassthroughCopy("TEMPLATES/" + process.env.TEMPLATE + "/*.ico");
    eleventyConfig.addPassthroughCopy("TEMPLATES/" + process.env.TEMPLATE + "/*.webmanifest");

    return {
        dir: {
            input: process.env.TEMPLATE ? process.env.TEMPLATE : "/",
            output: process.env.BUILD_PATH ? process.env.BUILD_PATH : "local"
        }
    };
};