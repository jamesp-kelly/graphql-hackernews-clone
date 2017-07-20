import React, { Component } from 'react';

class Link extends Component {
  
  _voteForLink = async () => {
    //todo
  }

  render() {
    return (
      <div>
        <div>{this.props.link.description} ({this.props.link.url})</div>
      </div>
    );
  }
}

export default Link;