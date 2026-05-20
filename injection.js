const injectScript = (file, callback) => {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(file);
    script.onload = () => {
        script.remove();
        if (callback) callback();
    };
    (document.head || document.documentElement).appendChild(script);
};

injectScript('injectionfile.js', () => {
    injectScript('main.js');
});