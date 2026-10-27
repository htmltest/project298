document.body.addEventListener('click', function (e) {
    const link = e.target.closest('.main-contacts-item-text-copy');
    if (!link) return;

    navigator.clipboard.writeText(link.getAttribute('data-clipboard-text'));
    e.preventDefault();
    alert(link.getAttribute('data-clipboard-success'));
});