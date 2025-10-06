import React from 'react'
import Button from './Button'
export const Card = (
  title, 
  company,
  description,
  hourlyRate,
  btnText,
  btnOnClick,
  btnClassName
) => {
  return (
    <div className='flex flex-col sm:mx-auto max-w-md rounded-sm bg-blue-100 '>
      {title && <h2 className=''>{title}</h2>}
      {description && <p>{description}</p>}
      {company && <p>{company}</p>}
      {hourlyRate && <p>{hourlyRate}</p>}
      {btnText && btnOnClick && btnClassName &&
        <Button title={btnText} onClick={btnOnClick} className={btnClassName} />
      }
    </div>
  )
}
