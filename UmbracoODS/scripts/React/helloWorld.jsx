
class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };

  }

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (data) {

        const dataReceived = JSON.parse(data);


        this.setState({ data: dataReceived.censusKeyData});
        //const testUrl = '@Url.Action("GetName", "Reports")';
        //console.log(testUrl);

        

        console.log("dataReceived: ", dataReceived.censusKeyData);
        //console.log(this.state.data);

      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {

    

    const { data: censusKeyData } = this.state;

    console.log(censusKeyData);

    return (
      <div className="commentBox">Hello, world! I am a CommentBox.
        <Table data={censusKeyData} />
      <ul>
          {censusKeyData.map((item, index) => (
            <li key={index}>{item.AcademicYear}</li>

          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<CommentBox url={ACT_URL} />, document.getElementById('reactContent'));