import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_INVENTORY = path.resolve(
  path.dirname(import.meta.url).replace('file://', ''),
  '../inventory/account-subscriptions.json',
);

export function loadAccountInventory(filePath = process.env.PLESK_ACCOUNT_INVENTORY || DEFAULT_INVENTORY) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const inventory = JSON.parse(raw);
  if (inventory?.schema !== 'digitaltwin-run.plesk-account-inventory/v1') {
    throw new Error('plesk_account_inventory_schema_invalid');
  }
  if (!Array.isArray(inventory.subscriptions)) {
    throw new Error('plesk_account_inventory_subscriptions_missing');
  }
  return inventory;
}

export function listInventoryDomains(inventory = loadAccountInventory()) {
  const rows = [];
  for (const subscription of inventory.subscriptions) {
    for (const domain of subscription.domains || []) {
      rows.push({
        account_id: inventory.account_id,
        subscription_name: subscription.subscription_name,
        customer_login_vault_entry_id: subscription.customer_login_vault_entry_id || null,
        ...domain,
      });
    }
  }
  return rows;
}

export function lookupDomain(domainName, inventory = loadAccountInventory()) {
  const wanted = String(domainName || '').trim().toLowerCase();
  if (!wanted) return null;
  return listInventoryDomains(inventory).find((row) => String(row.name || '').toLowerCase() === wanted) || null;
}

export function resolvePublishTarget({
  domain,
  targetDir = '',
  env = process.env,
  inventory = loadAccountInventory(),
} = {}) {
  const configuredDomain = String(
    domain || env.PLESK_PUBLISH_DOMAIN || env.PLESK_TARGET_DOMAIN || '',
  ).trim().toLowerCase();
  const configuredDocroot = String(env.PLESK_TARGET_DOCROOT || '').trim();
  let resolvedDomain = configuredDomain;
  if (!resolvedDomain) {
    const normalized = path.resolve(targetDir || process.cwd()).toLowerCase();
    const fromPath = listInventoryDomains(inventory).find((row) => {
      const slug = String(row.name || '').toLowerCase().replace(/\./g, '-');
      return normalized.includes(slug) || normalized.includes(String(row.name || '').toLowerCase());
    });
    resolvedDomain = fromPath?.name || '';
  }
  const row = resolvedDomain ? lookupDomain(resolvedDomain, inventory) : null;
  return {
    account_id: inventory.account_id,
    domain: row?.name || resolvedDomain || null,
    subscription_name: row?.subscription_name || null,
    docroot: configuredDocroot || row?.docroot || null,
    vault_refs: row?.vault_refs || null,
    inventory_hit: Boolean(row),
  };
}
