var React = require('react');
var DefaultLayout = require('./layouts/default');

class HelloMessage extends React.Component {
  render() {
    console.log('eiei', this.props.readDB())
    
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello {this.props.name}</div>
        <div>{this.props.readDB().a}</div>
      </DefaultLayout>
    );
  }
}

module.exports = HelloMessage;