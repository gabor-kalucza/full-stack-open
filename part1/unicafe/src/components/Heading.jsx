const Heading = ({ content, level = 1 }) => {
  const Tag = `h${level}`

  return <Tag>{content}</Tag>
}

export default Heading
