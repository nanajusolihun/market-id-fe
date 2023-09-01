import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TableListAddress ({ list, handleDelete = () => {} }) {
  const navigate = useNavigate();

  function handleEdit ( _id ) {
    navigate(`/address/edit/${ _id }`)
  }

  return (
    <Table>
      <thead>
        <tr>
          <th >ID</th>
          <th >Name</th>
          <th className=" text-end">Action</th>
        </tr>
      </thead>

      <tbody>
        {
          list.length ? (
            list.map((address, index) => (
            <tr key={`item-address-${index}`}>
              <td className="w-25 ">{index+1}</td>
              <td className="w-50 text-capitalize fw-bold">{address.name}</td>
              <td className="w-25 text-end">
                <Button 
                  size="sm"
                  variant="primary" 
                  className="me-2" 
                  onClick={() => handleEdit(address._id)}
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>
                <Button
                  size="sm" 
                  variant="danger" 
                  onClick={() => handleDelete(address._id)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
            ))
          ) : (
            <tr>
              <td className="w-10">
                
              </td>
              <td className="w-80">
                <h5> Empty Address</h5>
              </td>
              <td className="w-10">
                
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  )
}