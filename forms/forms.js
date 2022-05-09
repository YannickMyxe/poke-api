(async function(){

    const forms = document.querySelectorAll('.prevent-default');
    forms.forEach((f) => {
        f.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    });

}) ();