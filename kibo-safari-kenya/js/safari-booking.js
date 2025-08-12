document.addEventListener('DOMContentLoaded', () => {
        // Initialize EmailJS with your public key
        (function() {
            emailjs.init("vdezp5IQCCEpiykxp"); // Your EmailJS user ID
        })();
      
        // Listener for the donate form submission
        document.getElementById("safari-form").addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
      
            // Collect required form data
    const fullName = document.getElementById('name').value.trim();
    const clientEmail = document.getElementById('email').value.trim();
    const adults = document.getElementById('adults').value.trim();
    const safariPackage = document.querySelector('input[name="safari"]:checked')?.value;

    // Collect optional form data
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const children = document.getElementById('children').value.trim() || "0";
    const airportTransfer = document.getElementById('airport-transfer').value || "No";
    const arrivalDate = document.getElementById('arrival-date').value || "Not Provided";
    const departureDate = document.getElementById('departure-date').value || "Not Provided";
    const celebration = document.getElementById('celebration').value.trim() || "Not Provided";
    const tailoredExperience = document.getElementById('tailored-experience').value.trim() || "Not Provided";

    // Collect selected experiences (checkbox values)
    const experiences = Array.from(document.querySelectorAll('input[name="experiences[]"]:checked'))
                            .map(checkbox => checkbox.value)
                            .join(', ') || "No excursions selected";

    // Validate required fields
    if (!fullName || !clientEmail || !adults || !safariPackage) {
        alert("Please fill in all required fields (Full Name, Email, Number of Adults, and Safari Package) before submitting!");
        return;
    }

    // Prepare data for EmailJS
    const formData = {
        name: fullName,
        email: clientEmail,
        whatsapp: whatsapp || "Not Provided",
        adults: adults,
        children: children,
        airport_transfer: airportTransfer,
        arrival_date: arrivalDate,
        departure_date: departureDate,
        celebration: celebration,
        tailored_experience: tailoredExperience,
        safari: safariPackage,
        experiences: experiences
    };

    console.log("Form Data to be Sent:", formData); // Debugging: check form data

        // Send data via EmailJS
        emailjs.send("service_m9rsf06", "template_y1lso4j", formData)
            .then(() => {
                alert("Booking request sent successfully! 🎉");
                document.getElementById("safari-form").reset(); // Reset form
            })
            .catch((error) => {
                console.error("Error sending booking request:", error);
                alert("Oops! Something went wrong. Please try again later.");
            });
        });
      });
      
      
      