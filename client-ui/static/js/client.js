function send(){
  var start_time = new Date().getTime();
  document.getElementById("tt").disabled=true;
  console.log(start_time);
  var k=1;
  var ele = document.getElementsByName('choice');
  for(i = 0; i < ele.length; i++) {
                if(ele[i].checked)
                {k=i;
                console.log("cc");}
            }
//   jQuery.get('127.0.0.1:6099/hello',function( data,status, xhr) {
//         var request_time = new Date().getTime() - start_time;
//         console.log(request_time);
// })
if(k==0){
  $.ajax({
      url: "http://127.0.0.1:6069/hello",
      type: 'GET',
      success: function(res) {
        var request_time = new Date().getTime() - start_time;
                // alert('csdc');
                document.getElementById('name').innerHTML="Node : ";
                document.getElementById('time').innerHTML=request_time+"ms";
                // console.log("Node : "+request_time);
      }
  });
}
else if(k==1){
  $.ajax({
      url: "http://127.0.0.1:6969/hello",
      type: 'GET',
      success: function(res) {
        var request_time = new Date().getTime() - start_time;
        document.getElementById('name').innerHTML="Python : ";
        document.getElementById('time').innerHTML=request_time+"ms";
                // alert('csdc');
      }
  });
}
else{
  console.log("vv");
}
// axios({
//   method: 'get',
//   url: '127.0.0.1:6099/hello',
//
// })
//   .then(function (response) {
//     console.log("cads0");
//   });
}