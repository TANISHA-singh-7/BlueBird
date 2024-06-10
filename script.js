// 1. Smooth Scrolling with Event Delegation (Enhanced)
const navLinks = document.querySelector('nav ul'); // Select the navigation list
navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && event.target.classList.contains('scroll')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Smooth Scroll with Optional Offset
        const offset = 50; // Set an offset for the top of the section (adjust as needed)
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        window.scrollBy(0, -offset); 
    }
});

// 2. Gallery Popup with Image Slideshow and Thumbnails (Advanced)
const galleryImages = document.querySelectorAll('.gal-img img');
const galleryPopup = document.querySelector('.pop-overlay');
const closePopup = document.querySelector('.close');
const popupImage = galleryPopup.querySelector('img');
const nextButton = document.querySelector('.popup-button.next');
const prevButton = document.querySelector('.popup-button.prev');
const thumbnailContainer = document.createElement('div'); 
thumbnailContainer.classList.add('thumbnail-container');

// Create Thumbnails
galleryImages.forEach((image, index) => {
  const thumbnail = document.createElement('img');
  thumbnail.classList.add('thumbnail');
  thumbnail.src = image.getAttribute('src');
  thumbnail.dataset.index = index; // Store index for reference
  thumbnailContainer.appendChild(thumbnail);
});

galleryPopup.appendChild(thumbnailContainer); // Add to the popup

let currentImageIndex = 0;

const showImage = (index) => {
  currentImageIndex = index;
  popupImage.src = galleryImages[index].getAttribute('src');

  // Highlight the corresponding thumbnail
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach(thumb => thumb.classList.remove('active')); 
  thumbnails[index].classList.add('active');
};

galleryImages.forEach((image, index) => {
  image.addEventListener('click', () => {
    showImage(index);
    galleryPopup.style.visibility = 'visible';
    galleryPopup.style.opacity = '1';
  });
});

closePopup.addEventListener('click', () => {
  galleryPopup.style.visibility = 'hidden';
  galleryPopup.style.opacity = '0';
});

nextButton.addEventListener('click', () => {
  const nextIndex = (currentImageIndex + 1) % galleryImages.length;
  showImage(nextIndex);
});

prevButton.addEventListener('click', () => {
  const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(prevIndex);
});

// Click on Thumbnails
thumbnailContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('thumbnail')) {
    const index = parseInt(event.target.dataset.index);
    showImage(index);
  }
});

// 3. Responsive Menu with Mobile Navigation (Improved with Submenu Handling)
const toggleMenu = document.querySelector('.toggle');
const menu = document.querySelector('.menu');
const innerUl = document.querySelectorAll('.inner-ul');

toggleMenu.addEventListener('click', () => {
  menu.classList.toggle('active');
  innerUl.forEach(ul => {
    ul.classList.toggle('active'); 
  });
});

// 4. Form Validation with Real-Time Feedback
const contactForm = document.querySelector('form[action="#"]'); 
const nameInput = document.querySelector('input[name="Name"]');
const emailInput = document.querySelector('input[name="Email"]');
const messageInput = document.querySelector('textarea[name="Message"]');
const submitButton = document.querySelector('button[type="submit"]');

const showError = (inputField, message) => {
  const errorDiv = inputField.nextElementSibling;
  if (errorDiv) {
    errorDiv.textContent = message;
  } else {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = message;
    inputField.parentNode.insertBefore(errorDiv, inputField.nextSibling);
  }
};

const clearErrors = () => {
  const errorDivs = document.querySelectorAll('.error-message');
  errorDivs.forEach(div => div.remove());
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateInput = (inputField) => {
  clearErrors();
  if (inputField.value.trim() === "") {
    showError(inputField, `Please enter your ${inputField.name}.`);
    return false;
  }
  if (inputField === emailInput && !validateEmail(inputField.value.trim())) {
    showError(inputField, "Please enter a valid email address.");
    return false;
  }
  return true;
};

nameInput.addEventListener('blur', () => validateInput(nameInput));
emailInput.addEventListener('blur', () => validateInput(emailInput));
messageInput.addEventListener('blur', () => validateInput(messageInput));

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (validateInput(nameInput) && validateInput(emailInput) && validateInput(messageInput)) {
    // Form is valid, submit to your server using fetch or XMLHttpRequest
    console.log("Form Submitted Successfully!");
  }
});

// 5. Sticky Navigation (Improved with Smooth Transition)
const navbar = document.querySelector('header');
const stickyNav = () => {
    if (window.scrollY >= 100) { 
        navbar.classList.add('sticky'); 
    } else {
        navbar.classList.remove('sticky'); 
    }
};
window.addEventListener('scroll', stickyNav); 

// 6. Typewriter Effect for Headlines (Optional - Improved with More Options)
const typewriterElements = document.querySelectorAll('.typewriter');
typewriterElements.forEach(element => {
  let text = element.textContent;
  let i = 0;
  element.textContent = "";
  const typeWriter = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      // Optionally, add a delay and loop the effect
      setTimeout(() => { 
        i = 0;
        element.textContent = "";
        typeWriter(); 
      }, 1000); 
    }
  };
  typeWriter();
});

// 7. Responsive Images (Using srcset for Adaptive Images)
const images = document.querySelectorAll('img'); // Select all images on the page
images.forEach(image => {
  image.srcset = `
    ${image.src} 1x,
    ${image.src} 2x
  `;
  image.sizes = "(min-width: 768px) 50vw, (min-width: 480px) 75vw, 100vw"; 
});

// 8. Lazy Loading (Improved with Intersection Observer)
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoad = (image) => {
  image.src = image.dataset.src;
  image.classList.remove('lazy'); // Remove the class
};

const lazyLoadObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      lazyLoad(entry.target);
      lazyLoadObserver.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.1 // Start loading when 10% of the image is visible
});

lazyImages.forEach(image => lazyLoadObserver.observe(image)); 

// 9. Preloader (Optional)
const preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
  preloader.style.display = 'none';
});