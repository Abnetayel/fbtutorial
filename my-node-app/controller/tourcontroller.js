const Tour=require('../models/tourmodel');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`, 'utf-8'));
//  exports.checkbody= (req,res)=>{
//     if(!req.body.name||!req.body.price){
//         return res.status(404).json({
//             status:'fail',
//             message: 'please provide name and price'
//         })
//     }
//  }
// exports.checkID=(req,res,next,val)=>{
//     console.log(`Tour id is ${val}`);
//     const id = req.params.id * 1;
//     const tour = tours.find(el => el.id === id);
//     if (!tour) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID',
//             data: null
//         });
//     }
//     next();
// }
exports.getAllTours = async(req, res) => {
    try{
        const querobject= {...req.query}
        const excludedFields = ['sort', 'page', 'limit'];
        excludedFields.forEach(el => delete querobject[el]);
        console.log(req.query)
        // const tours = await Tour.find() 
        const query =  Tour.find(querobject)
        const tours= await query
        res.status(200).json({
            status:"success",
            results:tours.length,
            data:{tours}
        })
    }
    catch(err){
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
// const tours = await Tour.find() 
    // console.log(`Request time is ${req.requestTime}`);
    // try {
    //     res.status(200).json({
    //         status: 'success',
    //         results: tours.length,
    //         time: req.requestTime,
    //         data: { tours }
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         status: 'error',
    //         message: 'Server error'
    //     });
    // }
};

exports.getSpecificTour = async(req, res) => {
    // const id = parseInt(req.params.id, 10);
    // const id = req.params.id * 1;
    // const tour = tours.find(el => el.id === id);
    // if (!tour) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID',
    //         data: null
    //     });
    // }
//     const { tour } = req;
//     res.json({
//         status: 'success',
//         data: { tour }
//     });
// };
try{
    const tour = await Tour.findById(req.params.id)
    // const tour =await Tour.find({_id:req.params.id})
    // const tour = await Tour.find({"name":"Grand Canyon Adventure"})
    res.status(202).json({
      status:'success',
      data:{tour}  
    })
}
catch(err){
    res.status(404).json({
        status:'fail',
        message:err.message
    })
}
}
exports.postTour =  async(req, res) =>{
 try{
    const newTour= await Tour.create(req.body);
    res.status(201).json({
        status: "success",
        data: { tour: newTour }
    })
}

catch(err){
    res.status(500).json({
        status: 'error',
        message: err.message
    });
}}
//      {
//     try {
//         const tourId = tours.length ? tours[tours.length - 1].id + 1 : 1;
//         const newTour = { id: tourId, ...req.body };
//         tours.push(newTour);
//         fs.writeFile(`${__dirname}/../data/tours-simple.json`, JSON.stringify(tours), (err) => {
//             if (err) throw err;
//             res.status(201).json({
//                 status: "success",
//                 data: { tour: newTour }
//             });
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Server error'
//         });
//     }
// };

exports.patchTour = async(req, res) => {
    // res.send('patchTour');
    // const id = parseInt(req.params.id, 10);
//    const { tour } = req;

//     Object.assign(tour, req.body);
//     fs.writeFile(`${__dirname}/../data/tours-simple.json`, JSON.stringify(tours), (err) => {
//         if (err) throw err;
//         res.status(200).json({
//             status: 'success',
//             data: { tour }
//         });
//     });

try{const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}); 
res.status(200).json({
    status:'success',
    data:{
        tour
    }
})
}
catch(err){
    res.status(404).json({
        status:'fail',
        message:err
    })
}
};

exports.deleteTour =async (req, res) => {
    // const id = parseInt(req.params.id, 10);
    // const id = req.params.id * 1;
    // const tourIndex = tours.findIndex(el => el.id === id);
    // if (tourIndex === -1) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID',
    //         data: null
    //     });
    // }

    // tours.splice(tourIndex, 1);
    // fs.writeFile(`${__dirname}/../data/tours-simple.json`, JSON.stringify(tours), (err) => {
    //     if (err) throw err;
    //     res.status(204).json({
    //         status: 'success',
    //         data: null
    //     });
    // });
try{
await Tour.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:'success',
        message:'tour is deleted successfully'
    })
}
catch(err){
    res.status(404).json({
        status:'fail',
        message:err
    })
}

};
