import React from 'react';
import '../styles/CardComponent.css';

export default function CardComponent(props) {
  return(
    <div className="CardComponent">
      <div>AccountId: {props.user.accountId}</div>
      <div>Age: {props.user.age}</div>
      <div>FirstName: {props.user.firstName}</div>
      <div>LastName: {props.user.lastName}</div>
    </div>
  )
}