/**
 * @author  Samuel J Sarette
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this module.
 *
 * Copyright (C) 2016  Samuel J Sarette
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the copyright holder shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the copyright holder.
 *
 * @licend  The above is the entire license notice for the JavaScript code in this module.
 */
ig.module('plugins.localstorage')
.requires()
.defines(function()
{

    ig.localStorage = ig.Class.extend({

        enabled: false,
        isChromeStorage: false,

        init: function()
        {
            if (typeof(chrome) === "object" && typeof(chrome.storage) === "object" && typeof(chrome.storage.local) === "object")
            {
                this.enabled = true;
                this.isChromeStorage = true;
            }
            else if (typeof(window.localStorage) === 'object') {
                this.enabled = true;
                try {
                    localStorage.setItem('localStorage', 1);
                    localStorage.removeItem('localStorage');
                    this.isChromeStorage = false;
                } catch (e) {
                    this.enabled = false;
                    alert('Your web browser does not support storing settings locally.');
                }
            } else {
                this.enabled = false;
            }
        },

        get: function(key, onFinish)
        {
            if (typeof(key) !== "string") throw "key must be a string!";

            if (typeof(onFinish) !== "function") {
                throw "Using a localstorage 'get' without callback!";
            }

            if (this.isChromeStorage) {
                chrome.storage.local.get(key, function(result) {
                    if (key in result && result[key] !== {}) {
                        try { onFinish(result[key] + ""); } catch(e) {}
                    }
                    else {
                        try { onFinish(null); } catch(e) {}
                    }
                });
            }
            else {
                try { onFinish(localStorage.getItem(key)); } catch(e) {}
            }
        },

        set: function(key, value)
        {
            if (typeof(key) !== "string") throw "key must be a string!";

            if (this.isChromeStorage)
            {
                var data = {};
                data[key] = value;
                return chrome.storage.local.set(data);
            }
            else
            {
                return localStorage.setItem(key, value);
            }
        },

        remove: function(key)
        {
            if (typeof(key) !== "string") throw "key must be a string!";

            if (this.isChromeStorage)
            {
                return chrome.storage.local.remove(key);
            }
            else
            {
                return localStorage.removeItem(key);
            }
        }

    });
});

