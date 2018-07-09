var HainaEventSource = function() {
    "use strict";
    this.eventSource = null;
    this.readyState = function() {};
    this.url = "";
    this.interval = null;
    this.inited = false;
};


/**
 * @url: eventsource 使用的url，也就是向服务器发送请求的url
 * @clojure: 一个函数，当不支持eventsource时，执行clojure
 * @_timeout: 在不支持eventsource时，setInterval的时间间隔
 * @_args： setInterval所调用的函数的参数
 */
HainaEventSource.prototype.initEnv = function(url, clojure, _timeout, _args) {
    "use strict";
    if (this.inited) {
        return;
    }

    if (!HainaEventSource.supportEventSource()) { // browse not support EventSource
        // call taskFun In a setInterval
        (function() {
            let timeout = _timeout || 1000;
            let args = [clojure];
            if (Array.isArray(timeout)) {
                args = args.concat(timeout);
            } else {
                args.splice(args.length, 0, timeout);
            }
            if (_args && Array.isArray(_args)) {
                args = args.concat(_args);
            } else {
                _args && args.splice(args.length, 0, _args);
            }
            this.interval = setInterval.apply(this, args)();
        }());
    }

    this.eventSource = new window.EventSource(url);
    this.inited = true;
};


HainaEventSource.prototype.clearInterval = function() {
    "use strict";
    if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
    }
};


// check browser's EventSource supporting
HainaEventSource.supportEventSource = function() {
    "use strict";
    return window.EventSource && typeof window.EventSource === "function";
};


HainaEventSource.prototype.onOpen = function(onopen) {
    "use strict";
    if (!HainaEventSource.supportEventSource()) {
        return;
    }
    this.eventSource.onopen = onopen;
};


HainaEventSource.prototype.onMessage = function(onmessage) {
    "use strict";
    if (!HainaEventSource.supportEventSource()) {
        return;
    }
    this.eventSource.onmessage = onmessage;
};


HainaEventSource.prototype.onError = function(onerror) {
    "use strict";
    if (!HainaEventSource.supportEventSource()) {
        return;
    }
    this.eventSource.onerror = onerror;
};


HainaEventSource.prototype.close = function() {
    "use strict";

};


module.exports = HainaEventSource;
