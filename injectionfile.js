let videoElements = [];
let adMonitorInterval = null;
const skipCurrentAds = () => {
    videoElements.forEach(video => {
        if (isNaN(video.duration) || video.duration === 0) return;
        if (video.currentTime >= video.duration - 0.5) return; 

        console.log('Skipping consecutive ad now:', video);

        video.loop = false;
        video.removeAttribute('loop');
        video.muted = true;
        video.currentTime = video.duration - 0.1;

        video.play().catch(e => console.log('Play blocked by browser:', e));
    });
};

const startAdMonitor = () => {
    if (adMonitorInterval) return; 
    console.log('Ad state detected. Starting continuous monitor...');
    
    adMonitorInterval = setInterval(skipCurrentAds, 300);
};

const stopAdMonitor = () => {
    if (adMonitorInterval) {
        console.log('Ad finished. Stopping monitor.');
        clearInterval(adMonitorInterval);
        adMonitorInterval = null;
    }
};

const titleNode = document.querySelector('title');

const titleObserver = new MutationObserver(() => {
    if (!document.title) return;

    const titleText = document.title.toLowerCase();
    const isAd = titleText.includes('advertisement') || titleText.includes('광고');

    console.log('Title changed:', document.title, 'Is ad:', isAd);

    if (isAd) {
        startAdMonitor();
    } else {
        stopAdMonitor();
    }
});

if (titleNode) {
    titleObserver.observe(titleNode, {
        subtree: true,
        characterData: true,
        childList: true
    });
    
    const initialTitle = document.title.toLowerCase();
    if (initialTitle.includes('advertisement') || initialTitle.includes('광고')) {
        startAdMonitor();
    }
}


const originalCreateElement = document.constructor.prototype.createElement;

document.createElement = function (message) {
    const element = originalCreateElement.call(document, message);
    if (message === 'video' || message === 'audio') {
        videoElements.push(element);
    }
    return element;
};

const mediaObserver = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'VIDEO' || node.tagName === 'AUDIO') {
                    if (!videoElements.includes(node)) videoElements.push(node);
                } else if (node.querySelectorAll) {
                    const medias = node.querySelectorAll('video, audio');
                    medias.forEach(media => {
                        if (!videoElements.includes(media)) videoElements.push(media);
                    });
                }
            });
        }
    }
});

mediaObserver.observe(document.body, { childList: true, subtree: true });