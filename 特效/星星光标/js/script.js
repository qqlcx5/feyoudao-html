var stars = 25,
    colors = ['#F51720','#FA26A0','#F8D210','#2FF3E0'];

for (var i=0; i<stars; i++){ //create star polygons
  var p = document.createElementNS("http://www.w3.org/2000/svg", "polygon");  
  document.getElementById("container").appendChild(p);
  new TimelineMax()
    .set(p, {x:i*(window.innerWidth/stars)+30,
             y:window.innerHeight/2,
             transformOrigin:'25px 27px',
             attr:{'class':'s',
                   'fill':'#fff',
                   'points':'25,0 32.73,15.65 50,18.16 37.5,30.35 40.45,47.55 25,39.43 9.55,47.55 12.5,30.35 0,18.16 17.27,15.65'}
            }, 0)
    .from(p, 0.3, {scale:0, delay:i/stars/3, ease:Back.easeOut.config(8)}, 0)
    .to(p, 3, {rotation:360, ease:Power0.easeNone, repeat:-1}, 0)
}

window.addEventListener('mousemove', function(e){ //follow mouse movement
  new TimelineMax()
    .staggerTo('.s', 0.5, {x:e.clientX, y:e.clientY, cycle:{'fill':colors}, ease:Back.easeOut.config(5)}, 0.1, 0)
})