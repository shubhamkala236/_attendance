const {APIError} = require('../utils/app-errors');
const AttendanceService = require('../services/attendance-services');
const {AttendanceModel} = require('../database/models');
const {SubscribeMessage} = require('../utils');
// const pdfService = require('../utils/sendPdf');
// const path = require('path');
// const render = require('xlsx');
// const nw = require('./uploads/FINAL450.xlsx');
module.exports = (app,channel) => {
    const service = new AttendanceService();

    SubscribeMessage(channel,service)
    
   

    app.post('/attendance',async (req,res,next) => {
        
        try {
            const File = req.files.excel;
            

               const {data} = await service.RegisterAttendance(File);

               if(data){
                return res.send("File Uploaded Successfully and employee inserted")
               }
            
           } catch (error) {
            console.log(error);
            return next(new APIError(error.message, 401));
            // next(error);
           }
       
        });

// Get User Attendance by id all 
        app.get('/attendance/:id',async (req,res,next) => {
        
            try {
                const id = req.params.id;
                
    
                   const {data} = await service.getEmployeeAttendance(id);
                //    console.log(data);
                if(data){
                    res.json({message:"fetched the details",data})
                }

             } catch (error) {
                console.log(error);
                return next(new APIError(error.message, 401));
                // next(error);
               }
           
            });    

// Get User Attendance by id and month
        app.get('/attendance-month/:id/:month',async (req,res,next) => {
        
            try {
                const id = req.params.id;
                const month = req.params.month;
                
    
                   const {data} = await service.getEmployeeAttendanceByMonth(id,month);
                //    console.log(data);
                if(data){
                    res.json({message:"fetched the details",data})
                }

             } catch (error) {
                console.log(error);
                return next(new APIError(error.message, 401));
                // next(error);
               }
           
            });    


//get user payroll details -- all payrolls

app.get('/attendance/payroll/:id',async (req,res,next) => {
        
    try {
        const id = req.params.id;
        

           const {data} = await service.getEmployeePayroll(id);
        //    console.log(data);
        if(data){
            res.json({message:"fetched the details",data})
        }

     } catch (error) {
        console.log(error);
        return next(new APIError(error.message, 401));
        // next(error);
       }
   
    });

//Get employee payroll by specific month
    app.get('/attendance/payroll-month/:id/:month',async (req,res,next) => {
        
    try {
        const id = req.params.id;
        const month = req.params.month;
        

           const {data} = await service.getEmployeePayrollByMonth(id,month);
        //    console.log(data);
        if(data){
            res.json({message:"fetched the details",data})
        }

     } catch (error) {
        console.log(error);
        return next(new APIError(error.message, 401));
        // next(error);
       }
   
    });

//Get employee Salary Slip by specific month and year
    app.get('/salarySlip/:id/:month/:year',async (req,res,next) => {
        
        try {
            const id = req.params.id;
            const month = req.params.month;
            const year = req.params.year;
            
    
            const {data} = await service.getEmployeeSalarySlipByMonthAndYear(id,month,year);
            //    console.log(data);
            // const stream = res.writeHead(200,{
            //     'Content-Type': 'application/pdf',
            //     'Content-Disposition': 'attachment;filename=salary.pdf'
            // });
            
            // pdfService.sendPdf(
            //     (chunk) => stream.write(chunk),
            //     () => stream.end(),
            //     data
            // );
            res.json(data);


                
    
         } catch (error) {
            console.log(error);
            return next(new APIError(error.message, 401));
            // next(error);
           }
       
        });



}
           
          
            
        

        
    
    
    

    
