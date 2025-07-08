const lngDropdownBtn = document.querySelector('.lng_dropdown_btn');
const lngDropdownContent = document.querySelector('.lng_dropdown_content');
const lngItems = document.querySelectorAll('.lng_item');
const lngPreviewImg = document.querySelector('.lng_previeuw img'); // Sélectionne l'image du preview

lngDropdownBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    lngDropdownContent.classList.toggle('active');
});

lngItems.forEach(item => {
    item.addEventListener('click', function() {
        lngItems.forEach(i => i.classList.remove('selected'));
        this.classList.add('selected');

        // Récupère le src de l'image sélectionnée
        const selectedImg = this.querySelector('.lng_item_previeuw img').src;
        // Met à jour l'image du preview
        lngPreviewImg.src = selectedImg;

        // Met à jour le texte
        const selectedText = this.querySelector('.lng_item_text').textContent;
        document.querySelector('.lng_dropdown_btn_text span').textContent = selectedText;

        lngDropdownBtn.classList.remove('active');
        lngDropdownContent.classList.remove('active');
    });
});

// close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!lngDropdownBtn.contains(e.target) && !lngDropdownContent.contains(e.target)) {
        lngDropdownBtn.classList.remove('active');
        lngDropdownContent.classList.remove('active');
    }
});