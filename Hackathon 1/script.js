const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyAsXnw6QC0EoSqrT093ERctHh-EEbHA5IE";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 20,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
       
    })
    console.log(data);
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}


const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})

const subscriberCount= document.getElementById('Subscriberid');
    const viewCount = document.getElementById('views');
    const videoCount = document.getElementById('videocount');
    const title=document.getElementById('title');
  
let getdata = () => {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&part=snippet&part=statistics&id=${'UCRqs0TZOqe5nrwP-BrdnCjg'}&key=${api_key}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
        title.value=data['items'][0].snippet.title;
        subscriberCount.value = data["items"][0].statistics.subscriberCount;
        viewCount.value = data["items"][0].statistics.viewCount;
        videoCount.value = data["items"][0].statistics.videoCount;
        
    })
}
getdata();