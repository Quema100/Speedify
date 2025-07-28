let videoElements = [];
let previousCount = 0;

const setAdSkip = () => {
    let validVideos = Array.from(videoElements).filter(video => !isNaN(video.duration));
    validVideos.forEach(video => {
        console.log('Setting ad skip for video:', video);
        if (isNaN(video.duration)) return;
        video.currentTime = video.duration
    });
}

setInterval(() => {
    console.log(['AD', '광고'].some(keyword => document.title.includes(keyword)))
    if (videoElements.length > previousCount && ['AD', '광고'].some(keyword => document.title.includes(keyword))) {
        setAdSkip()
    } else console.log('No changes detected.');
    previousCount = videoElements.length;
}, 1000);


const originalCreateElement = document.constructor.prototype.createElement;

document.createElement = function (message) {
    const element = originalCreateElement.call(document, message);
    if (message === 'video' || message === 'audio') {
        console.log('🎥 Video or audio element created:', element);
        videoElements.push(element);
        console.log('🎥 Video elements:', videoElements);
    }
    return element;
};
