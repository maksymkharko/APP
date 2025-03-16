const fs = require('fs');
const { createCanvas } = require('canvas');

// Размеры иконок, которые нам нужны
const sizes = [72, 96, 128, 144, 152, 167, 180, 192, 384, 512];

// Функция для создания иконки
function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Фон
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#0A84FF');
    gradient.addColorStop(1, '#47A2FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Добавляем блик
    const highlight = ctx.createLinearGradient(0, 0, 0, size/2);
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlight;
    ctx.fillRect(0, 0, size, size/2);

    // Добавляем букву "C"
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.6}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('C', size/2, size/2);

    // Сохраняем иконку
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`icons/icon-${size}x${size}.png`, buffer);
}

// Создаем директорию для иконок, если её нет
if (!fs.existsSync('icons')) {
    fs.mkdirSync('icons');
}

// Генерируем иконки всех размеров
sizes.forEach(size => generateIcon(size));

// Генерируем splash screens
const splashSizes = [
    { width: 2048, height: 2732 }, // iPad Pro 12.9"
    { width: 1668, height: 2388 }, // iPad Pro 11"
    { width: 1536, height: 2048 }, // iPad Mini/Air
    { width: 1125, height: 2436 }, // iPhone X/XS
    { width: 828, height: 1792 }   // iPhone XR
];

function generateSplashScreen(width, height) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Градиентный фон
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1C1C1E');
    gradient.addColorStop(1, '#2C2C2E');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Добавляем логотип в центр
    const logoSize = Math.min(width, height) * 0.3;
    generateIcon(logoSize);
    
    // Сохраняем splash screen
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`icons/splash-${width}x${height}.png`, buffer);
}

// Генерируем splash screens
splashSizes.forEach(size => generateSplashScreen(size.width, size.height)); 