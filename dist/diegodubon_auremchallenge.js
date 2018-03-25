// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({2:[function(require,module,exports) {
var searchInput = document.getElementById("search-input");
window.onload = function () {
  searchReddit("funny").then(function (data) {
    var resultDiv = "";
    data.forEach(function (post) {
      var image = post.preview ? post.preview.images[0].source.url : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
      resultDiv += "  \n      <div class=\"col-sm-4 col-md-12\">\n        <div class=\"card-columns\">\n          <div\" class=\"card center-post\">\n          \n            <div class=\"card-body\">\n            <img style=\"width:90px; height:90px;\" src=\"" + image + "\" alt=\"Card image cap\">\n              <h5 class=\"card-title\">" + post.author + "</h5>\n              <p class=\"card-text\">" + post.title + "</p>\n              <i class=\"far fa-comment\"></i>" + post.num_comments + " \n              <i class=\"fas fa-heart\"></i>" + post.ups + " \n              <i class=\"fas fa-arrow-down\"></i>" + post.downs + "\n              </div>\n            </div>\n          </div>\n    </div>";
    });
    // resultDiv += `</div>`;
    document.getElementById("results").innerHTML = resultDiv;
  });
};
searchInput.addEventListener("keypress", function (e) {
  var searchTerm = e.target.value;

  if (searchTerm == "" || searchTerm == null) {
    console.log("searchTerm", searchTerm);
    searchReddit("funny").then(function (data) {
      return console.log(data);
    });
  } else {
    console.log("searchTerm", searchTerm);
    searchReddit(searchTerm).then(function (results) {
      // let resultDiv = '<div class="card-columns">';

      var resultDiv = "";
      results.forEach(function (post) {
        var image = post.preview ? post.preview.images[0].source.url : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
        resultDiv += "  \n            <div class=\"card-columns\">\n              <div\" class=\"card center-post\">\n              \n                <div class=\"card-body\">\n                <img style=\"width:90px; height:90px;\" src=\"" + image + "\" alt=\"Card image cap\">\n                  <h5 class=\"card-title\">" + post.author + "</h5>\n                  <p class=\"card-text\">" + post.title + "</p>\n                  <i class=\"far fa-comment\"></i> " + post.num_comments + " \n                  <i class=\"fas fa-heart\"></i> " + post.ups + " \n                  <i class=\"fas fa-arrow-down\"></i>" + post.downs + "\n                </div>\n              </div>\n        </div>";
      });
      // resultDiv += `</div>`;
      document.getElementById("results").innerHTML = resultDiv;
    });
    // .catch(err => {});
  }
}, false);

function searchReddit(searchTerm) {
  return fetch("https://www.reddit.com/search.json?q=" + searchTerm, {
    mode: "cors"
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return data.data.children.map(function (data) {
      return data.data;
    });
  }).catch(function (err) {
    return console.log(err);
  });
}
},{}],19:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '10718' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[19,2])
//# sourceMappingURL=/dist/diegodubon_auremchallenge.map