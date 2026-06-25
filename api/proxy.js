export default async function handler(req, res) {
  const { type, url, q } = req.query;
  const API_KEY = process.env.GOOGLE_API_KEY;
  const CX = process.env.SEARCH_ENGINE_ID;
  
  let endpoint = "";
  if (type === 'pagespeed') {
    endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${API_KEY}`;
  } else if (type === 'search') {
    endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(q)}&cx=${CX}&key=${API_KEY}`;
  }

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "API Connection Failed" });
  }
}
