import { useEffect, useRef, useState } from 'react';
import challenges from './challenges';

// The opaque-origin frame owns the worker. CSP prevents network access; the
// worker keeps infinite loops off the UI thread and is destroyed after each run.
const frameDocument = `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; worker-src blob:; connect-src 'none'"><script>
let worker, timer;
addEventListener('message', (event) => {
  if (event.source !== parent || event.data.type !== 'run') return;
  if (worker) worker.terminate();
  clearTimeout(timer);
  const {code, tests, runId} = event.data;
  const source = 'onmessage = async () => { const logs = []; console.log = (...args) => logs.push(args.map(String).join(" ")); try { ' + code + '\\n; const cases = ' + JSON.stringify(tests) + '; const results = []; for (const test of cases) { const expected = test[test.length - 1]; const args = test.slice(0, -1); try { const actual = await solve(...args); results.push({args, expected, actual: actual === undefined ? "undefined" : actual, passed: JSON.stringify(actual) === JSON.stringify(expected)}); } catch(error) { results.push({args, expected, error: error.message, passed: false}); } } postMessage({results, logs}); } catch(error) { postMessage({error: error.message, logs}); } };';
  try {
    const url = URL.createObjectURL(new Blob([source], {type: 'text/javascript'}));
    worker = new Worker(url); URL.revokeObjectURL(url);
    const finish = (result) => { clearTimeout(timer); worker.terminate(); parent.postMessage({type:'lab-result', runId, ...result}, '*'); };
    worker.onmessage = e => finish(e.data);
    worker.onerror = e => { e.preventDefault(); finish({error:e.message || 'Code could not run. Check your syntax.'}); };
    timer = setTimeout(() => finish({error:'Execution stopped after 3 seconds. Check for an infinite loop.'}), 3000);
    worker.postMessage({});
  } catch(error) { parent.postMessage({type:'lab-result', runId, error:error.message}, '*'); }
});
parent.postMessage({type:'lab-ready'}, '*');
</script>`;

export default function CodeLab({ saved, update, solved, onSolve, exercises = challenges }) {
  const [id, setId] = useState(exercises[0].id);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false);
  const [hint, setHint] = useState(false);
  const frame = useRef(null);
  const activeRun = useRef(null);
  const watchdog = useRef(null);
  const challenge = exercises.find(item => item.id === id);
  const code = saved[id] ?? challenge.starter;
  useEffect(() => {
    function receive(event) {
      if (event.source !== frame.current?.contentWindow) return;
      if (event.data.type === 'lab-ready') setReady(true);
      if (event.data.type !== 'lab-result' || event.data.runId !== activeRun.current?.runId) return;
      clearTimeout(watchdog.current);
      setResult(event.data); setRunning(false);
      if (event.data.results?.length && event.data.results.every(test => test.passed)) onSolve(activeRun.current.id);
      activeRun.current = null;
    }
    window.addEventListener('message', receive);
    return () => { window.removeEventListener('message', receive); clearTimeout(watchdog.current); };
  }, [onSolve]);
  function run() {
    const runId = crypto.randomUUID();
    activeRun.current = { runId, id }; setRunning(true); setResult(null);
    frame.current.contentWindow.postMessage({ type: 'run', code, tests: challenge.tests, runId }, '*');
    watchdog.current = setTimeout(() => { setRunning(false); setResult({error:'The environment did not respond. Reload the page and try again.'}); activeRun.current = null; }, 5000);
  }
  return <div className="lc-lab">
    <aside className="lc-panel"><span className="lc-eyebrow">PRACTICE COLLECTION</span><h2>Code, test, understand.</h2><p>JavaScript challenges with executable tests and edge cases.</p>{exercises.map(item => <button disabled={running} className={`lc-challenge ${id === item.id ? 'active' : ''}`} key={item.id} onClick={() => { setId(item.id); setResult(null); setHint(false); }}><strong>{solved.includes(item.id) ? '✓ ' : ''}{item.title}</strong><small>{item.level} · {item.concept}</small></button>)}</aside>
    <section className="lc-panel"><div className="lc-row"><span className="lc-tag">{challenge.level}</span><span className="lc-muted">JavaScript · browser runtime</span></div><h2>{challenge.title}</h2><p>{challenge.prompt}</p><label className="lc-editor-label" htmlFor="code-editor">solution.js <span>Draft saved on this device</span></label><textarea id="code-editor" className="lc-editor" spellCheck="false" value={code} onChange={event => update(id, event.target.value)} onKeyDown={event => { if (event.key === 'Tab') { event.preventDefault(); const start = event.currentTarget.selectionStart; const end = event.currentTarget.selectionEnd; update(id, code.slice(0, start) + '  ' + code.slice(end)); requestAnimationFrame(() => { event.target.selectionStart = event.target.selectionEnd = start + 2; }); } }} />
      <div className="lc-actions"><button className="lc-primary" disabled={!ready || running} onClick={run}>{running ? 'Running…' : ready ? '▶ Run tests' : 'Starting environment…'}</button><button disabled={running} onClick={() => { update(id, challenge.starter); setResult(null); }}>Reset code</button><button onClick={() => setHint(!hint)} aria-expanded={hint}>{hint ? 'Hide hint' : 'Get a hint'}</button></div>{hint && <p className="lc-notice">{challenge.hint}</p>}
      <div className="lc-output" role="status" aria-live="polite"><strong>Test output</strong>{!result && <p>{running ? 'Executing in an isolated worker…' : 'Run your solution to see expected and actual results.'}</p>}{result?.error && <p className="lc-fail">{result.error}</p>}{result?.results?.map((test, i) => <div key={i} className={test.passed ? 'lc-pass' : 'lc-fail'}><strong>{test.passed ? '✓ Pass' : '✕ Fail'} · Case {i + 1}</strong><pre>Input: {JSON.stringify(test.args)}{'\n'}Expected: {JSON.stringify(test.expected)}{'\n'}Actual: {test.error || JSON.stringify(test.actual)}</pre></div>)}{result?.logs?.length > 0 && <pre>{result.logs.join('\n')}</pre>}</div><p className="lc-muted">Isolated JavaScript runtime · no DOM, packages, or network · 3-second execution limit. Passing tests checks these cases, not algorithmic complexity.</p>
    </section><iframe ref={frame} title="Isolated JavaScript execution environment" sandbox="allow-scripts" srcDoc={frameDocument} hidden />
  </div>;
}
