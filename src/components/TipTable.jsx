import {React}from "react"
import {Table} from 'react-bootstrap'

export default function TipTable({arr=[]}){
    return (<Table className="mt-3" striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {arr.map(({item,index,arr})=>{return (
            <tr>
          <td>{index}</td>
          <td>{item.name}</td>
          <td>{item.message}</td>
        </tr>    
        )})}
        
      </tbody>
    </Table>);
}