let videoElements = [];

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
