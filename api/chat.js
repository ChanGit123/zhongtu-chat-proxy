```javascript
const API_TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJjOWIwODcyLWU2N2ItNDcyMS1iMGQ5LWNlMDMwYTVkMTk4ZCJ9.eyJpc3MiOiJodHRwczovL2FwaS5jb3plLmNuIiwiYXVkIjpbIjZuMXpPVXdjOWp1czRtMlBxY0x3Z0N2VUdVN2tKYUZCIl0sImV4cCI6ODIxMDI2Njg3Njc5OSwiaWF0IjoxNzc5MTk5MDU1LCJzdWIiOiJzcGlmZmU6Ly9hcGkuY296ZS5jbi93b3JrbG9hZF9pZGVudGl0eS9pZDo3NjQxNTQxNzczNzg0Nzc2NzQ0Iiwic3JjIjoiaW5ib3VuZF9hdXRoX2FjY2Vzc190b2tlbl9pZDo3NjQxNjAxNzU0NTA4ODIwNTIyIn0.P8gKrdz9wnchVo0IQa_-xBAFkbdbp2tp8CPJX-P--g9PgYvH7OC0r4YNj_IdWPUYL5K0Jfy5ljzSoyY97kt8qwsWH51_H1Y6UfFhp2Lvg9fuvQvPyaGyaqgOUkNLwprgv-MPXlii4oVFpmOMsVPYvYf9ihxSK8zDYRWq30IdUCIR6WoEveLIeE-Tw8JAtHizXZmvfVD1WTAAxqaeqh0CKIMJkmV0bKY3rpIXfNrzOGIZ_QnUDZqdpD8E_vbb-MqyMaKVF7uvqGZ7eajdIk2r07qJIJuyVlFzOHUXi_BzN8Tyymp_UPgAUlSS7BJYVQp_LpK6i6cjcu7CdRv9aHC0Tw';

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).send('');
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  try {
    const { query, type, role, session_id } = req.body;

    const response = await fetch('https://rcnzsf6ywf.coze.site/stream_run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
        'x-run-id': `run_${Date.now()}`
      },
      body: JSON.stringify({
        query: query,
        type: type || 'query',
        role: role || 'user',
        session_id: session_id || `session_${Date.now()}`
      })
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    response.body.pipe(res);
  } catch (error) {
    res.status(500).json({ error: '代理请求失败', message: error.message });
  }
};
```
