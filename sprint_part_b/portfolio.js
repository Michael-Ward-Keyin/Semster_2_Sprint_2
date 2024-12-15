document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
  
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); 
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
  

      const formData = {
        name: name,
        email: email
      };
  

      localStorage.setItem('contactFormData', JSON.stringify(formData));
  

      alert('Your data has been saved locally!');
      

      contactForm.reset();
    });
  });
  
  