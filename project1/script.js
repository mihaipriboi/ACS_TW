async function downloadCV(event) {
  event.preventDefault();

  const filename = 'Luca_Mihai_Priboi_CV.html';
  const urlToFetch = 'cv-download.html';

  console.log('LIVE: Se inițiază descărcarea HTML...');

  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error(`Eroare HTTP! Status: ${response.status}`);
    }
    
    const htmlContent = await response.text();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);

  } catch (error) {
    console.error('Eroare la descărcarea HTML:', error);
    alert('A apărut o eroare la descărcare.');
  }
}

function setupLocalDownload(button) {
  console.log('LOCAL: Se configurează descărcarea ZIP...');
  button.textContent = 'Descarcă CV (ZIP)';
  
  button.href = 'cv-download.zip'; 
  button.setAttribute('download', 'Luca_Mihai_Priboi_CV.zip');
}

document.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.getElementById('downloadBtn');
  if (!downloadButton) {
    return;
  }

  if (window.location.protocol === 'file:') {
    setupLocalDownload(downloadButton);
  } else {
    downloadButton.textContent = 'Descarcă CV (HTML)';
    downloadButton.addEventListener('click', downloadCV);
  }
});