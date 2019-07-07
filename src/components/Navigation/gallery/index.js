import React from 'react'
import Gallery from 'react-photo-gallery'

const Gallery = ({ images, onClickPhoto }) => (
  <Gallery photos={images} onClickPhoto={onClickPhoto} />
)
