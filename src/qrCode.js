import './styles/normalize.less';
import './styles/main.less';

import { toDataURL } from 'qrcode';
import debounce from './utils/debounce';

const qrOpts = {
  type: 'image/png',
  width: 400,
  height: 400,
  margin: 0,
  color: {
    dark: '#fff',
    light: '#0000',
    quality: 1
  }
};

const appendQr = ({ urlImage, text }) => {
  const img = document.createElement('img');
  const container = document.querySelector('.qr-card__code');
  const qrLink = document.querySelector('.download-qr');

  if (qrLink !== null) {
    qrLink.href = urlImage;
    qrLink.download = `${text}.jpg`;
  }

  img.src = urlImage;
  img.alt = text;

  if (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  container.appendChild(img);
};

const initQr = (text) => {
  if (!text) text = 'https://www.frontendmentor.io';

  toDataURL(text, qrOpts)
    .then((url) => {
      appendQr({ urlImage: url, text: text });
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleEvents = () => {
  const qrInput = document.querySelector('.form__input');

  if (qrInput === null) return;

  const debouncedGenerate = debounce((event) => {
    initQr(event.target.value);
  });

  qrInput.addEventListener('keydown', debouncedGenerate);
};

const qrCode = () => {
  initQr('https://www.nullgate.dev');
  handleEvents();
  return false;
};

document.addEventListener('DOMContentLoaded', qrCode);
