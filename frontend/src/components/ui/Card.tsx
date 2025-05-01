// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Card({ children, className = '', ...props }:any) {
    return (
      <div 
        className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 ${className}`} 
        {...props}
      >
        {children}
      </div>
    );
  }
  
  export default Card;