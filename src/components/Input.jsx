import React from 'react'

export default function Input({ label, id, ...props }){
  return (
    <div className="form-row">
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} {...props} />
    </div>
  )
}
