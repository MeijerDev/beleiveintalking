const { resolve } = require("path");

module.exports = (eleventyConfig) => {

    eleventyConfig.addCollection("articles", async () => {
        return [
            { "title": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
            { "title": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" },
            { "title": "venusaur", "url": "https://pokeapi.co/api/v2/pokemon/3/" },
            { "title": "charmander", "url": "https://pokeapi.co/api/v2/pokemon/4/" },
            { "title": "charmeleon", "url": "https://pokeapi.co/api/v2/pokemon/5/" },
            { "title": "charizard", "url": "https://pokeapi.co/api/v2/pokemon/6/" },
            { "title": "squirtle", "url": "https://pokeapi.co/api/v2/pokemon/7/" },
            { "title": "wartortle", "url": "https://pokeapi.co/api/v2/pokemon/8/" },
            { "title": "blastoise", "url": "https://pokeapi.co/api/v2/pokemon/9/" },
            { "title": "caterpie", "url": "https://pokeapi.co/api/v2/pokemon/10/" }
        ]
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