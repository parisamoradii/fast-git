import { useField } from "formik";

export default function CustomInput({placeholder , type = 'text' , className , name , icon = null}) {
    

      const [field, meta , helpers] = useField(name);


    
    
      return <div>
         <input
            type={type}
            placeholder={placeholder}
            className={`${className} ${
                meta.touched && meta.error ? "error" : "success"
            }`}
            {...field}
            {...meta}
          />
          {meta.touched && meta.error && <p style={{color: 'red', fontSize:'13px'}}>{meta.error}</p>}
      </div>;
}
