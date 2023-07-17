const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSection = document.querySelector(link.getAttribute("href"));
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth",
    });
  });
});


const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});


const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const message = form.elements["message"].value;

  form.reset();
});


function fetchVideos() {
  const channelId = "UCW4DsmyPpgEBaE4Q_Kc0wQQ"; 
  const maxResults = 6; 
  const apiKey = "AIzaSyB5otUuxEYFF2_AJKk-aRFCaLRRDeLOeA8";

  fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
  )
    .then((response) => response.json())
    .then((data) => {
      const videoGrid = document.getElementById("videoGrid");
      videoGrid.innerHTML = ""; 

      data.items.forEach((item) => {
        const videoId = item.id.videoId;
        const thumbnailUrl = item.snippet.thumbnails.medium.url;
        const title = item.snippet.title;

        const videoLink = document.createElement("a");
        videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        videoLink.target = "_blank";

        const thumbnailImage = document.createElement("img");
        thumbnailImage.src = thumbnailUrl;
        thumbnailImage.alt = title;

        videoLink.appendChild(thumbnailImage);
        videoGrid.appendChild(videoLink);
      });
    })
    .catch((error) => {
      console.log("Error fetching YouTube videos:", error);
    });
}

document.addEventListener("DOMContentLoaded", fetchVideos);



