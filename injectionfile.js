let videoElements = [];

const originalCreateElement = document.createElement;

document.createElement = function (message) {
    const element = originalCreateElement.apply(this, arguments);
    if (message == 'video' || message == 'audio') {
        console.log('Video or audio element created:', element);
        videoElements.push(element);
        console.log('Video elements:', videoElements);
    }
    return element;
};
