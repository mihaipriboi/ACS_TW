/**
 * Funcția de descărcare "LIVE" (folosind fetch)
 * Descarcă fișierul static cv-download.html
 */
async function downloadCV(event) {
    event.preventDefault();

    // Fișierul țintă este cel static, complet
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

/**
 * Funcția de fallback "LOCAL" (link direct la ZIP)
 * ATENȚIE: Trebuie să ai fișierul cv-download.zip
 */
function setupLocalDownload(button) {
    console.log('LOCAL: Se configurează descărcarea ZIP...');
    button.textContent = 'Descarcă CV (ZIP)';
    
    button.href = 'cv-download.zip'; 
    button.setAttribute('download', 'Luca_Mihai_Priboi_CV.zip');
}


/**
 * Logica principală: Rulează când pagina s-a încărcat
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Logica de încărcare a CV-ului a fost ȘTEARSĂ.
    
    // 2. CONFIGUREAZĂ butonul de download (dacă e cazul)
    const downloadButton = document.getElementById('downloadBtn');
    if (!downloadButton) {
        return;
    }

    if (window.location.protocol === 'file:') {
        // Ești pe LOCAL (file:///)
        setupLocalDownload(downloadButton);
    } else {
        // Ești pe LIVE (http:// sau https://)
        downloadButton.textContent = 'Descarcă CV (HTML)';
        downloadButton.addEventListener('click', downloadCV);
    }
});