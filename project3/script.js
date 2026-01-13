const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const jsonOutput = document.getElementById('json-output');
const metricsList = document.getElementById('metrics-list');

let originalImageData = null;

// Fetching Data
async function fetchDogImage() {
  const startTime = performance.now();
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    
    // Display JSON
    jsonOutput.textContent = JSON.stringify(data, null, 4);
    
    const endTime = performance.now();
    logMetric(`API Fetch: ${(endTime - startTime).toFixed(2)}ms`);
    
    loadImageToCanvas(data.message);
  } catch(error) {
    console.error("Error fetching dog:", error);
  }
}

// Loading Image
function loadImageToCanvas(url) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const container = document.querySelector('.canvas-area');
    const maxWidth = container.clientWidth;
    const maxHeight = container.clientHeight;

    const imgRatio = img.width / img.height;
    const containerRatio = maxWidth / maxHeight;

    let finalWidth, finalHeight;

    if(imgRatio > containerRatio) {
      // Image is wider than the screen ratio - limit by width
      finalWidth = maxWidth;
      finalHeight = maxWidth / imgRatio;
    } else {
      // Image is taller than the screen ratio - limit by height
      finalHeight = maxHeight;
      finalWidth = maxHeight * imgRatio;
    }

    // Set canvas internal resolution to the calculated fit
    canvas.width = finalWidth;
    canvas.height = finalHeight;

    // setTimeout for drawing
    setTimeout(() => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Save this high-res state for processing
      originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      logMetric(`Canvas resized to ${Math.round(finalWidth)}x${Math.round(finalHeight)} to fit screen.`);
    }, 100);
  };
  img.src = url;
}

// Low-Level Processing Algorithms
function applyMirror(data, width, height) {
  const pixels = data.data;
  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width / 2; x++) {
      const leftIdx = (y * width + x) * 4;
      const rightIdx = (y * width + (width - 1 - x)) * 4;
      
      for(let i = 0; i < 4; i++) { // R, G, B, A
        let temp = pixels[leftIdx + i];
        pixels[leftIdx + i] = pixels[rightIdx + i];
        pixels[rightIdx + i] = temp;
      }
    }
  }
}

function adjustPixel(r, g, b, brightness, contrast) {
  // Brightness
  const bOffset = brightness * 2.55;
  r += bOffset;
  g += bOffset;
  b += bOffset;

  // Contrast factor
  const cOffset = contrast * 2.55;
  const factor = (259 * (cOffset + 255)) / (255 * (259 - cOffset));
  r = factor * (r - 128) + 128;
  g = factor * (g - 128) + 128;
  b = factor * (b - 128) + 128;

  return [
    r > 255 ? 255 : (r < 0 ? 0 : r),
    g > 255 ? 255 : (g < 0 ? 0 : g),
    b > 255 ? 255 : (b < 0 ? 0 : b)
  ];
}

// Async Distributed Processing
async function processImage() {
  if(!originalImageData) return;

  const bVal = parseInt(document.getElementById('brightness-slider').value);
  const cVal = parseInt(document.getElementById('contrast-slider').value);
  
  // Create a working copy
  let workingData = new ImageData(
    new Uint8ClampedArray(originalImageData.data),
    originalImageData.width,
    originalImageData.height
  );

  const startTime = performance.now();

  // Mirror
  applyMirror(workingData, canvas.width, canvas.height);
  logMetric("Mirror applied");

  // Sliced processing (4 slices, 1s apart)
  const sliceHeight = Math.floor(canvas.height / 4);
  
  for(let i = 0; i < 4; i++) {
    const sliceStartTime = performance.now();
    const startY = i * sliceHeight;
    const endY = (i === 3) ? canvas.height : (i + 1) * sliceHeight;

    // Process slice pixels
    for(let y = startY; y < endY; y++) {
      for(let x = 0; x < canvas.width; x++) {
        const idx = (y * canvas.width + x) * 4;
        const [nr, ng, nb] = adjustPixel(
          workingData.data[idx], 
          workingData.data[idx+1], 
          workingData.data[idx+2], 
          bVal, cVal
        );
        workingData.data[idx] = nr;
        workingData.data[idx+1] = ng;
        workingData.data[idx+2] = nb;
      }
    }

    // Update canvas with current progress
    ctx.putImageData(workingData, 0, 0);
    
    const sliceEndTime = performance.now();
    logMetric(`Slice ${i+1} processed: ${(sliceEndTime - sliceStartTime).toFixed(2)}ms`);

    // Wait before next slice
    if(i < 3) await new Promise(resolve => setTimeout(resolve, 1000));
  }

  const totalEndTime = performance.now();
  logMetric(`Total Processing Time: ${(totalEndTime - startTime).toFixed(2)}ms`);
}

// Helpers
function logMetric(msg) {
  const li = document.createElement('li');
  li.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  metricsList.prepend(li);
}

// Event Listeners
document.getElementById('new-image-btn').addEventListener('click', fetchDogImage);
document.getElementById('apply-filters').addEventListener('click', processImage);

// Init
fetchDogImage();

const bSlider = document.getElementById('brightness-slider');
const cSlider = document.getElementById('contrast-slider');
const bDisplay = document.getElementById('brightness-val');
const cDisplay = document.getElementById('contrast-val');

// Update brightness display
bSlider.addEventListener('input', (e) => {
  bDisplay.textContent = e.target.value;
});

// Update contrast display
cSlider.addEventListener('input', (e) => {
  cDisplay.textContent = e.target.value;
});