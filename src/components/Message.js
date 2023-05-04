import "./Message.css"

const Message = ({msg, type}) => {
  return (
    /* foi mudado o nome atributo de classname --> className, tava dando erro */
    <div className={`message ${type}`}> 
        <p>{msg}</p>
    </div>
  )
}

export default Message