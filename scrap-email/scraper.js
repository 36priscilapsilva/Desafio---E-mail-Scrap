const axios = require("axios");
const cheerio = require("cheerio");

/**
 * @param {string} url 
 * @returns {Promise<string[]>} 
 */
async function scrapePage(url) {
    try {
        const { data } = await axios.get(url); 
        const $ = cheerio.load(data); 
        const titles = [];

        $("h2").each((i, element) => {
            titles.push($(element).text().trim());
        });

        return titles;
    } catch (error) {
        console.error("Erro ao realizar o scrap:", error.message);
        return [];
    }
}

module.exports = { scrapePage };

