function send(){
  var start_time = new Date().getTime();
  // console.log(start_time);
  var k=0;
  var k1=0;
  var ele = document.getElementsByName('choice');
  for(i = 0; i < ele.length; i++) {
                if(ele[i].checked)
                {k=i;
                console.log(k);
              }
            }
            var ele1 = document.getElementsByName('choice1');
            for(i = 0; i < ele1.length; i++) {
                          if(ele1[i].checked)
                          {k1=i;
                          console.log(k1);
                        }
                      }
//   jQuery.get('127.0.0.1:6099/hello',function( data,status, xhr) {
//         var request_time = new Date().getTime() - start_time;
//         console.log(request_time);
// })
if(k==0&&k1==0){
  $.ajax({
      url: "http://127.0.0.1:6069/hello",
      type: 'GET',
      success: function(res) {
        var request_time = new Date().getTime() - start_time;
                // alert('csdc');
                document.getElementById('name').innerHTML="Node + Mongo : ";
                document.getElementById('time').innerHTML=request_time+"ms";
                // console.log("Node : "+request_time);
      }
  });
}
else if(k==1&&k1==0){
  $.ajax({
      url: "http://127.0.0.1:6969/hola",
      type: 'GET',
      success: function(res) {
        var request_time = new Date().getTime() - start_time;
        document.getElementById('name').innerHTML="Python + Mongo: ";
        document.getElementById('time').innerHTML=request_time+"ms";
                // alert('csdc');
      }
  });
}
else if(k==0&&k1==1){
  $.ajax({
      url: "http://127.0.0.1:6069/hola",
      type: 'GET',
      success: function(res) {
        var request_time = new Date().getTime() - start_time;
        document.getElementById('name').innerHTML="Node + MySQL : ";
        document.getElementById('time').innerHTML=request_time+"ms";
                // alert('csdc');
      }
  });
}
else if(k==1&&k1==1){
  $.ajax({
      url: "http://127.0.0.1:6969/hello",
      type: 'GET',
      success: function(res) {
        var request_time = new Date().getTime() - start_time;
        document.getElementById('name').innerHTML="Python + MySQL : ";
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
