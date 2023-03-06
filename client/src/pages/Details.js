import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import InputGroup from '../components/InputGroupEvent'

function Details() {
 
  const [form, setForm] = useState({});
  const {id} = useParams();
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
  };

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    axios.put(`/api/Event/${id}`, form)
    .then(res=>{
      navigate('/')
    })
    .catch(err=>setErrors(err.response.data))
    
  }

  useEffect(async () => {
    await axios.get(`/api/Event/${id}`).then((res) => {
      setForm(res.data);
      
    });
  }, []);
  return (
    <div className="container mt-4 col-12 col-lg-4">
        <form onSubmit={onSubmitHandler}>
          <InputGroup
            label="Nom"
            type="text"
            name="Nom"
            onChangeHandler={onChangeHandler}
            errors={errors.Nom}
            value={form.Nom}
          />
          <InputGroup
            label="Date"
            type="text"
            name="Date"
            onChangeHandler={onChangeHandler}
            errors={errors.Date}
            value={form.Date}
          />
          <InputGroup
            label="Artistes"
            type="text"
            name="Artistes"
            onChangeHandler={onChangeHandler}
            errors={errors.Artistes}
            value={form.Artistes}
          />
          <InputGroup
            label="Lien"
            type="text"
            name="Lien"
            onChangeHandler={onChangeHandler}
            errors={errors.Lien}
            value={form.Lien}
          />
          <button className="btn btn-primary" type="submit">Update Event</button>
        </form>
      </div>
  )
}

export default Details