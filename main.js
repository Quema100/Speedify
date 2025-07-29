let intervalId;

const box = () => {
    const playbackDurationElement = document.querySelector('[data-testid="playback-duration"]');

    const newDiv = document.createElement('div');
    newDiv.style.display = 'inline-block';

    const style = document.createElement('style');
    style.innerHTML = `
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type=number] {
            -moz-appearance: textfield;
        }
    `;
    document.head.appendChild(style);

    const newInput = document.createElement('input');

    newInput.type = 'number';
    newInput.name= 'rate';
    newInput.placeholder = 'speed';
    newInput.value = 1;
    newInput.min = 0.1;
    newInput.max = 16;
    newInput.step = 0.1;

    newInput.style.padding = '5px';
    newInput.style.border = '2px solid rgba(31, 31, 31, 0.39)';
    newInput.style.borderRadius = '5px';
    newInput.style.fontSize = '10px';
    newInput.style.width = '55px';
    newInput.style.backgroundColor = 'rgba(31, 31, 31, 0.39)';
    newInput.style.color = 'white';
    newInput.style.textAlign = 'center';
    newInput.style.outline = 'none';
    newInput.style.transition = 'border-color 0.3s ease';

    newInput.addEventListener('focus', () => {
        newInput.style.borderColor = '#e74c3c';
    });

    newInput.addEventListener('blur', () => {
        newInput.style.borderColor = 'rgba(31, 31, 31, 0.39)';
    });

    const setPlaybackRate = (rate) => {
        videoElements.forEach(video => {
            video.playbackRate = rate;
        });
        console.log(`Playback rate set to: ${rate}`);
    };

    const startInterval = (rate) => {
        if (intervalId) {
            clearInterval(intervalId);
            console.log("Previous interval cleared");
        }

        intervalId = setInterval(() => {
            setPlaybackRate(rate);
        }, 200);
    };

    newInput.addEventListener('input', () => {
        const newRate = parseFloat(newInput.value);
        if (!isNaN(newRate) && newRate >= newInput.min && newRate <= newInput.max) {
            startInterval(newRate);
        } else if (newRate < newInput.min) {
            newInput.value = newInput.min;
            startInterval(newInput.min);
            alert('The value is too small.');
        } else if (newRate > newInput.max) {
            newInput.value = newInput.max;
            startInterval(newInput.max);
            alert('The value is too large.');
        }
    });

    newDiv.appendChild(newInput);

    if (playbackDurationElement) {
        playbackDurationElement.insertAdjacentElement('afterend', newDiv);
    } else {
        console.error('playback-duration div not found');
    }
}

setTimeout(() => {
    box();
}, 3000);