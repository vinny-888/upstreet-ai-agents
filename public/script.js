let clientId = Math.random()*1000000; // Get a unique id for this client session
let conversation = document.getElementById('conversation');
let socketId = null;
const apiOrigin = "http://localhost:3000";
const wssOrigin = "ws://localhost:3000";
// const apiOrigin = "https://upstreet-ai.glitch.me";
// const wssOrigin = "wss://upstreet-ai.glitch.me/";

function getMaster(socketId, msg){
  fetch(`${apiOrigin}/chat?socketId=${socketId}&model=Mixture of Experts`, {
    method: "POST",
    body: JSON.stringify({message: msg}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res)=>res.json())
  .then((res)=>{
    document.getElementById('text_output_5').value += '\n' + res.response;
  });
}

function promptMasterAI(socketId, msg) {
    let agentResponses = '';
    let responses = 0;
    fetch(`${apiOrigin}/chat?socketId=${socketId}&model=Artists&message=${encodeURIComponent(msg)}`, {
      method: "GET"
    })
    .then((res)=>res.json())
    .then((res)=>{
      document.getElementById('text_output_1').value = res.response;
      agentResponses += '\n\nArtists: \n\n###' + res.response + '\n###';
      responses++;
      if(responses == 8){
        getMaster(socketId, agentResponses)
      }
    }).catch((err)=>{
      console.log('Error: ', err);
    });

    fetch(`${apiOrigin}/chat?socketId=${socketId}&model=Businesses and Entrepreneurs&message=${encodeURIComponent(msg)}`, {
      method: "GET"
    })
    .then((res)=>res.json())
    .then((res)=>{
      document.getElementById('text_output_2').value = res.response;
      agentResponses += '\n\nBusinesses and Entrepreneurs: \n\n###' + res.response + '\n###';
      responses++;
      if(responses == 8){
        getMaster(socketId, agentResponses)
      }
    }).catch((err)=>{
      console.log('Error: ', err);
    });

    fetch(`${apiOrigin}/chat?socketId=${socketId}&model=Educators and Trainers&message=${encodeURIComponent(msg)}`, {
      method: "GET"
    })
    .then((res)=>res.json())
    .then((res)=>{
      document.getElementById('text_output_3').value = res.response;
      agentResponses += '\n\nEducators and Trainers: \n\n###' + res.response + '\n###';
      responses++;
      if(responses == 8){
        getMaster(socketId, agentResponses)
      }
    }).catch((err)=>{
      console.log('Error: ', err);
    });


    fetch(`${apiOrigin}/chat?socketId=${socketId}&model=UX&message=${encodeURIComponent(msg)}`, {
      method: "GET"
    })
    .then((res)=>res.json())
    .then((res)=>{
      document.getElementById('text_output_4').value = res.response;
      agentResponses += '\n\nUX: \n\n###' + res.response + '\n###';
      responses++;
      if(responses == 8){
        getMaster(socketId, agentResponses)
      }
    }).catch((err)=>{
      console.log('Error: ', err);
    });

    fetch(`${apiOrigin}/chat?socketId=${socketId}&model=Moderators&message=${encodeURIComponent(msg)}`, {
      method: "GET"
    })
    .then((res)=>res.json())
    .then((res)=>{
      document.getElementById('text_output_6').value = res.response;
      agentResponses += '\n\nModerators: \n\n###' + res.response + '\n###';
      responses++;
      if(responses == 8){
        getMaster(socketId, agentResponses)
      }
    }).catch((err)=>{
      console.log('Error: ', err);
    });

    fetch(`${apiOrigin}/chat?socketId=${socketId}&model=Devs&message=${encodeURIComponent(msg)}`, {
      method: "GET"
    })
    .then((res)=>res.json())
    .then((res)=>{
      document.getElementById('text_output_7').value = res.response;
      agentResponses += '\n\nDevs: \n\n###' + res.response + '\n###';
      responses++;
      if(responses == 8){
        getMaster(socketId, agentResponses)
      }
    }).catch((err)=>{
      console.log('Error: ', err);
    });

    fetch(`${apiOrigin}/chat?socketId=${socketId}&model=Users&message=${encodeURIComponent(msg)}`, {
      method: "GET"
    })
    .then((res)=>res.json())
    .then((res)=>{
      document.getElementById('text_output_8').value = res.response;
      agentResponses += '\n\nUsers: \n\n###' + res.response + '\n###';
      responses++;
      if(responses == 8){
        getMaster(socketId, agentResponses)
      }
    }).catch((err)=>{
      console.log('Error: ', err);
    });

    fetch(`${apiOrigin}/chat?socketId=${socketId}&model=Volunteers&message=${encodeURIComponent(msg)}`, {
      method: "GET"
    })
    .then((res)=>res.json())
    .then((res)=>{
      document.getElementById('text_output_9').value = res.response;
      agentResponses += '\n\nVolunteers: \n\n###' +  res.response;
      responses++;
      if(responses == 8){
        getMaster(socketId, agentResponses)
      }
    }).catch((err)=>{
      console.log('Error: ', err);
    });
}

function promptSingleAI(socketId, msg, model) {
  fetch(`${apiOrigin}/chat?socketId=${socketId}&model=${model}&message=${encodeURIComponent(msg)}`, {
    method: "GET"
  })
  .then((res)=>res.json())
  .then((res)=>{
    document.getElementById('text_output_single').value = res.response;
  }).catch((err)=>{
    console.log('Error: ', err);
  });
}

function modelChanged(){
  clearAll();
  let model = document.getElementById('model').value;
  if(model == 'Mixture of Experts'){
    document.getElementById('master').style.display = 'grid';
    document.getElementById('single').style.display = 'none';
  } else {
    document.getElementById('master').style.display = 'none';
    document.getElementById('single').style.display = 'block';
  }
}

function clearAll(){
  document.getElementById('text_input').innerHTML = '';

  document.getElementById('text_output_1').value = '';
  document.getElementById('text_output_2').value = '';
  document.getElementById('text_output_3').value = '';
  document.getElementById('text_output_4').value = '';
  document.getElementById('text_output_5').value = '';
  document.getElementById('text_output_6').value = '';
  document.getElementById('text_output_7').value = '';
  document.getElementById('text_output_8').value = '';
  document.getElementById('text_output_9').value = '';
  
  document.getElementById('text_output_single').value = '';
}

function setText(){
  let msg = document.getElementById('text_input').value;
  let model = document.getElementById('model').value;
  if(model == 'Mixture of Experts'){
    promptMasterAI(clientId, msg);
  } else {
    promptSingleAI(clientId, msg, model);
  }
  
}