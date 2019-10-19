import React from "react"
let defferedPrompt

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  defferedPrompt = e
});

const install = () => {
  defferedPrompt.prompt();
}

export default () => <button onClick={install}>install</button>
