const api_key = "AIzaSyDeU5zpcth2OgXDfToyc7-QnSJsDc41UGk";

//  'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=information%20technology&key=[api_key]'

let search = async () => {
  try {
    let query = document.getElementById("query").value;
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=in&key=${api_key}`;
    let res = await fetch(url);
    let data = await res.json();
    append(data.items);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
let append = (data) => {
  let container = document.getElementById("results");

  data.forEach(({ id: { videoId }, snippet: { title,thumbnails } }) => {
    let div = document.createElement("div");

    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allow ="fullscreen";
    let h3 = document.createElement("h3");
    h3.innerText = title;
    div.append(iframe, h3);
    container.append(div);
 
    let video = {
      title,
      videoId,
    };

    div.onclick = () => {
      playVideo(video);
    };

    container.append(div);
  });
};

let playVideo = (video) => {
 localStorage.setItem("video", JSON.stringify(video));
  window.location.href = "video.html";
};


function openNav() {
  document.getElementById("mySidepanel").style.width = "210px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

// { <iframe width="560" height="315" src="https://www.youtube.com/embed/LpCFF2hzPzs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> }
