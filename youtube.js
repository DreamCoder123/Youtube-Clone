const key = "AIzaSyDeU5zpcth2OgXDfToyc7-QnSJsDc41UGk";
let value = document.getElementById("search").value;
let dropdown = document.getElementById("dropdown");
let display_div=document.getElementById("showdata");
document.getElementById("mainlogo").addEventListener("click",()=>{
    window.location.href="./index.html"
})

let popularfun = async()=> {
    let popular_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=in&key=${key}`

    try{
        let popularres= await fetch(popular_url);
        let popularData= await popularres.json()
        console.log('popularData:', popularData)
        display(popularData.items)
    } catch(error){
        console.log('error:', error)

    }
}
popularfun()
let id;

let debounce = (fun,delay)=> {
    if(id){
        clearTimeout(id)
    }
    id= setTimeout(()=>{
        fun();
    },delay)
}


let main = async () => {
  let value = document.getElementById("search").value;

  let data = await getData(value);
  if(data.length == 0)
  {
      display_div.innerHTML=null
    let errorimg=document.createElement("img");
    errorimg.src="./images/cross.png"
    errorimg.style.display="block";
    errorimg.style.margin="auto";
    
    display_div.append(errorimg)
  }
  else searchDisplay(data,value);
  if(value != null)
  {
      document.getElementById("searchbutton").addEventListener("click",function () {
        dropdown.style.display = "none";
        display(data);
      });
  }
};

let getData = async (value) => {
  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${value}&key=${key}`;

  try {
    let res = await fetch(url);
    let firstdata = await res.json();
    return firstdata.items;
  } catch (err) {
    console.log("err:", err);
  }
};




let searchDisplay = (data,value) => {
  dropdown.innerHTML = null;
  dropdown.style.display = "block";
  if (data == undefined || value=="" ) {
    dropdown.style.display = "none";
    return false;
  }
  data.forEach(({ id: { videoId }, snippet }) => {
    let listitem = document.createElement("ul");
    listitem.setAttribute("id", "droplist");
    
    let name = document.createElement("li");
    name.setAttribute("id", "nameli");
    name.addEventListener("click", function () {
      dropdown.style.display = "none";
      display(data);
    });

    name.innerText = snippet.title;

    listitem.append(name);
    dropdown.append(listitem);
  });
};







let display = (data) => {
    display_div.innerHTML=null;
    
    data.forEach( ({id,snippet:{title,channelTitle,thumbnails:{medium:{url}}}}) => {
        
        let localdata = {
            id,
            title,
            channelTitle
        }

        let box= document.createElement("div");
        box.setAttribute("class","box_div");
        box.addEventListener("click", function(){
            localStorage.setItem("videoData",JSON.stringify(localdata))
            window.location.href="./playpage.html"
        })

        let vidImage=document.createElement("img");
        vidImage.setAttribute("class","vidImg");
        vidImage.src=url
        
        // let iframe = document.createElement("iframe");
        // iframe.setAttribute("class","iframe");
        // iframe.src=`https://www.youtube.com/embed/${videoId}`

        let title_div = document.createElement("h4");
        title_div.setAttribute("class","title")
        title_div.innerText = title;

        let channel = document.createElement("p");
        channel.setAttribute("class","channel_title")
        channel.innerText = channelTitle;

        box.append(vidImage,title_div,channel);
        display_div.append(box)
    })

}