export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { action, paymentId, txid } = req.body;
  const API_KEY = process.env.PI_API_KEY;

  try {
    if (action === 'approve') {
      const response = await fetch(`https://minepi.com{paymentId}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Key ${API_KEY}` }
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (action === 'complete') {
      const response = await fetch(`https://minepi.com{paymentId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ txid })
      });
      const data = await response.json();
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
