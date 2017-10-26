import React from 'react'
import axios from 'axios'
import {mapObject} from 'underscore'

import Directory from './Directory'

class Actions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputPath: '',
      results: []
    }
    this.handleScan = this.handleScan.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.transformData = this.transformData.bind(this)
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
        const data = this.transformData(response.data.results)
        console.log(data)
        this.setState({results: data})
      })
      .catch( (error) => {
        console.log(error)
      })
  }

  handleUpdate(event) {
    this.setState({inputPath: event.target.value})
  }

  transformData(data) {
    var collection = []
    for(var directoryName in data) {
      collection.push({
        "name": directoryName,
        "files": data[directoryName]["files"],
        "count": data[directoryName]["count"]
      })
    }
    return collection
  }

  render

  render() {
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
          <div id="directory_view">
            {this.state.results.map(r =>
              (<Directory
                key={r.name}
                name={r.name}
                files={r.files}
                count={r.count}
              />)
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Actions
