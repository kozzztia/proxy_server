export default async function handler(req, res) {
    const { page, q, category, purity , sorting } = req.query;
    const apiKey = process.env.WALLHAVEN_API_KEY;
    const api = 'https://wallhaven.cc/api/v1/search?'
    res.setHeader('Access-Control-Allow-Origin', '*');

    // categories 100 - 118
    // purity sfw/sketchy/nsfw
    // sorting date_added* ,relevance, random, views, favorites, toplist

    
    try {
        const response = await fetch(`
            ${api}
            ${page?`&page=${page}`:"&page=1"}
            ${q?`&q=${q}`:""}
            ${category?`&categories=${category}`:"categories=100,101,111"}
            ${purity?`&purity=${purity}`:"purity=nsfw"}
            ${sorting?`&sorting=${sorting}`:"sorting=date_added*"}
            `, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey,
            }
        });

        if (!response.ok) {
            console.error(`Error fetching data: ${response.status}`);
            return res.status(response.status).json({ error: `Error fetching from API. Status: ${response.status}` });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error(`API call failed: ${error.message}`);
        return res.status(500).json({ error: `Error fetching from API: ${error.message}` });
    }
}