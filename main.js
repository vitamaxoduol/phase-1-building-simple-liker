// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


// Get the error modal and message elements
const errorModal = document.getElementById('modal');
const errorMessage = document.getElementById('modal-message');

// Hide the error modal initially
errorModal.classList.add('hidden');

// Add event listener to all like buttons
const likeButtons = document.getElementsByClassName('like-glyph');
for (let button of likeButtons) {
  button.addEventListener('click', handleLike);
}

// Function to handle the like button click event
function handleLike(event) {
  const heart = event.target;

  // Check if the heart is empty or full
  if (heart.textContent === EMPTY_HEART) {
    mimicServerCall()
      .then(() => {
        // Change the heart to full and add activated-heart class
        heart.textContent = FULL_HEART;
        heart.classList.add('activated-heart');
      })
      .catch((error) => {
        // Display the error message in the modal
        errorMessage.textContent = error;
        // Remove the hidden class to display the error modal
        errorModal.classList.remove('hidden');
        // Hide the error modal after 3 seconds
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  } else {
    // Change the heart back to empty and remove activated-heart class
    heart.textContent = EMPTY_HEART;
    heart.classList.remove('activated-heart');
  }
}



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
