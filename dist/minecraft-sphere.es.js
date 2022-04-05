var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$5 = Symbol(), n$5 = /* @__PURE__ */ new Map();
class s$4 {
  constructor(t2, n2) {
    if (this._$cssResult$ = true, n2 !== e$5)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2;
  }
  get styleSheet() {
    let e2 = n$5.get(this.cssText);
    return t$3 && e2 === void 0 && (n$5.set(this.cssText, e2 = new CSSStyleSheet()), e2.replaceSync(this.cssText)), e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$3 = (t2) => new s$4(typeof t2 == "string" ? t2 : t2 + "", e$5), r$2 = (t2, ...n2) => {
  const o2 = t2.length === 1 ? t2[0] : n2.reduce((e2, n3, s2) => e2 + ((t3) => {
    if (t3._$cssResult$ === true)
      return t3.cssText;
    if (typeof t3 == "number")
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n3) + t2[s2 + 1], t2[0]);
  return new s$4(o2, e$5);
}, i$4 = (e2, n2) => {
  t$3 ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
  });
}, S$1 = t$3 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const n2 of t3.cssRules)
    e2 += n2.cssText;
  return o$3(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$3;
const e$4 = window.trustedTypes, r$1 = e$4 ? e$4.emptyScript : "", h$1 = window.reactiveElementPolyfillSupport, o$2 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? r$1 : null;
      break;
    case Object:
    case Array:
      t2 = t2 == null ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = t2 !== null;
      break;
    case Number:
      s2 = t2 === null ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, n$4 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$3 = { attribute: true, type: String, converter: o$2, reflect: false, hasChanged: n$4 };
class a$2 extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t2) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$3) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$3;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$1(i3));
    } else
      i2 !== void 0 && s2.push(S$1(i2));
    return s2;
  }
  static _$Eh(t2, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  o() {
    var t2;
    this._$Ep = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t2 = this.constructor.l) === null || t2 === void 0 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) === null || s2 === void 0 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.splice(this._$Eg.indexOf(t2) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = (t2 = this.shadowRoot) !== null && t2 !== void 0 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$4(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$ES(t2, i2, s2 = l$3) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t2, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$2.toAttribute)(i2, s2.type);
      this._$Ei = t2, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$Ei = null;
    }
  }
  _$AK(t2, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t2);
    if (n2 !== void 0 && this._$Ei !== n2) {
      const t3 = h2.getPropertyOptions(n2), l2 = t3.converter, a2 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o$2.fromAttribute;
      this._$Ei = n2, this[n2] = a2(i2, t3.type), this._$Ei = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    t2 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$4)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), s2.reflect === true && this._$Ei !== t2 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t3, i3) => this[i3] = t3), this._$Et = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
        var i3;
        return (i3 = t3.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$EU();
    } catch (t3) {
      throw i2 = false, this._$EU(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$EC !== void 0 && (this._$EC.forEach((t3, i2) => this._$ES(i2, this[i2], t3)), this._$EC = void 0), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
a$2.finalized = true, a$2.elementProperties = /* @__PURE__ */ new Map(), a$2.elementStyles = [], a$2.shadowRootOptions = { mode: "open" }, h$1 == null || h$1({ ReactiveElement: a$2 }), ((s$3 = globalThis.reactiveElementVersions) !== null && s$3 !== void 0 ? s$3 : globalThis.reactiveElementVersions = []).push("1.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;
const i$3 = globalThis.trustedTypes, s$2 = i$3 ? i$3.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$3 = `lit$${(Math.random() + "").slice(9)}$`, o$1 = "?" + e$3, n$3 = `<${o$1}>`, l$2 = document, h = (t2 = "") => l$2.createComment(t2), r = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", d = Array.isArray, u$2 = (t2) => {
  var i2;
  return d(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c$2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a$1 = />/g, f$1 = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m$1 = /"/g, g = /^(?:script|style|textarea|title)$/i, p = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), $ = p(1), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), T = /* @__PURE__ */ new WeakMap(), x = (t2, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(h(), t3), t3, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t2), l2;
}, A = l$2.createTreeWalker(l$2, 129, null, false), C = (t2, i2) => {
  const o2 = t2.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c$2;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t2[i3];
    let o3, u3, p2 = -1, $2 = 0;
    for (; $2 < s2.length && (d2.lastIndex = $2, u3 = d2.exec(s2), u3 !== null); )
      $2 = d2.lastIndex, d2 === c$2 ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a$1 : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f$1) : u3[3] !== void 0 && (d2 = f$1) : d2 === f$1 ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c$2, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f$1 : u3[3] === '"' ? m$1 : _) : d2 === m$1 || d2 === _ ? d2 = f$1 : d2 === v || d2 === a$1 ? d2 = c$2 : (d2 = f$1, h2 = void 0);
    const y = d2 === f$1 && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c$2 ? s2 + n$3 : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e$3 + y) : s2 + e$3 + (p2 === -2 ? (l2.push(void 0), i3) : y);
  }
  const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [s$2 !== void 0 ? s$2.createHTML(u2) : u2, l2];
};
class E {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s2);
    if (this.el = E.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$3)) {
              const s3 = a2[d2++];
              if (t3.push(i2), s3 !== void 0) {
                const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$3), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t4, ctor: i3[1] === "." ? M : i3[1] === "?" ? H : i3[1] === "@" ? I : S });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t3)
            l2.removeAttribute(i2);
        }
        if (g.test(l2.tagName)) {
          const t3 = l2.textContent.split(e$3), s3 = t3.length - 1;
          if (s3 > 0) {
            l2.textContent = i$3 ? i$3.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t3[i2], h()), A.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t3[s3], h());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$1)
          c2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; (t3 = l2.data.indexOf(e$3, t3 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t3 += e$3.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l$2.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function P(t2, i2, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i2 === b)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u2 = r(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
}
class V {
  constructor(t2, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l$2).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new L(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t2) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class N {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t2, i2;
    return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = P(this, t2, i2), r(t2) ? t2 === w || t2 == null || t2 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t2 !== this._$AH && t2 !== b && this.$(t2) : t2._$litType$ !== void 0 ? this.T(t2) : t2.nodeType !== void 0 ? this.k(t2) : u$2(t2) ? this.S(t2) : this.$(t2);
  }
  A(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  k(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.A(t2));
  }
  $(t2) {
    this._$AH !== w && r(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(l$2.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = E.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t3 = new V(o2, this), i3 = t3.p(this.options);
      t3.m(s2), this.k(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = T.get(t2.strings);
    return i2 === void 0 && T.set(t2.strings, i2 = new E(t2)), i2;
  }
  S(t2) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new N(this.A(h()), this.A(h()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
  }
}
class S {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t2 = P(this, t2, i2, 0), n2 = !r(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = P(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r(h2) || h2 !== this._$AH[l2]), h2 === w ? t2 = w : t2 !== w && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.C(t2);
  }
  C(t2) {
    t2 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t2) {
    this.element[this.name] = t2 === w ? void 0 : t2;
  }
}
const k = i$3 ? i$3.emptyScript : "";
class H extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t2) {
    t2 && t2 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
}
class I extends S {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = (s2 = P(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : w) === b)
      return;
    const e2 = this._$AH, o2 = t2 === w && e2 !== w || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== w && (e2 === w || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    P(this, t2);
  }
}
const R = { P: "$lit$", L: e$3, V: o$1, I: 1, N: C, R: V, D: u$2, j: P, H: N, O: S, F: H, B: I, W: M, Z: L }, z = window.litHtmlPolyfillSupport;
z == null || z(E, N), ((t$2 = globalThis.litHtmlVersions) !== null && t$2 !== void 0 ? t$2 : globalThis.litHtmlVersions = []).push("2.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l$1, o;
class s$1 extends a$2 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return (t2 = (e2 = this.renderOptions).renderBefore) !== null && t2 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Dt = x(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(false);
  }
  render() {
    return b;
  }
}
s$1.finalized = true, s$1._$litElement$ = true, (l$1 = globalThis.litElementHydrateSupport) === null || l$1 === void 0 || l$1.call(globalThis, { LitElement: s$1 });
const n$2 = globalThis.litElementPolyfillSupport;
n$2 == null || n$2({ LitElement: s$1 });
((o = globalThis.litElementVersions) !== null && o !== void 0 ? o : globalThis.litElementVersions = []).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = (n2) => (e2) => typeof e2 == "function" ? ((n3, e3) => (window.customElements.define(n3, e3), e3))(n2, e2) : ((n3, e3) => {
  const { kind: t2, elements: i2 } = e3;
  return { kind: t2, elements: i2, finisher(e4) {
    window.customElements.define(n3, e4);
  } };
})(n2, e2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$2 = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? __spreadProps(__spreadValues({}, e2), { finisher(n2) {
  n2.createProperty(e2.key, i2);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e$2(e2) {
  return (n2, t2) => t2 !== void 0 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t2) : i$2(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t$1(t2) {
  return e$2(__spreadProps(__spreadValues({}, t2), { state: true }));
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
((n = window.HTMLSlotElement) === null || n === void 0 ? void 0 : n.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i$1 {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { H: i } = R, e = () => document.createComment(""), u$1 = (o2, t2, n2) => {
  var v2;
  const l2 = o2._$AA.parentNode, d2 = t2 === void 0 ? o2._$AB : t2._$AA;
  if (n2 === void 0) {
    const t3 = l2.insertBefore(e(), d2), v3 = l2.insertBefore(e(), d2);
    n2 = new i(t3, v3, o2, o2.options);
  } else {
    const i2 = n2._$AB.nextSibling, t3 = n2._$AM, r2 = t3 !== o2;
    if (r2) {
      let i3;
      (v2 = n2._$AQ) === null || v2 === void 0 || v2.call(n2, o2), n2._$AM = o2, n2._$AP !== void 0 && (i3 = o2._$AU) !== t3._$AU && n2._$AP(i3);
    }
    if (i2 !== d2 || r2) {
      let o3 = n2._$AA;
      for (; o3 !== i2; ) {
        const i3 = o3.nextSibling;
        l2.insertBefore(o3, d2), o3 = i3;
      }
    }
  }
  return n2;
}, c$1 = (o2, i2, t2 = o2) => (o2._$AI(i2, t2), o2), f = {}, s = (o2, i2 = f) => o2._$AH = i2, a = (o2) => o2._$AH, m = (o2) => {
  var i2;
  (i2 = o2._$AP) === null || i2 === void 0 || i2.call(o2, false, true);
  let t2 = o2._$AA;
  const n2 = o2._$AB.nextSibling;
  for (; t2 !== n2; ) {
    const o3 = t2.nextSibling;
    t2.remove(), t2 = o3;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u = (e2, s2, t2) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s2; l2 <= t2; l2++)
    r2.set(e2[l2], l2);
  return r2;
}, c = e$1(class extends i$1 {
  constructor(e2) {
    if (super(e2), e2.type !== t.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t2) {
    let r2;
    t2 === void 0 ? t2 = s2 : s2 !== void 0 && (r2 = s2);
    const l2 = [], o2 = [];
    let i2 = 0;
    for (const s3 of e2)
      l2[i2] = r2 ? r2(s3, i2) : i2, o2[i2] = t2(s3, i2), i2++;
    return { values: o2, keys: l2 };
  }
  render(e2, s2, t2) {
    return this.dt(e2, s2, t2).values;
  }
  update(s$12, [t2, r2, c2]) {
    var d2;
    const a$12 = a(s$12), { values: p2, keys: v2 } = this.dt(t2, r2, c2);
    if (!Array.isArray(a$12))
      return this.ut = v2, p2;
    const h2 = (d2 = this.ut) !== null && d2 !== void 0 ? d2 : this.ut = [], m$12 = [];
    let y, x2, j = 0, k2 = a$12.length - 1, w2 = 0, A2 = p2.length - 1;
    for (; j <= k2 && w2 <= A2; )
      if (a$12[j] === null)
        j++;
      else if (a$12[k2] === null)
        k2--;
      else if (h2[j] === v2[w2])
        m$12[w2] = c$1(a$12[j], p2[w2]), j++, w2++;
      else if (h2[k2] === v2[A2])
        m$12[A2] = c$1(a$12[k2], p2[A2]), k2--, A2--;
      else if (h2[j] === v2[A2])
        m$12[A2] = c$1(a$12[j], p2[A2]), u$1(s$12, m$12[A2 + 1], a$12[j]), j++, A2--;
      else if (h2[k2] === v2[w2])
        m$12[w2] = c$1(a$12[k2], p2[w2]), u$1(s$12, a$12[j], a$12[k2]), k2--, w2++;
      else if (y === void 0 && (y = u(v2, w2, A2), x2 = u(h2, j, k2)), y.has(h2[j]))
        if (y.has(h2[k2])) {
          const e2 = x2.get(v2[w2]), t3 = e2 !== void 0 ? a$12[e2] : null;
          if (t3 === null) {
            const e3 = u$1(s$12, a$12[j]);
            c$1(e3, p2[w2]), m$12[w2] = e3;
          } else
            m$12[w2] = c$1(t3, p2[w2]), u$1(s$12, a$12[j], t3), a$12[e2] = null;
          w2++;
        } else
          m(a$12[k2]), k2--;
      else
        m(a$12[j]), j++;
    for (; w2 <= A2; ) {
      const e2 = u$1(s$12, m$12[A2 + 1]);
      c$1(e2, p2[w2]), m$12[w2++] = e2;
    }
    for (; j <= k2; ) {
      const e2 = a$12[j++];
      e2 !== null && m(e2);
    }
    return this.ut = v2, s(s$12, m$12), b;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l = (l2) => l2 != null ? l2 : w;
const ucFirst = (input) => {
  const replacer = (match, prefix, char) => {
    return prefix + char.toUpperCase();
  };
  return input.replace(/^([^a-z]*)([a-z])/i, replacer);
};
const makePos = (input) => {
  return input < 0 ? input *= -1 : input;
};
const normalise = (input) => {
  return input.replace(/[^a-z0-9 ]+/ig, " ").toLowerCase().trim();
};
const coordStr = (coordinates) => {
  return " " + coordinates.x.toString() + " " + coordinates.z.toString() + " " + coordinates.y.toString();
};
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key, result);
  return result;
};
const mineCraftBlocks = [
  { id: "acacia_boat", label: "Acacia Boat", norm: "acacia boat" },
  { id: "acacia_button", label: "Acacia Button", norm: "acacia button" },
  { id: "acacia_door", label: "Acacia Door", norm: "acacia door" },
  { id: "acacia_fence", label: "Acacia Fence", norm: "acacia fence" },
  { id: "acacia_fence_gate", label: "Acacia Fence Gate", norm: "acacia fence gate" },
  { id: "acacia_leaves", label: "Acacia Leaves", norm: "acacia leaves" },
  { id: "acacia_log", label: "Acacia Log", norm: "acacia log" },
  { id: "acacia_planks", label: "Acacia Planks", norm: "acacia planks" },
  { id: "acacia_pressure_plate", label: "Acacia Pressure Plate", norm: "acacia pressure plate" },
  { id: "acacia_sapling", label: "Acacia Sapling", norm: "acacia sapling" },
  { id: "acacia_sign", label: "Acacia Sign", norm: "acacia sign" },
  { id: "acacia_slab", label: "Acacia Slab", norm: "acacia slab" },
  { id: "acacia_stairs", label: "Acacia Stairs", norm: "acacia stairs" },
  { id: "acacia_trapdoor", label: "Acacia Trapdoor", norm: "acacia trapdoor" },
  { id: "acacia_wood", label: "Acacia Wood with Bark", norm: "acacia wood with bark" },
  { id: "activator_rail", label: "Activator Rails", norm: "activator rails" },
  { id: "air", label: "Air", norm: "air" },
  { id: "allium", label: "Allium", norm: "allium" },
  { id: "ancient_debris", label: "Ancient Debris", norm: "ancient debris" },
  { id: "andesite", label: "Andesite", norm: "andesite" },
  { id: "andesite_slab", label: "Andesite Slab", norm: "andesite slab" },
  { id: "andesite_stairs", label: "Andesite Stairs", norm: "andesite stairs" },
  { id: "andesite_wall", label: "Andesite Wall", norm: "andesite wall" },
  { id: "anvil", label: "Anvil", norm: "anvil" },
  { id: "apple", label: "Apple", norm: "apple" },
  { id: "armor_stand", label: "Armor Stand", norm: "armor stand" },
  { id: "arrow", label: "Arrow", norm: "arrow" },
  { id: "azure_bluet", label: "Azure Bluet", norm: "azure bluet" },
  { id: "baked_potato", label: "Baked Potato", norm: "baked potato" },
  { id: "bamboo", label: "Bamboo", norm: "bamboo" },
  { id: "barrel", label: "Barrel", norm: "barrel" },
  { id: "barrier", label: "Barrier", norm: "barrier" },
  { id: "basalt", label: "Basalt", norm: "basalt" },
  { id: "bat_spawn_egg", label: "Bat Spawn Egg", norm: "bat spawn egg" },
  { id: "beacon", label: "Beacon", norm: "beacon" },
  { id: "bedrock", label: "Bedrock", norm: "bedrock" },
  { id: "bee_nest", label: "Bee Nest", norm: "bee nest" },
  { id: "bee_spawn_egg", label: "Bee Spawn Egg", norm: "bee spawn egg" },
  { id: "beef", label: "Raw Beef", norm: "raw beef" },
  { id: "beehive", label: "Beehive", norm: "beehive" },
  { id: "beetroot", label: "Beetroot", norm: "beetroot" },
  { id: "beetroot_seeds", label: "Beetroot Seeds", norm: "beetroot seeds" },
  { id: "beetroot_soup", label: "Beetroot Soup", norm: "beetroot soup" },
  { id: "bell", label: "Bell", norm: "bell" },
  { id: "birch_boat", label: "Birch Boat", norm: "birch boat" },
  { id: "birch_button", label: "Birch Button", norm: "birch button" },
  { id: "birch_door", label: "Birch Door", norm: "birch door" },
  { id: "birch_fence", label: "Birch Fence", norm: "birch fence" },
  { id: "birch_fence_gate", label: "Birch Fence Gate", norm: "birch fence gate" },
  { id: "birch_leaves", label: "Birch Leaves", norm: "birch leaves" },
  { id: "birch_log", label: "Birch Log", norm: "birch log" },
  { id: "birch_planks", label: "Birch Planks", norm: "birch planks" },
  { id: "birch_pressure_plate", label: "Birch Pressure Plate", norm: "birch pressure plate" },
  { id: "birch_sapling", label: "Birch Sapling", norm: "birch sapling" },
  { id: "birch_sign", label: "Birch Sign", norm: "birch sign" },
  { id: "birch_slab", label: "Birch Slab", norm: "birch slab" },
  { id: "birch_stairs", label: "Birch Stairs", norm: "birch stairs" },
  { id: "birch_trapdoor", label: "Birch Trapdoor", norm: "birch trapdoor" },
  { id: "birch_wood", label: "Birch Wood with Bark", norm: "birch wood with bark" },
  { id: "black_banner", label: "Black Banner", norm: "black banner" },
  { id: "black_bed", label: "Black Bed", norm: "black bed" },
  { id: "black_carpet", label: "Black Carpet", norm: "black carpet" },
  { id: "black_concrete", label: "Black Concrete", norm: "black concrete" },
  { id: "black_concrete_powder", label: "Black Concrete Powder", norm: "black concrete powder" },
  { id: "black_dye", label: "Black Dye", norm: "black dye" },
  { id: "black_glazed_terracotta", label: "Black Glazed Terracotta", norm: "black glazed terracotta" },
  { id: "black_shulker_box", label: "Black Shulker Box", norm: "black shulker box" },
  { id: "black_stained_glass", label: "Black Stained Glass", norm: "black stained glass" },
  { id: "black_stained_glass_pane", label: "Black Stained Glass Pane", norm: "black stained glass pane" },
  { id: "black_terracotta", label: "Black Terracotta", norm: "black terracotta" },
  { id: "black_wool", label: "Black Wool", norm: "black wool" },
  { id: "blackstone", label: "Blackstone", norm: "blackstone" },
  { id: "blackstone_slab", label: "Blackstone Slab", norm: "blackstone slab" },
  { id: "blackstone_stairs", label: "Blackstone Stairs", norm: "blackstone stairs" },
  { id: "blackstone_wall", label: "Blackstone Wall", norm: "blackstone wall" },
  { id: "blast_furnace", label: "Blast Furnace", norm: "blast furnace" },
  { id: "blaze_powder", label: "Blaze Powder", norm: "blaze powder" },
  { id: "blaze_rod", label: "Blaze Rod", norm: "blaze rod" },
  { id: "blaze_spawn_egg", label: "Blaze Spawn Egg", norm: "blaze spawn egg" },
  { id: "blue_banner", label: "Blue Banner", norm: "blue banner" },
  { id: "blue_bed", label: "Blue Bed", norm: "blue bed" },
  { id: "blue_carpet", label: "Blue Carpet", norm: "blue carpet" },
  { id: "blue_concrete", label: "Blue Concrete", norm: "blue concrete" },
  { id: "blue_concrete_powder", label: "Blue Concrete Powder", norm: "blue concrete powder" },
  { id: "blue_dye", label: "Blue Dye", norm: "blue dye" },
  { id: "blue_glazed_terracotta", label: "Blue Glazed Terracotta", norm: "blue glazed terracotta" },
  { id: "blue_ice", label: "Blue Ice", norm: "blue ice" },
  { id: "blue_orchid", label: "Blue Orchid", norm: "blue orchid" },
  { id: "blue_shulker_box", label: "Blue Shulker Box", norm: "blue shulker box" },
  { id: "blue_stained_glass", label: "Blue Stained Glass", norm: "blue stained glass" },
  { id: "blue_stained_glass_pane", label: "Blue Stained Glass Pane", norm: "blue stained glass pane" },
  { id: "blue_terracotta", label: "Blue Terracotta", norm: "blue terracotta" },
  { id: "blue_wool", label: "Blue Wool", norm: "blue wool" },
  { id: "bone", label: "Bone", norm: "bone" },
  { id: "bone_block", label: "Bone Block", norm: "bone block" },
  { id: "bone_meal", label: "Bone Meal", norm: "bone meal" },
  { id: "book", label: "Book", norm: "book" },
  { id: "bookshelf", label: "Bookshelf", norm: "bookshelf" },
  { id: "bow", label: "Bow", norm: "bow" },
  { id: "bowl", label: "Bowl", norm: "bowl" },
  { id: "brain_coral", label: "Brain Coral", norm: "brain coral" },
  { id: "brain_coral_block", label: "Brain Coral Block", norm: "brain coral block" },
  { id: "brain_coral_fan", label: "Brain Coral Fan", norm: "brain coral fan" },
  { id: "bread", label: "Bread", norm: "bread" },
  { id: "brewing_stand", label: "Brewing Stand", norm: "brewing stand" },
  { id: "brick", label: "Brick", norm: "brick" },
  { id: "brick_slab", label: "Brick Slab", norm: "brick slab" },
  { id: "brick_stairs", label: "Brick Stairs", norm: "brick stairs" },
  { id: "brick_wall", label: "Brick Wall", norm: "brick wall" },
  { id: "bricks", label: "Bricks", norm: "bricks" },
  { id: "brown_banner", label: "Brown Banner", norm: "brown banner" },
  { id: "brown_bed", label: "Brown Bed", norm: "brown bed" },
  { id: "brown_carpet", label: "Brown Carpet", norm: "brown carpet" },
  { id: "brown_concrete", label: "Brown Concrete", norm: "brown concrete" },
  { id: "brown_concrete_powder", label: "Brown Concrete Powder", norm: "brown concrete powder" },
  { id: "brown_dye", label: "Brown Dye", norm: "brown dye" },
  { id: "brown_glazed_terracotta", label: "Brown Glazed Terracotta", norm: "brown glazed terracotta" },
  { id: "brown_mushroom", label: "Mushroom (brown)", norm: "mushroom  brown" },
  { id: "brown_mushroom_block", label: "Brown Mushroom Block", norm: "brown mushroom block" },
  { id: "brown_shulker_box", label: "Brown Shulker Box", norm: "brown shulker box" },
  { id: "brown_stained_glass", label: "Brown Stained Glass", norm: "brown stained glass" },
  { id: "brown_stained_glass_pane", label: "Brown Stained Glass Pane", norm: "brown stained glass pane" },
  { id: "brown_terracotta", label: "Brown Terracotta", norm: "brown terracotta" },
  { id: "brown_wool", label: "Brown Wool", norm: "brown wool" },
  { id: "bubble_coral", label: "Bubble Coral", norm: "bubble coral" },
  { id: "bubble_coral_block", label: "Bubble Coral Block", norm: "bubble coral block" },
  { id: "bubble_coral_fan", label: "Bubble Coral Fan", norm: "bubble coral fan" },
  { id: "bucket", label: "Bucket", norm: "bucket" },
  { id: "cactus", label: "Cactus", norm: "cactus" },
  { id: "cake", label: "Cake", norm: "cake" },
  { id: "campfire", label: "Campfire", norm: "campfire" },
  { id: "carrot", label: "Carrot", norm: "carrot" },
  { id: "carrot_on_a_stick", label: "Carrot on a Stick", norm: "carrot on a stick" },
  { id: "cartography_table", label: "Cartography Table", norm: "cartography table" },
  { id: "carved_pumpkin", label: "Carved Pumpkin", norm: "carved pumpkin" },
  { id: "cat_spawn_egg", label: "Cat Spawn Egg", norm: "cat spawn egg" },
  { id: "cauldron", label: "Cauldron", norm: "cauldron" },
  { id: "cave_spider_spawn_egg", label: "Cave Spider Spawn Egg", norm: "cave spider spawn egg" },
  { id: "chain", label: "Chain", norm: "chain" },
  { id: "chain_command_block", label: "Chain Command Block", norm: "chain command block" },
  { id: "chainmail_boots", label: "Chain Boots", norm: "chain boots" },
  { id: "chainmail_chestplate", label: "Chain Chestplate", norm: "chain chestplate" },
  { id: "chainmail_helmet", label: "Chain Helmet", norm: "chain helmet" },
  { id: "chainmail_leggings", label: "Chain Leggings", norm: "chain leggings" },
  { id: "charcoal", label: "Charcoal", norm: "charcoal" },
  { id: "chest", label: "Chest", norm: "chest" },
  { id: "chest_minecart", label: "Minecart with Chest", norm: "minecart with chest" },
  { id: "chicken", label: "Raw Chicken", norm: "raw chicken" },
  { id: "chicken_spawn_egg", label: "Chicken Spawn Egg", norm: "chicken spawn egg" },
  { id: "chipped_anvil", label: "Slightly Damaged Anvil", norm: "slightly damaged anvil" },
  { id: "chiseled_nether_bricks", label: "Chiseled Nether Bricks", norm: "chiseled nether bricks" },
  { id: "chiseled_polished_blackstone", label: "Chiseled Polished Blackstone", norm: "chiseled polished blackstone" },
  { id: "chiseled_quartz_block", label: "Chiseled Quartz Block", norm: "chiseled quartz block" },
  { id: "chiseled_red_sandstone", label: "Chiseled Red Sandstone", norm: "chiseled red sandstone" },
  { id: "chiseled_sandstone", label: "Chiseled Sandstone", norm: "chiseled sandstone" },
  { id: "chiseled_stone_bricks", label: "Chiseled Stone Bricks", norm: "chiseled stone bricks" },
  { id: "chorus_flower", label: "Chorus Flower", norm: "chorus flower" },
  { id: "chorus_fruit", label: "Chorus Fruit", norm: "chorus fruit" },
  { id: "chorus_plant", label: "Chorus Plant", norm: "chorus plant" },
  { id: "clay", label: "Clay Block", norm: "clay block" },
  { id: "clay_ball", label: "Clay", norm: "clay" },
  { id: "clock", label: "Clock", norm: "clock" },
  { id: "coal", label: "Coal", norm: "coal" },
  { id: "coal_block", label: "Coal Block", norm: "coal block" },
  { id: "coal_ore", label: "Coal Ore", norm: "coal ore" },
  { id: "coarse_dirt", label: "Coarse Dirt", norm: "coarse dirt" },
  { id: "cobblestone", label: "Cobblestone", norm: "cobblestone" },
  { id: "cobblestone_slab", label: "Cobblestone Slab", norm: "cobblestone slab" },
  { id: "cobblestone_stairs", label: "Cobblestone Stairs", norm: "cobblestone stairs" },
  { id: "cobblestone_wall", label: "Cobblestone Wall", norm: "cobblestone wall" },
  { id: "cobweb", label: "Cobweb", norm: "cobweb" },
  { id: "cocoa_beans", label: "Cocoa Beans", norm: "cocoa beans" },
  { id: "cod", label: "Raw Cod", norm: "raw cod" },
  { id: "cod_bucket", label: "Bucket of Cod", norm: "bucket of cod" },
  { id: "cod_spawn_egg", label: "Cod Spawn Egg", norm: "cod spawn egg" },
  { id: "command_block", label: "Command Block", norm: "command block" },
  { id: "command_block_minecart", label: "Minecart with Command Block", norm: "minecart with command block" },
  { id: "comparator", label: "Redstone Comparator", norm: "redstone comparator" },
  { id: "compass", label: "Compass", norm: "compass" },
  { id: "composter", label: "Composter", norm: "composter" },
  { id: "conduit", label: "Conduit", norm: "conduit" },
  { id: "cooked_beef", label: "Steak", norm: "steak" },
  { id: "cooked_chicken", label: "Cooked Chicken", norm: "cooked chicken" },
  { id: "cooked_cod", label: "Cooked Cod", norm: "cooked cod" },
  { id: "cooked_mutton", label: "Cooked Mutton", norm: "cooked mutton" },
  { id: "cooked_porkchop", label: "Cooked Porkchop", norm: "cooked porkchop" },
  { id: "cooked_rabbit", label: "Cooked Rabbit", norm: "cooked rabbit" },
  { id: "cooked_salmon", label: "Cooked Salmon", norm: "cooked salmon" },
  { id: "cookie", label: "Cookie", norm: "cookie" },
  { id: "cornflower", label: "Cornflower", norm: "cornflower" },
  { id: "cow_spawn_egg", label: "Cow Spawn Egg", norm: "cow spawn egg" },
  { id: "cracked_nether_bricks", label: "Cracked Nether Bricks", norm: "cracked nether bricks" },
  { id: "cracked_polished_blackstone_bricks", label: "Cracked Polished Blackstone Bricks", norm: "cracked polished blackstone bricks" },
  { id: "cracked_stone_bricks", label: "Cracked Stone Bricks", norm: "cracked stone bricks" },
  { id: "crafting_table", label: "Crafting Table", norm: "crafting table" },
  { id: "creeper_banner_pattern", label: "Creeper Charge Banner Pattern", norm: "creeper charge banner pattern" },
  { id: "creeper_head", label: "Creeper Head", norm: "creeper head" },
  { id: "creeper_spawn_egg", label: "Creeper Spawn Egg", norm: "creeper spawn egg" },
  { id: "crimson_button", label: "Crimson Button", norm: "crimson button" },
  { id: "crimson_door", label: "Crimson Door", norm: "crimson door" },
  { id: "crimson_fence", label: "Crimson Fence", norm: "crimson fence" },
  { id: "crimson_fence_gate", label: "Crimson Fence Gate", norm: "crimson fence gate" },
  { id: "crimson_fungus", label: "Crimson Fungus", norm: "crimson fungus" },
  { id: "crimson_hyphae", label: "Crimson Hyphae", norm: "crimson hyphae" },
  { id: "crimson_nylium", label: "Crimson Nylium", norm: "crimson nylium" },
  { id: "crimson_planks", label: "Crimson Planks", norm: "crimson planks" },
  { id: "crimson_pressure_plate", label: "Crimson Pressure Plate", norm: "crimson pressure plate" },
  { id: "crimson_roots", label: "Crimson Roots", norm: "crimson roots" },
  { id: "crimson_sign", label: "Crimson Sign", norm: "crimson sign" },
  { id: "crimson_slab", label: "Crimson Slab", norm: "crimson slab" },
  { id: "crimson_stairs", label: "Crimson Stairs", norm: "crimson stairs" },
  { id: "crimson_stem", label: "Crimson Stem", norm: "crimson stem" },
  { id: "crimson_trapdoor", label: "Crimson Trapdoor", norm: "crimson trapdoor" },
  { id: "crossbow", label: "Crossbow", norm: "crossbow" },
  { id: "crying_obsidian", label: "Crying Obsidian", norm: "crying obsidian" },
  { id: "cut_red_sandstone", label: "Cut Red Sandstone", norm: "cut red sandstone" },
  { id: "cut_red_sandstone_slab", label: "Cut Red Sandstone Slab", norm: "cut red sandstone slab" },
  { id: "cut_sandstone", label: "Cut Sandstone", norm: "cut sandstone" },
  { id: "cut_sandstone_slab", label: "Cut Sandstone Slab", norm: "cut sandstone slab" },
  { id: "cyan_banner", label: "Cyan Banner", norm: "cyan banner" },
  { id: "cyan_bed", label: "Cyan Bed", norm: "cyan bed" },
  { id: "cyan_carpet", label: "Cyan Carpet", norm: "cyan carpet" },
  { id: "cyan_concrete", label: "Cyan Concrete", norm: "cyan concrete" },
  { id: "cyan_concrete_powder", label: "Cyan Concrete Powder", norm: "cyan concrete powder" },
  { id: "cyan_dye", label: "Cyan Dye", norm: "cyan dye" },
  { id: "cyan_glazed_terracotta", label: "Cyan Glazed Terracotta", norm: "cyan glazed terracotta" },
  { id: "cyan_shulker_box", label: "Cyan Shulker Box", norm: "cyan shulker box" },
  { id: "cyan_stained_glass", label: "Cyan Stained Glass", norm: "cyan stained glass" },
  { id: "cyan_stained_glass_pane", label: "Cyan Stained Glass Pane", norm: "cyan stained glass pane" },
  { id: "cyan_terracotta", label: "Cyan Terracotta", norm: "cyan terracotta" },
  { id: "cyan_wool", label: "Cyan Wool", norm: "cyan wool" },
  { id: "damaged_anvil", label: "Very Damaged Anvil", norm: "very damaged anvil" },
  { id: "dandelion", label: "Dandelion", norm: "dandelion" },
  { id: "dark_oak_boat", label: "Dark Oak Boat", norm: "dark oak boat" },
  { id: "dark_oak_button", label: "Dark Oak Button", norm: "dark oak button" },
  { id: "dark_oak_door", label: "Dark Oak Door", norm: "dark oak door" },
  { id: "dark_oak_fence", label: "Dark Oak Fence", norm: "dark oak fence" },
  { id: "dark_oak_fence_gate", label: "Dark Oak Fence Gate", norm: "dark oak fence gate" },
  { id: "dark_oak_leaves", label: "Dark Oak Leaves", norm: "dark oak leaves" },
  { id: "dark_oak_log", label: "Dark Oak Log", norm: "dark oak log" },
  { id: "dark_oak_planks", label: "Dark Oak Planks", norm: "dark oak planks" },
  { id: "dark_oak_pressure_plate", label: "Dark Oak Pressure Plate", norm: "dark oak pressure plate" },
  { id: "dark_oak_sapling", label: "Dark Oak Sapling", norm: "dark oak sapling" },
  { id: "dark_oak_sign", label: "Dark Oak Sign", norm: "dark oak sign" },
  { id: "dark_oak_slab", label: "Dark Oak Slab", norm: "dark oak slab" },
  { id: "dark_oak_stairs", label: "Dark Oak Stairs", norm: "dark oak stairs" },
  { id: "dark_oak_trapdoor", label: "Dark Oak Trapdoor", norm: "dark oak trapdoor" },
  { id: "dark_oak_wood", label: "Dark Oak Wood with Bark", norm: "dark oak wood with bark" },
  { id: "dark_prismarine", label: "Dark Prismarine", norm: "dark prismarine" },
  { id: "dark_prismarine_slab", label: "Dark Prismarine Slab", norm: "dark prismarine slab" },
  { id: "dark_prismarine_stairs", label: "Dark Prismarine Stairs", norm: "dark prismarine stairs" },
  { id: "daylight_detector", label: "Daylight Sensor", norm: "daylight sensor" },
  { id: "dead_brain_coral", label: "Dead Brain Coral", norm: "dead brain coral" },
  { id: "dead_brain_coral_block", label: "Dead Brain Coral Block", norm: "dead brain coral block" },
  { id: "dead_brain_coral_fan", label: "Dead Brain Coral Fan", norm: "dead brain coral fan" },
  { id: "dead_bubble_coral", label: "Dead Bubble Coral", norm: "dead bubble coral" },
  { id: "dead_bubble_coral_block", label: "Dead Bubble Coral Block", norm: "dead bubble coral block" },
  { id: "dead_bubble_coral_fan", label: "Dead Bubble Coral Fan", norm: "dead bubble coral fan" },
  { id: "dead_bush", label: "Dead Bush", norm: "dead bush" },
  { id: "dead_fire_coral", label: "Dead Fire Coral", norm: "dead fire coral" },
  { id: "dead_fire_coral_block", label: "Dead Fire Coral Block", norm: "dead fire coral block" },
  { id: "dead_fire_coral_fan", label: "Dead Fire Coral Fan", norm: "dead fire coral fan" },
  { id: "dead_horn_coral", label: "Dead Horn Coral", norm: "dead horn coral" },
  { id: "dead_horn_coral_block", label: "Dead Horn Coral Block", norm: "dead horn coral block" },
  { id: "dead_horn_coral_fan", label: "Dead Horn Coral Fan", norm: "dead horn coral fan" },
  { id: "dead_tube_coral", label: "Dead Tube Coral", norm: "dead tube coral" },
  { id: "dead_tube_coral_block", label: "Dead Tube Coral Block", norm: "dead tube coral block" },
  { id: "dead_tube_coral_fan", label: "Dead Tube Coral Fan", norm: "dead tube coral fan" },
  { id: "debug_stick", label: "Debug Stick", norm: "debug stick" },
  { id: "detector_rail", label: "Detector Rails", norm: "detector rails" },
  { id: "diamond", label: "Diamond", norm: "diamond" },
  { id: "diamond_axe", label: "Diamond Axe", norm: "diamond axe" },
  { id: "diamond_block", label: "Block of Diamond", norm: "block of diamond" },
  { id: "diamond_boots", label: "Diamond Boots", norm: "diamond boots" },
  { id: "diamond_chestplate", label: "Diamond Chestplate", norm: "diamond chestplate" },
  { id: "diamond_helmet", label: "Diamond Helmet", norm: "diamond helmet" },
  { id: "diamond_hoe", label: "Diamond Hoe", norm: "diamond hoe" },
  { id: "diamond_horse_armor", label: "Diamond Horse Armor", norm: "diamond horse armor" },
  { id: "diamond_leggings", label: "Diamond Leggings", norm: "diamond leggings" },
  { id: "diamond_ore", label: "Diamond Ore", norm: "diamond ore" },
  { id: "diamond_pickaxe", label: "Diamond Pickaxe", norm: "diamond pickaxe" },
  { id: "diamond_shovel", label: "Diamond Shovel", norm: "diamond shovel" },
  { id: "diamond_sword", label: "Diamond Sword", norm: "diamond sword" },
  { id: "diorite", label: "Diorite", norm: "diorite" },
  { id: "diorite_slab", label: "Diorite Slab", norm: "diorite slab" },
  { id: "diorite_stairs", label: "Diorite Stairs", norm: "diorite stairs" },
  { id: "diorite_wall", label: "Diorite Wall", norm: "diorite wall" },
  { id: "dirt", label: "Dirt", norm: "dirt" },
  { id: "dispenser", label: "Dispenser", norm: "dispenser" },
  { id: "dolphin_spawn_egg", label: "Dolphin Spawn Egg", norm: "dolphin spawn egg" },
  { id: "donkey_spawn_egg", label: "Donkey Spawn Egg", norm: "donkey spawn egg" },
  { id: "dragon_breath", label: "Dragon's Breath", norm: "dragon s breath" },
  { id: "dragon_egg", label: "Dragon Egg", norm: "dragon egg" },
  { id: "dragon_head", label: "Dragon Head", norm: "dragon head" },
  { id: "dried_kelp", label: "Dried Kelp", norm: "dried kelp" },
  { id: "dried_kelp_block", label: "Dried Kelp Block", norm: "dried kelp block" },
  { id: "dropper", label: "Dropper", norm: "dropper" },
  { id: "drowned_spawn_egg", label: "Drowned Spawn Egg", norm: "drowned spawn egg" },
  { id: "egg", label: "Egg", norm: "egg" },
  { id: "elder_guardian_spawn_egg", label: "Elder Guardian Spawn Egg", norm: "elder guardian spawn egg" },
  { id: "elytra", label: "Elytra", norm: "elytra" },
  { id: "emerald", label: "Emerald", norm: "emerald" },
  { id: "emerald_block", label: "Block of Emerald", norm: "block of emerald" },
  { id: "emerald_ore", label: "Emerald Ore", norm: "emerald ore" },
  { id: "enchanted_book", label: "Enchanted Book", norm: "enchanted book" },
  { id: "enchanted_golden_apple", label: "Enchanted Golden Apple", norm: "enchanted golden apple" },
  { id: "enchanting_table", label: "Enchanting Table", norm: "enchanting table" },
  { id: "end_crystal", label: "End Crystal", norm: "end crystal" },
  { id: "end_portal_frame", label: "End Portal Frame", norm: "end portal frame" },
  { id: "end_rod", label: "End Rod", norm: "end rod" },
  { id: "end_stone", label: "End Stone", norm: "end stone" },
  { id: "end_stone_brick_slab", label: "End Stone Brick Slab", norm: "end stone brick slab" },
  { id: "end_stone_brick_stairs", label: "End Stone Brick Stairs", norm: "end stone brick stairs" },
  { id: "end_stone_brick_wall", label: "End Stone Brick Wall", norm: "end stone brick wall" },
  { id: "end_stone_bricks", label: "End Stone Bricks", norm: "end stone bricks" },
  { id: "ender_chest", label: "Ender Chest", norm: "ender chest" },
  { id: "ender_eye", label: "Eye of Ender", norm: "eye of ender" },
  { id: "ender_pearl", label: "Ender Pearl", norm: "ender pearl" },
  { id: "enderman_spawn_egg", label: "Enderman Spawn Egg", norm: "enderman spawn egg" },
  { id: "endermite_spawn_egg", label: "Endermite Spawn Egg", norm: "endermite spawn egg" },
  { id: "evoker_spawn_egg", label: "Evoker Spawn Egg", norm: "evoker spawn egg" },
  { id: "experience_bottle", label: "Bottle o'Enchanting", norm: "bottle o enchanting" },
  { id: "farmland", label: "Farmland", norm: "farmland" },
  { id: "feather", label: "Feather", norm: "feather" },
  { id: "fermented_spider_eye", label: "Fermented Spider Eye", norm: "fermented spider eye" },
  { id: "fern", label: "Fern", norm: "fern" },
  { id: "filled_map", label: "Map (Filled)", norm: "map  filled" },
  { id: "fire_charge", label: "Fire Charge", norm: "fire charge" },
  { id: "fire_coral", label: "Fire Coral", norm: "fire coral" },
  { id: "fire_coral_block", label: "Fire Coral Block", norm: "fire coral block" },
  { id: "fire_coral_fan", label: "Fire Coral Fan", norm: "fire coral fan" },
  { id: "firework_rocket", label: "Firework Rocket", norm: "firework rocket" },
  { id: "firework_star", label: "Firework Star", norm: "firework star" },
  { id: "fishing_rod", label: "Fishing Rod", norm: "fishing rod" },
  { id: "fletching_table", label: "Fletching Table", norm: "fletching table" },
  { id: "flint", label: "Flint", norm: "flint" },
  { id: "flint_and_steel", label: "Flint and Steel", norm: "flint and steel" },
  { id: "flower_banner_pattern", label: "Flower Charge Banner Pattern", norm: "flower charge banner pattern" },
  { id: "flower_pot", label: "Flower Pot", norm: "flower pot" },
  { id: "fox_spawn_egg", label: "Fox Spawn Egg", norm: "fox spawn egg" },
  { id: "furnace", label: "Furnace", norm: "furnace" },
  { id: "furnace_minecart", label: "Minecart with Furnace", norm: "minecart with furnace" },
  { id: "ghast_spawn_egg", label: "Ghast Spawn Egg", norm: "ghast spawn egg" },
  { id: "ghast_tear", label: "Ghast Tear", norm: "ghast tear" },
  { id: "gilded_blackstone", label: "Gilded Blackstone", norm: "gilded blackstone" },
  { id: "glass", label: "Glass", norm: "glass" },
  { id: "glass_bottle", label: "Glass Bottle", norm: "glass bottle" },
  { id: "glass_pane", label: "Glass Pane", norm: "glass pane" },
  { id: "glistering_melon_slice", label: "Glistering Melon", norm: "glistering melon" },
  { id: "globe_banner_pattern", label: "Globe Banner Pattern", norm: "globe banner pattern" },
  { id: "glowstone", label: "Glowstone", norm: "glowstone" },
  { id: "glowstone_dust", label: "Glowstone Dust", norm: "glowstone dust" },
  { id: "gold_block", label: "Block of Gold", norm: "block of gold" },
  { id: "gold_ingot", label: "Gold Ingot", norm: "gold ingot" },
  { id: "gold_nugget", label: "Gold Nugget", norm: "gold nugget" },
  { id: "gold_ore", label: "Gold Ore", norm: "gold ore" },
  { id: "golden_apple", label: "Golden Apple", norm: "golden apple" },
  { id: "golden_axe", label: "Golden Axe", norm: "golden axe" },
  { id: "golden_boots", label: "Golden Boots", norm: "golden boots" },
  { id: "golden_carrot", label: "Golden Carrot", norm: "golden carrot" },
  { id: "golden_chestplate", label: "Golden Chestplate", norm: "golden chestplate" },
  { id: "golden_helmet", label: "Golden Helmet", norm: "golden helmet" },
  { id: "golden_hoe", label: "Golden Hoe", norm: "golden hoe" },
  { id: "golden_horse_armor", label: "Gold Horse Armor", norm: "gold horse armor" },
  { id: "golden_leggings", label: "Golden Leggings", norm: "golden leggings" },
  { id: "golden_pickaxe", label: "Golden Pickaxe", norm: "golden pickaxe" },
  { id: "golden_shovel", label: "Golden Shovel", norm: "golden shovel" },
  { id: "golden_sword", label: "Golden Sword", norm: "golden sword" },
  { id: "granite", label: "Granite", norm: "granite" },
  { id: "granite_slab", label: "Granite Slab", norm: "granite slab" },
  { id: "granite_stairs", label: "Granite Stairs", norm: "granite stairs" },
  { id: "granite_wall", label: "Granite Wall", norm: "granite wall" },
  { id: "grass", label: "Grass", norm: "grass" },
  { id: "grass_block", label: "Grass Block", norm: "grass block" },
  { id: "grass_path", label: "Dirt Path", norm: "dirt path" },
  { id: "gravel", label: "Gravel", norm: "gravel" },
  { id: "gray_banner", label: "Gray Banner", norm: "gray banner" },
  { id: "gray_bed", label: "Gray Bed", norm: "gray bed" },
  { id: "gray_carpet", label: "Gray Carpet", norm: "gray carpet" },
  { id: "gray_concrete", label: "Gray Concrete", norm: "gray concrete" },
  { id: "gray_concrete_powder", label: "Gray Concrete Powder", norm: "gray concrete powder" },
  { id: "gray_dye", label: "Gray Dye", norm: "gray dye" },
  { id: "gray_glazed_terracotta", label: "Gray Glazed Terracotta", norm: "gray glazed terracotta" },
  { id: "gray_shulker_box", label: "Gray Shulker Box", norm: "gray shulker box" },
  { id: "gray_stained_glass", label: "Gray Stained Glass", norm: "gray stained glass" },
  { id: "gray_stained_glass_pane", label: "Gray Stained Glass Pane", norm: "gray stained glass pane" },
  { id: "gray_terracotta", label: "Gray Terracotta", norm: "gray terracotta" },
  { id: "gray_wool", label: "Gray Wool", norm: "gray wool" },
  { id: "green_banner", label: "Green Banner", norm: "green banner" },
  { id: "green_bed", label: "Green Bed", norm: "green bed" },
  { id: "green_carpet", label: "Green Carpet", norm: "green carpet" },
  { id: "green_concrete", label: "Green Concrete", norm: "green concrete" },
  { id: "green_concrete_powder", label: "Green Concrete Powder", norm: "green concrete powder" },
  { id: "green_dye", label: "Green Dye", norm: "green dye" },
  { id: "green_glazed_terracotta", label: "Green Glazed Terracotta", norm: "green glazed terracotta" },
  { id: "green_shulker_box", label: "Green Shulker Box", norm: "green shulker box" },
  { id: "green_stained_glass", label: "Green Stained Glass", norm: "green stained glass" },
  { id: "green_stained_glass_pane", label: "Green Stained Glass Pane", norm: "green stained glass pane" },
  { id: "green_terracotta", label: "Green Terracotta", norm: "green terracotta" },
  { id: "green_wool", label: "Green Wool", norm: "green wool" },
  { id: "grindstone", label: "Grindstone", norm: "grindstone" },
  { id: "guardian_spawn_egg", label: "Guardian Spawn Egg", norm: "guardian spawn egg" },
  { id: "gunpowder", label: "Gunpowder", norm: "gunpowder" },
  { id: "hay_block", label: "Hay Bale", norm: "hay bale" },
  { id: "heart_of_the_sea", label: "Heart of the Sea", norm: "heart of the sea" },
  { id: "heavy_weighted_pressure_plate", label: "Heavy Weighted Pressure Plate", norm: "heavy weighted pressure plate" },
  { id: "hoglin_spawn_egg", label: "Hoglin Spawn Egg", norm: "hoglin spawn egg" },
  { id: "honey_block", label: "Honey Block", norm: "honey block" },
  { id: "honey_bottle", label: "Honey Bottle", norm: "honey bottle" },
  { id: "honeycomb", label: "Honeycomb", norm: "honeycomb" },
  { id: "honeycomb_block", label: "Honeycomb Block", norm: "honeycomb block" },
  { id: "hopper", label: "Hopper", norm: "hopper" },
  { id: "hopper_minecart", label: "Minecart with Hopper", norm: "minecart with hopper" },
  { id: "horn_coral", label: "Horn Coral", norm: "horn coral" },
  { id: "horn_coral_block", label: "Horn Coral Block", norm: "horn coral block" },
  { id: "horn_coral_fan", label: "Horn Coral Fan", norm: "horn coral fan" },
  { id: "horse_spawn_egg", label: "Horse Spawn Egg", norm: "horse spawn egg" },
  { id: "husk_spawn_egg", label: "Husk Spawn Egg", norm: "husk spawn egg" },
  { id: "ice", label: "Ice", norm: "ice" },
  { id: "infested_chiseled_stone_bricks", label: "Infested Chiseled Stone Bricks", norm: "infested chiseled stone bricks" },
  { id: "infested_cobblestone", label: "Infested Cobblestone", norm: "infested cobblestone" },
  { id: "infested_cracked_stone_bricks", label: "Infested Cracked Stone Bricks", norm: "infested cracked stone bricks" },
  { id: "infested_mossy_stone_bricks", label: "Infested Mossy Stone Bricks", norm: "infested mossy stone bricks" },
  { id: "infested_stone", label: "Infested Stone", norm: "infested stone" },
  { id: "infested_stone_bricks", label: "Infested Stone Bricks", norm: "infested stone bricks" },
  { id: "ink_sac", label: "Ink Sac", norm: "ink sac" },
  { id: "iron_axe", label: "Iron Axe", norm: "iron axe" },
  { id: "iron_bars", label: "Iron Bars", norm: "iron bars" },
  { id: "iron_block", label: "Block of Iron", norm: "block of iron" },
  { id: "iron_boots", label: "Iron Boots", norm: "iron boots" },
  { id: "iron_chestplate", label: "Iron Chestplate", norm: "iron chestplate" },
  { id: "iron_door", label: "Iron Door", norm: "iron door" },
  { id: "iron_helmet", label: "Iron Helmet", norm: "iron helmet" },
  { id: "iron_hoe", label: "Iron Hoe", norm: "iron hoe" },
  { id: "iron_horse_armor", label: "Iron Horse Armor", norm: "iron horse armor" },
  { id: "iron_ingot", label: "Iron Ingot", norm: "iron ingot" },
  { id: "iron_leggings", label: "Iron Leggings", norm: "iron leggings" },
  { id: "iron_nugget", label: "Iron Nugget", norm: "iron nugget" },
  { id: "iron_ore", label: "Iron Ore", norm: "iron ore" },
  { id: "iron_pickaxe", label: "Iron Pickaxe", norm: "iron pickaxe" },
  { id: "iron_shovel", label: "Iron Shovel", norm: "iron shovel" },
  { id: "iron_sword", label: "Iron Sword", norm: "iron sword" },
  { id: "iron_trapdoor", label: "Iron Trapdoor", norm: "iron trapdoor" },
  { id: "item_frame", label: "Item Frame", norm: "item frame" },
  { id: "jack_o_lantern", label: "Jack o'Lantern", norm: "jack o lantern" },
  { id: "jigsaw", label: "Jigsaw Block", norm: "jigsaw block" },
  { id: "jukebox", label: "Jukebox", norm: "jukebox" },
  { id: "jungle_boat", label: "Jungle Boat", norm: "jungle boat" },
  { id: "jungle_button", label: "Jungle Button", norm: "jungle button" },
  { id: "jungle_door", label: "Jungle Door", norm: "jungle door" },
  { id: "jungle_fence", label: "Jungle Fence", norm: "jungle fence" },
  { id: "jungle_fence_gate", label: "Jungle Fence Gate", norm: "jungle fence gate" },
  { id: "jungle_leaves", label: "Jungle Leaves", norm: "jungle leaves" },
  { id: "jungle_log", label: "Jungle Log", norm: "jungle log" },
  { id: "jungle_planks", label: "Jungle Planks", norm: "jungle planks" },
  { id: "jungle_pressure_plate", label: "Jungle Pressure Plate", norm: "jungle pressure plate" },
  { id: "jungle_sapling", label: "Jungle Sapling", norm: "jungle sapling" },
  { id: "jungle_sign", label: "Jungle Sign", norm: "jungle sign" },
  { id: "jungle_slab", label: "Jungle Slab", norm: "jungle slab" },
  { id: "jungle_stairs", label: "Jungle Stairs", norm: "jungle stairs" },
  { id: "jungle_trapdoor", label: "Jungle Trapdoor", norm: "jungle trapdoor" },
  { id: "jungle_wood", label: "Jungle Wood with Bark", norm: "jungle wood with bark" },
  { id: "kelp", label: "Kelp", norm: "kelp" },
  { id: "knowledge_book", label: "Knowledge Book", norm: "knowledge book" },
  { id: "ladder", label: "Ladder", norm: "ladder" },
  { id: "lantern", label: "Lantern", norm: "lantern" },
  { id: "lapis_block", label: "Lapis Lazuli Block", norm: "lapis lazuli block" },
  { id: "lapis_lazuli", label: "Lapis Lazuli", norm: "lapis lazuli" },
  { id: "lapis_ore", label: "Lapis Lazuli Ore", norm: "lapis lazuli ore" },
  { id: "large_fern", label: "Large Fern", norm: "large fern" },
  { id: "lava", label: "Lava", norm: "lava" },
  { id: "lava_bucket", label: "Lava Bucket", norm: "lava bucket" },
  { id: "lead", label: "Lead", norm: "lead" },
  { id: "leather", label: "Leather", norm: "leather" },
  { id: "leather_boots", label: "Leather Boots", norm: "leather boots" },
  { id: "leather_chestplate", label: "Leather Tunic", norm: "leather tunic" },
  { id: "leather_helmet", label: "Leather Cap", norm: "leather cap" },
  { id: "leather_horse_armor", label: "Leather Horse Armor", norm: "leather horse armor" },
  { id: "leather_leggings", label: "Leather Pants", norm: "leather pants" },
  { id: "lectern", label: "Lecturn", norm: "lecturn" },
  { id: "lever", label: "Lever", norm: "lever" },
  { id: "light_blue_banner", label: "Light Blue Banner", norm: "light blue banner" },
  { id: "light_blue_bed", label: "Light Blue Bed", norm: "light blue bed" },
  { id: "light_blue_carpet", label: "Light Blue Carpet", norm: "light blue carpet" },
  { id: "light_blue_concrete", label: "Light Blue Concrete", norm: "light blue concrete" },
  { id: "light_blue_concrete_powder", label: "Light Blue Concrete Powder", norm: "light blue concrete powder" },
  { id: "light_blue_dye", label: "Light Blue Dye", norm: "light blue dye" },
  { id: "light_blue_glazed_terracotta", label: "Light Blue Glazed Terracotta", norm: "light blue glazed terracotta" },
  { id: "light_blue_shulker_box", label: "Light Blue Shulker Box", norm: "light blue shulker box" },
  { id: "light_blue_stained_glass", label: "Light Blue Stained Glass", norm: "light blue stained glass" },
  { id: "light_blue_stained_glass_pane", label: "Light Blue Stained Glass Pane", norm: "light blue stained glass pane" },
  { id: "light_blue_terracotta", label: "Light Blue Terracotta", norm: "light blue terracotta" },
  { id: "light_blue_wool", label: "Light Blue Wool", norm: "light blue wool" },
  { id: "light_gray_banner", label: "Light Gray Banner", norm: "light gray banner" },
  { id: "light_gray_bed", label: "Light Gray Bed", norm: "light gray bed" },
  { id: "light_gray_carpet", label: "Light Gray Carpet", norm: "light gray carpet" },
  { id: "light_gray_concrete", label: "Light Gray Concrete", norm: "light gray concrete" },
  { id: "light_gray_concrete_powder", label: "Light Gray Concrete Powder", norm: "light gray concrete powder" },
  { id: "light_gray_dye", label: "Light Gray Dye", norm: "light gray dye" },
  { id: "light_gray_glazed_terracotta", label: "Light Gray Glazed Terracotta", norm: "light gray glazed terracotta" },
  { id: "light_gray_shulker_box", label: "Light Gray Shulker Box", norm: "light gray shulker box" },
  { id: "light_gray_stained_glass", label: "Light Gray Stained Glass", norm: "light gray stained glass" },
  { id: "light_gray_stained_glass_pane", label: "Light Gray Stained Glass Pane", norm: "light gray stained glass pane" },
  { id: "light_gray_terracotta", label: "Light Gray Terracotta", norm: "light gray terracotta" },
  { id: "light_gray_wool", label: "Light Gray Wool", norm: "light gray wool" },
  { id: "light_weighted_pressure_plate", label: "Light Weighted Pressure Plate", norm: "light weighted pressure plate" },
  { id: "lilac", label: "Lilac", norm: "lilac" },
  { id: "lily_of_the_valley", label: "Lily of the Valley", norm: "lily of the valley" },
  { id: "lily_pad", label: "Lily Pad", norm: "lily pad" },
  { id: "lime_banner", label: "Lime Banner", norm: "lime banner" },
  { id: "lime_bed", label: "Lime Bed", norm: "lime bed" },
  { id: "lime_carpet", label: "Lime Carpet", norm: "lime carpet" },
  { id: "lime_concrete", label: "Lime Concrete", norm: "lime concrete" },
  { id: "lime_concrete_powder", label: "Lime Concrete Powder", norm: "lime concrete powder" },
  { id: "lime_dye", label: "Lime Dye", norm: "lime dye" },
  { id: "lime_glazed_terracotta", label: "Lime Glazed Terracotta", norm: "lime glazed terracotta" },
  { id: "lime_shulker_box", label: "Lime Shulker Box", norm: "lime shulker box" },
  { id: "lime_stained_glass", label: "Lime Stained Glass", norm: "lime stained glass" },
  { id: "lime_stained_glass_pane", label: "Lime Stained Glass Pane", norm: "lime stained glass pane" },
  { id: "lime_terracotta", label: "Lime Terracotta", norm: "lime terracotta" },
  { id: "lime_wool", label: "Lime Wool", norm: "lime wool" },
  { id: "lingering_potion", label: "Lingering Potion of Fire Resistance (0:45)", norm: "lingering potion of fire resistance  0 45" },
  { id: "lingering_potion", label: "Lingering Potion of Fire Resistance (2:00)", norm: "lingering potion of fire resistance  2 00" },
  { id: "lingering_potion", label: "Lingering Potion of Harming (Instant Damage II)", norm: "lingering potion of harming  instant damage ii" },
  { id: "lingering_potion", label: "Lingering Potion of Harming (Instant Damage)", norm: "lingering potion of harming  instant damage" },
  { id: "lingering_potion", label: "Lingering Potion of Healing (Instant Health II)", norm: "lingering potion of healing  instant health ii" },
  { id: "lingering_potion", label: "Lingering Potion of Healing (Instant Health)", norm: "lingering potion of healing  instant health" },
  { id: "lingering_potion", label: "Lingering Potion of Invisibility (0:45)", norm: "lingering potion of invisibility  0 45" },
  { id: "lingering_potion", label: "Lingering Potion of Invisibility (2:00)", norm: "lingering potion of invisibility  2 00" },
  { id: "lingering_potion", label: "Lingering Potion of Leaping (0:22 - Jump Boost II)", norm: "lingering potion of leaping  0 22   jump boost ii" },
  { id: "lingering_potion", label: "Lingering Potion of Leaping (0:45 - Jump Boost)", norm: "lingering potion of leaping  0 45   jump boost" },
  { id: "lingering_potion", label: "Lingering Potion of Leaping (2:00 - Jump Boost)", norm: "lingering potion of leaping  2 00   jump boost" },
  { id: "lingering_potion", label: "Lingering Potion of Luck (1:15)", norm: "lingering potion of luck  1 15" },
  { id: "lingering_potion", label: "Lingering Potion of Night Vision (0:45)", norm: "lingering potion of night vision  0 45" },
  { id: "lingering_potion", label: "Lingering Potion of Night Vision (2:00)", norm: "lingering potion of night vision  2 00" },
  { id: "lingering_potion", label: "Lingering Potion of Poison (0:05 - Poison II)", norm: "lingering potion of poison  0 05   poison ii" },
  { id: "lingering_potion", label: "Lingering Potion of Poison (0:11)", norm: "lingering potion of poison  0 11" },
  { id: "lingering_potion", label: "Lingering Potion of Poison (0:22)", norm: "lingering potion of poison  0 22" },
  { id: "lingering_potion", label: "Lingering Potion of Regeneration (0:05 - Regeneration II)", norm: "lingering potion of regeneration  0 05   regeneration ii" },
  { id: "lingering_potion", label: "Lingering Potion of Regeneration (0:11)", norm: "lingering potion of regeneration  0 11" },
  { id: "lingering_potion", label: "Lingering Potion of Regeneration (0:22)", norm: "lingering potion of regeneration  0 22" },
  { id: "lingering_potion", label: "Lingering Potion of Slow Falling (0:22)", norm: "lingering potion of slow falling  0 22" },
  { id: "lingering_potion", label: "Lingering Potion of Slow Falling (1:00)", norm: "lingering potion of slow falling  1 00" },
  { id: "lingering_potion", label: "Lingering Potion of Slowness (0:02 - Slowness V)", norm: "lingering potion of slowness  0 02   slowness v" },
  { id: "lingering_potion", label: "Lingering Potion of Slowness (0:22)", norm: "lingering potion of slowness  0 22" },
  { id: "lingering_potion", label: "Lingering Potion of Slowness (1:00)", norm: "lingering potion of slowness  1 00" },
  { id: "lingering_potion", label: "Lingering Potion of Strength (0:22 - Strength II)", norm: "lingering potion of strength  0 22   strength ii" },
  { id: "lingering_potion", label: "Lingering Potion of Strength (0:45)", norm: "lingering potion of strength  0 45" },
  { id: "lingering_potion", label: "Lingering Potion of Strength (2:00)", norm: "lingering potion of strength  2 00" },
  { id: "lingering_potion", label: "Lingering Potion of Swiftness (0:22 - Speed II)", norm: "lingering potion of swiftness  0 22   speed ii" },
  { id: "lingering_potion", label: "Lingering Potion of Swiftness (0:45 - Speed)", norm: "lingering potion of swiftness  0 45   speed" },
  { id: "lingering_potion", label: "Lingering Potion of Swiftness (2:00 - Speed)", norm: "lingering potion of swiftness  2 00   speed" },
  { id: "lingering_potion", label: "Lingering Potion of Water Breathing (0:45)", norm: "lingering potion of water breathing  0 45" },
  { id: "lingering_potion", label: "Lingering Potion of Water Breathing (2:00)", norm: "lingering potion of water breathing  2 00" },
  { id: "lingering_potion", label: "Lingering Potion of Weakness (0:22)", norm: "lingering potion of weakness  0 22" },
  { id: "lingering_potion", label: "Lingering Potion of Weakness (1:00)", norm: "lingering potion of weakness  1 00" },
  { id: "lingering_potion", label: "Lingering Potion of the Turtle Master (0:05 - Slowness IV, Resistance III)", norm: "lingering potion of the turtle master  0 05   slowness iv  resistance iii" },
  { id: "lingering_potion", label: "Lingering Potion of the Turtle Master (0:05 - Slowness VI, Resistance IV)", norm: "lingering potion of the turtle master  0 05   slowness vi  resistance iv" },
  { id: "lingering_potion", label: "Lingering Potion of the Turtle Master (0:10 - Slowness IV, Resistance III)", norm: "lingering potion of the turtle master  0 10   slowness iv  resistance iii" },
  { id: "llama_spawn_egg", label: "Llama Spawn Egg", norm: "llama spawn egg" },
  { id: "lodestone", label: "Lodestone", norm: "lodestone" },
  { id: "loom", label: "Loom", norm: "loom" },
  { id: "magenta_banner", label: "Magenta Banner", norm: "magenta banner" },
  { id: "magenta_bed", label: "Magenta Bed", norm: "magenta bed" },
  { id: "magenta_carpet", label: "Magenta Carpet", norm: "magenta carpet" },
  { id: "magenta_concrete", label: "Magenta Concrete", norm: "magenta concrete" },
  { id: "magenta_concrete_powder", label: "Magenta Concrete Powder", norm: "magenta concrete powder" },
  { id: "magenta_dye", label: "Magenta Dye", norm: "magenta dye" },
  { id: "magenta_glazed_terracotta", label: "Magenta Glazed Terracotta", norm: "magenta glazed terracotta" },
  { id: "magenta_shulker_box", label: "Magenta Shulker Box", norm: "magenta shulker box" },
  { id: "magenta_stained_glass", label: "Magenta Stained Glass", norm: "magenta stained glass" },
  { id: "magenta_stained_glass_pane", label: "Magenta Stained Glass Pane", norm: "magenta stained glass pane" },
  { id: "magenta_terracotta", label: "Magenta Terracotta", norm: "magenta terracotta" },
  { id: "magenta_wool", label: "Magenta Wool", norm: "magenta wool" },
  { id: "magma_block", label: "Magma Block", norm: "magma block" },
  { id: "magma_cream", label: "Magma Cream", norm: "magma cream" },
  { id: "magma_cube_spawn_egg", label: "Magma Cube Spawn Egg", norm: "magma cube spawn egg" },
  { id: "map", label: "Map", norm: "map" },
  { id: "melon", label: "Block of Melon", norm: "block of melon" },
  { id: "melon_seeds", label: "Melon Seeds", norm: "melon seeds" },
  { id: "melon_slice", label: "Melon Slice", norm: "melon slice" },
  { id: "milk_bucket", label: "Milk", norm: "milk" },
  { id: "minecart", label: "Minecart", norm: "minecart" },
  { id: "mojang_banner_pattern", label: "Thing Banner Pattern", norm: "thing banner pattern" },
  { id: "mooshroom_spawn_egg", label: "Mooshroom Spawn Egg", norm: "mooshroom spawn egg" },
  { id: "mossy_cobblestone", label: "Mossy Cobblestone", norm: "mossy cobblestone" },
  { id: "mossy_cobblestone_slab", label: "Mossy Cobblestone Slab", norm: "mossy cobblestone slab" },
  { id: "mossy_cobblestone_stairs", label: "Mossy Cobblestone Stairs", norm: "mossy cobblestone stairs" },
  { id: "mossy_cobblestone_wall", label: "Mossy Cobblestone Wall", norm: "mossy cobblestone wall" },
  { id: "mossy_stone_brick_slab", label: "Mossy Stone Brick Slab", norm: "mossy stone brick slab" },
  { id: "mossy_stone_brick_stairs", label: "Mossy Stone Brick Stairs", norm: "mossy stone brick stairs" },
  { id: "mossy_stone_brick_wall", label: "Mossy Stone Brick Wall", norm: "mossy stone brick wall" },
  { id: "mossy_stone_bricks", label: "Mossy Stone Bricks", norm: "mossy stone bricks" },
  { id: "mule_spawn_egg", label: "Mule Spawn Egg", norm: "mule spawn egg" },
  { id: "mushroom_stem", label: "Mushroom Stem", norm: "mushroom stem" },
  { id: "mushroom_stew", label: "Mushroom Stew", norm: "mushroom stew" },
  { id: "music_disc_11", label: "Music Disc (C418 - 11)", norm: "music disc  c418   11" },
  { id: "music_disc_13", label: "Music Disc (C418 - 13)", norm: "music disc  c418   13" },
  { id: "music_disc_blocks", label: "Music Disc (C418 - blocks)", norm: "music disc  c418   blocks" },
  { id: "music_disc_cat", label: "Music Disc (C418 - cat)", norm: "music disc  c418   cat" },
  { id: "music_disc_chirp", label: "Music Disc (C418 - chirp)", norm: "music disc  c418   chirp" },
  { id: "music_disc_far", label: "Music Disc (C418 - far)", norm: "music disc  c418   far" },
  { id: "music_disc_mall", label: "Music Disc (C418 - mall)", norm: "music disc  c418   mall" },
  { id: "music_disc_mellohi", label: "Music Disc (C418 - mellohi)", norm: "music disc  c418   mellohi" },
  { id: "music_disc_pigstep", label: "Music Disc (Lena Raine - Pigstep)", norm: "music disc  lena raine   pigstep" },
  { id: "music_disc_stal", label: "Music Disc (C418 - stal)", norm: "music disc  c418   stal" },
  { id: "music_disc_strad", label: "Music Disc (C418 - strad)", norm: "music disc  c418   strad" },
  { id: "music_disc_wait", label: "Music Disc (C418 - wait)", norm: "music disc  c418   wait" },
  { id: "music_disc_ward", label: "Music Disc (C418 - ward)", norm: "music disc  c418   ward" },
  { id: "mutton", label: "Raw Mutton", norm: "raw mutton" },
  { id: "mycelium", label: "Mycelium", norm: "mycelium" },
  { id: "name_tag", label: "Name Tag", norm: "name tag" },
  { id: "nautilus_shell", label: "Nautilus Shell", norm: "nautilus shell" },
  { id: "nether_brick", label: "Nether Brick", norm: "nether brick" },
  { id: "nether_brick_fence", label: "Nether Brick Fence", norm: "nether brick fence" },
  { id: "nether_brick_slab", label: "Nether Brick Slab", norm: "nether brick slab" },
  { id: "nether_brick_stairs", label: "Nether Brick Stairs", norm: "nether brick stairs" },
  { id: "nether_brick_wall", label: "Nether Brick Wall", norm: "nether brick wall" },
  { id: "nether_bricks", label: "Block of Nether Bricks", norm: "block of nether bricks" },
  { id: "nether_gold_ore", label: "Nether Gold Ore", norm: "nether gold ore" },
  { id: "nether_quartz_ore", label: "Nether Quartz Ore", norm: "nether quartz ore" },
  { id: "nether_sprouts", label: "Nether Sprouts", norm: "nether sprouts" },
  { id: "nether_star", label: "Nether Star", norm: "nether star" },
  { id: "nether_wart", label: "Nether Wart", norm: "nether wart" },
  { id: "nether_wart_block", label: "Nether Wart Block", norm: "nether wart block" },
  { id: "netherite_axe", label: "Netherite Axe", norm: "netherite axe" },
  { id: "netherite_block", label: "Block of Netherite", norm: "block of netherite" },
  { id: "netherite_boots", label: "Netherite Boots", norm: "netherite boots" },
  { id: "netherite_chestplate", label: "Netherite Chestplate", norm: "netherite chestplate" },
  { id: "netherite_helmet", label: "Netherite Helmet", norm: "netherite helmet" },
  { id: "netherite_hoe", label: "Netherite Hoe", norm: "netherite hoe" },
  { id: "netherite_ingot", label: "Netherite Ingot", norm: "netherite ingot" },
  { id: "netherite_leggings", label: "Netherite Leggings", norm: "netherite leggings" },
  { id: "netherite_pickaxe", label: "Netherite Pickaxe", norm: "netherite pickaxe" },
  { id: "netherite_scrap", label: "Netherite Scrap", norm: "netherite scrap" },
  { id: "netherite_shovel", label: "Netherite Shovel", norm: "netherite shovel" },
  { id: "netherite_sword", label: "Netherite Sword", norm: "netherite sword" },
  { id: "netherrack", label: "Netherrack", norm: "netherrack" },
  { id: "note_block", label: "Note Block", norm: "note block" },
  { id: "oak_boat", label: "Oak Boat", norm: "oak boat" },
  { id: "oak_button", label: "Oak Button", norm: "oak button" },
  { id: "oak_door", label: "Oak Door", norm: "oak door" },
  { id: "oak_fence", label: "Oak Fence", norm: "oak fence" },
  { id: "oak_fence_gate", label: "Oak Fence Gate", norm: "oak fence gate" },
  { id: "oak_leaves", label: "Oak Leaves", norm: "oak leaves" },
  { id: "oak_log", label: "Oak Log", norm: "oak log" },
  { id: "oak_planks", label: "Oak Planks", norm: "oak planks" },
  { id: "oak_pressure_plate", label: "Oak Pressure Plate", norm: "oak pressure plate" },
  { id: "oak_sapling", label: "Oak Sapling", norm: "oak sapling" },
  { id: "oak_sign", label: "Oak Sign", norm: "oak sign" },
  { id: "oak_slab", label: "Oak Slab", norm: "oak slab" },
  { id: "oak_stairs", label: "Oak Stairs", norm: "oak stairs" },
  { id: "oak_trapdoor", label: "Oak Trapdoor", norm: "oak trapdoor" },
  { id: "oak_wood", label: "Oak Wood with Bark", norm: "oak wood with bark" },
  { id: "observer", label: "Observer", norm: "observer" },
  { id: "obsidian", label: "Obsidian", norm: "obsidian" },
  { id: "ocelot_spawn_egg", label: "Ocelot Spawn Egg", norm: "ocelot spawn egg" },
  { id: "orange_banner", label: "Orange Banner", norm: "orange banner" },
  { id: "orange_bed", label: "Orange Bed", norm: "orange bed" },
  { id: "orange_carpet", label: "Orange Carpet", norm: "orange carpet" },
  { id: "orange_concrete", label: "Orange Concrete", norm: "orange concrete" },
  { id: "orange_concrete_powder", label: "Orange Concrete Powder", norm: "orange concrete powder" },
  { id: "orange_dye", label: "Orange Dye", norm: "orange dye" },
  { id: "orange_glazed_terracotta", label: "Orange Glazed Terracotta", norm: "orange glazed terracotta" },
  { id: "orange_shulker_box", label: "Orange Shulker Box", norm: "orange shulker box" },
  { id: "orange_stained_glass", label: "Orange Stained Glass", norm: "orange stained glass" },
  { id: "orange_stained_glass_pane", label: "Orange Stained Glass Pane", norm: "orange stained glass pane" },
  { id: "orange_terracotta", label: "Orange Terracotta", norm: "orange terracotta" },
  { id: "orange_tulip", label: "Orange Tulip", norm: "orange tulip" },
  { id: "orange_wool", label: "Orange Wool", norm: "orange wool" },
  { id: "oxeye_daisy", label: "Oxeye Daisy", norm: "oxeye daisy" },
  { id: "packed_ice", label: "Packed Ice", norm: "packed ice" },
  { id: "painting", label: "Painting", norm: "painting" },
  { id: "panda_spawn_egg", label: "Panda Spawn Egg", norm: "panda spawn egg" },
  { id: "paper", label: "Paper", norm: "paper" },
  { id: "parrot_spawn_egg", label: "Parrot Spawn Egg", norm: "parrot spawn egg" },
  { id: "peony", label: "Peony", norm: "peony" },
  { id: "petrified_oak_slab", label: "Petrified Oak Slab", norm: "petrified oak slab" },
  { id: "phantom_membrane", label: "Phantom Membrane", norm: "phantom membrane" },
  { id: "phantom_spawn_egg", label: "Phantom Spawn Egg", norm: "phantom spawn egg" },
  { id: "pig_spawn_egg", label: "Pig Spawn Egg", norm: "pig spawn egg" },
  { id: "piglin_banner_pattern", label: "Snout Banner Pattern", norm: "snout banner pattern" },
  { id: "piglin_brute_spawn_egg", label: "Piglin Brute Spawn Egg", norm: "piglin brute spawn egg" },
  { id: "piglin_spawn_egg", label: "Piglin Spawn Egg", norm: "piglin spawn egg" },
  { id: "pillager_spawn_egg", label: "Pillager Spawn Egg", norm: "pillager spawn egg" },
  { id: "pink_banner", label: "Pink Banner", norm: "pink banner" },
  { id: "pink_bed", label: "Pink Bed", norm: "pink bed" },
  { id: "pink_carpet", label: "Pink Carpet", norm: "pink carpet" },
  { id: "pink_concrete", label: "Pink Concrete", norm: "pink concrete" },
  { id: "pink_concrete_powder", label: "Pink Concrete Powder", norm: "pink concrete powder" },
  { id: "pink_dye", label: "Pink Dye", norm: "pink dye" },
  { id: "pink_glazed_terracotta", label: "Pink Glazed Terracotta", norm: "pink glazed terracotta" },
  { id: "pink_shulker_box", label: "Pink Shulker Box", norm: "pink shulker box" },
  { id: "pink_stained_glass", label: "Pink Stained Glass", norm: "pink stained glass" },
  { id: "pink_stained_glass_pane", label: "Pink Stained Glass Pane", norm: "pink stained glass pane" },
  { id: "pink_terracotta", label: "Pink Terracotta", norm: "pink terracotta" },
  { id: "pink_tulip", label: "Pink Tulip", norm: "pink tulip" },
  { id: "pink_wool", label: "Pink Wool", norm: "pink wool" },
  { id: "piston", label: "Piston", norm: "piston" },
  { id: "player_head", label: "Steve Head", norm: "steve head" },
  { id: "podzol", label: "Podzol", norm: "podzol" },
  { id: "poisonous_potato", label: "Poisonous Potato", norm: "poisonous potato" },
  { id: "polar_bear_spawn_egg", label: "Polar Bear Spawn Egg", norm: "polar bear spawn egg" },
  { id: "polished_andesite", label: "Polished Andesite", norm: "polished andesite" },
  { id: "polished_andesite_slab", label: "Polished Andesite Slab", norm: "polished andesite slab" },
  { id: "polished_andesite_stairs", label: "Polished Andesite Stairs", norm: "polished andesite stairs" },
  { id: "polished_basalt", label: "Polished Basalt", norm: "polished basalt" },
  { id: "polished_blackstone", label: "Polished Blackstone", norm: "polished blackstone" },
  { id: "polished_blackstone_brick_slab", label: "Polished Blackstone Brick Slab", norm: "polished blackstone brick slab" },
  { id: "polished_blackstone_brick_stairs", label: "Polished Blackstone Brick Stairs", norm: "polished blackstone brick stairs" },
  { id: "polished_blackstone_brick_wall", label: "Polished Blackstone Brick Wall", norm: "polished blackstone brick wall" },
  { id: "polished_blackstone_bricks", label: "Polished Blackstone Bricks", norm: "polished blackstone bricks" },
  { id: "polished_blackstone_button", label: "Polished Blackstone Button", norm: "polished blackstone button" },
  { id: "polished_blackstone_pressure_plate", label: "Polished Blackstone Pressure Plate", norm: "polished blackstone pressure plate" },
  { id: "polished_blackstone_slab", label: "Polished Blackstone Slab", norm: "polished blackstone slab" },
  { id: "polished_blackstone_stairs", label: "Polished Blackstone Stairs", norm: "polished blackstone stairs" },
  { id: "polished_blackstone_wall", label: "Polished Blackstone Wall", norm: "polished blackstone wall" },
  { id: "polished_diorite", label: "Polished Diorite", norm: "polished diorite" },
  { id: "polished_diorite_slab", label: "Polished Diorite Slab", norm: "polished diorite slab" },
  { id: "polished_diorite_stairs", label: "Polished Diorite Stairs", norm: "polished diorite stairs" },
  { id: "polished_granite", label: "Polished Granite", norm: "polished granite" },
  { id: "polished_granite_slab", label: "Polished Granite Slab", norm: "polished granite slab" },
  { id: "polished_granite_stairs", label: "Polished Granite Stairs", norm: "polished granite stairs" },
  { id: "popped_chorus_fruit", label: "Popped Chorus Fruit", norm: "popped chorus fruit" },
  { id: "poppy", label: "Poppy", norm: "poppy" },
  { id: "porkchop", label: "Raw Porkchop", norm: "raw porkchop" },
  { id: "potato", label: "Potato", norm: "potato" },
  { id: "potion", label: "Potion of Fire Resistance (3:00)", norm: "potion of fire resistance  3 00" },
  { id: "potion", label: "Potion of Fire Resistance (8:00)", norm: "potion of fire resistance  8 00" },
  { id: "potion", label: "Potion of Harming (Instant Damage II)", norm: "potion of harming  instant damage ii" },
  { id: "potion", label: "Potion of Harming (Instant Damage)", norm: "potion of harming  instant damage" },
  { id: "potion", label: "Potion of Healing (Instant Health II)", norm: "potion of healing  instant health ii" },
  { id: "potion", label: "Potion of Healing (Instant Health)", norm: "potion of healing  instant health" },
  { id: "potion", label: "Potion of Invisibility (3:00)", norm: "potion of invisibility  3 00" },
  { id: "potion", label: "Potion of Invisibility (8:00)", norm: "potion of invisibility  8 00" },
  { id: "potion", label: "Potion of Leaping (1:30 - Jump Boost II)", norm: "potion of leaping  1 30   jump boost ii" },
  { id: "potion", label: "Potion of Leaping (3:00 - Jump Boost)", norm: "potion of leaping  3 00   jump boost" },
  { id: "potion", label: "Potion of Leaping (8:00 - Jump Boost)", norm: "potion of leaping  8 00   jump boost" },
  { id: "potion", label: "Potion of Luck (5:00)", norm: "potion of luck  5 00" },
  { id: "potion", label: "Potion of Night Vision (3:00)", norm: "potion of night vision  3 00" },
  { id: "potion", label: "Potion of Night Vision (8:00)", norm: "potion of night vision  8 00" },
  { id: "potion", label: "Potion of Poison (0:22 - Poison II)", norm: "potion of poison  0 22   poison ii" },
  { id: "potion", label: "Potion of Poison (0:45)", norm: "potion of poison  0 45" },
  { id: "potion", label: "Potion of Poison (2:00)", norm: "potion of poison  2 00" },
  { id: "potion", label: "Potion of Regeneration (0:22 - Regeneration II)", norm: "potion of regeneration  0 22   regeneration ii" },
  { id: "potion", label: "Potion of Regeneration (0:45)", norm: "potion of regeneration  0 45" },
  { id: "potion", label: "Potion of Regeneration (1:30)", norm: "potion of regeneration  1 30" },
  { id: "potion", label: "Potion of Slow Falling (1:30)", norm: "potion of slow falling  1 30" },
  { id: "potion", label: "Potion of Slow Falling (4:00)", norm: "potion of slow falling  4 00" },
  { id: "potion", label: "Potion of Slowness (0:10 - Slowness V)", norm: "potion of slowness  0 10   slowness v" },
  { id: "potion", label: "Potion of Slowness (1:30)", norm: "potion of slowness  1 30" },
  { id: "potion", label: "Potion of Slowness (4:00)", norm: "potion of slowness  4 00" },
  { id: "potion", label: "Potion of Strength (1:30 - Strength II)", norm: "potion of strength  1 30   strength ii" },
  { id: "potion", label: "Potion of Strength (3:00)", norm: "potion of strength  3 00" },
  { id: "potion", label: "Potion of Strength (8:00)", norm: "potion of strength  8 00" },
  { id: "potion", label: "Potion of Swiftness (1:30 - Speed II)", norm: "potion of swiftness  1 30   speed ii" },
  { id: "potion", label: "Potion of Swiftness (3:00 - Speed)", norm: "potion of swiftness  3 00   speed" },
  { id: "potion", label: "Potion of Swiftness (8:00 - Speed)", norm: "potion of swiftness  8 00   speed" },
  { id: "potion", label: "Potion of Water Breathing (3:00)", norm: "potion of water breathing  3 00" },
  { id: "potion", label: "Potion of Water Breathing (8:00)", norm: "potion of water breathing  8 00" },
  { id: "potion", label: "Potion of Weakness (1:30)", norm: "potion of weakness  1 30" },
  { id: "potion", label: "Potion of Weakness (4:00)", norm: "potion of weakness  4 00" },
  { id: "potion", label: "Potion of the Turtle Master (0:20 - Slowness IV, Resistance III)", norm: "potion of the turtle master  0 20   slowness iv  resistance iii" },
  { id: "potion", label: "Potion of the Turtle Master (0:20 - Slowness VI, Resistance IV)", norm: "potion of the turtle master  0 20   slowness vi  resistance iv" },
  { id: "potion", label: "Potion of the Turtle Master (0:40 - Slowness IV, Resistance III)", norm: "potion of the turtle master  0 40   slowness iv  resistance iii" },
  { id: "potion", label: "Water Bottle", norm: "water bottle" },
  { id: "powered_rail", label: "Powered Rails", norm: "powered rails" },
  { id: "prismarine", label: "Prismarine", norm: "prismarine" },
  { id: "prismarine_brick_slab", label: "Prismarine Brick Slab", norm: "prismarine brick slab" },
  { id: "prismarine_brick_stairs", label: "Prismarine Bricks Stairs", norm: "prismarine bricks stairs" },
  { id: "prismarine_bricks", label: "Prismarine Bricks", norm: "prismarine bricks" },
  { id: "prismarine_crystals", label: "Prismarine Crystals", norm: "prismarine crystals" },
  { id: "prismarine_shard", label: "Prismarine Shard", norm: "prismarine shard" },
  { id: "prismarine_slab", label: "Prismarine Slab", norm: "prismarine slab" },
  { id: "prismarine_stairs", label: "Prismarine Stairs", norm: "prismarine stairs" },
  { id: "prismarine_wall", label: "Prismarine Wall", norm: "prismarine wall" },
  { id: "pufferfish", label: "Pufferfish", norm: "pufferfish" },
  { id: "pufferfish_bucket", label: "Bucket of Pufferfish", norm: "bucket of pufferfish" },
  { id: "pufferfish_spawn_egg", label: "Pufferfish Spawn Egg", norm: "pufferfish spawn egg" },
  { id: "pumpkin", label: "Pumpkin", norm: "pumpkin" },
  { id: "pumpkin_pie", label: "Pumpkin Pie", norm: "pumpkin pie" },
  { id: "pumpkin_seeds", label: "Pumpkin Seeds", norm: "pumpkin seeds" },
  { id: "purple_banner", label: "Purple Banner", norm: "purple banner" },
  { id: "purple_bed", label: "Purple Bed", norm: "purple bed" },
  { id: "purple_carpet", label: "Purple Carpet", norm: "purple carpet" },
  { id: "purple_concrete", label: "Purple Concrete", norm: "purple concrete" },
  { id: "purple_concrete_powder", label: "Purple Concrete Powder", norm: "purple concrete powder" },
  { id: "purple_dye", label: "Purple Dye", norm: "purple dye" },
  { id: "purple_glazed_terracotta", label: "Purple Glazed Terracotta", norm: "purple glazed terracotta" },
  { id: "purple_shulker_box", label: "Purple Shulker Box", norm: "purple shulker box" },
  { id: "purple_stained_glass", label: "Purple Stained Glass", norm: "purple stained glass" },
  { id: "purple_stained_glass_pane", label: "Purple Stained Glass Pane", norm: "purple stained glass pane" },
  { id: "purple_terracotta", label: "Purple Terracotta", norm: "purple terracotta" },
  { id: "purple_wool", label: "Purple Wool", norm: "purple wool" },
  { id: "purpur_block", label: "Purpur Block", norm: "purpur block" },
  { id: "purpur_pillar", label: "Purpur Pillar", norm: "purpur pillar" },
  { id: "purpur_slab", label: "Purpur Slab", norm: "purpur slab" },
  { id: "purpur_stairs", label: "Purpur Stairs", norm: "purpur stairs" },
  { id: "quartz", label: "Nether Quartz", norm: "nether quartz" },
  { id: "quartz_block", label: "Block of Quartz", norm: "block of quartz" },
  { id: "quartz_bricks", label: "Quartz Bricks", norm: "quartz bricks" },
  { id: "quartz_pillar", label: "Quartz Pillar", norm: "quartz pillar" },
  { id: "quartz_slab", label: "Quartz Slab", norm: "quartz slab" },
  { id: "quartz_stairs", label: "Quartz Stairs", norm: "quartz stairs" },
  { id: "rabbit", label: "Raw Rabbit", norm: "raw rabbit" },
  { id: "rabbit_foot", label: "Rabbit's Foot", norm: "rabbit s foot" },
  { id: "rabbit_hide", label: "Rabbit Hide", norm: "rabbit hide" },
  { id: "rabbit_spawn_egg", label: "Rabbit Spawn Egg", norm: "rabbit spawn egg" },
  { id: "rabbit_stew", label: "Rabbit Stew", norm: "rabbit stew" },
  { id: "rail", label: "Rails", norm: "rails" },
  { id: "ravager_spawn_egg", label: "Ravager Spawn Egg", norm: "ravager spawn egg" },
  { id: "red_banner", label: "Red Banner", norm: "red banner" },
  { id: "red_bed", label: "Red Bed", norm: "red bed" },
  { id: "red_carpet", label: "Red Carpet", norm: "red carpet" },
  { id: "red_concrete", label: "Red Concrete", norm: "red concrete" },
  { id: "red_concrete_powder", label: "Red Concrete Powder", norm: "red concrete powder" },
  { id: "red_dye", label: "Red Dye", norm: "red dye" },
  { id: "red_glazed_terracotta", label: "Red Glazed Terracotta", norm: "red glazed terracotta" },
  { id: "red_mushroom", label: "Mushroom (red with white spots)", norm: "mushroom  red with white spots" },
  { id: "red_mushroom_block", label: "Red Mushroom Block", norm: "red mushroom block" },
  { id: "red_nether_brick_slab", label: "Red Nether Brick Slab", norm: "red nether brick slab" },
  { id: "red_nether_brick_stairs", label: "Red Nether Brick Stairs", norm: "red nether brick stairs" },
  { id: "red_nether_brick_wall", label: "Red Nether Brick Wall", norm: "red nether brick wall" },
  { id: "red_nether_bricks", label: "Red Nether Brick", norm: "red nether brick" },
  { id: "red_sand", label: "Red Sand", norm: "red sand" },
  { id: "red_sandstone", label: "Red Sandstone", norm: "red sandstone" },
  { id: "red_sandstone_slab", label: "Red Sandstone Slab", norm: "red sandstone slab" },
  { id: "red_sandstone_stairs", label: "Red Sandstone Stairs", norm: "red sandstone stairs" },
  { id: "red_sandstone_wall", label: "Red Sandstone Wall", norm: "red sandstone wall" },
  { id: "red_shulker_box", label: "Red Shulker Box", norm: "red shulker box" },
  { id: "red_stained_glass", label: "Red Stained Glass", norm: "red stained glass" },
  { id: "red_stained_glass_pane", label: "Red Stained Glass Pane", norm: "red stained glass pane" },
  { id: "red_terracotta", label: "Red Terracotta", norm: "red terracotta" },
  { id: "red_tulip", label: "Red Tulip", norm: "red tulip" },
  { id: "red_wool", label: "Red Wool", norm: "red wool" },
  { id: "redstone", label: "Redstone Dust", norm: "redstone dust" },
  { id: "redstone_block", label: "Block of Redstone", norm: "block of redstone" },
  { id: "redstone_lamp", label: "Redstone Lamp", norm: "redstone lamp" },
  { id: "redstone_ore", label: "Redstone Ore", norm: "redstone ore" },
  { id: "redstone_torch", label: "Redstone Torch", norm: "redstone torch" },
  { id: "repeater", label: "Redstone Repeater", norm: "redstone repeater" },
  { id: "repeating_command_block", label: "Repeating Command Block", norm: "repeating command block" },
  { id: "respawn_anchor", label: "Respawn Anchor", norm: "respawn anchor" },
  { id: "rose_bush", label: "Rose Bush", norm: "rose bush" },
  { id: "rotten_flesh", label: "Rotten Flesh", norm: "rotten flesh" },
  { id: "saddle", label: "Saddle", norm: "saddle" },
  { id: "salmon", label: "Raw Salmon", norm: "raw salmon" },
  { id: "salmon_bucket", label: "Bucket of Salmon", norm: "bucket of salmon" },
  { id: "salmon_spawn_egg", label: "Salmon Spawn Egg", norm: "salmon spawn egg" },
  { id: "sand", label: "Sand", norm: "sand" },
  { id: "sandstone", label: "Sandstone", norm: "sandstone" },
  { id: "sandstone_slab", label: "Sandstone Slab", norm: "sandstone slab" },
  { id: "sandstone_stairs", label: "Sandstone Stairs", norm: "sandstone stairs" },
  { id: "sandstone_wall", label: "Sandstone Wall", norm: "sandstone wall" },
  { id: "scaffolding", label: "Scaffolding", norm: "scaffolding" },
  { id: "scute", label: "Scute", norm: "scute" },
  { id: "sea_lantern", label: "Sea Lantern", norm: "sea lantern" },
  { id: "sea_pickle", label: "Sea Pickle", norm: "sea pickle" },
  { id: "seagrass", label: "Seagrass", norm: "seagrass" },
  { id: "shears", label: "Shears", norm: "shears" },
  { id: "sheep_spawn_egg", label: "Sheep Spawn Egg", norm: "sheep spawn egg" },
  { id: "shield", label: "Shield", norm: "shield" },
  { id: "shroomlight", label: "Shroomlight", norm: "shroomlight" },
  { id: "shulker_box", label: "Shulker Box", norm: "shulker box" },
  { id: "shulker_shell", label: "Shulker Shell", norm: "shulker shell" },
  { id: "shulker_spawn_egg", label: "Shulker Spawn Egg", norm: "shulker spawn egg" },
  { id: "silverfish_spawn_egg", label: "Silverfish Spawn Egg", norm: "silverfish spawn egg" },
  { id: "skeleton_horse_spawn_egg", label: "Skeleton Horse Spawn Egg", norm: "skeleton horse spawn egg" },
  { id: "skeleton_skull", label: "Skeleton Skull", norm: "skeleton skull" },
  { id: "skeleton_spawn_egg", label: "Skeleton Spawn Egg", norm: "skeleton spawn egg" },
  { id: "skull_banner_pattern", label: "Skull Charge Banner Pattern", norm: "skull charge banner pattern" },
  { id: "slime_ball", label: "Slimeball", norm: "slimeball" },
  { id: "slime_block", label: "Slime Block", norm: "slime block" },
  { id: "slime_spawn_egg", label: "Slime Spawn Egg", norm: "slime spawn egg" },
  { id: "smithing_table", label: "Smithing Table", norm: "smithing table" },
  { id: "smoker", label: "Smoker", norm: "smoker" },
  { id: "smooth_quartz", label: "Smooth Quartz", norm: "smooth quartz" },
  { id: "smooth_quartz_slab", label: "Smooth Quartz Slab", norm: "smooth quartz slab" },
  { id: "smooth_quartz_stairs", label: "Smooth Quartz Stairs", norm: "smooth quartz stairs" },
  { id: "smooth_red_sandstone", label: "Smooth Red Sandstone", norm: "smooth red sandstone" },
  { id: "smooth_red_sandstone_slab", label: "Smooth Red Sandstone Slab", norm: "smooth red sandstone slab" },
  { id: "smooth_red_sandstone_stairs", label: "Smooth Red Sandstone Stairs", norm: "smooth red sandstone stairs" },
  { id: "smooth_sandstone", label: "Smooth Sandstone", norm: "smooth sandstone" },
  { id: "smooth_sandstone_slab", label: "Smooth Sandstone Slab", norm: "smooth sandstone slab" },
  { id: "smooth_sandstone_stairs", label: "Smooth Sandstone Stairs", norm: "smooth sandstone stairs" },
  { id: "smooth_stone", label: "Smooth Stone", norm: "smooth stone" },
  { id: "smooth_stone_slab", label: "Smooth Stone Slab", norm: "smooth stone slab" },
  { id: "snow", label: "Snow", norm: "snow" },
  { id: "snow_block", label: "Snow Block", norm: "snow block" },
  { id: "snowball", label: "Snowball", norm: "snowball" },
  { id: "soul_campfire", label: "Soul Campfire", norm: "soul campfire" },
  { id: "soul_lantern", label: "Soul Lantern", norm: "soul lantern" },
  { id: "soul_sand", label: "Soul Sand", norm: "soul sand" },
  { id: "soul_soil", label: "Soul Soil", norm: "soul soil" },
  { id: "soul_torch", label: "Soul Torch", norm: "soul torch" },
  { id: "spawner", label: "Monster Spawner", norm: "monster spawner" },
  { id: "spectral_arrow", label: "Spectral Arrow", norm: "spectral arrow" },
  { id: "spider_eye", label: "Spider Eye", norm: "spider eye" },
  { id: "spider_spawn_egg", label: "Spider Spawn Egg", norm: "spider spawn egg" },
  { id: "splash_potion", label: "Splash Potion of Fire Resistance (3:00/2:15)", norm: "splash potion of fire resistance  3 00 2 15" },
  { id: "splash_potion", label: "Splash Potion of Fire Resistance (6:00)", norm: "splash potion of fire resistance  6 00" },
  { id: "splash_potion", label: "Splash Potion of Harming (Instant Damage II)", norm: "splash potion of harming  instant damage ii" },
  { id: "splash_potion", label: "Splash Potion of Harming (Instant Damage)", norm: "splash potion of harming  instant damage" },
  { id: "splash_potion", label: "Splash Potion of Healing (Instant Health II)", norm: "splash potion of healing  instant health ii" },
  { id: "splash_potion", label: "Splash Potion of Healing (Instant Health)", norm: "splash potion of healing  instant health" },
  { id: "splash_potion", label: "Splash Potion of Invisibility (3:00/2:15)", norm: "splash potion of invisibility  3 00 2 15" },
  { id: "splash_potion", label: "Splash Potion of Invisibility (8:00/6:00)", norm: "splash potion of invisibility  8 00 6 00" },
  { id: "splash_potion", label: "Splash Potion of Leaping (1:30/1:07 - Jump Boost II)", norm: "splash potion of leaping  1 30 1 07   jump boost ii" },
  { id: "splash_potion", label: "Splash Potion of Leaping (3:00/2:15 - Jump Boost)", norm: "splash potion of leaping  3 00 2 15   jump boost" },
  { id: "splash_potion", label: "Splash Potion of Leaping (8:00/6:00 - Jump Boost)", norm: "splash potion of leaping  8 00 6 00   jump boost" },
  { id: "splash_potion", label: "Splash Potion of Luck (5:00)", norm: "splash potion of luck  5 00" },
  { id: "splash_potion", label: "Splash Potion of Night Vision (3:00/2:15)", norm: "splash potion of night vision  3 00 2 15" },
  { id: "splash_potion", label: "Splash Potion of Night Vision (8:00/6:00)", norm: "splash potion of night vision  8 00 6 00" },
  { id: "splash_potion", label: "Splash Potion of Poison (0:22/0:16 - Poison II)", norm: "splash potion of poison  0 22 0 16   poison ii" },
  { id: "splash_potion", label: "Splash Potion of Poison (0:45/0:33)", norm: "splash potion of poison  0 45 0 33" },
  { id: "splash_potion", label: "Splash Potion of Poison (1:30)", norm: "splash potion of poison  1 30" },
  { id: "splash_potion", label: "Splash Potion of Regeneration (0:22/0:16 - Regeneration II)", norm: "splash potion of regeneration  0 22 0 16   regeneration ii" },
  { id: "splash_potion", label: "Splash Potion of Regeneration (0:45/0:33)", norm: "splash potion of regeneration  0 45 0 33" },
  { id: "splash_potion", label: "Splash Potion of Regeneration (1:30)", norm: "splash potion of regeneration  1 30" },
  { id: "splash_potion", label: "Splash Potion of Slow Falling (1:30)", norm: "splash potion of slow falling  1 30" },
  { id: "splash_potion", label: "Splash Potion of Slow Falling (4:00)", norm: "splash potion of slow falling  4 00" },
  { id: "splash_potion", label: "Splash Potion of Slowness (0:10 - Slowness V)", norm: "splash potion of slowness  0 10   slowness v" },
  { id: "splash_potion", label: "Splash Potion of Slowness (1:30/1:07)", norm: "splash potion of slowness  1 30 1 07" },
  { id: "splash_potion", label: "Splash Potion of Slowness (4:00/3:00)", norm: "splash potion of slowness  4 00 3 00" },
  { id: "splash_potion", label: "Splash Potion of Strength (1:30/1:07 - Strength II)", norm: "splash potion of strength  1 30 1 07   strength ii" },
  { id: "splash_potion", label: "Splash Potion of Strength (3:00/2:15)", norm: "splash potion of strength  3 00 2 15" },
  { id: "splash_potion", label: "Splash Potion of Strength (8:00/6:00)", norm: "splash potion of strength  8 00 6 00" },
  { id: "splash_potion", label: "Splash Potion of Swiftness (1:30/1:07 - Speed II)", norm: "splash potion of swiftness  1 30 1 07   speed ii" },
  { id: "splash_potion", label: "Splash Potion of Swiftness (3:00/2:15 - Speed)", norm: "splash potion of swiftness  3 00 2 15   speed" },
  { id: "splash_potion", label: "Splash Potion of Swiftness (8:00/6:00 - Speed)", norm: "splash potion of swiftness  8 00 6 00   speed" },
  { id: "splash_potion", label: "Splash Potion of Water Breathing (3:00/2:15)", norm: "splash potion of water breathing  3 00 2 15" },
  { id: "splash_potion", label: "Splash Potion of Water Breathing (8:00/6:00)", norm: "splash potion of water breathing  8 00 6 00" },
  { id: "splash_potion", label: "Splash Potion of Weakness (1:30/1:07)", norm: "splash potion of weakness  1 30 1 07" },
  { id: "splash_potion", label: "Splash Potion of Weakness (4:00/3:00)", norm: "splash potion of weakness  4 00 3 00" },
  { id: "splash_potion", label: "Splash Potion of the Turtle Master (0:15 - Slowness IV, Resistance III)", norm: "splash potion of the turtle master  0 15   slowness iv  resistance iii" },
  { id: "splash_potion", label: "Splash Potion of the Turtle Master (0:15 - Slowness VI, Resistance IV)", norm: "splash potion of the turtle master  0 15   slowness vi  resistance iv" },
  { id: "splash_potion", label: "Splash Potion of the Turtle Master (0:30 - Slowness IV, Resistance III)", norm: "splash potion of the turtle master  0 30   slowness iv  resistance iii" },
  { id: "sponge", label: "Sponge", norm: "sponge" },
  { id: "spruce_boat", label: "Spruce Boat", norm: "spruce boat" },
  { id: "spruce_button", label: "Spruce Button", norm: "spruce button" },
  { id: "spruce_door", label: "Spruce Door", norm: "spruce door" },
  { id: "spruce_fence", label: "Spruce Fence", norm: "spruce fence" },
  { id: "spruce_fence_gate", label: "Spruce Fence Gate", norm: "spruce fence gate" },
  { id: "spruce_leaves", label: "Spruce Leaves", norm: "spruce leaves" },
  { id: "spruce_log", label: "Spruce Log", norm: "spruce log" },
  { id: "spruce_planks", label: "Spruce Planks", norm: "spruce planks" },
  { id: "spruce_pressure_plate", label: "Spruce Pressure Plate", norm: "spruce pressure plate" },
  { id: "spruce_sapling", label: "Spruce Sapling", norm: "spruce sapling" },
  { id: "spruce_sign", label: "Spruce Sign", norm: "spruce sign" },
  { id: "spruce_slab", label: "Spruce Slab", norm: "spruce slab" },
  { id: "spruce_stairs", label: "Spruce Stairs", norm: "spruce stairs" },
  { id: "spruce_trapdoor", label: "Spruce Trapdoor", norm: "spruce trapdoor" },
  { id: "spruce_wood", label: "Spruce Wood with Bark", norm: "spruce wood with bark" },
  { id: "squid_spawn_egg", label: "Squid Spawn Egg", norm: "squid spawn egg" },
  { id: "stick", label: "Stick", norm: "stick" },
  { id: "sticky_piston", label: "Sticky Piston", norm: "sticky piston" },
  { id: "stone", label: "Stone", norm: "stone" },
  { id: "stone_axe", label: "Stone Axe", norm: "stone axe" },
  { id: "stone_brick_slab", label: "Stone Brick Slab", norm: "stone brick slab" },
  { id: "stone_brick_stairs", label: "Stone Brick Stairs", norm: "stone brick stairs" },
  { id: "stone_brick_wall", label: "Stone Brick Wall", norm: "stone brick wall" },
  { id: "stone_bricks", label: "Stone Bricks", norm: "stone bricks" },
  { id: "stone_button", label: "Stone Button", norm: "stone button" },
  { id: "stone_hoe", label: "Stone Hoe", norm: "stone hoe" },
  { id: "stone_pickaxe", label: "Stone Pickaxe", norm: "stone pickaxe" },
  { id: "stone_pressure_plate", label: "Stone Pressure Plate", norm: "stone pressure plate" },
  { id: "stone_shovel", label: "Stone Shovel", norm: "stone shovel" },
  { id: "stone_slab", label: "Stone Slab", norm: "stone slab" },
  { id: "stone_stairs", label: "Stone Stairs", norm: "stone stairs" },
  { id: "stone_sword", label: "Stone Sword", norm: "stone sword" },
  { id: "stonecutter", label: "Stonecutter", norm: "stonecutter" },
  { id: "stray_spawn_egg", label: "Stray Spawn Egg", norm: "stray spawn egg" },
  { id: "strider_spawn_egg", label: "Strider Spawn Egg", norm: "strider spawn egg" },
  { id: "string", label: "String", norm: "string" },
  { id: "stripped_acacia_log", label: "Stripped Acacia Log", norm: "stripped acacia log" },
  { id: "stripped_acacia_wood", label: "Stripped Acacia Wood", norm: "stripped acacia wood" },
  { id: "stripped_birch_log", label: "Stripped Birch Log", norm: "stripped birch log" },
  { id: "stripped_birch_wood", label: "Stripped Birch Wood", norm: "stripped birch wood" },
  { id: "stripped_crimson_hyphae", label: "Stripped Crimson Hyphae", norm: "stripped crimson hyphae" },
  { id: "stripped_crimson_stem", label: "Stripped Crimson Stem", norm: "stripped crimson stem" },
  { id: "stripped_dark_oak_log", label: "Stripped Dark Oak Log", norm: "stripped dark oak log" },
  { id: "stripped_dark_oak_wood", label: "Stripped Dark Oak Wood", norm: "stripped dark oak wood" },
  { id: "stripped_jungle_log", label: "Stripped Jungle Log", norm: "stripped jungle log" },
  { id: "stripped_jungle_wood", label: "Stripped Jungle Wood", norm: "stripped jungle wood" },
  { id: "stripped_oak_log", label: "Stripped Oak Log", norm: "stripped oak log" },
  { id: "stripped_oak_wood", label: "Stripped Oak Wood", norm: "stripped oak wood" },
  { id: "stripped_spruce_log", label: "Stripped Spruce Log", norm: "stripped spruce log" },
  { id: "stripped_spruce_wood", label: "Stripped Spruce Wood", norm: "stripped spruce wood" },
  { id: "stripped_warped_hyphae", label: "Stripped Warped Hyphae", norm: "stripped warped hyphae" },
  { id: "stripped_warped_stem", label: "Stripped Warped Stem", norm: "stripped warped stem" },
  { id: "structure_block", label: "Structure Block", norm: "structure block" },
  { id: "structure_void", label: "Structure Void", norm: "structure void" },
  { id: "sugar", label: "Sugar", norm: "sugar" },
  { id: "sugar_cane", label: "Sugar Canes", norm: "sugar canes" },
  { id: "sunflower", label: "Sunflower", norm: "sunflower" },
  { id: "suspicious_stew", label: "Suspicious Stew", norm: "suspicious stew" },
  { id: "sweet_berries", label: "Sweet Berries", norm: "sweet berries" },
  { id: "tall_grass", label: "Tall Grass", norm: "tall grass" },
  { id: "target", label: "Target", norm: "target" },
  { id: "terracotta", label: "Terracotta", norm: "terracotta" },
  { id: "tipped_arrow", label: "Arrow of Fire Resistance (0:22)", norm: "arrow of fire resistance  0 22" },
  { id: "tipped_arrow", label: "Arrow of Fire Resistance (1:00)", norm: "arrow of fire resistance  1 00" },
  { id: "tipped_arrow", label: "Arrow of Harming (Instant Damage II)", norm: "arrow of harming  instant damage ii" },
  { id: "tipped_arrow", label: "Arrow of Harming (Instant Damage)", norm: "arrow of harming  instant damage" },
  { id: "tipped_arrow", label: "Arrow of Healing (Instant Health II)", norm: "arrow of healing  instant health ii" },
  { id: "tipped_arrow", label: "Arrow of Healing (Instant Health)", norm: "arrow of healing  instant health" },
  { id: "tipped_arrow", label: "Arrow of Invisibility (0:22)", norm: "arrow of invisibility  0 22" },
  { id: "tipped_arrow", label: "Arrow of Invisibility (1:00)", norm: "arrow of invisibility  1 00" },
  { id: "tipped_arrow", label: "Arrow of Leaping (0:11 - Jump Boost II)", norm: "arrow of leaping  0 11   jump boost ii" },
  { id: "tipped_arrow", label: "Arrow of Leaping (0:22 - Jump Boost)", norm: "arrow of leaping  0 22   jump boost" },
  { id: "tipped_arrow", label: "Arrow of Leaping (1:00 - Jump Boost)", norm: "arrow of leaping  1 00   jump boost" },
  { id: "tipped_arrow", label: "Arrow of Luck (0:37)", norm: "arrow of luck  0 37" },
  { id: "tipped_arrow", label: "Arrow of Night Vision (0:22)", norm: "arrow of night vision  0 22" },
  { id: "tipped_arrow", label: "Arrow of Night Vision (1:00)", norm: "arrow of night vision  1 00" },
  { id: "tipped_arrow", label: "Arrow of Poison (0:02 - Poison II)", norm: "arrow of poison  0 02   poison ii" },
  { id: "tipped_arrow", label: "Arrow of Poison (0:05)", norm: "arrow of poison  0 05" },
  { id: "tipped_arrow", label: "Arrow of Poison (0:11)", norm: "arrow of poison  0 11" },
  { id: "tipped_arrow", label: "Arrow of Regeneration (0:02 - Regeneration II)", norm: "arrow of regeneration  0 02   regeneration ii" },
  { id: "tipped_arrow", label: "Arrow of Regeneration (0:05)", norm: "arrow of regeneration  0 05" },
  { id: "tipped_arrow", label: "Arrow of Regeneration (0:11)", norm: "arrow of regeneration  0 11" },
  { id: "tipped_arrow", label: "Arrow of Slow Falling (0:11)", norm: "arrow of slow falling  0 11" },
  { id: "tipped_arrow", label: "Arrow of Slow Falling (0:30)", norm: "arrow of slow falling  0 30" },
  { id: "tipped_arrow", label: "Arrow of Slowness (0:01 - Slowness V)", norm: "arrow of slowness  0 01   slowness v" },
  { id: "tipped_arrow", label: "Arrow of Slowness (0:11)", norm: "arrow of slowness  0 11" },
  { id: "tipped_arrow", label: "Arrow of Slowness (0:30)", norm: "arrow of slowness  0 30" },
  { id: "tipped_arrow", label: "Arrow of Strength (0:11 - Strength II)", norm: "arrow of strength  0 11   strength ii" },
  { id: "tipped_arrow", label: "Arrow of Strength (0:22)", norm: "arrow of strength  0 22" },
  { id: "tipped_arrow", label: "Arrow of Strength (1:00)", norm: "arrow of strength  1 00" },
  { id: "tipped_arrow", label: "Arrow of Swiftness (0:11 - Speed II)", norm: "arrow of swiftness  0 11   speed ii" },
  { id: "tipped_arrow", label: "Arrow of Swiftness (0:22 - Speed)", norm: "arrow of swiftness  0 22   speed" },
  { id: "tipped_arrow", label: "Arrow of Swiftness (1:00 - Speed)", norm: "arrow of swiftness  1 00   speed" },
  { id: "tipped_arrow", label: "Arrow of Water Breathing (0:22)", norm: "arrow of water breathing  0 22" },
  { id: "tipped_arrow", label: "Arrow of Water Breathing (1:00)", norm: "arrow of water breathing  1 00" },
  { id: "tipped_arrow", label: "Arrow of Weakness (0:11)", norm: "arrow of weakness  0 11" },
  { id: "tipped_arrow", label: "Arrow of Weakness (0:30)", norm: "arrow of weakness  0 30" },
  { id: "tipped_arrow", label: "Arrow of the Turtle Master (0:02 - Slowness IV, Resistance III)", norm: "arrow of the turtle master  0 02   slowness iv  resistance iii" },
  { id: "tipped_arrow", label: "Arrow of the Turtle Master (0:02 - Slowness VI, Resistance IV)", norm: "arrow of the turtle master  0 02   slowness vi  resistance iv" },
  { id: "tipped_arrow", label: "Arrow of the Turtle Master (0:05 - Slowness IV, Resistance III)", norm: "arrow of the turtle master  0 05   slowness iv  resistance iii" },
  { id: "tnt", label: "TNT", norm: "tnt" },
  { id: "tnt_minecart", label: "Minecart with TNT", norm: "minecart with tnt" },
  { id: "torch", label: "Torch", norm: "torch" },
  { id: "totem_of_undying", label: "Totem of Undying", norm: "totem of undying" },
  { id: "trader_llama_spawn_egg", label: "Trader Llama Spawn Egg", norm: "trader llama spawn egg" },
  { id: "trapped_chest", label: "Trapped Chest", norm: "trapped chest" },
  { id: "trident", label: "Trident", norm: "trident" },
  { id: "tripwire_hook", label: "Tripwire Hook", norm: "tripwire hook" },
  { id: "tropical_fish", label: "Tropical Fish (Clownfish)", norm: "tropical fish  clownfish" },
  { id: "tropical_fish_bucket", label: "Bucket of Tropical Fish", norm: "bucket of tropical fish" },
  { id: "tropical_fish_spawn_egg", label: "Tropical Fish Spawn Egg", norm: "tropical fish spawn egg" },
  { id: "tube_coral", label: "Tube Coral", norm: "tube coral" },
  { id: "tube_coral_block", label: "Tube Coral Block", norm: "tube coral block" },
  { id: "tube_coral_fan", label: "Tube Coral Fan", norm: "tube coral fan" },
  { id: "turtle_egg", label: "Turtle Egg", norm: "turtle egg" },
  { id: "turtle_helmet", label: "Turtle Shell", norm: "turtle shell" },
  { id: "turtle_spawn_egg", label: "Turtle Spawn Egg", norm: "turtle spawn egg" },
  { id: "twisting_vines", label: "Twisting Vines", norm: "twisting vines" },
  { id: "vex_spawn_egg", label: "Vex Spawn Egg", norm: "vex spawn egg" },
  { id: "villager_spawn_egg", label: "Villager Spawn Egg", norm: "villager spawn egg" },
  { id: "vindicator_spawn_egg", label: "Vindicator Spawn Egg", norm: "vindicator spawn egg" },
  { id: "vine", label: "Vines", norm: "vines" },
  { id: "wandering_trader_spawn_egg", label: "Wandering Trader Spawn Egg", norm: "wandering trader spawn egg" },
  { id: "warped_button", label: "Warped Button", norm: "warped button" },
  { id: "warped_door", label: "Warped Door", norm: "warped door" },
  { id: "warped_fence", label: "Warped Fence", norm: "warped fence" },
  { id: "warped_fence_gate", label: "Warped Fence Gate", norm: "warped fence gate" },
  { id: "warped_fungus", label: "Warped Fungus", norm: "warped fungus" },
  { id: "warped_fungus_on_a_stick", label: "Warped Fungus on a Stick", norm: "warped fungus on a stick" },
  { id: "warped_hyphae", label: "Warped Hyphae", norm: "warped hyphae" },
  { id: "warped_nylium", label: "Warped Nylium", norm: "warped nylium" },
  { id: "warped_planks", label: "Warped Planks", norm: "warped planks" },
  { id: "warped_pressure_plate", label: "Warped Pressure Plate", norm: "warped pressure plate" },
  { id: "warped_roots", label: "Warped Roots", norm: "warped roots" },
  { id: "warped_sign", label: "Warped Sign", norm: "warped sign" },
  { id: "warped_slab", label: "Warped Slab", norm: "warped slab" },
  { id: "warped_stairs", label: "Warped Stairs", norm: "warped stairs" },
  { id: "warped_stem", label: "Warped Stem", norm: "warped stem" },
  { id: "warped_trapdoor", label: "Warped Trapdoor", norm: "warped trapdoor" },
  { id: "warped_wart_block", label: "Warped Wart Block", norm: "warped wart block" },
  { id: "water", label: "Water", norm: "water" },
  { id: "water_bucket", label: "Water Bucket", norm: "water bucket" },
  { id: "weeping_vines", label: "Weeping Vines", norm: "weeping vines" },
  { id: "wet_sponge", label: "Wet Sponge", norm: "wet sponge" },
  { id: "wheat", label: "Wheat", norm: "wheat" },
  { id: "wheat_seeds", label: "Seeds", norm: "seeds" },
  { id: "white_banner", label: "White Banner", norm: "white banner" },
  { id: "white_bed", label: "White Bed", norm: "white bed" },
  { id: "white_carpet", label: "White Carpet", norm: "white carpet" },
  { id: "white_concrete", label: "White Concrete", norm: "white concrete" },
  { id: "white_concrete_powder", label: "White Concrete Powder", norm: "white concrete powder" },
  { id: "white_dye", label: "White Dye", norm: "white dye" },
  { id: "white_glazed_terracotta", label: "White Glazed Terracotta", norm: "white glazed terracotta" },
  { id: "white_shulker_box", label: "White Shulker Box", norm: "white shulker box" },
  { id: "white_stained_glass", label: "White Stained Glass", norm: "white stained glass" },
  { id: "white_stained_glass_pane", label: "White Stained Glass Pane", norm: "white stained glass pane" },
  { id: "white_terracotta", label: "White Terracotta", norm: "white terracotta" },
  { id: "white_tulip", label: "White Tulip", norm: "white tulip" },
  { id: "white_wool", label: "White Wool", norm: "white wool" },
  { id: "witch_spawn_egg", label: "Witch Spawn Egg", norm: "witch spawn egg" },
  { id: "wither_rose", label: "Wither Rose", norm: "wither rose" },
  { id: "wither_skeleton_skull", label: "Wither Skeleton Skull", norm: "wither skeleton skull" },
  { id: "wither_skeleton_spawn_egg", label: "Wither Skeleton Spawn Egg", norm: "wither skeleton spawn egg" },
  { id: "wolf_spawn_egg", label: "Wolf Spawn Egg", norm: "wolf spawn egg" },
  { id: "wooden_axe", label: "Wooden Axe", norm: "wooden axe" },
  { id: "wooden_hoe", label: "Wooden Hoe", norm: "wooden hoe" },
  { id: "wooden_pickaxe", label: "Wooden Pickaxe", norm: "wooden pickaxe" },
  { id: "wooden_shovel", label: "Wooden Shovel", norm: "wooden shovel" },
  { id: "wooden_sword", label: "Wooden Sword", norm: "wooden sword" },
  { id: "writable_book", label: "Book and Quill", norm: "book and quill" },
  { id: "written_book", label: "Written Book", norm: "written book" },
  { id: "yellow_banner", label: "Yellow Banner", norm: "yellow banner" },
  { id: "yellow_bed", label: "Yellow Bed", norm: "yellow bed" },
  { id: "yellow_carpet", label: "Yellow Carpet", norm: "yellow carpet" },
  { id: "yellow_concrete", label: "Yellow Concrete", norm: "yellow concrete" },
  { id: "yellow_concrete_powder", label: "Yellow Concrete Powder", norm: "yellow concrete powder" },
  { id: "yellow_dye", label: "Yellow Dye", norm: "yellow dye" },
  { id: "yellow_glazed_terracotta", label: "Yellow Glazed Terracotta", norm: "yellow glazed terracotta" },
  { id: "yellow_shulker_box", label: "Yellow Shulker Box", norm: "yellow shulker box" },
  { id: "yellow_stained_glass", label: "Yellow Stained Glass", norm: "yellow stained glass" },
  { id: "yellow_stained_glass_pane", label: "Yellow Stained Glass Pane", norm: "yellow stained glass pane" },
  { id: "yellow_terracotta", label: "Yellow Terracotta", norm: "yellow terracotta" },
  { id: "yellow_wool", label: "Yellow Wool", norm: "yellow wool" },
  { id: "zoglin_spawn_egg", label: "Zoglin Spawn Egg", norm: "zoglin spawn egg" },
  { id: "zombie_head", label: "Zombie Head", norm: "zombie head" },
  { id: "zombie_horse_spawn_egg", label: "Zombie Horse Spawn Egg", norm: "zombie horse spawn egg" },
  { id: "zombie_spawn_egg", label: "Zombie Spawn Egg", norm: "zombie spawn egg" },
  { id: "zombie_villager_spawn_egg", label: "Zombie Villager Spawn Egg", norm: "zombie villager spawn egg" }
];
let MinecraftSphere = class extends s$1 {
  constructor() {
    super(...arguments);
    this.radius = 0;
    this.thickness = 1;
    this.length = 1;
    this.blockTypeLabel = "";
    this.blockTypeID = "";
    this.centreX = 0;
    this.centreY = 0;
    this.centreZ = 0;
    this.vMax = 320;
    this.hMax = 9999;
    this.slowThreshold = 75;
    this.outputMode = 1;
    this.ignoreWarnings = false;
    this.showExtraComments = false;
    this.fillWithAir = false;
    this.hollowCentre = false;
    this.objecType = "sphere";
    this.stopAngle = 180;
    this.cmdBlockHeight = 317;
    this._warningMsgs = {
      general: [],
      radius: [],
      x: "",
      y: "",
      z: "",
      thickness: "",
      length: "",
      stopAngle: "",
      cmdBlockHeight: ""
    };
    this.radiusError = "";
    this.thicknessError = "";
    this._warningCount = 0;
    this._errorCount = 0;
    this._showCode = false;
    this._filteredBlocks = [];
    this._doSphere = true;
    this._doInit = true;
    this._rMin = 3;
  }
  _setWarnings() {
    const obj = this.objecType;
    const x2 = makePos(this.centreX);
    const y = makePos(this.centreY);
    const z2 = makePos(this.centreZ);
    const _tail = " that some part of the " + obj + " will be outside the world.";
    const _pre = "You should adjust the ";
    const _post = " to ensure the whole of the " + obj + " is within the world.";
    let _tmp = "";
    let _point = "";
    let _gID = 0;
    let _rID = 0;
    let _eCount = 0;
    const _getGid = () => {
      _gID += 1;
      return _gID.toString() + ".";
    };
    const _getRid = () => {
      _rID += 1;
      return _rID.toString() + ".";
    };
    this._warningMsgs = {
      general: [],
      radius: [],
      x: "",
      y: "",
      z: "",
      thickness: "",
      length: "",
      stopAngle: "",
      cmdBlockHeight: ""
    };
    if (this._doSphere === true) {
      if (this.radius > 75) {
        this._warningMsgs.radius.push(_getGid() + "A sphere this big may be very slow to render");
      }
      if (this.radius > this.vMax) {
        _tmp = "The radius is so large" + _tail;
        this._warningMsgs.radius.push(_getRid() + _tmp);
        this._warningMsgs.general.push(_getGid() + _tmp);
      } else if (this.radius + z2 > this.vMax) {
        this._warningMsgs.general.push(_getGid() + "The combination of the radius and vertical position means" + _tail);
        this._warningMsgs.radius.push(_getRid() + _pre + "radius or vertical position" + _post);
        this._warningMsgs.z = _pre + "vertical position or radius" + _post;
      }
    } else if (this.radius < this._rMin) {
      _tmp = "You must have a place to stand while generating the " + obj + ". Your radius is too small to guarantee you have a space to stand.";
      this.radiusError = _tmp;
      this._warningMsgs.general.push(_getGid() + _tmp);
      _eCount += 1;
    }
    _point = x2 > 0 ? "ea" : "we";
    if (x2 > this.hMax) {
      _tmp = "The east/west coordinate is beyond the " + _point + "stern boundary of the world. At least half of the sphere will be outside the world";
      this._warningMsgs.z = _tmp;
      this._warningMsgs.general.push(_getGid() + _tmp);
    } else if (this.radius + x2 > this.hMax) {
      _tmp = _tail.replace("outside", "beyond the " + _point + "stern boundary of");
      this._warningMsgs.general.push(_getGid() + "The combination of the radius and east/west position means" + _tmp);
      this._warningMsgs.radius.push(_getRid() + _pre + "radius or east/west position" + _post);
      this._warningMsgs.z = _pre + "east/west position or radius" + _post;
    }
    _point = y > 0 ? "nor" : "sou";
    if (x2 > this.hMax) {
      _tmp = "The north/south coordinate is beyond the " + _point + "thern boundary of the world. At least half of the sphere will be outside the world";
      this._warningMsgs.z = _tmp;
      this._warningMsgs.general.push(_getGid() + _tmp);
    } else if (this.radius + x2 > this.hMax) {
      _tmp = _tail.replace("outside", "beyond the " + _point + "thern boundary of");
      this._warningMsgs.general.push(_getGid() + "The combination of the radius and north/south position means" + _tmp);
      this._warningMsgs.radius.push(_getRid() + _pre + "radius or north/south position" + _post);
      this._warningMsgs.z = _pre + "north/south position or radius" + _post;
    }
    if (this.thickness > 1 && this.thickness >= this.radius - this._rMin) {
      _tmp = "You must have a place to stand while generating the " + obj + ". Your thickness is too large to guarantee you have a space to stand.";
      this.thicknessError = _tmp;
      this._warningMsgs.general.push(_getGid() + _tmp);
    } else if (this.thickness < 1) {
      _tmp = "The thickness of the " + obj + " must be at least 1 block";
      this.thicknessError = _tmp;
      this._warningMsgs.general.push(_getGid() + _tmp);
      _eCount += 1;
    }
    this._warningCount = this._warningMsgs.general.length;
    this._errorCount = _eCount;
  }
  _init() {
    if (this._doInit) {
      this._doInit = false;
      this._doSphere = this.outputMode !== 3;
      this._setWarnings();
      if (this.blockTypeLabel !== "") {
        this._filterBlockListInner(this.blockTypeLabel);
      }
    }
  }
  _canGenerate() {
    return this.radius >= this._rMin && this.blockTypeID !== "" && this._errorCount === 0 && (this._warningCount === 0 || this.ignoreWarnings === true);
  }
  _getCmdCmnt(input, output, chain = "") {
    let _tmp = "";
    let _chain = chain;
    let _c = 0;
    if (input.substring(0, 3) === "// ") {
      if (this.showExtraComments) {
        _tmp = "\n" + input + "\n";
      }
    } else {
      _tmp = output.replace("[[CMD]]", input);
      _chain = "chain_";
      if (output !== "") {
        _c = 1;
      }
    }
    return {
      output: _tmp,
      chain: _chain,
      count: _c
    };
  }
  _getRotation(floor = true) {
    const _vert = 50 / this.radius;
    const _hori = Math.pow(_vert, 2) / 360;
    if (floor === true) {
      return {
        horizontal: Math.floor(_vert * 1e4) / 1e4,
        vertical: Math.floor(_hori * 1e4) / 1e4
      };
    } else {
      return {
        horizontal: Math.ceil(_vert * 1e4) / 1e4,
        vertical: Math.ceil(_hori * 1e4) / 1e4
      };
    }
  }
  _getFirstBlock() {
    return {
      x: Math.ceil(this.centreX + this.radius * 0.75),
      y: Math.ceil(this.centreY + this.radius * 0.75),
      z: this.vMax - 3
    };
  }
  _getCentre() {
    return {
      x: Math.round(this.centreX) + 0.5,
      y: Math.round(this.centreY) + 0.5,
      z: Math.round(this.centreZ)
    };
  }
  _generateSetBlocks(commands, oneoffs = { first: [], last: [], end: "" }) {
    const firstBlock = this._getFirstBlock();
    const totalRepeats = 2 * Math.PI * this.radius * 1.4;
    const prefix = "";
    const cmntPrefix = "// ---------------------------------------------------------\n// ";
    let output = "";
    let _chain = "";
    let _x = 0;
    let _y = firstBlock.y + 2;
    let _auto = "";
    for (let a2 = 0, c2 = oneoffs.first.length; a2 < c2; a2 += 1) {
      const tmp = this._getCmdCmnt(oneoffs.first[a2], prefix + "setblock" + coordStr(__spreadProps(__spreadValues({}, firstBlock), {
        y: _y
      })) + " minecraft:" + _chain + 'command_block[facing=south]{Command:"[[CMD]]"' + _auto + "}\n", _chain);
      console.log("_y:", _y);
      _chain = tmp.chain;
      output += tmp.output;
      _auto = ",auto:1";
      _y += tmp.count;
    }
    if (output !== "") {
      output = cmntPrefix + "Do some initial setup\n\n" + output + "\n\n";
    }
    output = cmntPrefix + "Teleport to just near where all the command blocks will\n// be set, so you can see what's going on with the command\n// blocks\n\ntp @p" + coordStr({ x: firstBlock.x - 2, y: firstBlock.y - 2, z: firstBlock.z }) + " facing" + coordStr(firstBlock) + "\n\n\n" + output;
    output += cmntPrefix + "Generate the the command blocks that will do the building\n\n";
    let _firstCMD = "";
    _x = firstBlock.x + 1;
    const _first = _x;
    for (let a2 = 0; a2 < commands.length; a2 += 1) {
      const tmp = this._getCmdCmnt(commands[a2], prefix + "setblock" + coordStr(__spreadProps(__spreadValues({}, firstBlock), {
        x: _x
      })) + ' minecraft:chain_command_block[facing=east]{Command:"[[CMD]]",auto:1}\n');
      output += tmp.output;
      if (_firstCMD === "") {
        _firstCMD = tmp.output;
      }
      _x += tmp.count;
    }
    let _len = _first > _x ? _first - _x : _x - _first;
    output += "\n" + cmntPrefix + "Clone the blocks we just created\n";
    _x = 0;
    for (let a2 = 1; a2 < totalRepeats; a2 *= 2) {
      output += this.showExtraComments ? "\n\n// Iteration: " + a2 + " (" + _len + " blocks)\n" : "\n";
      output += prefix + "clone" + coordStr(__spreadProps(__spreadValues({}, firstBlock), {
        x: _first
      })) + coordStr(__spreadProps(__spreadValues({}, firstBlock), {
        x: firstBlock.x + _len
      })) + coordStr(__spreadProps(__spreadValues({}, firstBlock), {
        x: firstBlock.x + _len + 1
      }));
      _len += _len;
      _x = firstBlock.x + _len;
      if (_len > 512) {
        break;
      }
    }
    output += "\n\n" + _firstCMD.replace("chain_command_block", "repeating_command_block").replace(",auto:1", "");
    output += "\n\n\n" + cmntPrefix + "Start everthing going\n\n" + prefix + "setblock" + coordStr(__spreadProps(__spreadValues({}, firstBlock), {
      y: firstBlock.y + 1
    })) + " minecraft:redstone_block\n";
    output += "\n\n\n" + cmntPrefix.replace(/-/g, "=") + "Manually stop (remove all command and redstone blocks)\n\n" + prefix + "fill" + coordStr(__spreadProps(__spreadValues({}, firstBlock), {
      x: _x
    })) + coordStr(__spreadProps(__spreadValues({}, firstBlock), {
      y: _y
    })) + " minecraft:air\n";
    return output;
  }
  _generateSphere() {
    const centre = this._getCentre();
    const rotation = this._getRotation();
    const cmds = [];
    const firstBlock = this._getFirstBlock();
    const oneoffs = {
      first: [
        "// TP to the centre of the sphere, facing up, so you're in\n// the right spot and facing the right direction to start\n// generating the sphere.",
        "/execute at @p run tp @p" + coordStr(centre) + " facing" + coordStr(__spreadProps(__spreadValues({}, centre), { z: 320 })),
        "// Set the redstone block that starts the sphere generation",
        "/setblock" + coordStr(__spreadProps(__spreadValues({}, firstBlock), { x: firstBlock.x + 1 })) + " minecraft:redstone_block"
      ],
      last: [],
      end: "unless " + __spreadProps(__spreadValues({}, centre), { z: centre.z - this.radius })
    };
    if (this.hollowCentre === true) {
      oneoffs.first = [
        "// Make sure the centre of where you're building your object is only air",
        "/fill" + coordStr({ x: centre.x - 1, y: centre.y - 1, z: centre.z - 1 }) + coordStr({ x: centre.x + 1, y: centre.y + 1, z: centre.z + 2 }) + " minecraft:air",
        ...oneoffs.first
      ];
    }
    for (let a2 = 0, c2 = this.thickness; c2 > 0; c2 -= 1, a2 += 1) {
      let msg = "// Set the outer a block for the outer layer of the sphere";
      if (a2 > 0 && this.thickness > 1) {
        cmds.push("// TP back to the previous location to make sure you haven't fallen below the appropriate point", "/execute at @p run tp @p" + coordStr(centre) + " ~ ~");
        msg = "// Set another layer in the thickness of the sphere";
      }
      cmds.push(msg, "/execute at @p run setblock ^ ^ ^" + (this.radius - a2) + " minecraft:" + this.blockTypeID);
    }
    if (this.fillWithAir === true) {
      for (let a2 = this.radius - this.thickness; a2 > 0; a2 -= 1) {
        cmds.push("// TP back to the previous location to make sure you haven't fallen below the appropriate point", "/execute at @p run tp @p" + coordStr(centre) + " ~ ~", "/execute at @p run setblock ^ ^ ^" + a2 + " minecraft:air");
      }
    }
    cmds.push("// rotate position to be able to set another block on the outside of the sphere", "/execute at @p run tp @p" + coordStr(centre) + " ~" + rotation.horizontal + " ~" + rotation.vertical);
    return this._generateSetBlocks(cmds, oneoffs);
  }
  _generateCylinder() {
    const centre = this._getCentre();
    const rotation = this._getRotation();
    const cmds = [];
    const _one = this.length < 0 ? -1 : 1;
    const oneoffs = {
      first: [
        "// Make sure we have space to move so we can generate the cylinder",
        "/fill" + coordStr({ x: centre.x - 1, y: centre.y - 1, z: centre.z - _one }) + coordStr({ x: centre.x + 1, y: centre.y + 1, z: centre.z + this.length + _one }) + " minecraft:air",
        "// Set a block that limits the upwards movement of the user to the \n// height of the cylinder",
        "/setblock" + coordStr(__spreadProps(__spreadValues({}, centre), { z: centre.z + this.length + _one })) + " minecraft:stone",
        "/execute at @p run tp @p" + coordStr(centre) + " facing" + coordStr(__spreadProps(__spreadValues({}, centre), { x: centre.x + this.radius }))
      ],
      last: [],
      end: ""
    };
    for (let a2 = 0, c2 = this.thickness; c2 > 0; c2 -= 1, a2 += 1) {
      cmds.push("// Set another layer in the thickness of the sphere", "/execute at @p run setblock ^ ^ ^" + (this.radius - a2) + " minecraft:" + this.blockTypeID);
    }
    if (this.fillWithAir === true) {
      for (let a2 = this.radius - this.thickness; a2 > 0; a2 -= 1) {
        cmds.push("// TP back to the previous location to make sure you haven't fallen below the appropriate point", "/execute at @p run setblock ^ ^ ^" + a2 + " minecraft:air");
      }
    }
    cmds.push("// rotate so we can start setting more blocks on the outside of\n// the cylinder", "/execute at @p run tp @p" + coordStr(__spreadProps(__spreadValues({}, centre), { z: "~1" })) + " ~ ~" + rotation.horizontal + " ~");
    return this._generateSetBlocks(cmds, oneoffs);
  }
  _filterBlockListInner(value) {
    let output = value;
    if (value !== "") {
      const _value = normalise(value);
      const filtered = mineCraftBlocks.filter((item) => item.norm.indexOf(_value) > -1);
      let l2 = filtered.length;
      this._filteredBlocks = filtered;
      if (l2 === 1) {
        this.blockTypeLabel = filtered[0].label;
        this.blockTypeID = filtered[0].id;
        this._filteredBlocks = [];
        output = filtered[0].label;
      } else {
        const tmp = filtered.filter((item) => item.norm === _value);
        if (tmp.length === 1) {
          this.blockTypeLabel = tmp[0].label;
          this.blockTypeID = tmp[0].id;
        }
      }
    }
    return output;
  }
  _filterBlockList(e2) {
    const input = e2.target;
    const value = normalise(input.value);
    input.value = this._filterBlockListInner(value);
  }
  changeHandler(e2) {
    const input = e2.target;
    const val = Math.round(parseInt(input.value));
    let changed = false;
    console.log("val:", val);
    switch (input.id) {
      case "radius":
        this.radius = makePos(val);
        changed = true;
        break;
      case "centreX":
        this.centreX = val;
        changed = true;
        break;
      case "centreY":
        this.centreY = val;
        changed = true;
        break;
      case "centreZ":
        this.centreZ = val;
        changed = true;
        break;
      case "thickness":
        this.thickness = makePos(val);
        changed = true;
        break;
      case "length":
        this.length = makePos(val);
        changed = true;
        break;
      case "ignore-warnings":
        this.ignoreWarnings = input.checked;
        break;
      case "show-comments":
        this.showExtraComments = input.checked;
        break;
      case "fill-with-air":
        this.fillWithAir = input.checked;
        break;
      case "hollow-centre":
        this.hollowCentre = input.checked;
        break;
      case "object-type-sphere":
      case "object-type-cylinder":
        this._doSphere = val === 1;
        this.objecType = this._doSphere ? "sphere" : "cylinder";
        break;
      case "generate":
        this._showCode = this._canGenerate();
        break;
      case "modify":
        this._showCode = false;
        break;
    }
    if (changed === true) {
      this._setWarnings();
    }
  }
  renderWarnings(msgs) {
    const l2 = msgs.length;
    if (l2 === 0) {
      return "";
    } else if (l2 === 1) {
      return msgs[0] !== "" ? $`<p class="alert alert-warn"><strong>Warning:</strong> ${msgs[0].substring(2, 200)}</p>` : "";
    } else {
      return $`
        <div class="alert alert-warn">
          <h3>Warning:</h3>
          <ul>
            ${c(msgs, (item) => item.substring(0, 2), (item) => $`
                <li>${item.substring(2, 200)}</li>
              `)}
          </ul>
        </div>`;
    }
  }
  renderRadioBtn(label, value, checked) {
    const id = label.toLocaleLowerCase();
    return $`
      <li>
        <input type="radio"
              id="object-type-${id}"
              name="object-type"
              value="${value}"
              ?checked="${checked}"
              @change=${this.changeHandler}
              class="radio-grp__input" />
        <label for="object-type-${id}"
              class="radio-grp__label">${label}</label>
      </li>`;
  }
  renderCbBtn(id, label, checked, title = "") {
    const _title = title !== "" ? title : void 0;
    return $`
      <li>
        <input type="checkbox"
               id="${id}"
               name="${id}"
               class="cb-btn__input"
              ?checked=${checked}
              @change=${this.changeHandler} />
        <label for="${id}"
               class="cb-btn__label cb-btn__label--badge"
               title="${l(_title)}">
          ${label}
        </label>
      </li>`;
  }
  renderNumInput(id, label, value, min, max, warnings, description = "") {
    return $`
      ${this.renderWarnings(warnings)}
      <p class="input">
        <label for="${id}">${label}:</label>
        <input type="number"
               id="${id}"
               name="${id}"
              .value="${value}"
               min="${min}"
               max="${max}"
               step="1"
              @change=${this.changeHandler} />
        ${description !== "" ? $`<span class="input__desc">${description}</span>` : ""}
      </p>
    `;
  }
  renderInputs() {
    let btn = this._canGenerate() ? $`
          <button id="generate"
                  value="1"
                 @click=${this.changeHandler}>
            Generate
          </button>` : "";
    const tmp = this.radius - this._rMin - 1;
    const obj = ucFirst(this.objecType);
    return $`

      ${this.renderWarnings(this._warningMsgs.general)}
      ${this.outputMode === 1 ? $`
          <div class="checkable-grp__wrap radio-grp__wrapper">
              <h3 id="object-type-label" class="checkable-grp__h radio-grp__h">Object type:</h2>
              <ul class="list-clean list-clean--tight list-inline radio-grp__items">
                ${this.renderRadioBtn("Sphere", 1, this._doSphere)}
                ${this.renderRadioBtn("Cylinder", 0, !this._doSphere)}
              </ul>
            </div>
          ` : ""}
      <p>
        <label for="block-type">Block type:</label>
        <input type="text"
               id="block-type"
               name="block-type"
              .value="${this.blockTypeLabel}"
               list="block-type-options"
               size="50"
              @keyup=${this._filterBlockList} />
        ${this._filteredBlocks.length > 0 ? $`
          <datalist id="block-type-options">
            ${c(this._filteredBlocks, (item) => item.id, (item) => $`<option value="${item.label}">`)}
          </datalist>
          ` : ""}
      </p>

      ${this.renderNumInput("radius", obj + " radius", this.radius, this._rMin, this.vMax, this._warningMsgs.radius)}
      ${this.renderNumInput("thickness", obj + " thickness", this.thickness, 1, tmp > 1 ? tmp : 1, [this._warningMsgs.thickness])}
      ${this._doSphere === false ? this.renderNumInput("length", "Cylinder length", this.length, 1, tmp > 1 ? tmp : 1, [this._warningMsgs.length]) : this.renderNumInput("stop-angle", "Stop angle for sphere (180 = full sphere)", this.stopAngle, 1, 180, [this._warningMsgs.stopAngle], 'The angle (from "straight up") when the sphere stops being generated. Used for creating domes and parts of a sphere')}

      <h2>${obj} center coordinates</h2>
      ${this.renderNumInput("centreX", "East / West", this.centreX, this.hMax * -1, this.hMax, [this._warningMsgs.x])}
      ${this.renderNumInput("centreZ", "Up / Down", this.centreZ, this.vMax * -1, this.vMax, [this._warningMsgs.z])}
      ${this.renderNumInput("centreY", "North / South", this.centreY, this.hMax * -1, this.hMax, [this._warningMsgs.y])}

      <ul class="list-clean checkable-grp__items checkbox-grp__items">
        ${this._warningCount > 0 ? this.renderCbBtn("ignore-warnings", "Ignore warnings", this.ignoreWarnings) : ""}
        ${this.renderCbBtn("fill-with-air", "Fill " + this.objecType + " with air", this.fillWithAir, "If your " + this.objecType + " partially or completely occupies a space that is already occupied by other block types, this insures it is hollow.\n(NOTE: This could significantly increase the build time.)")}
        ${this.renderCbBtn("hollow-centre", "Make sure centre of " + this.objecType + " is filled with air", this.hollowCentre, "Make sure the centre of your " + this.objecType + " is empty, this insures that you have a place to stand when creating the " + this.objecType + ".\n(NOTE: Only use this if you know the centre of your " + this.objecType + " is inside existing non-air/non-water blocks.)")}
        ${this.renderCbBtn("show-comments", "Show extra comments", this.showExtraComments)}
      </ul>
      ${this.renderNumInput("cmdBlockHeight", "Command block vertical height", this.cmdBlockHeight, this.vMax * -1, this.vMax, [this._warningMsgs.cmdBlockHeight], "The altitude command blocks are placed so they don't interfear with other blocks when they are set and removed")}
      ${btn}`;
  }
  renderCode() {
    return $`
      <textarea>${this._doSphere ? this._generateSphere() : this._generateCylinder()}</textarea>
      <button id="modify"
              value="1"
             @click=${this.changeHandler}>
        Modify
      </button>`;
  }
  render() {
    this._init();
    return $`
      <h1>Minecraft sphere (& cylinder) code generator</h1>

      ${this._showCode === false ? this.renderInputs() : this.renderCode()}
    `;
  }
};
MinecraftSphere.styles = r$2`
    :host {
      font-family: inherit;
      color: inherit;
      background-color: inherit;
      box-sizing: border-box;

      --font-size: 16px;
      --timing: 0.4s;
      --ease: ease-in-out;
      --line-weight: 0.05rem;
      --line-weight-hvy: .1rem;
      --txt-colour: #fff;
      --bg-colour: #2d2b2b;
      --h-font: Arial, Helvetica, sans-serif;

      --outline: 0.25rem dotted var(--txt-colour);
      --outline-offset: 0.2rem;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--h-font);
    }

    .radio-grp__items {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      align-content: stretch;
      border: var(--line-weight-hvy) solid var(--txt-colour);
      border-radius: 1em;
      box-sizing: border-box;
      justify-content: space-between;
      margin: 0.5em 0;
      /* overflow: hidden; */
      padding: 0.1rem 0.3rem;
      position: relative;
    }

    @media screen and (min-width: 35rem) {
      .radio-grp__items {
        flex-direction: row;
        padding: 0;
        border-radius: 2rem;
      }
    }
    .radio-grp__items > li {
      flex-grow: 1;
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    .radio-grp__label {
      /* background-color: var(--bg-colour);
      color: var(--txt-colour); */
      border-radius: 2em;
      display: inline-block;
      margin: 0 -0.25em;
      padding: 0.2rem 0 0.2rem 2em;
      position: relative;
      text-align: center;
      transition: color var(--ease) var(--timing) background-color var(--ease) var(--timing);
      width: calc(100% - 2.2rem);
    }
    .radio-grp__label:hover {
      cursor: pointer
    }
    .radio-grp__input:focus + .radio-grp__label,
    .radio-grp__label:focus {
      outline: var(--outline);
      outline-offset: var(--outline-offset);
    }
    .radio-grp__label::after {
      background-color: var(--bg-colour);
      border: var(--line-weight-hvy) solid var(--bg-colour);
      border-radius: 50%;
      color: var(--txt-colour);
      content: "\\02713";
      display: inline-block;
      font-size: 0.86em;
      height: 1.25em;
      left: 0.35em;
      line-height: 1.25;
      opacity: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transition: opacity var(--ease) var(--timing);
      width: 1.25em;
    }
    li:first-child .radio-grp__label::after {
      left: 0.45rem;
    }

    .radio-grp :first-child .radio-grp__label {
      margin-left: 0;
    }
    .radio-grp :last-child .radio-grp__label {
      margin-right: 0;
    }
    .radio-grp__h {
      margin: 0;
    }
    .radio-grp__input {
      display: inline-block;
      opacity: 0;
      height: 1px;
      width: 1px;
      margin-left: -1px;
      z-index: -1;
      position: absolute;
      top: -10em;
      left: -10em;
    }
    .radio-grp__input:checked + .radio-grp__label {
      color: var(--bg-colour);
      background-color: var(--txt-colour);
      padding-left: 2.5em;
      /* width: 100%; */
      z-index: 1;
    }
    .radio-grp__input:checked + .radio-grp__label::after {
      opacity: 1;
    }
    .cb-btn__label {
      display: block;
      border: var(--line-weight-hvy) solid var(--txt-colour);
      max-width: 24rem;
      padding: 0.2rem 1.75rem;
      position: relative;
      text-align: center;
      margin: 1rem 0;
    }
    .cb-btn__label--centre {
      margin: 0.1rem auto;
    }
    .cb-btn__label--badge::before {
      border: var(--line-weight-hvy) solid var(--txt-colour);
      border-radius: 50%;
      color: var(--txt-colour);
      content: "\\02717";
      display: inline-block;
      font-size: 0.86rem;
      height: 1em;
      left: 0.35rem;
      line-height: 1;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 1em;
    }
    .cb-btn__label--star::before {
      content: "\\02605" !important;
    }
    .cb-btn__label--heart::before {
      content: "\\02665" !important;
    }
    .cb-btn__label--search::before {
      content: "\\02315" !important;
    }
    .cb-btn__label--target::before {
      content: "\\02316" !important;
    }
    .cb-btn__label:hover {
      cursor: pointer;
    }
    .cb-btn__input {
      display: inline-block;
      position: absolute;
      opacity: 0;
      margin-right: -1rem;
      margin-bottom: -1rem;
    }
    .cb-btn__input:checked + .cb-btn__label {
      background-color: var(--txt-colour);
      color: var(--bg-colour);
    }
    .cb-btn__input:checked + .cb-btn__label--badge::before {
      background-color: var(--bg-colour);
      border-color: var(--bg-colour);
      color: var(--txt-colour);
      content: "\\02713";
    }
    .cb-btn__input:focus + .cb-btn__label {
      outline: var(--outline);
      outline-offset: var(--outline-offset);
    }
    .list-clean {
      margin: 0;
      padding: 0;
    }
    .alert {
      padding: 0.5rem;
      margin: 1.5rem 0 0.5rem;
    }
    .alert-warn {
      background-color: #eedb90;
      color: #000;
    }
    textarea {
      display: block;
      width: 100%;
      height: 50rem;
      background-color: var(--bg-colour);
      color: var(--txt-colour);
      padding: 0.5rem;
      border: var(--line-weight) solid var(--txt-colour);
      box-sizing: border-box;
      font-family: 'Courier New', Courier, monospace;
    }

    p.input {
      // align-items: flex-start;
      box-sizing: border-box;
      border-top: var(--line-weight) solid var(--txt-colour);
      display: grid;
      grid-template-areas: 'label' 'input' 'description';
      row-gap: 0.5rem;
      column-gap: 0.5rem;
      margin-top: 0.5rem;
      padding: 1rem 0 0;
    }
    p.input > label {
      display: inline-block;
      padding-right: 1rem;
      text-align: right;
      width: 100%;
      grid-area: label;
    }
    p.input > input {
      display: inline-block;
      // flex-grow: 1;
      width: 5rem;
      grid-area: input;
    }
    .input__desc {
      grid-area: description;
    }
    button {
      display: inline-block;
      padding: 0.5rem 1.25rem;
      margin-top: 1rem;
      font-size: 1.5rem;
      border-radius: 2rem;
      background-color: #12511c;
      color: #fff;
      border: none;
      box-shadow: 0.2rem 0.2rem 0.75rem rgba(255, 255, 255, 0.2);
    }
    option:selected {
      font-weight: bold;
    }
    @media screen and (min-width: 48rem) {
      p.input {
        grid-template-areas: 'label input' 'label description';
        grid-template-columns: 10rem 1fr;
      }
    }
  `;
__decorateClass([
  e$2({ reflect: true, type: Number })
], MinecraftSphere.prototype, "radius", 2);
__decorateClass([
  e$2({ reflect: true, type: Number })
], MinecraftSphere.prototype, "thickness", 2);
__decorateClass([
  e$2({ reflect: true, type: Number })
], MinecraftSphere.prototype, "length", 2);
__decorateClass([
  e$2({ reflect: true, type: String })
], MinecraftSphere.prototype, "blockTypeLabel", 2);
__decorateClass([
  e$2({ reflect: true, type: String })
], MinecraftSphere.prototype, "blockTypeID", 2);
__decorateClass([
  e$2({ reflect: true, type: Number })
], MinecraftSphere.prototype, "centreX", 2);
__decorateClass([
  e$2({ reflect: true, type: Number })
], MinecraftSphere.prototype, "centreY", 2);
__decorateClass([
  e$2({ reflect: true, type: Number })
], MinecraftSphere.prototype, "centreZ", 2);
__decorateClass([
  e$2({ type: Number })
], MinecraftSphere.prototype, "vMax", 2);
__decorateClass([
  e$2({ type: Number })
], MinecraftSphere.prototype, "hMax", 2);
__decorateClass([
  e$2({ type: Number })
], MinecraftSphere.prototype, "slowThreshold", 2);
__decorateClass([
  e$2({ type: Number })
], MinecraftSphere.prototype, "outputMode", 2);
__decorateClass([
  e$2({ type: Boolean })
], MinecraftSphere.prototype, "ignoreWarnings", 2);
__decorateClass([
  e$2({ type: Boolean })
], MinecraftSphere.prototype, "showExtraComments", 2);
__decorateClass([
  e$2({ type: Boolean })
], MinecraftSphere.prototype, "fillWithAir", 2);
__decorateClass([
  e$2({ type: Boolean })
], MinecraftSphere.prototype, "hollowCentre", 2);
__decorateClass([
  e$2({ reflect: true, type: String })
], MinecraftSphere.prototype, "objecType", 2);
__decorateClass([
  e$2({ reflect: true, type: Number })
], MinecraftSphere.prototype, "stopAngle", 2);
__decorateClass([
  e$2({ reflect: true, type: Number })
], MinecraftSphere.prototype, "cmdBlockHeight", 2);
__decorateClass([
  t$1()
], MinecraftSphere.prototype, "_warningMsgs", 2);
__decorateClass([
  t$1()
], MinecraftSphere.prototype, "radiusError", 2);
__decorateClass([
  t$1()
], MinecraftSphere.prototype, "thicknessError", 2);
__decorateClass([
  t$1()
], MinecraftSphere.prototype, "_warningCount", 2);
__decorateClass([
  t$1()
], MinecraftSphere.prototype, "_errorCount", 2);
__decorateClass([
  t$1()
], MinecraftSphere.prototype, "_showCode", 2);
__decorateClass([
  t$1()
], MinecraftSphere.prototype, "_filteredBlocks", 2);
__decorateClass([
  t$1()
], MinecraftSphere.prototype, "_doSphere", 2);
MinecraftSphere = __decorateClass([
  n$1("minecraft-sphere")
], MinecraftSphere);
export { MinecraftSphere };
