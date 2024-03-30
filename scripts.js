let currentMediaIndex = 0;
let mediaItems = [];

// Function to create and open the modal
function openModal(mediaSrc, mediaType, mediaList) {
  // Store the list of media items for navigation
  mediaItems = mediaList;

  let mediaElement;
  if (mediaType === "image") {
    mediaElement = `
      <img src="${mediaSrc}" class="img-fluid rounded">
    `;
  } else if (mediaType === "video") {
    mediaElement = `
      <video controls class="img-fluid rounded">
        <source src="${mediaSrc}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  }

  const modalHtml = `
    <div class="modal" id="mediaModal">
      <div class="modal-dialog">
        <div class="modal-content img-bg">
          <div class="modal-header img-head-bg">
            <h1 class="text-light">${mediaType.toUpperCase()}</h1>
            <button type="button" class="btn-close btn-dark bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${mediaElement}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="prevMediaBtn">Previous</button>
            <button type="button" class="btn btn-primary" id="nextMediaBtn">Next</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add the modal HTML to the body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Activate the Bootstrap modal
  const modalEl = document.getElementById("mediaModal");
  const modal = new bootstrap.Modal(modalEl);
  modal.show();

  // Button elements
  const prevBtn = document.getElementById("prevMediaBtn");
  const nextBtn = document.getElementById("nextMediaBtn");

  // Add event listeners to the "Previous" and "Next" buttons
  prevBtn.addEventListener("click", showPreviousMedia);
  nextBtn.addEventListener("click", showNextMedia);

  // Function to show the previous media item
  function showPreviousMedia() {
    currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
    const { src, type } = mediaItems[currentMediaIndex];
    updateModalContent(src, type);
    checkEndOfMedia();
  }

  // Function to show the next media item
  function showNextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
    const { src, type } = mediaItems[currentMediaIndex];
    updateModalContent(src, type);
    checkEndOfMedia();
  }

  // Function to check if the end of the media list is reached
  function checkEndOfMedia() {
    if (currentMediaIndex === 0) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }

    if (currentMediaIndex === mediaItems.length - 1) {
      nextBtn.disabled = true;
      // Display a message when end of media is reached
      const endMessage = document.createElement("p");
      endMessage.textContent = "";
      modalEl.querySelector(".modal-body").appendChild(endMessage);
    } else {
      nextBtn.disabled = false;
      // Remove the end message if it exists
      const endMessage = modalEl.querySelector(".modal-body > p");
      if (endMessage) {
        endMessage.remove();
      }
    }
  }

  // Function to update the modal content with new media
  function updateModalContent(src, type) {
    let newMediaElement;
    if (type === "image") {
      newMediaElement = `
        <img src="${src}" class="img-fluid rounded">
      `;
    } else if (type === "video") {
      newMediaElement = `
        <video controls class="img-fluid rounded">
          <source src="${src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    }

    const modalBody = modalEl.querySelector(".modal-body");
    modalBody.innerHTML = newMediaElement;
  }

  // Remove the modal from the DOM after it's closed
  modalEl.addEventListener("hidden.bs.modal", () => {
    modalEl.remove();
  });

  // Check if end of media is reached initially
  checkEndOfMedia();
}

// Function to add click event listeners to all images with 'card' class
function addGalleryListeners() {
  const galleryItems = document.querySelectorAll(".card");

  galleryItems.forEach((item, index) => {
    const image = item.querySelector("img");
    const video = item.querySelector("video");

    if (image) {
      image.addEventListener("click", function () {
        const mediaSrc = image.getAttribute("src");
        openModal(mediaSrc, "image", getImageMediaList(galleryItems));
        currentMediaIndex = index;
      });
    }

    if (video) {
      video.addEventListener("click", function () {
        const mediaSrc = video.getAttribute("src");
        openModal(mediaSrc, "video", getVideoMediaList(galleryItems));
        currentMediaIndex = index;
      });
    }
  });
}

// Function to get a list of image media items
function getImageMediaList(galleryItems) {
  const imageMediaList = [];
  galleryItems.forEach((item) => {
    const image = item.querySelector("img");
    if (image) {
      imageMediaList.push({
        src: image.getAttribute("src"),
        type: "image"
      });
    }
  });
  return imageMediaList;
}

// Function to get a list of video media items
function getVideoMediaList(galleryItems) {
  const videoMediaList = [];
  galleryItems.forEach((item) => {
    const video = item.querySelector("video");
    if (video) {
      videoMediaList.push({
        src: video.getAttribute("src"),
        type: "video"
      });
    }
  });
  return videoMediaList;
}

// Call the function to add click event listeners on page load
document.addEventListener("DOMContentLoaded", function () {
  addGalleryListeners();
});
