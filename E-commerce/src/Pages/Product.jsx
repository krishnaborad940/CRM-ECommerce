// import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Product(){
    const [formData,setFormData]=useState({
        title:"",
        description:"",
        Price:"",
        Image:null,
        category:"",
        stock:"",
        rate:''
    })
    const navigate=useNavigate()
    // const [alluser,setAlluser]=useState([])

    const handleChange=(e)=>{
        const {name,value,files}=e.target
        setFormData((pre)=>({
            ...pre,[name] : name==='Image'?files[0]:value
        }))
    }


    // useEffect(()=>{
    //    let savedData=JSON.parse(localStorage.getItem("allusers")) || [];
    //    setAlluser(savedData)
    // },[])
    // useEffect(()=>{
    //     if(formData.length>0){
    //         localStorage.setItem("allusers",JSON.stringify(alluser))
    //     }
    // },[alluser])
    const hanleProduct=(e)=>{
        e.preventDefault();
      
        // const checkEmail=alluser.some((user)=>user.email===formData.email)
        // if(checkEmail){
        //     alert("email is already exist ");
        //     return ;
        // }
  
        
        const data=new FormData();
        data.append("title",formData.title)
        data.append("description",formData.description)
        data.append("Price",formData.Price)
        data.append("category",formData.category)
        data.append("Image",formData.Image)
        data.append("stock", formData.stock); 
        data.append("rate", formData.rate); 


        try{
             fetch("http://localhost:8007/api/Product",{
                    method: 'POST',
                    body:data
                })
                .then(res=>res.json())
                .then((data)=>{
                    console.log(data)
                   alert("data added succesfully")
                   navigate("/")
                })
        }catch(err){
            console.log(err)
        }
    }

    return <>
    <h1>Add Product</h1>
    <form onSubmit={hanleProduct}>
        <table border={1}>
            <tbody>
                    <tr>
                <td>Title:</td>
                <td><input type="text" name="title" placeholder="Enter your title" value={formData.title} onChange={handleChange} /></td>
            </tr>
            <tr>
                <td>Description:</td>
                <td><input type="text" name="description" placeholder="Enter your description" value={formData.description} onChange={handleChange} /></td>
            </tr>
             <tr>
                <td>Price:</td>
                <td><input type="text" name="Price" placeholder="Enter your Price" value={formData.Price} onChange={handleChange}  /></td>
            </tr>
             <tr>
                <td>Stock:</td>
                <td><input type="number" name="stock" placeholder="Enter your stock" value={formData.stock} onChange={handleChange} /></td>
            </tr>
             <tr>
                <td>Image:</td>
                <td><input type="File" name="Image"  onChange={handleChange} /></td>
            </tr>
             <tr>
                <td>Category:</td>
                <td><select name="category" value={formData.category} onChange={handleChange} >
                        <option value="">--select--</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Toys">Toys</option>
                    </select></td>
            </tr>
            <tr>
              <td>Rate:</td>
                <td><input type="number" name="rate" placeholder="Enter your rate" value={formData.rate} onChange={handleChange} /></td>
            </tr>
            <tr>
                <td></td>
                <td><input type="submit" value="Add Product" /></td>
            </tr>
            </tbody>
        </table>
    </form>
    </>
}