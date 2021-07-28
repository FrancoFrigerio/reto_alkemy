import React, { useEffect, useState } from 'react'
import {Container, Form} from 'semantic-ui-react'
import {useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

const Login = (props) => {
    const [error, setError] = useState(null)
    const [activo, setActivo] = useState(false)
    useEffect(() => {
        const redireccionar=()=>{
            if(activo){
                 props.history.push('/home')
            }
            return
        }
        redireccionar()
        
    }, [activo , props.history])


    const formik = useFormik({
       initialValues:{
           username:'',
           password:''
       },
     validationSchema: Yup.object({
         username:Yup.string().email("Debe ser una cuenta de correo.").required("El username es obligatorio"),
         password:Yup.string().required("Debe ingresar su contraseña")
     }),


    onSubmit: async(formData)=>{
       try {
        const res = await axios({
            method:'POST',
            url:'http://challenge-react.alkemy.org/',
            headers:{},
            data:{
                "email":formData.username,
                "password":formData.password
            }
        })
        setActivo(true)
       localStorage.setItem('token', res.data.token)   
       } catch (error) {
           setError('Por favor, ingrese un email y contraseña validos')
       }
        

    }

   })
   const cancelar=()=>{
        formik.handleReset();
        setError(null)
   }
    
   return (
        <div className="container d-flex justify-content-center mt-5">
           <div className="col-8 mt-5">
                 <Container>
                     {
                         error!==null?(<div className="alert alert-warning">
                         <p className="text-center">{error}</p>
                     </div>):(null)
                     }
                <form className="form-group text-center" onSubmit={formik.handleSubmit}>
                    
                    <Form.Input type="text" name="username" style={{width:'80%'}}
                            placeholder="ejemplo@gmail.com" onChange={formik.handleChange} error={formik.errors.username} value={formik.values.username}/>

                    
                    <Form.Input className="mt-2" type="password" name="password" style={{width:'80%'}}
                            placeholder="password" onChange={formik.handleChange} error={formik.errors.password} value={formik.values.password}/>
                    
                    
                    <input className="btn btn-outline-success mt-4 mx-1" type="submit" value="Enviar"></input>
                    <input className="btn text-secondary mt-4 mx-1" type="submit" value="Cancelar" onClick={()=>cancelar()}></input>
                </form>
                 </Container>
            </div>
           
            
        </div>
    )
}

export default withRouter(Login)
// export default Login
