document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const to = "mihailucapriboi@exemplu.com";
    const name = document.getElementById('name').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('body').value.trim();

    const body = `Nume: ${name}\n\nMesaj:\n${message}`;

    const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  });
});
