import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import StreamrClient, { StreamPermission } from 'streamr-client';

import { invoke } from '@tauri-apps/api'

function App() {
  return (
    <div className="App">
      <button onClick={streamrTest}>streamer</button>
    </div>
  );
}

async function streamrTest() {
  const streamrClient = new StreamrClient({
    auth: {
      privateKey: '',
    },
  });

  const stream = await streamrClient.getOrCreateStream({
    id: '/foo/bar',
  });

  const streamId = stream.id;

  console.log(`connected to streamId ${streamId}`, stream);

  console.log("finished granting perms");


  setInterval(async () => {
    console.log("sent!", await stream.publish({ test: "yeah" }));
  }, 1000);
}

export default App;
