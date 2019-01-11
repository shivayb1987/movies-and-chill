import React from "react"
import { IMAGE_URL } from "../utilities/Config"

const ProfilePicture = ({
  title,
  tagline,
  className,
  height = 400,
  width = 500,
  profilePath
}) => (
  <>
    <div>
      <h2>{title}</h2>
      {tagline && <em>{tagline}</em>}
    </div>
    <img
      className={className}
      height={height}
      width={width}
      src={`${IMAGE_URL}/w500/${profilePath}`}
      alt={`Profile picture of ${title}`}
    />
  </>
)

export default ProfilePicture
