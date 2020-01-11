class Table extends React.Component {
  render() {

    const { data } = this.props;

    return (
      <React.Fragment>
      <h3>Academic Years</h3>
        <table className="table">
          <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td >{item.AcademicYear}</td>
          </tr>
          

        ))}
        </tbody>
        </table>
      </React.Fragment>
    );
  }
}

