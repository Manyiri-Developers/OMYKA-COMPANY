
    // JavaScript to enable form download
    document.getElementById('download-button').addEventListener('click', function () {
        const formData = new FormData(document.getElementById('booking-form'));
        let formText = '';
        formData.forEach((value, key) => {
            formText += `${key}: ${value}\n`;
        });

        const blob = new Blob([formText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'booking-form.txt';
        a.click();

        URL.revokeObjectURL(url);
    });
