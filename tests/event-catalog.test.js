import {test} from 'node:test';
import assert from 'node:assert/strict';
import {eventSources,safeEventUrl} from '../src/components/events/catalog.js';
test('event destinations accept only HTTP links, preventing executable links in saved or provider data',()=>{
  for(const unsafe of ['javascript:alert(1)','data:text/html,hello','file:///etc/passwd','not a URL',undefined])assert.equal(safeEventUrl(unsafe),null);
  assert.equal(safeEventUrl('https://example.test/events?q=tech'),'https://example.test/events?q=tech');
});
test('organizer directory has unique identities and valid destinations without fixed event dates',()=>{
  assert.equal(new Set(eventSources.map(item=>item.id)).size,eventSources.length);
  for(const item of eventSources){assert.ok(safeEventUrl(item.evtUrl));assert.ok(item.category);assert.ok(item.evtDesc);assert.equal(item.date,undefined);}
});
