const fs = require('fs');
const path = require('path');
const imageGallery = document.querySelector('.image-gallery');
const imageDirectory = 'images/';

function createImageElement(imagePath) {
  const img = document.createElement('img');
  img.src = imagePath;
  img.classList.add('gallery-image');
  return img;
}

function listarImagens(imageDirectory) {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                // Filtrar apenas arquivos de imagem (você pode ajustar a extensão conforme necessário)
                const images = files.filter(file => path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.png');
                const imagePaths = images.map(image => path.join(imageDirectory, image));
                resolve(imagePaths);
            }
        });
    });
}

async function loadImages() {
    try {
        const imageArray = await listarImagens(imageDirectory);
      } catch (err) {
        console.error('Erro:', err);
      }
    imageArray.forEach(file => {
    const imgElement = createImageElement(`${imageDirectory}/${file}`);
    imageGallery.appendChild(imgElement);
  });
}

loadImages();