import { Form } from "react-bootstrap"

export default function ASelectOptions ({ id, label, name, value, handleBlur, handleChange = () => {}, keyChange, isError, msgError, options }) {
  return (
    <Form.Group className="mt-lg-0 mt-4 b-2">
      <Form.Label htmlFor={id} className="mb-2"
      >
        {label}
      </Form.Label>
        <Form.Select
          id={id} 
          name={name}
          value={value}
          onBlur={handleBlur}
          onChange={(event) => handleChange(event, keyChange)}
          className={isError && "border-danger"}
          >
            <option value="">Select Options</option>
            {
              options.map((item) => (
                <option key={`option-province-${item.name}`} value={item.id}>{item.name}</option>
              ))
            }
            
        </Form.Select>

        { isError && 
          <small className="text-danger test__5">
            {msgError}
          </small>
        }
    </Form.Group>
    )
}