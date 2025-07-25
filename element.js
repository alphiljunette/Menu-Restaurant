window.addEventListener('DOMContentLoaded', function () {
    // Dropdown de langue
    const lngDropdownBtn = document.querySelector('.lng_dropdown_btn');
    const lngDropdownContent = document.querySelector('.lng_dropdown_content');
    const lngDropdownBtnIcon = document.querySelector('.lng_dropdown_btn_icon');
    const lngItems = document.querySelectorAll('.lng_item');
    const lngPreviewImg = document.querySelector('.lng_previeuw img');

    if (lngDropdownBtn && lngDropdownContent && lngDropdownBtnIcon) {
        [lngDropdownBtn, lngDropdownBtnIcon].forEach(el => {
            el.addEventListener('click', function (e) {
                lngDropdownBtn.classList.toggle('active');
                lngDropdownContent.classList.toggle('active');
                e.stopPropagation();
            });
        });

        lngItems.forEach(item => {
            item.addEventListener('click', function () {
                lngItems.forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');

                const selectedImg = this.querySelector('.lng_item_previeuw img').src;
                lngPreviewImg.src = selectedImg;

                const selectedText = this.querySelector('.lng_item_text').textContent;
                document.querySelector('.lng_dropdown_btn_text span').textContent = selectedText;

                lngDropdownBtn.classList.remove('active');
                lngDropdownContent.classList.remove('active');
            });
        });

        // Fermer le dropdown si clic à l’extérieur
        document.addEventListener('click', function (e) {
            if (
                !lngDropdownBtn.contains(e.target) &&
                !lngDropdownContent.contains(e.target) &&
                !lngDropdownBtnIcon.contains(e.target)
            ) {
                lngDropdownBtn.classList.remove('active');
                lngDropdownContent.classList.remove('active');
            }
        });
    }

    // --- Appliquer la sélection depuis sessionStorage ---
    const savedIndex = sessionStorage.getItem('selectedIndex');
    if (savedIndex !== null) {
        const activeLi = document.querySelector('.slide_bar .li[data-index="' + savedIndex + '"]');
        if (activeLi) {
            document.querySelectorAll('.slide_bar .li').forEach(li => li.classList.remove('clicked'));
            activeLi.classList.add('clicked');
        }
    } else {
        // « Entrer » par défaut
        const defaultLi = document.querySelector('.slide_bar .li[data-index="0"]');
        if (defaultLi) defaultLi.classList.add('clicked');
    }

    // --- Sauvegarder l’index au clic (mousedown) ---
    document.querySelectorAll('.slide_bar .li').forEach(li => {
        const link = li.querySelector('a');
        if (link) {
            link.addEventListener('mousedown', function () {
                sessionStorage.setItem('selectedIndex', li.getAttribute('data-index'));
            });
        }
    });


    // Effet de sélection pour les boutons en bas
    document.querySelectorAll('.button').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.button').forEach(b => b.classList.remove('clicked'));
            this.classList.add('clicked');
        });
    });

    //  Transformation verticale des lettres dans le menu (li > a)
    document.querySelectorAll('.li').forEach(li => {
        const a = li.querySelector('a');
        if (a) {
            const text = a.textContent.trim();
            a.innerHTML = '';
            for (const char of text) {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.transform = 'rotate(90deg)';
                a.appendChild(span);
            }
        }
    });
});
