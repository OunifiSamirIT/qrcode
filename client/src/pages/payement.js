

import React, { Fragment, useEffect, useState } from "react";

import { Button, Input, Row } from "reactstrap";
import "./stylepay.css"
import imgpay from "./images/card_img.png"
import aa from "./images/a.png"
import Qr from "./qrcode"
import {  Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Payment() {
    const [users, setUsers] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(async () => {
      loadEvents();
    }, []);
  
    const loadEvents = async () => {
     
      try {
        const response = await axios.get(`/api/Event/${id}`);
        const testeur = response.data.Nom
        setUsers(testeur);
        console.log("ttttttttt", testeur);
        return testeur;
      } catch (error) {
        console.log(error.message);
      }
    };

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        nomcard: '',
        cvv: '',
        numcard: '',
        event: '',
      
       
      });
      const create = (event) => {
        event.preventDefault();
        // loadEvents();
        window.location.reload();
        const formDataF = new FormData();
        formDataF.append("fullname", formData.fullname);
        formDataF.append("email", formData.email);
        formDataF.append("nomcard", formData.nomcard);
        formDataF.append("cvv", formData.cvv);
        formDataF.append("numcard", formData.numcard);
       // formDataF.append("event", formData.event);
       
       
        axios.post("/api/pay", formDataF, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        )
          .then((response) => {
    
            navigate('http://localhost:3001/')
            console.log(response);
            
          })
      };
     /*
     & Title Change
     */
     const handleChange = (event) => {
      const { value } = event.target;
      console.log(event);
      setFormData({
        ...formData,
        fullname: value,
      });
    }
    /*
    & Duration Change
    */
    const handleemailChange = (event) => {
      const { value } = event.target;
      console.log(event);
      setFormData({
        ...formData,
        email: value,
      });
    }
    
    /*
    & Experience change
    */
    const handlenomcardChange = (event) => {
      const { value } = event.target;
      console.log(event);
      setFormData({
        ...formData,
        nomcard: value,
      });
    }
    /*
    & offer Description
    */
    const handlecvvChange = (event) => {
        const { value } = event.target;
        console.log(event);
        setFormData({
          ...formData,
          cvv: value,
        });
      }
    const handlenumcardChange = (event) => {
      const { value } = event.target;
      console.log(event);
      setFormData({
        ...formData,
        numcard: value,
      });
    }
   
    //   const handleeventChange = (event) => {
    //     const { value } = event.target;
    //     console.log(event);
    //     setFormData({
    //       ...formData,
    //       event: value,
    //     });
    //   }
  return (

    <Fragment> <div class="container" style={ {background: 'linear-gradient(90deg, rgba(7,187,115,1) 0%, rgba(119,183,188,1) 36%, rgba(115,151,188,1) 45%, rgba(114,147,188,1) 46%, rgba(134,129,188,1) 62%, rgba(89,111,181,1) 100%)'}}>
        <Qr/>
    <div > <img style={{marginLeft:155  }}  src={aa} alt=""/> 
     
    <form action="">
        <div class="row">
             
            <div class="col">

                <h3 class="title">billing address</h3>

                <div class="inputBox">
                    <span>full name :</span>
                    <Input type="text" placeholder="user"   value={formData.fullname} onChange={handleChange}/>
                </div>
                <div class="inputBox">
                    <span>email :</span>
                    <Input type="text" placeholder="example@example.com"  value={formData.email} onChange={handleemailChange}/>
                </div>
               
                <div class="inputBox">
                        <span>CVV :</span>
                        <Input type="text" placeholder="1234" value={formData.cvv} onChange={handlecvvChange}/>
                    </div>

            </div>

            <div class="col">

                <h3 class="title">payment</h3>

                <div class="inputBox">
                    <span>cards accepted :</span>
                    <img src={imgpay} alt=""/>
                </div>
                <div class="inputBox">
                    <span>name on card :</span>
                    <Input type="text" placeholder="mr. john deo" value={formData.nomcard} onChange={handlenomcardChange}/>
                </div>
                <div class="inputBox">
                    <span>credit card number :</span>
                    <Input type="text" placeholder="1111-2222-3333-4444" value={formData.numcard} onChange={handlenumcardChange}/>
                </div>
                <div>
                   
                </div>

            </div>
    
        </div>

        <button onClick={create}  className="btn btn-primary" type="submit">
            Add   
          <i className="fas fa-edit"></i>
      
          </button>
    </form>
    </div>
</div>   </Fragment> 
    
  );
}

export default Payment;
