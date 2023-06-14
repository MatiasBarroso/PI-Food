import {  useEffect, useState } from 'react';
import './CreateRecipe.css';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { nameConverter } from './CreateRecipe.modules';
import LogoForm from '../../assets/lp/1x/1x/eatime-logo-form.png';
import Footer from '../Footer/Footer';

const CreateRecipe = () => {

  ///        VARIABLES - HOOKS        ///

  const dispatch = useDispatch()
  const history = useHistory()
  const state = useSelector(state => state)
  const defaultImg = "https://img.freepik.com/fotos-premium/manos-femeninas-sostienen-cubiertos-sobre-plato-vacio-naranja_185193-33404.jpg?w=996"

  ///////////////////////////////////////////

  ///           LOCAL STATES           ///

  const [data, setData] = useState({
    name: "",
    summary: "",
    healthScore: 1,
    image: defaultImg,
    stepByStep: [],
    diets: []
  })

  const [errors, setErrors] = useState({
    name: "Name is required",
    summary: "Summary is required",
    healthScore: "Health Score is required",
    image: ""
  })

  const [inputs, setInputs] = useState([{ value: "" , num: 1 }])

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

  useEffect(() => {
    if(state.created?.some(el => el.name === nameConverter(data.name))){
      setData({
      name: "",
      summary: "",
      healthScore: 1,
      image: defaultImg,
      stepByStep:[],
      diets: []
    })
    setErrors({
      name: "Name is required",
      summary: "Summary is required",
      healthScore: "Health Score is required",
      image: '',
    })
    setInputs([{ value: "" , num: 1 }])
    console.log('useEffect');
    alert('Your recipes has been created successfully');
    
  }
  },[state.created, data])

  useEffect(() => {
    if(data.stepByStep.length > 0){
      dispatch(createRecipe(data))
    }
  },[dispatch, data])


  const handleSubmit = (e) => {
    e.preventDefault()
    if(state.recipes?.some(el => el.name === data.name.split(" ").map(el => nameConverter(el)).join(" "))){
      alert('The recipe name already exists')
      return;
    }
    if(e.target.submit.name === 'submit'){
      if(inputs.length === 1 && inputs[0].value === "") {
        dispatch(createRecipe(data))
        
      }
      else {
        const steps = inputs.map((el, index) => `Step ${index+1}: ${el.value}`);
        setData({...data, stepByStep: steps})
      }
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

  const handleInputChange = (e, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = { ...updatedInputs[index], value: e.target.value };
    setInputs(updatedInputs);
  }

  const onClose = (d) => {
    setData({
      ...data,
      diets: data.diets.filter(diet => diet !== d )})
  }

  const inputsOnClose = (e) => {
    if(inputs.length > 1){
    setInputs(inputs.filter(el => el.num !== parseInt(e.target.value)))
    }
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
  

  const addStepClick = () => {
    if(inputs.length < 8){
    setInputs([...inputs, { value: '', num: inputs.length + 1 }]);
  }
  }

  return (
    <div className='container-creater'>
      <div className='cont-form'>
        <form className='container-form' onSubmit={handleSubmit}>
          <div className='title-form-cont'>
            <h1 className='title-form'>Create Your Recipe</h1>
          </div>
          <div className='block-form'>
            <div className='sec1'>
              <input className='input-form' type="text"  placeholder='Name' name='name' value={data.name || ""} onChange={handleChange}></input>
              <div>{errors?.name === "" ? <p className='aproved-style'> Name is correct</p> : <p className='error-style'>{errors.name}</p>}</div>
              <input className='input-form' type="text"  placeholder='Image' name='image' value={data.image === defaultImg ? "" : data.image } onChange={handleChange}/>
              <div>{errors?.image === "" ? undefined : <p className='error-style'>{errors.image}</p>}</div>
              <textarea className='textarea' placeholder='Summary' name='summary' value={data.summary || ""} onChange={handleChange}/>
              <div>{errors?.summary === "" ? <p className='aproved-style'>Summary is correct</p> : <p className='error-style'>{errors.summary}</p>}</div> 
              <div className='hs-diets-cont'>
                <div className='hs-cr-cont'>
                  <button className='hs-counter' type='button' value='prev' onClick={scoreOnClick}>-</button>
                  <input  className='hs-cr-input' type="number" name="healthScore" value={data.healthScore || ""} onChange={handleChange}></input>
                  <button className='hs-counter' type='button' value='next' onClick={scoreOnClick}>+</button>
                </div>
                <div className='diets-cr-cont'>
                  <select className='select-filter-create' value={data.diets.length === 0 ? 'Select Diets' : data.diets[data.diets.length - 1] } onChange={handleDietsChange}>
                  <option disabled defaultValue>Select Diets</option>
                  {state && state.diets?.map(diet => 
                    <option key={diet.id} value={diet.name}>{ diet.name }</option>)}
                  </select>
                </div>
              </div>
              <div>{errors?.healthScore === "" ? <p className='aproved-style'>Health Score is correct</p> : <p className='error-style'>{errors.healthScore}</p>}</div>
            </div>
            <div className='sec2'>
              <div className='options-cr-cont'>
                {data.diets?.map((d, index) => <div className='option-selected-create' key={index}>
                  <p>{d}</p>
                  <button className='btn-close' type='button' onClick={() => onClose(d)}>x</button>
              </div>)}
            </div>
            </div>
          </div>
          <div className='block-form'>
            <div className='sec3'>
                  {inputs.length > 0 ? <div className='input-btn-cont'>
                    <input className='input-step' name={inputs[0].num} type="text" placeholder={`Step`} value={inputs[0].value || ""} onChange={e => handleInputChange(e, 0)} />
                    <button className='gg-close' type='button' value={inputs[0].num} onClick={inputsOnClose}>X</button>
                    </div> : <div className='step-empty-input'></div>}
            </div>
            <div className='sec4'>
              <div className='sec2-btns'>
                <button className='add-step' type='button' onClick={addStepClick}>Add Step</button>
                <button className='submit-btn' disabled={active} name='submit' type='submit'>CREATE RECIPE</button>
              </div>
            </div>
          </div>
        </form>
        <button className='back-btn' onClick={goBackHandleClick} type='button'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back
        </button>
      </div>
    </div>
  )
}

export default CreateRecipe