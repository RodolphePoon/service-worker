import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import _ from "lodash"
import './App.css';
import PromptButton from './promptButton';




function App() {
  const [state, setState] = useState({})
  const [show, setShow] = useState(false)

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
  }

  const showButton = () => {
    setShow(true)
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
        <button onClick={showButton}> show PromptButton</button>
        {show && <PromptButton />}


      </header>
    </div>
  );
}

export default App;
