import React from 'react'
import axios from 'axios'

class Actions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputPath: '',
      results: {}
    }
    this.handleScan = this.handleScan.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    console.log('mounted')
  }

  handleScan(event) {
    axios({
        method: 'post',
        url: '/action/scan',
        data: {
          path: this.state.inputPath
        }
      })
      .then((response) => {
        console.log(response)
        this.setState({results: response.data.results})
      })
      .catch( (error) => {
        console.log(error)
      })
  }

  handleUpdate(event) {
    this.setState({inputPath: event.target.value})
  }

  render() {
    const data = this.state.data
    return (
      <div className="row-fluid">
        <h1>Actions</h1>
        <div className="col-md-4">
          <form className="form-inline">
            <label className="sr-only">Path</label>
            <input  type="text"
                    className="form-control mb-2 mr-sm-2 mb-sm-0"
                    id="inputPath"
                    placeholder="~/media"
                    onChange={this.handleUpdate}/>
            <button type="button"
                    className="btn btn-primary"
                    onClick={this.handleScan}>
                Scan
            </button>
          </form>
        </div>
        <div className="col-md-8">
        </div>
      </div>
    )
  }
}

export default Actions
