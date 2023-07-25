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
            return result;
        } catch (err) {
            console.log("error while fetching website parts: ", err);
        }
    });

    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/index.js");
    eleventyConfig.addFilter("addCss", (url) => {
        return url + "?v=" + Date.now();
    })
    eleventyConfig.addFilter("addScript", (url) => {
        return url + "?v=" + Date.now();
    });
    eleventyConfig.addPassthroughCopy("src/*.jpg");
    eleventyConfig.addPassthroughCopy("src/*.png");
    eleventyConfig.addPassthroughCopy("src/*.svg");
    eleventyConfig.addPassthroughCopy("src/*.ico");
    eleventyConfig.addPassthroughCopy("src/*.webmanifest");

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
};