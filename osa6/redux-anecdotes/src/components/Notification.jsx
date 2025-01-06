import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.content)
  const isVisible = useSelector(state => state.notification.visible)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    isVisible ? (
      <div style={style}>
        {notification}
      </div>
    ) : 
    null
  )
}

export default Notification