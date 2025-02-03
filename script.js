document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const viewer = document.getElementById('viewer');
    if (file) {
        viewer.classList.add('loading');
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
                viewer.classList.remove('loading');
            }).catch(function(err) {
                console.error("Error loading navigation:", err);
                viewer.classList.remove('loading');
            });

            window.addEventListener('resize', function() {
                rendition.resize();
            });
        };

        reader.readAsArrayBuffer(file);
    } else {
        console.error("No file selected.");
    }
});
