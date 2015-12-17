import riot from 'riot';
import assert from 'assert';

const rootEl = document.getElementById('root');

function clearDom() {
  rootEl.innerHTML = '';
}

function insert({name, opts: opts = {}}) {
  let htmlAttrs = Object.keys(opts).map(function(key) {
    return `${key}="${opts[key]}"`;
  }).join(' ');
  rootEl.innerHTML = `<${name} ${htmlAttrs}></${name}>`;
}

export function setup({name, data: data = {}, htmlAttrs: htmlAttrs = {}}) {
  assert(name, '"name" is requried!');
  insert({name, opts: htmlAttrs});
  return riot.mount(name, data)[0];
}

export function teardown(component) {
  if(Boolean(component)) {
    component.unmount();
  }
  clearDom();
}

export function compileDummy({name, html, css, code}) {
  assert(name, '"name" is requried!');
  assert(code, '"code" is requried!');
  riot.tag(name, html, css, code);
}
