const {APIError} = require('../utils/app-errors');
const AttendanceService = require('../services/attendance-services');
const {AttendanceModel} = require('../database/models');
const {SubscribeMessage} = require('../utils');
const {isAuthenticatedUser,authorizeRoles} = require('./middlewares/newauth');
// const pdfService = require('../utils/sendPdf');
// const path = require('path');
// const render = require('xlsx');
// const nw = require('./uploads/FINAL450.xlsx');
module.exports = (app,channel) => {
    const service = new AttendanceService();

    SubscribeMessage(channel,service)
    
   
//upload attendance by admin
    app.post('/attendance',isAuthenticatedUser,
    authorizeRoles("admin"),async (req,res,next) => {
        
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

// Get User All Attendance by id  -----------Admin
        app.get('/attendance/:id',isAuthenticatedUser,
        authorizeRoles("admin"),async (req,res,next) => {
        
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

// Get My(User) All Attendance by id  ----------- User
        app.get('/me-attendance',isAuthenticatedUser,async (req,res,next) => {
        
            try {
                const id = req.user.employeeId;
                console.log(id);
                
    
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

// Get User Attendance by id and month and year -------------admin
        app.get('/attendance-month/:id/:month/:year',isAuthenticatedUser,
        authorizeRoles("admin"),async (req,res,next) => {
        
            try {
                const id = req.params.id;
                const month = req.params.month;
                const year = req.params.year;
                
    
                   const {data} = await service.getEmployeeAttendanceByMonth(id,month,year);
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

// Get User Attendance by id and month and year -------------User
        app.get('/me-attendance/:month/:year',isAuthenticatedUser,async (req,res,next) => {
        
            try {
                const id = req.user.employeeId;
                const month = req.params.month;
                const year = req.params.year;
                
    
                   const {data} = await service.getEmployeeAttendanceByMonth(id,month,year);
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

// --------------------------Payroll----------------------------

//get user payroll details -- all payrolls------------admin
app.get('/attendance/payroll/:id',isAuthenticatedUser,
authorizeRoles("admin"),async (req,res,next) => {
        
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

//Get employee payroll by specific month and year -----------------admin
    app.get('/attendance/payroll-month/:id/:month/:year',isAuthenticatedUser,
    authorizeRoles("admin"),async (req,res,next) => {
        
    try {
        const id = req.params.id;
        const month = req.params.month;
        const year = req.params.year;
        

           const {data} = await service.getEmployeePayrollByMonth(id,month,year);
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

    //payroll user gets all his payroll details ALL ------ USER
app.get('/me-payroll',isAuthenticatedUser,async (req,res,next) => {
        
    try {
        const id = req.user.employeeId;
        

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

    ///-------------------------User-specific month and year payroll-------------
    app.get('/me-payroll/:month/:year',isAuthenticatedUser,
    authorizeRoles("admin"),async (req,res,next) => {
        
    try {
        const id = req.user.employeeId;
        const month = req.params.month;
        const year = req.params.year;
        

           const {data} = await service.getEmployeePayrollByMonth(id,month,year);
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

    // ---------------------------------salary slip ----------------------------

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
           
          
            
        

        
    
    
    

    
