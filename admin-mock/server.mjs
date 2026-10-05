import http from 'node:http';
import crypto from 'node:crypto';

const PORT = process.env.PORT || 8792;

const mockServerState = {
  version: '18.0.60',
  os: 'Ubuntu 24.04 LTS',
  guid: 'plesk-twin-guid-8492-subactor',
  webspaces: [
    {
      id: 1,
      name: 'subactor.com',
      docroot: '/var/www/vhosts/subactor.com/httpdocs',
      status: 'active',
      ip: '127.0.0.1',
      phpVersion: '8.3.10'
    },
    {
      id: 2,
      name: 'sub.actor',
      docroot: '/var/www/vhosts/sub.actor/httpdocs',
      status: 'active',
      ip: '127.0.0.1',
      phpVersion: '8.3.10'
    }
  ],
  plans: new Map(),
  usedGrants: new Set()
};

const normalizeDomain = (value) => {
  return String(value || '').trim().toLowerCase();
};

const resolveDocroot = (domain) => {
  const normalized = normalizeDomain(domain);
  const active = mockServerState.webspaces.find((entry) => entry.name === normalized);
  return active?.docroot || '/var/www/vhosts/subactor.com/httpdocs';
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const path = url.pathname;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Apply-Grant, X-Plan-Hash'
    });
    return res.end();
  }

  // Healthz check
  if (path === '/healthz' || path === '/readyz' || path === '/') {
    res.writeHead(200);
    return res.end(JSON.stringify({
      ok: true,
      twin: 'plesk-admin-mock',
      version: mockServerState.version,
      webspacesCount: mockServerState.webspaces.length
    }));
  }

  // GET /api/v2/server
  if (path === '/api/v2/server' && req.method === 'GET') {
    res.writeHead(200);
    return res.end(JSON.stringify({
      version: mockServerState.version,
      platform: 'Linux',
      os_name: mockServerState.os,
      guid: mockServerState.guid,
      status: 'online'
    }));
  }

  // GET /api/v2/webspaces
  if (path === '/api/v2/webspaces' && req.method === 'GET') {
    res.writeHead(200);
    return res.end(JSON.stringify(mockServerState.webspaces));
  }

  // POST /api/v2/publication/plan (Two-phase preflight calculation)
  if (path === '/api/v2/publication/plan' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const domain = normalizeDomain(payload.domain || 'subactor.com');
        const planId = 'plan_' + crypto.randomBytes(8).toString('hex');
        const planHash = crypto.createHash('sha256').update(body + Date.now()).digest('hex');
        const targetDocroot = resolveDocroot(domain);

        const planResult = {
          plan_id: planId,
          plan_hash: planHash,
          domain,
          target_docroot: targetDocroot,
          files_to_sync: payload.files_count || 12,
          artifact_hash: payload.artifact_hash || null,
          shadowing_check: 'pass',
          source_completeness: 'pass',
          requires_grant: true
        };

        mockServerState.plans.set(planHash, planResult);

        res.writeHead(200);
        return res.end(JSON.stringify({ ok: true, plan: planResult }));
      } catch (err) {
        res.writeHead(400);
        return res.end(JSON.stringify({ ok: false, error: 'invalid_json_payload' }));
      }
    });
    return;
  }

  // POST /api/v2/publication/apply (Guarded two-phase publish apply)
  if (path === '/api/v2/publication/apply' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const grant = req.headers['x-apply-grant'] || payload.apply_grant;
        const planHash = req.headers['x-plan-hash'] || payload.plan_hash;

        if (!grant) {
          res.writeHead(403);
          return res.end(JSON.stringify({ ok: false, error: 'missing_apply_grant', hint: 'Single-use grant required for apply' }));
        }

        if (mockServerState.usedGrants.has(grant)) {
          res.writeHead(403);
          return res.end(JSON.stringify({ ok: false, error: 'apply_grant_already_used' }));
        }

        if (!planHash || !mockServerState.plans.has(planHash)) {
          res.writeHead(400);
          return res.end(JSON.stringify({ ok: false, error: 'invalid_or_expired_plan_hash' }));
        }


        const plan = mockServerState.plans.get(planHash);
        const domain = plan?.domain || 'subactor.com';
        const docroot = resolveDocroot(domain);
        if (!payload.artifact_hash || payload.artifact_hash !== plan.artifact_hash) {
          res.writeHead(409);
          return res.end(JSON.stringify({ ok: false, error: 'artifact_hash_mismatch' }));
        }

        mockServerState.usedGrants.add(grant);
        mockServerState.plans.delete(planHash);

        res.writeHead(200);
        return res.end(JSON.stringify({
          ok: true,
          status: 'published',
          domain,
          docroot,
          timestamp: new Date().toISOString()
        }));
      } catch (err) {
        res.writeHead(500);
        return res.end(JSON.stringify({ ok: false, error: 'apply_failed' }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ ok: false, error: 'not_found' }));
});

server.listen(PORT, () => {
  console.log(`Plesk Admin Mock API listening on port ${PORT}`);
});
