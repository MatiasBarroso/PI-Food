import {  useEffect, useState } from 'react';
import './CreateRecipe.css';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import Card from '../Card/Card'

const CreateRecipe = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const state = useSelector(state => state)
  const defaultImg = "https://img.freepik.com/fotos-premium/manos-femeninas-sostienen-cubiertos-sobre-plato-vacio-naranja_185193-33404.jpg?w=996"

///           LOCAL STATES           ///

  const [data, setData] = useState({
    name: "",
    summary: "",
    healthScore: 1,
    image: defaultImg,
    diets: []
  })

  const [errors, setErrors] = useState({
    name: "Name is required",
    summary: "Summary is required",
    healthScore: "Health Score is required",
    image: ""
  })

  const [active, setActive] = useState(true)

///////////////////////////////////////////

///             VALIDATIONS            ///
  const validate = (name, value) => {

    const regexName = new RegExp("^[ñíóáéú a-zA-Z ]+$");
    const regexUrl = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    const regexHS = new RegExp("^[0-9]+$")

    
    switch(name){

      case "name":
        
        if(value === "") {
          setData({
            ...data,
            [name]: value
        })
          setErrors({
            ...errors,
            [name]: "Name is required",
          })
          return;
        }

        if(regexName.test(value)){
          setData({
            ...data,
            [name]: value
        })
          setErrors({
            ...errors,
            [name]: ""
          })
          return;
        }

        
        setData({
          ...data,
          [name]: value
        })
        setErrors({
          ...errors,
          [name]: "Name can't include numbers or simbols"
        })
        return;

        case "image":

          if(regexUrl.test(value) || value === ""){
            setData({
              ...data,
              [name]: value
          })
            setErrors({
              ...errors,
              [name]: ""
            })
            return;
          } else {
            setData({
              ...data,
              [name]: value
          })
            setErrors({
              ...errors,
              [name]: "Invalid URL"
            })
            return;
          }

        case "summary":
          if(value === "") {
            setData({
              ...data,
              [name]: value
          })
            setErrors({
              ...errors,
              [name]: "Summary is required"
            })
            return;
          }

          setData({
            ...data,
            [name]: value
        })
          setErrors({
            ...errors,
            [name]: ""
          })
          return;

        case "healthScore":
          if(value === "") {
            setData({
              ...data,
              [name]: value
          })
            setErrors({
              ...errors,
              [name]: "Health Score is required"
            })
            return;
          }

          if(regexHS.test(value) && parseInt(value) > 0 && parseInt(value) <= 100){
            setData({
              ...data,
              [name]: value
            })
            setErrors({
              ...errors,
              [name]: ""
            })
            return;
          } else {
            setData({
              ...data,
              [name]: value
            })
            setErrors({
              ...errors,
              [name]: "Score must be between 1 and 100"
            })
            return;
          }
      default: return;
    }
    
  }

///////////////////////////////////////////

  useEffect(() => {
    if(errors.name === "" && errors.summary === "" && errors.healthScore === "" && errors.image === "" ) setActive(false)
    else setActive(true)
  }, [errors, setActive])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(e.target.submit.name === 'submit'){
      console.log(data)
      dispatch(createRecipe(data))
      setData({
        name: "",
        summary: "",
        healthScore: 1,
        image: defaultImg,
        diets: []
      })
      setErrors({
        name: "Name is required",
        summary: "Summary is required",
        healthScore: "Health Score is required",
        image: '',
      })
    }
  }

  const goBackHandleClick = () => {
    history.push("/recipes")
  }

  const handleDietsChange = (e) => {
    e.preventDefault();
    if(!data.diets.includes(e.target.value)){
      setData({
        ...data,
        diets: [...data.diets, e.target.value],
      })
    }
  }
  
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    validate(name, value)
  }

  const onClose = (d) => {
    setData({
      ...data,
      diets: data.diets.filter(diet => diet !== d )})
  }

  const scoreOnClick = (e) => {
    e.preventDefault()
    
    if(e.target.value === 'prev' && data.healthScore > 1){
      setData({
        ...data,
        healthScore: parseInt(data.healthScore) - 1
      })
      setErrors({
        ...errors,
        healthScore: ""
      })
      return;
    }
    if(e.target.value === 'next' && data.healthScore < 100){
      setData({
        ...data,
        healthScore: parseInt(data.healthScore) + 1
      })
      setErrors({
        ...errors,
        healthScore: ""
      })
      return;
    }
    
    setErrors({
      ...errors,
      healthScore: "Score must be between 1 and 100"
    })
  }

  return (
    <div className='container-creater'>
      
      <form className='container-form' onSubmit={handleSubmit}>
        <h1 className='title-creater'>CREATE YOUR RECIPE</h1>
        <input className='input-form' type="text"  placeholder='Name' name='name' value={data.name || ""} onChange={handleChange}></input>
        <div>{errors?.name === "" ? undefined : <p className='error-style'>{errors.name}</p>}</div>
        <input className='input-form' type="text"  placeholder='Image' name='image' value={data.image === defaultImg ? "" : data.image } onChange={handleChange}/>
        <div>{errors?.image === "" ? undefined : <p className='error-style'>{errors.image}</p>}</div>
        <textarea className='textarea' placeholder='Summary' name='summary' value={data.summary || ""} onChange={handleChange}/>
        <div>{errors?.summary === "" ? undefined : <p className='error-style'>{errors.summary}</p>}</div> 
        <div className='hs-diets-cont'>
          <div className='hs-cr-cont'>
            <button className='hs-counter' type='button' value='prev' onClick={scoreOnClick}>-</button>
            <input  className='hs-cr-input' type="number" name="healthScore" value={data.healthScore || ""} onChange={handleChange}></input>
            <button className='hs-counter' type='button' value='next' onClick={scoreOnClick}>+</button>
          </div>
          <div className='diets-cr-cont'>
            <select className='select-filter-create' value={data.diets.length === 0 ? 'Select Diets' : data.diets } onChange={handleDietsChange}>
            <option disabled defaultValue>Select Diets</option>
              {state && state.diets?.map(diet => 
                <option key={diet.id} value={diet.name}>{ diet.name }</option>)}
            </select>
          </div>
        </div>
        <div>{errors?.healthScore === "" ? undefined : <p className='error-style'>{errors.healthScore}</p>}</div>
        <div className='options-cr-cont'>
            {data.diets?.map((d, index) => <div className='option-selected-create' key={index}>
              <p>{d}</p>
              <button className='btn-close' onClick={() => onClose(d)}>x</button>
            </div>)}
        </div>
          <button className='submit-btn' disabled={active} name='submit' type='submit'>CREATE RECIPE</button>
      </form>
      {/* CARD PREVIEW */}
      <div className='card-prw-cont'>
        <h1 className='title-creater-card'>PREVIEW</h1>
        <Card name={data.name} summary={data.summary} image={data.image} score={data.healthScore} />
      </div>
      <div className='sup-cont'>
        <button className="back-btn" onClick={goBackHandleClick}>GO BACK</button>
      </div>
    </div>
  )
}

export default CreateRecipe