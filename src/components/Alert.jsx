const Alert = ({type, text}) => {
  return (
    // The outer div now just provides flex centering without full width
    <div className="absolute top-10 left-0 right-0 flex justify-center">
      <div className={`
          ${type === "danger" ? "bg-red-800" : "bg-blue-800"} 
          p-2 text-indigo-100 leading-none 
          rounded-full inline-flex items-center
          `} 
          role="alert">
        <p 
          className={`${type === "danger" ? "bg-red-500" : "bg-blue-500"} 
          flex rounded-full uppercase px-2 py-1 font-semibold mr-3 text-xs`}>
          {type === "danger" ? "Failed" : "Success"}
        </p>
        <p className='mr-2 text-left'>{text}</p>
      </div>    
    </div>
  )
}

export default Alert