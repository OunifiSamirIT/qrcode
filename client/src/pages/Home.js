import React, { useEffect, useState } from "react";
import InputGroup from "../components/InputGroupEvent";
import RowDetails from "../components/RowDetailsEvent";
import axios from "axios";
import Alert from "../components/Alert";
import { Input } from "reactstrap";

function Home() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/Event", form)
      .then((res) => {
        setMessage(res.data.message);
        /* hide form after save */
        setForm({});
        /* hide errors after save */
        setErrors({});
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
      })
      .catch((err) => setErrors(err.response.data));
  };

 
 //////////////////////////////////////////////////////////
 
 
 
  const [formData, setFormData] = useState({
    Nom: '',
    Date: '',
    Artistes: '',
    Lien: '',
   
  });
  const create = (event) => {
    event.preventDefault();
    loadEvents();
    window.location.reload();
    const formDataF = new FormData();
    formDataF.append("image", selectedFile);
    formDataF.append("Nom", formData.Nom);
    formDataF.append("Date", formData.Date);
    formDataF.append("Artistes", formData.Artistes);
    formDataF.append("Lien", formData.Lien);
   
   
    axios.post("/api/Event", formDataF, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    )
      .then((response) => {

        
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
    Nom: value,
  });
}
/*
& Duration Change
*/
const handleDateChange = (event) => {
  const { value } = event.target;
  console.log(event);
  setFormData({
    ...formData,
    Date: value,
  });
}

/*
& Experience change
*/
const handleArtistesChange = (event) => {
  const { value } = event.target;
  console.log(event);
  setFormData({
    ...formData,
    Artistes: value,
  });
}
/*
& offer Description
*/
const handleLienChange = (event) => {
  const { value } = event.target;
  console.log(event);
  setFormData({
    ...formData,
    Lien: value,
  });
}


////////////////////////////////////////





  
  /* delete */
  const OnDelete = (id__) => {
    if (window.confirm("are you sure to delete this user")) {
      axios.delete(`/api/Event/${id__}`).then((res) => {
        setMessage(res.data.message);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
      });
    }
  };
  /* find all users */
  useEffect(async () => {
    loadEvents();
  }, [1]);

  const loadEvents = async () => {
    await axios.get("/api/Event").then((res) => {
      setUsers(res.data);
    });
  };

  return (
    <div className="row p-4">
      <Alert message={message} show={show} />
      <div className="mt-4">
        <h2> Events</h2>
      </div>
      <div className="col-12 col-lg-4">
        
                <h5 >Titre</h5>
                <Input value={formData.Nom} onChange={handleChange} id="titre" type="text" placeholder="nom" />
                
                <h5 >Mode D'emploi</h5>
                <Input value={formData.Date} onChange={handleDateChange} id="desc" type="text" placeholder="date" />
                
                <h5 >Periode Du travail</h5>
                <Input value={formData.Artistes} onChange={handleArtistesChange} id="desc" type="text" placeholder="artist" />
                <h5 >Mode D'emploi</h5>
                <Input value={formData.Lien} onChange={handleLienChange} id="desc" type="text" placeholder="lien" />
                <h5 >Mode D'emploi</h5>
                <div class="ta-left mT10">
                  <label>Image</label>  
                  <Input
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                      console.log(e.target.files[0])
                    }} type="file" />
                </div>

                <button onClick={create}  className="btn btn-primary" type="submit">
            Add Events 
          </button>

















      </div>
      <div className="col-12 col-lg-7">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Date</th>
              <th scope="col">Artistes</th>
              <th scope="col">Lien</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ Nom, Date, Artistes, Lien, _id }) => (
              <RowDetails
                Nom={Nom}
                Date={Date}
                Artistes={Artistes}
                Lien={Lien}
                Id={_id}
                OnDelete={OnDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      
    </div>
    
  );
}

export default Home;
