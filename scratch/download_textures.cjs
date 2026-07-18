const fs = require('fs');
const https = require('https');
const path = require('path');

const texturesDir = path.join(__dirname, '../public/textures');
if (!fs.existsSync(texturesDir)) {
  fs.mkdirSync(texturesDir, { recursive: true });
}

const files = [
  { url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg', dest: 'earth_day.jpg' },
  { url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png', dest: 'earth_night.png' },
  { url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png', dest: 'earth_clouds.png' },
  { url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg', dest: 'earth_normal.jpg' }
];

let completed = 0;
files.forEach(({ url, dest }) => {
  const destPath = path.join(texturesDir, dest);
  const file = fs.createWriteStream(destPath);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${dest}`);
      completed++;
      if (completed === files.length) {
        console.log('All textures downloaded successfully!');
      }
    });
  }).on('error', (err) => {
    fs.unlink(destPath, () => {});
    console.error(`Error downloading ${dest}:`, err.message);
  });
});
