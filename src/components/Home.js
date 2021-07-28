import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
const Home = () => {
    const [team, setTeam] = useState([])
    const [teamBuenos, setTeamBuenos] = useState(0)
    const [teamMalos, setTeamMalos] = useState(0)
    const [form, setForm] = useState(false)
    const [heroes, setHeroes] = useState([])
    const [detalle, setDetalle] = useState(null)
    const [alerta, setAlerta] = useState({mensaje:'',estado: false})
   
     const [powerStat2, setPowerStat2] = useState([
          {nomb:"INTELIGENCIA",valor:0},
          {nomb:"FUERZA",valor:0},
          {nomb:"COMBATE",valor:0},
          {nomb:"VELOCIDAD",valor:0},
          {nomb:"PODER",valor:0},
          {nomb:"DURABIIDAD",valor:0},
     ])
     const [mayor, setMayor] = useState({nomb:"",valor:0})
    
     const [medidas, setMedidas] = useState({peso:0,altura:0})
    
    
     const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Debe ingresar un nombre de super heroe")
        }),

        onSubmit: async (formData) => {
            try {
                const res = await axios.get(`https://www.superheroapi.com/api.php/6585711624788014/search/${formData.name}`)
                if (res.data.results !== undefined) {
                    setHeroes(res.data.results)
                } else {
                    setHeroes([])
                }

            } catch (error) {
                console.log(error)
            }
        }

    })
    const agregar = (e) => {
        if (team.length < 6) {
            const elemento = team.filter(j => j.id === e.id)
            
            if (elemento.length > 0) {
                return setAlerta({estado:true, mensaje:"Este super heroe ya se encuentra en tu equipo"})
            }
            if (e.biography.alignment === 'good' || e.biography.alignment ==='neutral') {
                if (teamBuenos < 3) {
                    setTeamBuenos(teamBuenos + 1)
                    setTeam([...team, e])
                      powerStat2[0].valor +=(parseInt(e.powerstats.intelligence)>0?(parseInt(e.powerstats.intelligence)):(0))
                      powerStat2[1].valor +=(parseInt(e.powerstats.strength)>0?(parseInt(e.powerstats.strength)):(0))
                      powerStat2[2].valor +=(parseInt(e.powerstats.combat)>0?(parseInt(e.powerstats.combat)):(0))
                      powerStat2[3].valor +=(parseInt(e.powerstats.speed)>0?(parseInt(e.powerstats.speed)):(0))
                      powerStat2[4].valor +=(parseInt(e.powerstats.power)>0?(parseInt(e.powerstats.power)):(0))
                      powerStat2[5].valor +=(parseInt(e.powerstats.durability)>0?(parseInt(e.powerstats.durability)):(0))
                    
                    const ordenado =  powerStat2.sort((e,j) => e.valor - j.valor)
                       
                    setMayor(ordenado[ordenado.length-1])
                       
                       setMedidas({
                        peso:medidas.peso + parseInt(e.appearance.weight[1]),
                        altura:medidas.altura + parseInt(e.appearance.height[1])
                     })

                } else {
                    return setAlerta({estado:true, mensaje:"El quipo de super heroes buenos ya se encuentra completo"})
                }
            } else if (e.biography.alignment === 'bad') {
                if (teamMalos < 3) {
                    setTeamMalos(teamMalos + 1)
                    setTeam([...team, e])
                     powerStat2[0].valor +=(parseInt(e.powerstats.intelligence)>0?(parseInt(e.powerstats.intelligence)):(0)) 
                     powerStat2[1].valor +=(parseInt(e.powerstats.strength)>0?(parseInt(e.powerstats.strength)):(0)) 
                     powerStat2[2].valor +=(parseInt(e.powerstats.speed)>0?(parseInt(e.powerstats.speed)):(0)) 
                     powerStat2[3].valor +=(parseInt(e.powerstats.durability)>0?(parseInt(e.powerstats.durability)):(0)) 
                     powerStat2[4].valor +=(parseInt(e.powerstats.power)>0?(parseInt(e.powerstats.power)):(0)) 
                     powerStat2[5].valor +=(parseInt(e.powerstats.combat)>0?(parseInt(e.powerstats.combat)):(0)) 
                    
                     const ordenado =  powerStat2.sort((e, j) => e.valor - j.valor)
                       
                    setMayor(ordenado[ordenado.length-1])
                        
                     setMedidas({
                         peso:medidas.peso + parseInt(e.appearance.weight[1]),
                         altura:medidas.altura + parseInt(e.appearance.height[1])
                      })

                } else {
                    return setAlerta({estado:true, mensaje:"El quipo de super heroes malos ya se encuentra completo"})
                }
            }
        } else {
            return setAlerta({estado:true, mensaje:"El equipo de super heroes ya está completo"})
        }
    }
    const eliminar = (object) => {
        const newTeam = team.filter(e => e.id !== object.id)
        if(object.biography.alignment === 'good'|| object.biography.alignment === 'neutral'){
            setTeamBuenos(teamBuenos-1)
            
                powerStat2[0].valor -=(parseInt(object.powerstats.intelligence)>0?(parseInt(object.powerstats.intelligence)):(0)) 
                powerStat2[1].valor -=(parseInt(object.powerstats.strength)>0?(parseInt(object.powerstats.strength)):(0)) 
                powerStat2[2].valor -=(parseInt(object.powerstats.speed)>0?(parseInt(object.powerstats.speed)):(0)) 
                powerStat2[3].valor -=(parseInt(object.powerstats.durability)>0?(parseInt(object.powerstats.durability)):(0)) 
                powerStat2[4].valor -=(parseInt(object.powerstats.power)>0?(parseInt(object.powerstats.power)):(0)) 
                powerStat2[5].valor -=(parseInt(object.powerstats.combat)>0?(parseInt(object.powerstats.combat)):(0)) 
                         
                const ordenado =  powerStat2.sort((e, j) => e.valor - j.valor)
                       
                    setMayor(ordenado[ordenado.length-1])
                
                
                    setMedidas({
                     peso:medidas.peso - parseInt(object.appearance.weight[1]),
                     altura:medidas.altura - parseInt(object.appearance.height[1])
                 })
        }else{
            setTeamMalos(teamMalos-1)
                powerStat2[0].valor -=(parseInt(object.powerstats.intelligence)>0?(parseInt(object.powerstats.intelligence)):(0)) 
                powerStat2[1].valor -=(parseInt(object.powerstats.strength)>0?(parseInt(object.powerstats.strength)):(0)) 
                powerStat2[2].valor -=(parseInt(object.powerstats.speed)>0?(parseInt(object.powerstats.speed)):(0)) 
                powerStat2[3].valor -=(parseInt(object.powerstats.durability)>0?(parseInt(object.powerstats.durability)):(0)) 
                powerStat2[4].valor -=(parseInt(object.powerstats.power)>0?(parseInt(object.powerstats.power)):(0)) 
                powerStat2[5].valor -=(parseInt(object.powerstats.combat)>0?(parseInt(object.powerstats.combat)):(0)) 
                         
                const ordenado =  powerStat2.sort((e, j) => e.valor - j.valor)
                       
                    setMayor(ordenado[ordenado.length-1])
                setMedidas({
                    peso:medidas.peso - parseInt(object.appearance.weight[1]),
                    altura:medidas.altura - parseInt(object.appearance.height[1])
                })
        }
        setTeam(newTeam)
    }
    const verDetalles=(e)=>{
        setDetalle(e)
        console.log(e.appearance["eye-color"])
    }

    return (
        <>
        {
            detalle === null ?(null):(
            <div id="cont_detalle">
               <div className="col-12" id="detalle">
                <div className="">
                    <span onClick={()=>setDetalle(null)} id="btn_close"><i className="bx bxs-x-circle"></i></span>
                </div>
                    <div className="info">
                        <span className="fw-bolder mb-1 fs-5">peso</span>
                        <span className="text-secondary fw-bolder fs-2 mt-1 fst-italic">{detalle !== null?(detalle.appearance.weight[1]):(null)
                        }</span>
                    </div>
                    <div  className="info">
                    <span className="fw-bolder mb-1 fs-5">altura</span>
                        <span className="text-secondary fw-bolder fs-2 mt-1 fst-italic">{detalle.appearance.height[1]}</span>
                    </div>
                    <div  className="info">
                    <span className="fw-bolder mb-1 fs-5">nombre</span>
                        <span className="text-secondary fw-bolder fs-2 mt-1 fst-italic">{detalle.name}</span>
                    </div>
                    <div  className="info">
                    <span className="fw-bolder mb-1 fs-5">alias</span>
                        <span className="text-secondary fw-bolder fs-2 mt-1 fst-italic">{detalle.biography.aliases[0]}</span>
                    </div>
                    <div  className="info">
                    <span className="fw-bolder mb-1 fs-4 fs-5">color de ojos</span>
                        <span className="text-secondary fw-bolder fs-2 mt-1 fst-italic">{detalle.appearance["eye-color"]}</span>
                    </div>
                    <div className="info">
                    <span className="fw-bolder mb-1 fs-5">color de cabello</span>
                        <span className="text-secondary fw-bolder fs-2 mt-1 fst-italic">{detalle.appearance["hair-color"]}</span>
                    </div>
                    <div  className="info">
                    <span className="fw-bolder mb-1 fs-5">lugar de trabajo</span>
                        <span className="text-secondary fw-bolder fs-4 mt-1 fst-italic">{detalle.work.base}</span>
                    </div>
                   
                </div>
             </div>)
        }
        
        <div className={detalle === null? ("container-fluid"):("container-fluid filtro")}>
            <div id="cont_form">
            <div>
                <button onClick={() => setForm(!form)} className="btn btn-outline-secondary text-white m-3" id="btn_buscar">Buscar heroes</button>
            </div>
            {
                form ? (
               
               <div className="">
                    <form className="p-3 form-group d-flex formulario" onSubmit={formik.handleSubmit}>
                        <Form.Input placeholder="ingresar nombre del super heroe" id="input1"
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            error={formik.errors.name}
                            value={formik.values.name}
                        />
                        <button type="submit" className="btn btn-sm ml-1 text-secondary"><i className='bx bx-search-alt-2 fs-4 text-white' ></i></button>
                    </form>
                    <div className="shadow-lg p-1 m-2 cont_heroes">
                        {
                            heroes.length > 0 ? (
                                heroes.map((e,index) =>
                                    <li key={index} className={e.biography.alignment === 'good' || e.biography.alignment === 'neutral' ? ('cont_heroe') : ('cont_heroe bad')}>
                                        <span className="text-uppercase text-secondary fw-bolder">{e.name}</span>
                                        <img src={e.image.url} alt={`super hereoe${e.name}`}></img>
                                        <button className="mt-2 btn btn-sm btn_heroe" onClick={() => agregar(e)}>Agregar al equipo</button>
                                    </li>)
                            ) : (<p className="text-muted fst-italic">Inicie una busqueda</p>)
                        }
                    </div>
                </div>
                ) : (null)
            }
            </div>
            {
                alerta.estado?( 
                <div className="cont_alert">
                        <p>{alerta.mensaje}</p>
                        <button className="btn btn-outline-secondary text-white" onClick={()=>setAlerta({mensaje:'',estado:false})}>OK</button>
                </div>
                ):(null)
            }
            
            {
                team.length !== 0? (
                <div>
                    <div className="mt-5">
                        <p className="text-center text-uppercase fst-italic fw-bolder fs-3 my-2 text-info">Informacion sobre tu equipo</p>
                    </div>
                {/* powerstats totales*/}
                <div className="cont_totales">
                <div className="col-6 py-2 max_min">
                    <div className="col-3 m-auto p-1 d-flex flex-column maxPower">
                        <span className="text-white text-uppercase fw-bolder text-center">{mayor.nomb}</span>
                        <span className="text-secondary text-center fw-bolder">{mayor.valor}</span>
                    </div>
                    
                    <div className="d-flex flex-wrap justify-content-around py-2">
                    {
                        powerStat2.map((e,index)=>
                            <div key={index} className={e.nomb === mayor.nomb?("d-none"):("m-1 col-4 d-flex flex-column text-center p-1 minPower")}>
                               <span className="text-uppercase text-white fw-bolder">{e.nomb}</span> 
                                <span className="text-secondary fw-bolder">{e.valor}</span>
                            </div>
                        )
                    }
                    </div>
                    
                </div>
                {/* peso y altura promedios*/}
                <div className="col-6 justify-content-around pesoAltura">
                        <div className="col-6 d-flex justify-content-center aling-items-center"> 
                            <div className="col-6 d-flex align-items-center cpromedio">
                                <div className="col-12 text-center d-flex flex-column promedio">
                                    <span className="text-uppercase fw-bolder text-white fst-italic">altura</span>
                                    <span className="text-white fs-6">
                                        {
                                            parseInt(medidas.altura/team.length)>0?(parseInt(medidas.altura/team.length)):(null)
                                        } <span className="text-muted">cms</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <div className="col-6 d-flex align-items-center cpromedio">
                                <div className="col-12 d-flex flex-column text-center promedio">
                                    <span className="text-uppercase fw-bolder text-white fst-italic">peso</span>
                                    <span className="text-white fs-6">
                                        {
                                            parseInt(medidas.peso / team.length)>0?(parseInt(medidas.peso / team.length)):(null)
                                        } <span className="text-muted">kg</span>
                                    </span>
                                </div>
                            </div> 
                        </div>
                </div>
            </div>
            </div>):(null)
            }
            
            <div className="container_powerStats">
                {
                    team.length > 0 ? (
                        team.map((e,index) =>
                            <div key={index}className="powerStats">
                                <div className="d-flex col-6 flex-column text-center">
                                    <span className="text-uppercase text-secondary fw-bolder mt-3 fs-4">{e.name}</span>
                                    <div className="cont_Img">
                                        <img src={e.image.url} alt={`super hereoe${e.name}`} className="img_equipo"></img>
                                    </div>
                                </div>
                                {/* powerstats ------ */}
                                <div className="col-6 px-1 d-flex flex-column justify-content-evenly py-3 items">
                                    <h3 className="text-center text-uppercase text-secondary">powerstats</h3>
                                   
                                    <span className="text-uppercase fw-bolder text-white">INTELIGENCIA</span>
                                        <div className="d-flex">
                                            <div className="progress barra mt-1 mb-3 col-11 items_barra" style={{height: 12}}>
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                                    style={{width:`${e.powerstats.intelligence}%`,}} aria-valuemin="0" aria-valuemax="100">
                                                </div>
                                            </div>
                                            <span className="ml-3 mx-1 text-secondary text-white fw-bolder">{e.powerstats.intelligence}</span>
                                        </div>
                                        
                                    <span className="text-uppercase fw-bolder text-white">Fuerza</span>
                                    <div className="d-flex">
                                        <div className="progress barra mt-1 mb-3 col-11 items_barra" style={{height: 12}}>
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                                style={{width:`${e.powerstats.strength}%`}} aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                        </div>
                                        <span className="ml-3 mx-1 text-secondary text-white fw-bolder">{e.powerstats.strength}</span>
                                    </div>
                                        
                                    <span className="text-uppercase fw-bolder text-white">velocidad</span>
                                        <div className="d-flex">
                                            <div className="progress barra mt-1 mb-3 col-11 items_barra" style={{height: 12}}>
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                                    style={{width:`${e.powerstats.speed}%`}} aria-valuemin="0" aria-valuemax="100">
                                                </div>
                                            </div>
                                            <span className="ml-3 mx-1 text-secondary text-white fw-bolder">{e.powerstats.speed}</span>
                                        </div>
                                        
                                    <span className="text-uppercase fw-bolder text-white">durabilidad</span>
                                        <div className="d-flex">
                                        <div className="progress barra mt-1 mb-3 col-11 items_barra" style={{height: 12}}>
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                                style={{width:`${e.powerstats.durability}%`}} aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                        </div>
                                        <span className="ml-3 mx-1 text-secondary text-white fw-bolder">{e.powerstats.durability}</span>
                                        </div>
                                        
                                    <span className="text-uppercase fw-bolder text-white">poder</span>
                                        <div className="d-flex">
                                            <div className="progress barra mt-1 mb-3 col-11 items_barra" style={{height: 12}}>
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                                    style={{width:`${e.powerstats.power}%`}} aria-valuemin="0" aria-valuemax="100">
                                                </div>
                                            </div>
                                        <span className="ml-3 mx-1 text-secondary text-white fw-bolder">{e.powerstats.power}</span>
                                        </div>
                                        
                                    <span className="text-uppercase fw-bolder text-white">combat</span>
                                        <div className="d-flex">
                                        <div className="progress barra mt-1 mb-3 col-11 items_barra" style={{height:12}}>
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                                style={{width:`${e.powerstats.combat}%`}} aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                        </div>
                                        <span className="ml-3 mx-1 text-secondary text-white fw-bolder">{e.powerstats.combat}</span>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button className="mx-2 btn suces" onClick={()=>verDetalles(e)}>Detalles</button>
                                            <button className="mx-2 btn btn-outline-danger fw-bolder" onClick={()=>eliminar(e)}>Eliminar</button>
                                        </div>
                                </div>
                            </div>
                        )
                    ) : (<p className="text-secondary fw-bolder mt-3">No se cargaron Heroes aún en su equipo</p>)
                }
            </div>
        </div>
        </>
    )
}

export default Home
