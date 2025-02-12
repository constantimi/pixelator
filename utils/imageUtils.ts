export const pixelateImage = (
    img: HTMLImageElement,
    pixelSize: number,
    canvas: HTMLCanvasElement
) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = img.width;
    const h = img.height;

    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(img, 0, 0, w, h);

    // Pixelate the image
    for (let y = 0; y < h; y += pixelSize) {
        for (let x = 0; x < w; x += pixelSize) {
            const pixelData = ctx.getImageData(x, y, 1, 1).data;
            ctx.fillStyle = `rgb(${pixelData[0]},${pixelData[1]},${pixelData[2]})`;
            ctx.fillRect(x, y, pixelSize, pixelSize);
        }
    }
};
