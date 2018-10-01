import React from 'react'
import Link from 'gatsby-link'
import * as PropTypes from 'prop-types'

const propTypes = {
  data: PropTypes.object.isRequired,
}


const Collection = ({ items, CollectionItem }) => {
  return (
    <div>
      { items &&
        items.map((item, index) => {
          return <CollectionItem key={index} item={item.node} />
        })}
    </div>
  )
}

export default Collection;