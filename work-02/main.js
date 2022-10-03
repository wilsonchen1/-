var work_data=[
  {
    "cover": "imgs/cover-01.jpg",
    "avatar": "imgs/avatar-01.jpg",
    "name": "Steve Wolf",
    "badge": "Pro",
    "likes": "225",
    "views": "32.6k"
  },
  {
    "cover": "imgs/cover-02.png",
    "avatar": "imgs/avatar-02.png",
    "name": "Fireart Studio",
    "badge": "Team",
    "likes": "137",
    "views": "19.9k"
  },
  {
    "cover": "imgs/cover-03.jpg",
    "avatar": "imgs/avatar-03.jpg",
    "name": "Ethan Fender",
    "badge": "Pro",
    "likes": "152",
    "views": "25.9k"
  },
  {
    "cover": "imgs/cover-04.png",
    "avatar": "imgs/avatar-04.gif",
    "name": "Stevan Rodic",
    "badge": "Pro",
    "likes": "96",
    "views": "16.9k"
  },
  {
    "cover": "imgs/cover-05.png",
    "avatar": "imgs/avatar-05.png",
    "name": "Dribbble",
    "badge": "Team",
    "likes": "43",
    "views": "3.5k"
  },
  {
    "cover": "imgs/cover-06.png",
    "avatar": "imgs/avatar-06.jpg",
    "name": "Alfrey Davilla | vaneltia",
    "badge": "Pro",
    "likes": "74",
    "views": "7.4k"
  },
  {
    "cover": "imgs/cover-07.png",
    "avatar": "imgs/avatar-07.png",
    "name": "tubik",
    "badge": "Team",
    "likes": "124",
    "views": "18.2k"
  },
  {
    "cover": "imgs/cover-08.jpg",
    "avatar": "imgs/avatar-08.png",
    "name": "Dlanid",
    "badge": "Pro",
    "likes": "46",
    "views": "7.1k"
  },
  {
    "cover": "imgs/cover-09.png",
    "avatar": "imgs/avatar-09.jpg",
    "name": "The Faces",
    "badge": "Team",
    "likes": "59",
    "views": "7.3k"
  },
  {
    "cover": "imgs/cover-10.png",
    "avatar": "imgs/avatar-10.png",
    "name": "Odama",
    "badge": "Team",
    "likes": "54",
    "views": "1.1k"
  },
  {
    "cover": "imgs/cover-11.jpg",
    "avatar": "imgs/avatar-11.jpg",
    "name": "Matt Naylor",
    "badge": "",
    "likes": "56",
    "views": "8.1k"
  },
  {
    "cover": "imgs/cover-12.png",
    "avatar": "imgs/avatar-12.jpg",
    "name": "Voila",
    "badge": "Team",
    "likes": "164",
    "views": "24.1k"
  }
]


function menu_click(){
  document.getElementById("myDropdown").classList.toggle("show");
}
//构建动态页面
function item_add(name,classname){//添加内容的函数
  var item=document.createElement(name);
  item.className=classname;
  return item;
}
var item_list=item_add('list','list');
var divheader=item_add('section','header');

for(var i=0;i<work_data.length;i++){
  var div_item=item_add('div','item');
  var div_cover=item_add('div','cover');
  var div_baseline=item_add('div','baseline');
  var div_data=document.createElement('div');
  div_data.className='baseline';
  var div_source=document.createElement('div');
  div_source.className='baseline';


  var img_cover=document.createElement("img");
  img_cover.src=work_data[i].cover;
  var img_avatar=document.createElement('img');
  img_avatar.src=work_data[i].avatar;
  img_avatar.className='avatar';
  var div_like=document.createElement("div");
  div_like.innerText=work_data[i].likes;
  var div_badge=document.createElement("div");
  div_badge.innerText=work_data[i].badge;
  div_badge.className='badge';
  var img_like=document.createElement("img");
  img_like.src='imgs/icon-like.svg';
  img_like.className='likes';
  var div_views=document.createElement("div");
  div_views.innerText=work_data[i].views;
  var img_views=document.createElement("img");
  img_views.src='imgs/icon-view.svg';
  img_views.className='views';

  var div_name=document.createElement('div');
  div_name.innerText=work_data[i].name;
  div_name.className='name';



  div_cover.appendChild(img_cover);
  div_item.appendChild(div_cover);
  div_source.appendChild(img_avatar);
  div_source.appendChild(div_name);
  div_source.appendChild(div_badge);
  div_data.appendChild(img_like);
  div_data.appendChild(div_like);
  div_data.appendChild(img_views);
  div_data.appendChild(div_views);
  div_baseline.appendChild(div_source);
  div_baseline.appendChild(div_data);
  div_item.appendChild(div_baseline);


  
  
  item_list.appendChild(div_item);
  
}

document.body.appendChild(item_list);