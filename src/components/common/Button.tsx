import React from 'react'
import Button from '@mui/material/Button'



interface btnProps {
    text: string,
    handleClick(): any,
}
const BasicButton = ({text, handleClick}: btnProps) => {
  return (
    <Button color='primary' size='large' variant='contained' onClick={handleClick} >{text}</ Button>
  )
}

export default BasicButton