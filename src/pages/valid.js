import React from "react";

export default function Valid(props) {
  let { title, description, price, qr } = props.props.ticket;
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <h1>Title:</h1>
            </td>
            <td>
              <h1>{title}</h1>
            </td>
          </tr>
          <tr>
            <td>
              <h1>Description:</h1>
            </td>
            <td>
              <h1>{description}</h1>
            </td>
          </tr>
          <tr>
            <td>
              <h1>Price:</h1>
            </td>
            <td>
              <h1>{price}</h1>
            </td>
          </tr>
        </tbody>
      </table>
      <img src={qr} alt="Claim QR Code" />
    </div>
  );
}
