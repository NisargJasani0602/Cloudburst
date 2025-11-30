const express = require('express');

const app = express();
app.use(express.json());

const {
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_TOKEN,
  GITHUB_API_BASE
} = process.env;

// Default to public GitHub if not set, but you'll set GITHUB_API_BASE for GHES.
const API_BASE = GITHUB_API_BASE || 'https://api.github.com';

if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_TOKEN) {
  console.error('Missing one of GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN');
  process.exit(1);
}

async function triggerDispatch(eventType) {
  const url = `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`;

  console.log(`Triggering GitHub repository_dispatch: ${eventType} → ${url}`);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ event_type: eventType })
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`GitHub dispatch failed with status ${res.status}: ${text}`);
    throw new Error(`GitHub dispatch failed: ${res.status}`);
  }

  console.log(`GitHub dispatch ${eventType} succeeded.`);
}

app.post('/alert', async (req, res) => {
  try {
    const payload = req.body;
    console.log('Received Alertmanager webhook:', JSON.stringify(payload));

    const status = payload.status;
    if (status === 'firing') {
      await triggerDispatch('cloudburst_burst');
    } else if (status === 'resolved') {
      await triggerDispatch('cloudburst_unburst');
    } else {
      console.log(`Ignoring Alertmanager status: ${status}`);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('Error handling /alert:', err);
    res.status(500).send('error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`burst-webhook listening on port ${port}`);
});
