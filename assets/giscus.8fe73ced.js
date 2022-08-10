/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$7 = Symbol(), n$7 = /* @__PURE__ */ new WeakMap();
class s$3 {
  constructor(t2, n2, s2) {
    if (this._$cssResult$ = true, s2 !== e$7)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = n2;
  }
  get styleSheet() {
    let e2 = this.o;
    const s2 = this.t;
    if (t$2 && void 0 === e2) {
      const t2 = void 0 !== s2 && 1 === s2.length;
      t2 && (e2 = n$7.get(s2)), void 0 === e2 && ((this.o = e2 = new CSSStyleSheet()).replaceSync(this.cssText), t2 && n$7.set(s2, e2));
    }
    return e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$5 = (t2) => new s$3("string" == typeof t2 ? t2 : t2 + "", void 0, e$7), r$4 = (t2, ...n2) => {
  const o2 = 1 === t2.length ? t2[0] : n2.reduce((e2, n3, s2) => e2 + ((t3) => {
    if (true === t3._$cssResult$)
      return t3.cssText;
    if ("number" == typeof t3)
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n3) + t2[s2 + 1], t2[0]);
  return new s$3(o2, t2, e$7);
}, i$4 = (e2, n2) => {
  t$2 ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    void 0 !== s2 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
  });
}, S$2 = t$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const n2 of t3.cssRules)
    e2 += n2.cssText;
  return o$5(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$6 = window.trustedTypes, r$3 = e$6 ? e$6.emptyScript : "", h$3 = window.reactiveElementPolyfillSupport, o$4 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? r$3 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = null !== t2;
      break;
    case Number:
      s2 = null === t2 ? null : Number(t2);
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
} }, n$6 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$3 = { attribute: true, type: String, converter: o$4, reflect: false, hasChanged: n$6 };
class a$1 extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t2) {
    var i2;
    null !== (i2 = this.h) && void 0 !== i2 || (this.h = []), this.h.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Ep(s2, i2);
      void 0 !== e2 && (this._$Ev.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$3) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = "symbol" == typeof t2 ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      void 0 !== e2 && Object.defineProperty(this.prototype, t2, e2);
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
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
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
        s2.unshift(S$2(i3));
    } else
      void 0 !== i2 && s2.push(S$2(i2));
    return s2;
  }
  static _$Ep(t2, i2) {
    const s2 = i2.attribute;
    return false === s2 ? void 0 : "string" == typeof s2 ? s2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  u() {
    var t2;
    this._$E_ = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t2 = this.constructor.h) || void 0 === t2 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    (null !== (i2 = this._$ES) && void 0 !== i2 ? i2 : this._$ES = []).push(t2), void 0 !== this.renderRoot && this.isConnected && (null === (s2 = t2.hostConnected) || void 0 === s2 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    null === (i2 = this._$ES) || void 0 === i2 || i2.splice(this._$ES.indexOf(t2) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Ei.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = null !== (t2 = this.shadowRoot) && void 0 !== t2 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$4(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i2;
      return null === (i2 = t3.hostConnected) || void 0 === i2 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i2;
      return null === (i2 = t3.hostDisconnected) || void 0 === i2 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$EO(t2, i2, s2 = l$3) {
    var e2, r2;
    const h2 = this.constructor._$Ep(t2, s2);
    if (void 0 !== h2 && true === s2.reflect) {
      const n2 = (null !== (r2 = null === (e2 = s2.converter) || void 0 === e2 ? void 0 : e2.toAttribute) && void 0 !== r2 ? r2 : o$4.toAttribute)(i2, s2.type);
      this._$El = t2, null == n2 ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$El = null;
    }
  }
  _$AK(t2, i2) {
    var s2, e2;
    const r2 = this.constructor, h2 = r2._$Ev.get(t2);
    if (void 0 !== h2 && this._$El !== h2) {
      const t3 = r2.getPropertyOptions(h2), n2 = t3.converter, l2 = null !== (e2 = null !== (s2 = null == n2 ? void 0 : n2.fromAttribute) && void 0 !== s2 ? s2 : "function" == typeof n2 ? n2 : null) && void 0 !== e2 ? e2 : o$4.fromAttribute;
      this._$El = h2, this[h2] = l2(i2, t3.type), this._$El = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    void 0 !== t2 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$6)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), true === s2.reflect && this._$El !== t2 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t3, i3) => this[i3] = t3), this._$Ei = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
        var i3;
        return null === (i3 = t3.hostUpdate) || void 0 === i3 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$Ek();
    } catch (t3) {
      throw i2 = false, this._$Ek(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    null === (i2 = this._$ES) || void 0 === i2 || i2.forEach((t3) => {
      var i3;
      return null === (i3 = t3.hostUpdated) || void 0 === i3 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    void 0 !== this._$EC && (this._$EC.forEach((t3, i2) => this._$EO(i2, this[i2], t3)), this._$EC = void 0), this._$Ek();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
a$1.finalized = true, a$1.elementProperties = /* @__PURE__ */ new Map(), a$1.elementStyles = [], a$1.shadowRootOptions = { mode: "open" }, null == h$3 || h$3({ ReactiveElement: a$1 }), (null !== (s$2 = globalThis.reactiveElementVersions) && void 0 !== s$2 ? s$2 : globalThis.reactiveElementVersions = []).push("1.3.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$3 = globalThis.trustedTypes, s$1 = i$3 ? i$3.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$5 = `lit$${(Math.random() + "").slice(9)}$`, o$3 = "?" + e$5, n$5 = `<${o$3}>`, l$2 = document, h$2 = (t2 = "") => l$2.createComment(t2), r$2 = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, d$1 = Array.isArray, u = (t2) => d$1(t2) || "function" == typeof (null == t2 ? void 0 : t2[Symbol.iterator]), c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f$1 = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _ = /'/g, g = /"/g, m = /^(?:script|style|textarea|title)$/i, p = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), $ = p(1), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), x = /* @__PURE__ */ new WeakMap(), T = (t2, i2, s2) => {
  var e2, o2;
  const n2 = null !== (e2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== e2 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (void 0 === l2) {
    const t3 = null !== (o2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== o2 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(h$2(), t3), t3, void 0, null != s2 ? s2 : {});
  }
  return l2._$AI(t2), l2;
}, A = l$2.createTreeWalker(l$2, 129, null, false), E = (t2, i2) => {
  const o2 = t2.length - 1, l2 = [];
  let h2, r2 = 2 === i2 ? "<svg>" : "", d2 = c;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t2[i3];
    let o3, u3, p2 = -1, $2 = 0;
    for (; $2 < s2.length && (d2.lastIndex = $2, u3 = d2.exec(s2), null !== u3); )
      $2 = d2.lastIndex, d2 === c ? "!--" === u3[1] ? d2 = v : void 0 !== u3[1] ? d2 = a : void 0 !== u3[2] ? (m.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f$1) : void 0 !== u3[3] && (d2 = f$1) : d2 === f$1 ? ">" === u3[0] ? (d2 = null != h2 ? h2 : c, p2 = -1) : void 0 === u3[1] ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = void 0 === u3[3] ? f$1 : '"' === u3[3] ? g : _) : d2 === g || d2 === _ ? d2 = f$1 : d2 === v || d2 === a ? d2 = c : (d2 = f$1, h2 = void 0);
    const y = d2 === f$1 && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c ? s2 + n$5 : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e$5 + y) : s2 + e$5 + (-2 === p2 ? (l2.push(void 0), i3) : y);
  }
  const u2 = r2 + (t2[o2] || "<?>") + (2 === i2 ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== s$1 ? s$1.createHTML(u2) : u2, l2];
};
class C {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = E(t2, s2);
    if (this.el = C.createElement(v2, n2), A.currentNode = this.el.content, 2 === s2) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; null !== (l2 = A.nextNode()) && c2.length < u2; ) {
      if (1 === l2.nodeType) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$5)) {
              const s3 = a2[d2++];
              if (t3.push(i2), void 0 !== s3) {
                const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$5), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t4, ctor: "." === i3[1] ? M : "?" === i3[1] ? k : "@" === i3[1] ? H : S$1 });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t3)
            l2.removeAttribute(i2);
        }
        if (m.test(l2.tagName)) {
          const t3 = l2.textContent.split(e$5), s3 = t3.length - 1;
          if (s3 > 0) {
            l2.textContent = i$3 ? i$3.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t3[i2], h$2()), A.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t3[s3], h$2());
          }
        }
      } else if (8 === l2.nodeType)
        if (l2.data === o$3)
          c2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = l2.data.indexOf(e$5, t3 + 1)); )
            c2.push({ type: 7, index: r2 }), t3 += e$5.length - 1;
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
  let d2 = void 0 !== e2 ? null === (o2 = s2._$Cl) || void 0 === o2 ? void 0 : o2[e2] : s2._$Cu;
  const u2 = r$2(i2) ? void 0 : i2._$litDirective$;
  return (null == d2 ? void 0 : d2.constructor) !== u2 && (null === (n2 = null == d2 ? void 0 : d2._$AO) || void 0 === n2 || n2.call(d2, false), void 0 === u2 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), void 0 !== e2 ? (null !== (l2 = (h2 = s2)._$Cl) && void 0 !== l2 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), void 0 !== d2 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
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
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = (null !== (i2 = null == t2 ? void 0 : t2.creationScope) && void 0 !== i2 ? i2 : l$2).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; void 0 !== d2; ) {
      if (h2 === d2.index) {
        let i3;
        2 === d2.type ? i3 = new N(n2, n2.nextSibling, this, t2) : 1 === d2.type ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : 6 === d2.type && (i3 = new I(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (null == d2 ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t2) {
    let i2 = 0;
    for (const s2 of this.v)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class N {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$C_ = null === (o2 = null == e2 ? void 0 : e2.isConnected) || void 0 === o2 || o2;
  }
  get _$AU() {
    var t2, i2;
    return null !== (i2 = null === (t2 = this._$AM) || void 0 === t2 ? void 0 : t2._$AU) && void 0 !== i2 ? i2 : this._$C_;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === t2.nodeType && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = P(this, t2, i2), r$2(t2) ? t2 === w || null == t2 || "" === t2 ? (this._$AH !== w && this._$AR(), this._$AH = w) : t2 !== this._$AH && t2 !== b && this.T(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.k(t2) : u(t2) ? this.S(t2) : this.T(t2);
  }
  j(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  k(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.j(t2));
  }
  T(t2) {
    this._$AH !== w && r$2(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(l$2.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = "number" == typeof e2 ? this._$AC(t2) : (void 0 === e2.el && (e2.el = C.createElement(e2.h, this.options)), e2);
    if ((null === (i2 = this._$AH) || void 0 === i2 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t3 = new V(o2, this), i3 = t3.p(this.options);
      t3.m(s2), this.k(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = x.get(t2.strings);
    return void 0 === i2 && x.set(t2.strings, i2 = new C(t2)), i2;
  }
  S(t2) {
    d$1(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new N(this.j(h$2()), this.j(h$2()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for (null === (s2 = this._$AP) || void 0 === s2 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    void 0 === this._$AM && (this._$C_ = t2, null === (i2 = this._$AP) || void 0 === i2 || i2.call(this, t2));
  }
}
class S$1 {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
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
    if (void 0 === o2)
      t2 = P(this, t2, i2, 0), n2 = !r$2(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = P(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r$2(h2) || h2 !== this._$AH[l2]), h2 === w ? t2 = w : t2 !== w && (t2 += (null != h2 ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.P(t2);
  }
  P(t2) {
    t2 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t2 ? t2 : "");
  }
}
class M extends S$1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t2) {
    this.element[this.name] = t2 === w ? void 0 : t2;
  }
}
const R = i$3 ? i$3.emptyScript : "";
class k extends S$1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t2) {
    t2 && t2 !== w ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
  }
}
class H extends S$1 {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = null !== (s2 = P(this, t2, i2, 0)) && void 0 !== s2 ? s2 : w) === b)
      return;
    const e2 = this._$AH, o2 = t2 === w && e2 !== w || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== w && (e2 === w || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s2 = null === (i2 = this.options) || void 0 === i2 ? void 0 : i2.host) && void 0 !== s2 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class I {
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
const z = window.litHtmlPolyfillSupport;
null == z || z(C, N), (null !== (t$1 = globalThis.litHtmlVersions) && void 0 !== t$1 ? t$1 : globalThis.litHtmlVersions = []).push("2.2.7");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l$1, o$2;
class s extends a$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return null !== (t2 = (e2 = this.renderOptions).renderBefore) && void 0 !== t2 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = T(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(false);
  }
  render() {
    return b;
  }
}
s.finalized = true, s._$litElement$ = true, null === (l$1 = globalThis.litElementHydrateSupport) || void 0 === l$1 || l$1.call(globalThis, { LitElement: s });
const n$4 = globalThis.litElementPolyfillSupport;
null == n$4 || n$4({ LitElement: s });
(null !== (o$2 = globalThis.litElementVersions) && void 0 !== o$2 ? o$2 : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$3 = (n2) => (e2) => "function" == typeof e2 ? ((n3, e3) => (window.customElements.define(n3, e3), e3))(n2, e2) : ((n3, e3) => {
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
const i$2 = (i2, e2) => "method" === e2.kind && e2.descriptor && !("value" in e2.descriptor) ? { ...e2, finisher(n2) {
  n2.createProperty(e2.key, i2);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  "function" == typeof e2.initializer && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e$4(e2) {
  return (n2, t2) => void 0 !== t2 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t2) : i$2(e2, n2);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n$2;
null != (null === (n$2 = window.HTMLSlotElement) || void 0 === n$2 ? void 0 : n$2.prototype.assignedElements) ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$3 = (o2) => void 0 === o2.strings;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$2 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
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
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1 = (i2, t2) => {
  var s2, o2;
  const n2 = i2._$AN;
  if (void 0 === n2)
    return false;
  for (const i3 of n2)
    null === (o2 = (s2 = i3)._$AO) || void 0 === o2 || o2.call(s2, t2, false), e$1(i3, t2);
  return true;
}, o$1 = (i2) => {
  let t2, s2;
  do {
    if (void 0 === (t2 = i2._$AM))
      break;
    s2 = t2._$AN, s2.delete(i2), i2 = t2;
  } while (0 === (null == s2 ? void 0 : s2.size));
}, n$1 = (i2) => {
  for (let t2; t2 = i2._$AM; i2 = t2) {
    let s2 = t2._$AN;
    if (void 0 === s2)
      t2._$AN = s2 = /* @__PURE__ */ new Set();
    else if (s2.has(i2))
      break;
    s2.add(i2), l(t2);
  }
};
function r$1(i2) {
  void 0 !== this._$AN ? (o$1(this), this._$AM = i2, n$1(this)) : this._$AM = i2;
}
function h$1(i2, t2 = false, s2 = 0) {
  const n2 = this._$AH, r2 = this._$AN;
  if (void 0 !== r2 && 0 !== r2.size)
    if (t2)
      if (Array.isArray(n2))
        for (let i3 = s2; i3 < n2.length; i3++)
          e$1(n2[i3], false), o$1(n2[i3]);
      else
        null != n2 && (e$1(n2, false), o$1(n2));
    else
      e$1(this, i2);
}
const l = (i2) => {
  var t$12, e2, o2, n2;
  i2.type == t.CHILD && (null !== (t$12 = (o2 = i2)._$AP) && void 0 !== t$12 || (o2._$AP = h$1), null !== (e2 = (n2 = i2)._$AQ) && void 0 !== e2 || (n2._$AQ = r$1));
};
class d extends i$1 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i2, t2, s2) {
    super._$AT(i2, t2, s2), n$1(this), this.isConnected = i2._$AU;
  }
  _$AO(i2, t2 = true) {
    var s2, n2;
    i2 !== this.isConnected && (this.isConnected = i2, i2 ? null === (s2 = this.reconnected) || void 0 === s2 || s2.call(this) : null === (n2 = this.disconnected) || void 0 === n2 || n2.call(this)), t2 && (e$1(this, i2), o$1(this));
  }
  setValue(t2) {
    if (e$3(this._$Ct))
      this._$Ct._$AI(t2, this);
    else {
      const i2 = [...this._$Ct._$AH];
      i2[this._$Ci] = t2, this._$Ct._$AI(i2, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = () => new o();
class o {
}
const h = /* @__PURE__ */ new WeakMap(), n = e$2(class extends d {
  render(t2) {
    return w;
  }
  update(t2, [s2]) {
    var e2;
    const o2 = s2 !== this.Y;
    return o2 && void 0 !== this.Y && this.rt(void 0), (o2 || this.lt !== this.ct) && (this.Y = s2, this.dt = null === (e2 = t2.options) || void 0 === e2 ? void 0 : e2.host, this.rt(this.ct = t2.element)), w;
  }
  rt(i2) {
    var t2;
    if ("function" == typeof this.Y) {
      const s2 = null !== (t2 = this.dt) && void 0 !== t2 ? t2 : globalThis;
      let e2 = h.get(s2);
      void 0 === e2 && (e2 = /* @__PURE__ */ new WeakMap(), h.set(s2, e2)), void 0 !== e2.get(this.Y) && this.Y.call(this.dt, void 0), e2.set(this.Y, i2), void 0 !== i2 && this.Y.call(this.dt, i2);
    } else
      this.Y.value = i2;
  }
  get lt() {
    var i2, t2, s2;
    return "function" == typeof this.Y ? null === (t2 = h.get(null !== (i2 = this.dt) && void 0 !== i2 ? i2 : globalThis)) || void 0 === t2 ? void 0 : t2.get(this.Y) : null === (s2 = this.Y) || void 0 === s2 ? void 0 : s2.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
var f = Object.defineProperty, S = Object.getOwnPropertyDescriptor, i = (e2, t2, s2, n2) => {
  for (var a2 = n2 > 1 ? void 0 : n2 ? S(t2, s2) : t2, c2 = e2.length - 1, h2; c2 >= 0; c2--)
    (h2 = e2[c2]) && (a2 = (n2 ? h2(t2, s2, a2) : h2(a2)) || a2);
  return n2 && a2 && f(t2, s2, a2), a2;
};
let r = class extends s {
  constructor() {
    super(), this.GISCUS_SESSION_KEY = "giscus-session", this.GISCUS_DEFAULT_HOST = "https://giscus.app", this.ERROR_SUGGESTION = "Please consider reporting this error at https://github.com/giscus/giscus/issues/new.", this.__session = "", this._iframeRef = e(), this.messageEventHandler = this.handleMessageEvent.bind(this), this.host = this.GISCUS_DEFAULT_HOST, this.strict = "0", this.reactionsEnabled = "1", this.emitMetadata = "0", this.inputPosition = "bottom", this.theme = "light", this.lang = "en", this.loading = "eager", this.setupSession(), window.addEventListener("message", this.messageEventHandler);
  }
  get iframeRef() {
    return this._iframeRef.value;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("message", this.messageEventHandler);
  }
  _formatError(e2) {
    return `[giscus] An error occurred. Error message: "${e2}".`;
  }
  setupSession() {
    const e2 = location.href, t2 = new URL(e2), s2 = localStorage.getItem(this.GISCUS_SESSION_KEY), n2 = t2.searchParams.get("giscus") || "";
    if (n2) {
      localStorage.setItem(this.GISCUS_SESSION_KEY, JSON.stringify(n2)), this.__session = n2, t2.searchParams.delete("giscus"), history.replaceState(void 0, document.title, t2.toString());
      return;
    }
    if (s2)
      try {
        this.__session = JSON.parse(s2 || "") || "";
      } catch (a2) {
        this.__session = "", localStorage.removeItem(this.GISCUS_SESSION_KEY), console.warn(
          `${this._formatError(a2 == null ? void 0 : a2.message)} Session has been cleared.`
        );
      }
  }
  handleMessageEvent(e2) {
    if (e2.origin !== this.host)
      return;
    const { data: t2 } = e2;
    if (!(typeof t2 == "object" && t2.giscus) || (this.iframeRef && t2.giscus.resizeHeight && (this.iframeRef.style.height = `${t2.giscus.resizeHeight}px`), !t2.giscus.error))
      return;
    const s2 = t2.giscus.error;
    if (s2.includes("Bad credentials") || s2.includes("Invalid state value")) {
      if (localStorage.getItem(this.GISCUS_SESSION_KEY) !== null) {
        localStorage.removeItem(this.GISCUS_SESSION_KEY), this.__session = "", console.warn(`${this._formatError(s2)} Session has been cleared.`), this.update(/* @__PURE__ */ new Map());
        return;
      }
      console.error(
        `${this._formatError(s2)} No session is stored initially. ${this.ERROR_SUGGESTION}`
      );
    }
    if (s2.includes("Discussion not found")) {
      console.warn(
        `[giscus] ${s2}. A new discussion will be created if a comment/reaction is submitted.`
      );
      return;
    }
    console.error(`${this._formatError(s2)} ${this.ERROR_SUGGESTION}`);
  }
  sendMessage(e2) {
    var t2, s2;
    (s2 = (t2 = this.iframeRef) == null ? void 0 : t2.contentWindow) == null || s2.postMessage({ giscus: e2 }, this.host);
  }
  updateConfig() {
    const e2 = {
      setConfig: {
        repo: this.repo,
        repoId: this.repoId,
        category: this.category,
        categoryId: this.categoryId,
        term: this.getTerm(),
        number: +this.getNumber(),
        strict: this.strict === "1",
        reactionsEnabled: this.reactionsEnabled === "1",
        emitMetadata: this.emitMetadata === "1",
        inputPosition: this.inputPosition,
        theme: this.theme,
        lang: this.lang
      }
    };
    this.sendMessage(e2);
  }
  requestUpdate(e2, t2, s2) {
    if (!this.hasUpdated || e2 === "host") {
      super.requestUpdate(e2, t2, s2);
      return;
    }
    this.updateConfig();
  }
  getMetaContent(e2, t2 = false) {
    const s2 = t2 ? `meta[property='og:${e2}'],` : "", n2 = document.querySelector(
      s2 + `meta[name='${e2}']`
    );
    return n2 ? n2.content : "";
  }
  _getCleanedUrl() {
    const e2 = new URL(location.href);
    return e2.searchParams.delete("giscus"), e2;
  }
  getTerm() {
    switch (this.mapping) {
      case "url":
        return `${this._getCleanedUrl()}`;
      case "title":
        return document.title;
      case "og:title":
        return this.getMetaContent("title", true);
      case "specific":
        return this.term || "";
      case "number":
        return "";
      case "pathname":
      default:
        return location.pathname.length < 2 ? "index" : location.pathname.substring(1).replace(/\.\w+$/, "");
    }
  }
  getNumber() {
    return this.mapping === "number" && this.term || "";
  }
  getIframeSrc() {
    const e2 = this._getCleanedUrl().toString(), t2 = `${e2}${this.id ? "#" + this.id : ""}`, s2 = this.getMetaContent("description", true), n2 = this.getMetaContent("giscus:backlink") || e2, a2 = {
      origin: t2,
      session: this.__session,
      repo: this.repo,
      repoId: this.repoId || "",
      category: this.category || "",
      categoryId: this.categoryId || "",
      term: this.getTerm(),
      number: this.getNumber(),
      strict: this.strict,
      reactionsEnabled: this.reactionsEnabled,
      emitMetadata: this.emitMetadata,
      inputPosition: this.inputPosition,
      theme: this.theme,
      description: s2,
      backLink: n2
    }, c2 = this.lang ? `/${this.lang}` : "", h2 = new URLSearchParams(a2);
    return `${this.host}${c2}/widget?${h2}`;
  }
  render() {
    return $`
      <iframe
        title="Comments"
        scrolling="no"
        ${n(this._iframeRef)}
        src=${this.getIframeSrc()}
        loading=${this.loading}
        part="iframe"
      ></iframe>
    `;
  }
};
r.styles = r$4`
    :host,
    iframe {
      width: 100%;
      border: none;
      color-scheme: normal;
      min-height: 150px;
    }
  `;
i([
  e$4({ reflect: true })
], r.prototype, "host", 2);
i([
  e$4({ reflect: true })
], r.prototype, "repo", 2);
i([
  e$4({ reflect: true })
], r.prototype, "repoId", 2);
i([
  e$4({ reflect: true })
], r.prototype, "category", 2);
i([
  e$4({ reflect: true })
], r.prototype, "categoryId", 2);
i([
  e$4({ reflect: true })
], r.prototype, "mapping", 2);
i([
  e$4({ reflect: true })
], r.prototype, "term", 2);
i([
  e$4({ reflect: true })
], r.prototype, "strict", 2);
i([
  e$4({ reflect: true })
], r.prototype, "reactionsEnabled", 2);
i([
  e$4({ reflect: true })
], r.prototype, "emitMetadata", 2);
i([
  e$4({ reflect: true })
], r.prototype, "inputPosition", 2);
i([
  e$4({ reflect: true })
], r.prototype, "theme", 2);
i([
  e$4({ reflect: true })
], r.prototype, "lang", 2);
i([
  e$4({ reflect: true })
], r.prototype, "loading", 2);
r = i([
  n$3("giscus-widget")
], r);
export { r as GiscusWidget };
