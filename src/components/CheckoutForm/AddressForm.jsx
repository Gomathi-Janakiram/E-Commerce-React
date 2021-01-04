import React ,{useState,useEffect}from "react"
import {InputLabel,Select,MenuItem,Button,Grid,Typography} from  "@material-ui/core"
import {useForm,FormProvider} from "react-hook-form"
import FormInput from "./CustomTextField"
import {commerce} from "../../lib/commerce"
import { Link } from "react-router-dom"

const AddressForm=({checkoutToken,next})=>{
    const methods=useForm();
    const [shippingCountries,setShippingCountries]=useState([])
    const [shippingCountry,setShippingCountry]=useState('')
    const [shippingSubdivisions,setShippingSubdivisions]=useState([])
    const [shippingSubdivision,setShippingSubdivision]=useState('')
    const [shippingOptions,setshippingOptions]=useState([])
    const [shippingOption,setshippingOption]=useState('')
    // for fetching shipping countries 
    const fetchShippingCountries=async(checkoutTokenId)=>{
        const {countries} =await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries) 
        setShippingCountry(Object.keys(countries)[0]) 
    }

    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)
    },[])

    const countries=Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}))
    console.log(countries)

    // for fetching the subdivisions under that country
    const fetchSubdivisions=async(countryCode)=>{
        const {subdivisions}=await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }
        // whenever country changes its appropriate sub-div should be loaded
    useEffect(()=>{
        if(shippingCountry)fetchSubdivisions(shippingCountry)
    },[shippingCountry])

    const subdivisions=Object.entries(shippingSubdivisions).map(([code,name])=>({id:code,label:name}))

    // for fetching shipping options
    const fetchShippingOptions=async(checkoutTokenId,country,region=null)=>{
            const options=await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region})
            setshippingOptions(options)
            setshippingOption(options[0].id)
            console.log(shippingOptions)
    }
    useEffect(()=>{
        if(shippingSubdivision)fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision)
    },[shippingSubdivision])

    const options=shippingOptions.map((option)=>({id:option.id,label:`${option.description}-(${option.price.formatted_with_symbol})`}))
    
    return(
        <div>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput name="firstName" label="First Name"/>
                        <FormInput name="lastName" label="Last Name"/>
                        <FormInput name="address1" label="Address"/>
                        <FormInput name="email" label="Email"/>
                        <FormInput name="city" label="City"/>
                        <FormInput name="zip" label="ZIP/Postal code"/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                {countries.map((country)=>(
                                    <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem> 
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivisions</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision)=>(
                                    <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e)=>setshippingOption(e.target.value)}>
                                {options.map((option)=>(
                                    <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br/>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
                        <Button type="submit" color="primary" variant="contained">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </div>

    )
}

export default AddressForm