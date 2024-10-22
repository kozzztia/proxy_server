export default async function handler(req, res) {
    const { page } = req.query;
    const apiKey = process.env.WALLHAVEN_API_KEY;
    const api = 'https://wallhaven.cc/api/v1/'
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    
    try {
        const response = await fetch(`${api}search?apikey=${apiKey}&page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
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
