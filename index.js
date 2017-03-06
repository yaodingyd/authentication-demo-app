import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './src/client'

delete AppContainer.prototype.unstable_handleError

function render (Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./src/client', () => {
    render(App)
  })
}
