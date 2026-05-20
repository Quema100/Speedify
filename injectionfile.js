let videoElements = [];

const setAdSkip = () => {
    console.log('Attempting to skip ad...');
    let validVideos = Array.from(videoElements).filter(video => !isNaN(video.duration));
    validVideos.forEach(video => {
        console.log('Setting ad skip for video:', video);
        if (isNaN(video.duration)) return;
        video.currentTime = video.duration
    });
};

const title = document.querySelector('title');

const titleObserver = new MutationObserver(() => {
    const title = document.title.toLowerCase();

    const isAd =
        title.includes('advertisement') ||
        title.includes('광고');

    if (isAd) setAdSkip();
    console.log('Title changed:', document.title);
});

titleObserver.observe(title, {
    subtree: true,
    characterData: true,
    childList: true
});


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