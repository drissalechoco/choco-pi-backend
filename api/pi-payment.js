export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { action, paymentId, txid } = req.body;
  const API_KEY = process.env.PI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'PI_API_KEY is missing in Vercel' });
  }

  try {
    if (action === 'approve') {
            const baseUrl = "https://" + "://minepi.com" + "/v2/payments/";
      const response = await fetch(baseUrl + paymentId + "/approve", {
        
        method: 'POST',
        headers: {
          'Authorization': `Key ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    }
      
  
        
    if (action === 'complete') {
            const baseUrl = "https://" + "://minepi.com" + "/v2/payments/";
      const response = await fetch(baseUrl + paymentId + "/complete", {
        
        method: 'POST',
        headers: {
          'Authorization': `Key ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ txid })
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
