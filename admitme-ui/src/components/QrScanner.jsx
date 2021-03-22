import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

class QrScanner extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 500,
      result: 'SCAN CODE',
    }
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(result){
    if(result){
      this.setState({ result })
    }
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 200,
      width: 220,
      
      
    }

    return(
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          onImageLoad
          />
          <br />
          <br />
         
          <p>{this.state.result}</p>
         
      </div>
    )
  }
}


export default QrScanner; 