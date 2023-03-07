import React from 'react'
import Button from '@mui/material/Button'



interface btnProps {
    text: string
}
const BasicButton = ({text}: btnProps) => {
  return (
    <Button color='primary' size='large' variant='contained'>{text}</ Button>
  )
}

export default BasicButton