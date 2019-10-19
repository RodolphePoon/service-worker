import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import _ from "lodash"
import './App.css';
let defferedPrompt

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  // e.preventDefault();
  console.log('beforeinstallprompt', { e })
  // Stash the event so it can be triggered later.
  defferedPrompt = e
  window.deferredPrompt = e;
});



function App() {
  const [state, setState] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch("https://reqres.in/api/users?page=1").then(res => res.json())
      setState({ list: res.data })
    }
    fetchData()

  }, [])

  const getMore = async () => {
    let res = await fetch("https://reqres.in/api/users?page=2").then(res => res.json())
    setState({ list: _.union(state.list, res.data) })
  }

  const post = async () => {
    let res = await fetch("https://reqres.in/api/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": "morpheus",
        "job": "leader"
      })
    })
    console.log({ res })
  }

  const install = () => {
    defferedPrompt.prompt();
    defferedPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        defferedPrompt = null;
      });

    setState({ ...state, prompt: window.deferredPrompt, defferedPrompt })
    console.log({ prompt: window.deferredPrompt, defferedPrompt })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <pre style={{ color: "white" }}>{JSON.stringify(state, null, 2)}

        </pre>

        {_.get(state, 'list', []).map(el => <div key={el.id}><h1>{`${el.first_name} ${el.last_name}`}</h1><img src={el.avatar} style={{ height: "200px", width: "200px" }} alt={`${el.first_name} ${el.last_name}`} /><p>{el.email}</p></div>)}
        <button onClick={getMore}>fetchMore</button>
        <button onClick={post}>Post</button>
        <button onClick={install}>install</button>

      </header>
    </div>
  );
}

export default App;
