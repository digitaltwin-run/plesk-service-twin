import assert from 'node:assert/strict';
import { lookupDomain, resolvePublishTarget, loadAccountInventory } from '../src/inventory.mjs';

const inventory = loadAccountInventory();
assert.equal(inventory.account_id, 'prototypowanie');
assert.ok(inventory.subscriptions.length > 1, 'account must list more than one subscription');

const subactor = lookupDomain('subactor.com', inventory);
assert.equal(subactor.subscription_name, 'subactor.com');
assert.ok(subactor.docroot.includes('subactor.com'));

const other = lookupDomain('obslugabiurowa.pl', inventory);
assert.equal(other.subscription_name, 'obslugabiurowa.pl');
assert.notEqual(other.subscription_name, subactor.subscription_name);

const resolved = resolvePublishTarget({
  domain: 'sub.actor',
  inventory,
  env: {},
});
assert.equal(resolved.inventory_hit, true);
assert.equal(resolved.subscription_name, 'sub.actor');
assert.ok(resolved.docroot);

console.log('inventory.test.mjs ok');
