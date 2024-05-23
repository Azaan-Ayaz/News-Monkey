import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/news'
import LoadingBar from 'react-top-loading-bar'
// import PropTypes from 'prop-types'

export default class App extends Component {
  c = "jhon"

  state ={
    progress: 0
  } 
  setProgess = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    return (
      <>
      <div>
        <Navbar/>
        <LoadingBar
  color='#f11946'
  // progress={10}
  onLoaderFinished={() => this.props.setProgess(0)} // Corrected this line
/>
<News pageSize={9} setProgress={this.setProgess} />

      </div>
      </>
    )
  }
}
