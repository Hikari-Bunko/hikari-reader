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

            // Menampilkan konten setelah navigasi dimuat
            book.loaded.navigation.then(function() {
                rendition.display();
            }).catch(function(err) {
                console.error("Error loading navigation:", err);
            });

            // Resize rendition saat ukuran jendela berubah
            window.addEventListener('resize', function() {
                rendition.resize();
            });
        };

        // Membaca file sebagai ArrayBuffer
        reader.readAsArrayBuffer(file);
    } else {
        console.error("No file selected.");
    }
});
