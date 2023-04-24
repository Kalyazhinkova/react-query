import Table from "react-bootstrap/Table";

export const CoinsTable = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {/* <th>№</th> */}
          <th>Название</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        {data.map((obj) => (
          <tr>
            {/* <td>{obj.rank}</td> */}
            <td>
              {/* <img
                src={obj.icon}
                width={20}
                style={{ marginRight: 10 }}
                alt="coin"
              />{" "} */}
              {obj.name}
            </td>
            <td>{"$ " + obj.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
