var GreeterMessage = React.createClass({
  render: function () {
    var name = this.props.name;
    var message = this.props.message;
    return (
      <div>
        <h1>Hello {name}!</h1>
        <p>{message}</p>
      </div>
    );
  }
});

var GreeterForm = React.createClass({
  onFormSubmit: function (e) {
    e.preventDefault();
    var name = this.refs.name.value;

    if (name.length > 0){
      this.refs.name.value = '';
      this.props.onNewName(name);
    }
  },
  render: function () {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="text" ref="name"/>
        <button>Set Name</button>
      </form>
    );
  }
});

var Greeter = React.createClass({   //React Methode creatClass
  getDefaultProps: function (){
    return {
      name : 'React',
      message : 'This is a React component!'
    };
  },
  getInitialState: function () {
    return {
      name : this.props.name
    };
  },

  handleNewName : function (name) {
       this.setState({
         name : name
      })
   },

  render: function () {     //required render , need to use with jsx code

    var name = this.state.name;
    var message = this.props.message;

    return (
      <div>
        <GreeterMessage name={name} message={message}/>
        <GreeterForm onNewName={this.handleNewName}/>
      </div>
    );
  }
});

ReactDOM.render(
  <Greeter/>, //jsx tag name
  document.getElementById('app')
);
