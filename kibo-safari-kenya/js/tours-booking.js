document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init("vdezp5IQCCEpiykxp");
  
    document.getElementById("kibo-booking-form").addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Collect required form data
      const fullName = document.getElementById('name').value.trim();
      const clientEmail = document.getElementById('email').value.trim();
      const adults = document.getElementById('adults').value.trim();
      const children = document.getElementById('children').value.trim() || "0";
      const excursionDate = document.getElementById('excursion-date').value;
  
      // Optional data
      const whatsapp = document.getElementById('whatsapp').value.trim() || "Non fornito";
      const celebration = document.getElementById('celebration').value.trim() || "Non fornito";
      const tailoredExperience = document.getElementById('tailored-experience').value.trim() || "Non fornito";
      const airportTransfer = document.getElementById('airport-transfer').value || "Non richiesto";
      const arrivalDate = document.getElementById('arrival-date').value || "Non specificato";
      const departureDate = document.getElementById('departure-date').value || "Non specificato";
  
      // Selected experiences (checkbox values)
      const experiences = Array.from(document.querySelectorAll('input[name="experiences[]"]:checked'))
                              .map(checkbox => checkbox.value)
                              .join(', ') || "Nessuna esperienza selezionata";
  
      // Selected safari package (radio value)
      const safari = document.querySelector('input[name="safari"]:checked')?.value || "Nessun safari selezionato";
  
      // Validate required fields
      if (!fullName || !clientEmail || !adults || !excursionDate) {
        alert("Per favore, compila tutti i campi obbligatori prima di inviare!");
        return;
      }
  
      // Prepare data for EmailJS
      const formData = {
        name: fullName,
        email: clientEmail,
        whatsapp: whatsapp,
        adults: adults,
        children: children,
        excursion_date: excursionDate,
        celebration: celebration,
        tailored_experience: tailoredExperience,
        experiences: experiences,
        safari: safari,
        airport_transfer: airportTransfer,
        arrival_date: arrivalDate,
        departure_date: departureDate
      };
  
      // Send data to the owner
      emailjs.send("service_m9rsf06", "template_jq225ei", formData)
        .then(() => {
          alert("Richiesta di prenotazione inviata con successo! 🎉");
          document.getElementById("kibo-booking-form").reset(); // Reset form
        })
        .then(() => {
          console.log("Email inviata al proprietario!");
  
          // Send auto-reply to the client only if email is provided
          // if (clientEmail) {
          //     emailjs.send("YOUR_SERVICE_ID", "YOUR_CLIENT_TEMPLATE_ID", formData)
          //         .then(() => console.log("Email sent to client!"))
          //         .catch(error => console.error("Error sending client email:", error));
          // }
  
          // Generate and handle PDF
          generatePDF(fullName, clientEmail, adults, children, excursionDate, whatsapp, celebration, tailoredExperience, experiences, safari, airportTransfer, arrivalDate, departureDate);
        })
        .catch(error => console.error("Errore nell'invio dell'email:", error));
    });
  
    function generatePDF(name, email, adults, children, date, whatsapp, celebration, experience, selectedExperiences, safari, airportTransfer, arrivalDate, departureDate) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      // Colors
      const primaryColor = "#FF8C00"; // Orange
      const textColor = "#000000"; // Black
  
      // Add Kibo Logo
      const logoPath = "images/ippo-logo-menu.jpg"; // Ensure this path is correct
  
      // Load Image
      const img = new Image();
      img.src = logoPath;
      img.onload = function () {
        // Resize image to fit PDF without distortion
        const logoWidth = 60;  // Adjust based on aspect ratio
        const logoHeight = (logoWidth * 864) / 850; // Maintain aspect ratio
        const logoX = 75; // Centered horizontally
        const logoY = 10; // Top margin
  
        doc.addImage(img, "JPEG", logoX, logoY, logoWidth, logoHeight);
  
        // Move header below the logo
        const headerY = logoY + logoHeight + 10; // Adjusted for spacing
  
        // Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(primaryColor);
        doc.text("Grazie per la tua richiesta di prenotazione!", 20, headerY);
  
        // Subtitle
        doc.setFontSize(14);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(textColor);
        doc.text("Stiamo esaminando la tua richiesta e ti contatteremo presto.", 20, headerY + 10);
  
        // Separator line
        doc.setDrawColor(primaryColor);
        doc.line(20, headerY + 15, 190, headerY + 15);
  
        // Booking Details Section
        const detailsStartY = headerY + 25; // Start below separator
  
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        doc.text("Dettagli della prenotazione:", 20, detailsStartY);
  
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(textColor);
  
        doc.text(`Nome completo: ${name}`, 20, detailsStartY + 10);
        doc.text(`Email: ${email}`, 20, detailsStartY + 20);
        doc.text(`WhatsApp: ${whatsapp}`, 20, detailsStartY + 30);
        doc.text(`Adulti: ${adults}, Bambini: ${children}`, 20, detailsStartY + 40);
        doc.text(`Data di arrivo: ${arrivalDate}`, 20, detailsStartY + 50);
        doc.text(`Data di partenza: ${departureDate}`, 20, detailsStartY + 60);
        doc.text(`Data inizio escursione: ${date}`, 20, detailsStartY + 70);
        doc.text(`Festeggiamento: ${celebration}`, 20, detailsStartY + 80);
        doc.text(`Esperienza personalizzata: ${experience}`, 20, detailsStartY + 90);
        doc.text(`Esperienze selezionate: ${selectedExperiences}`, 20, detailsStartY + 100);
        doc.text(`Pacchetto safari: ${safari}`, 20, detailsStartY + 110);
        doc.text(`Trasferimento aeroportuale: ${airportTransfer}`, 20, detailsStartY + 120);
  
        // Footer
        const footerStartY = detailsStartY + 140;
  
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        doc.text("Contattaci:", 20, footerStartY);
  
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(textColor);
        doc.text("WhatsApp: +254708192212", 20, footerStartY + 10);
        doc.text("Email: safaris@kiborestaurantwatamu.com", 20, footerStartY + 20);
        doc.text("Sito web: www.kiborestaurantwatamu.com", 20, footerStartY + 30);
  
        // Footer separator
        doc.setDrawColor(primaryColor);
        doc.line(20, footerStartY + 35, 190, footerStartY + 35);
  
        // Open PDF in new tab
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
  
        // Auto-download the PDF
        doc.save("Kibo_Dettagli_Prenotazione.pdf");
      };
  
      img.onerror = function () {
        console.error("Impossibile caricare l'immagine del logo.");
      };
    }
  });