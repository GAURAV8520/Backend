//const express=require('express');
import express from 'express';
const app =express();
const port =process.env.PORT||4000;

app.get('/',(req,res)=>{
    res.send('hello i am gaurav ')
});

app.get('/api/user',(req,res)=>{
    const employees = [
        {
          id: 1,
          name: "John Doe",
          mobile: "123-456-7890",
          address: {
            street: "123 Main St",
            city: "Springfield",
            state: "IL",
            zip: "62701"
          },
          work: "Software Engineer"
        },
        {
          id: 2,
          name: "Jane Smith",
          mobile: "987-654-3210",
          address: {
            street: "456 Oak St",
            city: "Metropolis",
            state: "NY",
            zip: "10001"
          },
          work: "Graphic Designer"
        },
        {
          id: 3,
          name: "Alice Johnson",
          mobile: "555-123-4567",
          address: {
            street: "789 Pine St",
            city: "Gotham",
            state: "NJ",
            zip: "07001"
          },
          work: "Data Scientist"
        },
        {
          id: 4,
          name: "Bob Brown",
          mobile: "555-987-6543",
          address: {
            street: "321 Elm St",
            city: "Star City",
            state: "CA",
            zip: "90210"
          },
          work: "Product Manager"
        }
      ];
      

      res.send(employees);
      
})

app.listen(port,()=>{
    console.log(`listing at port ${port}`)
});


