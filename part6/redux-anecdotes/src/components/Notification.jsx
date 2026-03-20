import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const [visible, setVisible] = useState(true)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  useEffect(() => {
    if (!notification) {
      return
    }

    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [notification])

  if (!visible || !notification) return null
  return <div style={style}>{notification}</div>
}

export default Notification
