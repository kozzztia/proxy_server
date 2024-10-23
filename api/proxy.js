async function handler(req, res) {
    const query = req.query;
    const apiKey = process.env.WALLHAVEN_API_KEY;
    const api = 'https://wallhaven.cc/api/v1/search?'
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        const response = await fetch(`${api}q=${query.q}&categories=${query.categories}&page=${query.page}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey,
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

