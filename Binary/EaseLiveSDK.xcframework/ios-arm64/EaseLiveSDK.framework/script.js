(function (window) {
    //Make sure that if WebViewBridge already in scope we don't override it.
    if (window.WebViewBridge) {
        return;
    }

    var customEvent = window.document.createEvent('Event');

    function callFunc(func, message) {
        if ('function' === typeof func) {
            func(message);
        }
    }

    //I made the private function ugly signiture so user doesn't called them accidently.
    //if you do, then I have nothing to say. :(
    var WebViewBridge = {
        //this function will be called by native side to push a new message
        //to webview.
        __push__: function (message) {
            callFunc(window.WebViewBridge.onMessage, message);
        },
        //make sure message is string. because only string can be sent to native,
        //if you don't pass it as string, onError function will be called.
        send: function (message) {
            if ('string' !== typeof message) {
                callFunc(window.WebViewBridge.onError, "message is type '" + typeof message + "', and it needs to be string");
                return;
            }
            window.webkit.messageHandlers.easeLiveBridge.postMessage(message);
        },
        onMessage: null,
        onError: null
    };

    window.WebViewBridge = WebViewBridge;

    //dispatch event
    customEvent.initEvent('WebViewBridge', true, true);
    window.document.dispatchEvent(customEvent);
}(window));
