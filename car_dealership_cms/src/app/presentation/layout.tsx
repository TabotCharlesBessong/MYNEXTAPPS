import React, {PropsWithChildren} from 'react'

const PresentationLayout = (children:PropsWithChildren) => {
  return (
    <div>
      {children.children}
    </div>
  )
}

export default PresentationLayout