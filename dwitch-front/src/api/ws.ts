const URL = import.meta.env.VITE_WEBSOCKET_BROADCAST_URL ?? 'ws://localhost:5002/ws';
const ws = new WebSocket(URL);

ws.onmessage = event => {
  const data = JSON.parse(event.data);
  if(data.status == 'broadcast-started'){
    alert('Uma transmissão foi iniciada!');
  }
  console.log(data);
};

ws.onopen = () => {
  console.log('websocket open');
}

ws.onclose = () => {
  console.log('websocket close');
}

export default ws;
