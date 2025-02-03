document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const epubContent = e.target.result;
            // Gunakan library seperti ePub.js untuk menampilkan konten
            const book = ePub(epubContent);
            const rendition = book.renderTo("viewer", {
                width: "100%",
                height: "100%"
            });
            rendition.display();
        };
        reader.readAsArrayBuffer(file);
    }
});
