import React from 'react'

class Directory extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div className="folder-list">
            <span><p><i className="fa fa-folder"> ({this.props.count}) - </i>{this.props.name}</p></span>
        </div>
    )
  }
}

export default Directory
