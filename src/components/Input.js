

export default function FormInput ({label,name,value,handleOnDataChange,type,error}){
    return (
        <div className="form-input">
            <div className="labels">
                <label for={name}>{label}</label>
                <label className={`${error && "error"}`}>{error}</label>
            </div>
            {type === "text" ? <input className={`${error && "input-error"}`} type={type} name={name} id={name} value={value} onChange={handleOnDataChange}/> 
            : <input className={`${error && "input-error"}`} type={type} name={name} id={name} value={value} onChange={handleOnDataChange} min="1900-01-01" max="2026-12-31" />}
        </div>
    )
}