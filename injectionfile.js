let videoElements = [];

const setAdSkip = () => {
    let validVideos = Array.from(videoElements).filter(video => !isNaN(video.duration));
    validVideos.forEach(video => {
        console.log('Setting ad skip for video:', video);
        if (isNaN(video.duration)) return;
        video.currentTime = video.duration
    });
}

setInterval(() => {
    if (['Spotify – Advertisement', 'Spotify – 광고'].some(keyword => document.title.includes(keyword))) setAdSkip();
}, 500);


const originalCreateElement = document.constructor.prototype.createElement;

document.createElement = function (message) {
    const element = originalCreateElement.call(document, message);
    if (message === 'video' || message === 'audio') {
        videoElements.push(element);
    }
    return element;
};
