import React from 'react'

class Actions extends React.Component {
  constructor(props) {
    super(props)
    this.state = { log: [] }
    this.handleScan = this.handleScan.bind(this)
  }

  componentDidMount() {
    console.log('mounted')
  }

  handleScan() {
    console.log('Scanning !!')
  }

  render() {
    return (
      <div className="row-fluid">
        <h1>Actions</h1>
        <div className="col-md-4">
            <button type="button"
                    className="btn btn-primary"
                    onClick={this.handleScan}>
                Scan
            </button>
        </div>
        <div className="col-md-8">
        </div>
      </div>
    )
  }
}

export default Actions
