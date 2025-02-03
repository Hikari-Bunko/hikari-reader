document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const epubContent = e.target.result;
            const book = ePub(epubContent);
            const rendition = book.renderTo("viewer", {
                width: "100%",
                height: "100%"
            });

            book.loaded.navigation.then(function() {
                rendition.display();
            });

            window.addEventListener('resize', function() {
                rendition.resize();
            });
        };
        reader.readAsArrayBuffer(file);
    }
});
