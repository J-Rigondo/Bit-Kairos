!(function () {
  let t;
  var e = function (t, r) {
    return (e =
      Object.setPrototypeOf ||
      ({
        __proto__: []
      } instanceof Array &&
        function (t, e) {
          t.__proto__ = e;
        }) ||
      function (t, e) {
        for (const r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
      })(t, r);
  };
  const r =
    (((t = {})['color-brand'] = '#2196f3'),
    (t['color-gull-gray'] = '#9db2bd'),
    (t['color-scooter'] = '#38acdb'),
    (t['color-curious-blue'] = '#299dcd'),
    t);
  const i = document.createElement('a');

  function n(t) {
    (i.href = t), i.host || (i.href = i.href);
    let e = i.host;
    i.pathname;
    return (
      i.protocol === 'http:' && (e = e.replace(/:80$/, '')),
      i.protocol === 'https:' && (e = e.replace(/:443$/, '')),
      {
        host: e,
        pathname: (i.pathname[0] === '/' ? '' : '/') + i.pathname,
        href: i.href
      }
    );
  }
  let o;
  let a;
  const s = {
    events: {
      width: 510,
      height: 600,
      isTransparent: !1,
      hideImportanceIndicator: !1,
      autosize: !1
    },
    hotlists: {
      width: 400,
      height: 600,
      isTransparent: !1,
      dateRange: '12m'
    },
    screener: {
      width: 1100,
      height: 512,
      defaultColumn: 'overview',
      defaultScreen: 'general',
      market: 'forex',
      showToolbar: !0,
      isTransparent: !1
    },
    tickers: {
      isTransparent: !1
    },
    financials: {
      width: 480,
      height: 830,
      autosize: !1,
      symbol: 'NASDAQ:AAPL',
      isTransparent: !1,
      displayMode: 'regular',
      largeChartUrl: ''
    },
    'crypto-mkt-screener': {
      width: 1e3,
      height: 490,
      defaultColumn: 'overview',
      market: 'crypto',
      screener_type: 'crypto_mkt',
      displayCurrency: 'USD',
      isTransparent: !1
    },
    'forex-cross-rates': {
      width: 770,
      height: 400,
      isTransparent: !1,
      currencies: [
        'EUR',
        'USD',
        'JPY',
        'GBP',
        'CHF',
        'AUD',
        'CAD',
        'NZD',
        'CNY'
      ],
      frameElementId: null,
      autosize: !1
    },
    'forex-heat-map': {
      width: 770,
      height: 400,
      isTransparent: !1,
      currencies: [
        'EUR',
        'USD',
        'JPY',
        'GBP',
        'CHF',
        'AUD',
        'CAD',
        'NZD',
        'CNY'
      ],
      frameElementId: null,
      autosize: !1
    },
    'market-overview': {
      width: 400,
      height: 650,
      isTransparent: !1,
      dateRange: '12m'
    },
    'market-quotes': {
      width: 770,
      height: 450,
      isTransparent: !1
    },
    'mini-symbol-overview': {
      width: 350,
      height: 220,
      symbol: 'FX:EURUSD',
      dateRange: '12m',
      trendLineColor: '#37a6ef',
      underLineColor: '#e3f2fd',
      isTransparent: !1,
      autosize: !1,
      largeChartUrl: ''
    },
    'single-quote': {
      width: 350,
      symbol: 'FX:EURUSD',
      isTransparent: !1
    },
    'symbol-profile': {
      width: 480,
      height: 650,
      symbol: 'NASDAQ:AAPL',
      isTransparent: !1
    },
    'symbol-info': {
      width: 1e3,
      symbol: 'NASDAQ:AAPL',
      isTransparent: !1
    },
    'technical-analysis': {
      interval: '1m',
      width: 425,
      isTransparent: !1,
      height: 450,
      symbol: 'NASDAQ:AAPL',
      showIntervalTabs: !0
    },
    'ticker-tape': {
      isTransparent: !1,
      displayMode: 'adaptive'
    }
  };
  !(function (t) {
    !(function (t) {
      (t.SetSymbol = 'set-symbol'), (t.SetInterval = 'set-interval');
    })(t.Names || (t.Names = {}));
  })(o || (o = {})),
    (function (t) {
      !(function (t) {
        (t.SymbolClick = 'tv-widget-symbol-click'),
          (t.WidgetLoad = 'tv-widget-load'),
          (t.ResizeIframe = 'tv-widget-resize-iframe'),
          (t.NoData = 'tv-widget-no-data');
      })(t.Names || (t.Names = {}));
    })(a || (a = {}));
  const c = ['locale', 'symbol'];
  const h = function () {
    const t = this;
    this._getScriptsInfo().forEach((e) => {
      t._replaceScript(e);
    });
  };
  const l = {
    widgetId: {
      configurable: !0
    },
    widgetUtmName: {
      configurable: !0
    },
    defaultSettings: {
      configurable: !0
    },
    propertiesToWorkWith: {
      configurable: !0
    },
    propertiesToSkipInHash: {
      configurable: !0
    },
    propertiesToAddToGetParams: {
      configurable: !0
    }
  };
  (l.widgetId.get = function () {
    throw new Error('Method must be overridden');
  }),
    (l.widgetUtmName.get = function () {
      return this.widgetId;
    }),
    (l.defaultSettings.get = function () {
      return s[this.widgetId];
    }),
    (l.propertiesToWorkWith.get = function () {
      return [];
    }),
    (h.prototype.filterRawSettings = function (t) {
      const e = this;
      const r = {};
      return (
        Object.keys(t).forEach((i) => {
          e.propertiesToWorkWith.indexOf(i) !== -1 && (r[i] = t[i]);
        }),
        r
      );
    }),
    (l.propertiesToSkipInHash.get = function () {
      return ['customer', 'locale'];
    }),
    (l.propertiesToAddToGetParams.get = function () {
      return ['locale'];
    }),
    (h.prototype._getScriptsInfo = function () {
      const t = (function () {
        if (document.currentScript) return document.currentScript.src;
        for (
          let t = document.getElementsByTagName('script'), e = 0;
          e < t.length;
          e++
        )
          if (t[e].readyState === 'interactive') return t[e].src;
        try {
          throw new Error();
        } catch (t) {
          const r = /\((.*?):\d+:\d+\)\s*$/m.exec(t.stack);
          if (r) return r[1];
        }
        return null;
      })();
      if (!t)
        return (
          console.error(
            'Could not self-replace the script, widget embedding has been aborted'
          ),
          []
        );
      for (
        var e = n(t),
          r = e.host,
          i = e.href,
          o = document.getElementsByTagName('script'),
          a = [],
          s = 0;
        s < o.length;
        s++
      ) {
        const c = o.item(s);
        c.src && n(c.src).href === i && a.push(c);
      }
      let h;
      const l =
        (void 0 === (h = r) && (h = location.host),
        [
          'i18n.tradingview.com',
          'partial.tradingview.com',
          'www.tradingview.com',
          'wwwcn.tradingview.com'
        ].indexOf(h) !== -1 ||
        [
          'd33t3vvu2t2yu5.cloudfront.net',
          'dwq4do82y8xi7.cloudfront.net',
          's.tradingview.com',
          's3.tradingview.com'
        ].indexOf(h) !== -1 ||
        h.match(/^[a-z]{2}\.tradingview\.com/) ||
        h.match(/prod-[^.]+.tradingview.com/)
          ? 'battle'
          : h.indexOf('tradingview.com') !== -1
          ? 'staging'
          : h.match(/webcharts/)
          ? 'staging_local'
          : (h.match(/^localhost(:\d+)?$/), 'local'));
      return a.map((t) => ({
        scriptHost: r,
        scriptEnv: l,
        scriptElement: t
      }));
    }),
    (h.prototype._replaceScript = function (t) {
      const e = this;
      const i = t.scriptEnv;
      const n = t.scriptHost;
      const o = t.scriptElement;
      this.script = o;
      const s = this._scriptContentToJSON();
      const c = (function (t) {
        if (t === null) return null;
        const e = t.querySelector('#tradingview-copyright');
        const r = t.querySelector('#tradingview-quotes');
        const i = e || r;
        return i && t.removeChild(i), i;
      })(this.script.parentNode);
      const h = !!this.script.parentNode.querySelector(
        '.tradingview-widget-copyright'
      );
      (this.hasCopyright = c || h),
        s && (this.settings = this.filterRawSettings(s)),
        (s && this._isValidSettings()) ||
          (console.error('Invalid settings provided, fall back to defaults'),
          (this.settings = this.filterRawSettings(this.defaultSettings)));
      let l;
      const p = isNaN(this.settings.height)
        ? this.settings.height
        : `${this.settings.height}px`;
      const d = isNaN(this.settings.width)
        ? this.settings.width
        : `${this.settings.width}px`;
      const u = this.script.parentNode.classList.contains(
        'tradingview-widget-container'
      );
      this.script.parentNode && u
        ? (this.iframeContainer = this.script.parentNode)
        : (this.iframeContainer = document.createElement('div')),
        (this.iframeContainer.style.width = d),
        (this.iframeContainer.style.height = p),
        this.iframeContainer.appendChild(
          (((l = document.createElement(
            'style'
          )).innerHTML = `\n\t.tradingview-widget-copyright {\n\t\tfont-size: 13px !important;\n\t\tline-height: 32px !important;\n\t\ttext-align: center !important;\n\t\tvertical-align: middle !important;\n\t\tfont-family: 'Trebuchet MS', Arial, sans-serif !important;\n\t\tcolor: ${r['color-gull-gray']} !important;\n\t}\n\n\t.tradingview-widget-copyright .blue-text {\n\t\tcolor: ${r['color-brand']} !important;\n\t}\n\n\t.tradingview-widget-copyright a {\n\t\ttext-decoration: none !important;\n\t\tcolor: ${r['color-gull-gray']} !important;\n\t}\n\n\t.tradingview-widget-copyright a:visited {\n\t\tcolor: ${r['color-gull-gray']} !important;\n\t}\n\n\t.tradingview-widget-copyright a:hover .blue-text {\n\t\tcolor: ${r['color-scooter']} !important;\n\t}\n\n\t.tradingview-widget-copyright a:active .blue-text {\n\t\tcolor: ${r['color-curious-blue']} !important;\n\t}\n\n\t.tradingview-widget-copyright a:visited .blue-text {\n\t\tcolor: ${r['color-brand']} !important;\n\t}\n\t`),
          l)
        );
      const g = c && !this.settings.whitelabel;
      const m = this.hasCopyright ? `calc(${p} - 32px)` : p;
      (this.settings.utm_source = location.hostname),
        (this.settings.utm_medium = h ? 'widget_new' : 'widget'),
        (this.settings.utm_campaign = this.widgetUtmName),
        (this.iframe = this._createIframe(m, d, n, i, o.id));
      const f = this.iframeContainer.querySelector(
        '.tradingview-widget-container__widget'
      );
      if (
        (f
          ? (this.script.parentNode.replaceChild(this.iframe, f),
            this.script.parentNode.removeChild(this.script))
          : u
          ? (this.iframeContainer.appendChild(this.iframe),
            this.script.parentNode.removeChild(this.script))
          : (this.iframeContainer.appendChild(this.iframe),
            this.script.parentNode.replaceChild(
              this.iframeContainer,
              this.script
            )),
        (function (t, e, r) {
          const i = e.contentWindow;
          if (!i) {
            return (
              console.error(
                'Cannot listen to the event from the provided iframe, contentWindow is not available'
              ),
              function () {}
            );
          }

          function n(e) {
            e.source &&
              e.source === i &&
              e.data &&
              e.data.name &&
              e.data.name === t &&
              r(e.data.data);
          }
          window.addEventListener('message', n, !1);
        })(a.Names.ResizeIframe, this.iframe, (t) => {
          t.width &&
            ((e.iframe.style.width = `${t.width}px`),
            (e.iframeContainer.style.width = `${t.width}px`)),
            (e.iframe.style.height = `${t.height}px`),
            (e.iframeContainer.style.height = `${
              t.height + (e.hasCopyright ? 32 : 0)
            }px`);
        }),
        g)
      ) {
        const y = document.createElement('div');
        (y.style.height = '32px'),
          (y.style.lineHeight = '32px'),
          (y.style.width = d),
          (y.style.textAlign = 'center'),
          (y.style.verticalAlign = 'middle'),
          (y.innerHTML = c.innerHTML),
          this.iframeContainer.appendChild(y);
      }
    }),
    (h.prototype._iframeSrcBase = function (t, e) {
      let r = 'https://s.tradingview.com';
      return (
        e === 'local'
          ? (r = `http://${t}`)
          : e === 'staging' &&
            (r =
              t.indexOf('beta.tradingview.com') !== -1
                ? 'https://betacdn.tradingview.com'
                : `https://${t}`),
        (r += `/embed-widget/${this.widgetId}/`),
        this.settings.customer &&
          this.propertiesToSkipInHash.indexOf('customer') !== -1 &&
          (r += `${this.settings.customer}/`),
        r
      );
    }),
    (h.prototype._isValidSettings = function () {
      const t = function (t) {
        if (void 0 === t) return !0;
        const e = `${parseInt(t)}%` == `${t}`;
        return `${parseInt(t)}` == `${t}` || e || t === 'auto';
      };
      return t(this.settings.width) && t(this.settings.height);
    }),
    (h.prototype._buildGetQueryString = function () {
      const t = this.propertiesToAddToGetParams.filter(
        (t) => c.indexOf(t) !== -1
      );
      return t.length === 0
        ? ''
        : `?${(function (t) {
            const e = [];
            for (const r in t) {
              t.hasOwnProperty(r) &&
                t[r] != null &&
                e.push({
                  key: r,
                  pair: `${encodeURIComponent(r)}=${encodeURIComponent(t[r])}`
                });
            }
            return e
              .sort((t, e) => (t.key > e.key ? 1 : t.key < e.key ? -1 : 0))
              .map((t) => t.pair)
              .join('&');
          })(
            (function (t, e) {
              for (
                var r = Object.create(Object.getPrototypeOf(t)), i = 0, n = e;
                i < n.length;
                i++
              ) {
                const o = n[i];
                Object.prototype.hasOwnProperty.call(t, o) && (r[o] = t[o]);
              }
              return r;
            })(this.settings, t)
          )}`;
    }),
    (h.prototype._buildHashString = function (t) {
      const e = this;
      const r = {};
      return (
        t && (r.frameElementId = t),
        Object.keys(this.settings).forEach((t) => {
          e.propertiesToSkipInHash.indexOf(t) === -1 && (r[t] = e.settings[t]);
        }),
        Object.keys(r).length > 0
          ? `#${encodeURIComponent(JSON.stringify(r))}`
          : ''
      );
    }),
    (h.prototype._scriptContentToJSON = function () {
      const t = this.script.innerHTML.trim();
      try {
        return JSON.parse(t);
      } catch (t) {
        return console.error(`Widget settings parse error: ${t}`), null;
      }
    }),
    (h.prototype._createIframe = function (t, e, r, i, n) {
      const o = document.createElement('iframe');
      n && (o.id = n),
        this.settings.enableScrolling || o.setAttribute('scrolling', 'no'),
        o.setAttribute('allowtransparency', !0),
        o.setAttribute('frameborder', 0),
        (o.style.boxSizing = 'border-box'),
        (o.style.height = t),
        (o.style.width = e);
      const a =
        this._iframeSrcBase(r, i) +
        this._buildGetQueryString() +
        this._buildHashString(n);
      return o.setAttribute('src', a), o;
    }),
    Object.defineProperties(h.prototype, l),
    new ((function (t) {
      function r() {
        return (t !== null && t.apply(this, arguments)) || this;
      }
      return (
        (function (t, r) {
          function i() {
            this.constructor = t;
          }
          e(t, r),
            (t.prototype =
              r === null
                ? Object.create(r)
                : ((i.prototype = r.prototype), new i()));
        })(r, t),
        Object.defineProperty(r.prototype, 'widgetId', {
          get() {
            const t = this.settings;
            return t && t.screener_type === 'crypto_mkt'
              ? 'crypto-mkt-screener'
              : 'screener';
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(r.prototype, 'widgetUtmName', {
          get() {
            const t = this.settings;
            if (t) {
              if (t.market === 'forex') return 'forexscreener';
              if (t.screener_type === 'crypto_mkt') return 'cryptomktscreener';
              if (t.market === 'crypto') return 'cryptoscreener';
            }
            return 'screener';
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(r.prototype, 'propertiesToWorkWith', {
          get() {
            return [
              'colorTheme',
              'customer',
              'defaultColumn',
              'defaultScreen',
              'displayCurrency',
              'height',
              'largeChartUrl',
              'locale',
              'market',
              'screener_type',
              'showToolbar',
              'isTransparent',
              'whitelabel',
              'width'
            ];
          },
          enumerable: !0,
          configurable: !0
        }),
        (r.prototype.filterRawSettings = function (e) {
          const r = t.prototype.filterRawSettings.call(this, e);
          return (
            void 0 !== e.transparency && (r.isTransparent = e.transparency),
            r.screener_type === 'crypto_mkt' && (r.market = 'crypto'),
            (r.enableScrolling = !0),
            r
          );
        }),
        r
      );
    })(h))();
})();
