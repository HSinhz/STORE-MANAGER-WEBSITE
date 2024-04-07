const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    
    // [GET] /course/:slug
    show(req, res , next){
        Course.findOne( {slug : req.params.slug })
            .then((course) => {
                res.render('course/show', { 
                    course : mongooseToObject( course ) 
                });
            })
            .catch( next);
    }

    // [GET] /course/create
    create( req, res, next){
        res.render('course/create');
    }

    // [POST] /courses/store
    store( req, res, next){
        const formData = req.body;
        formData.image = `https://files.fullstack.edu.vn/f8-prod/courses/27/64e184ee5d7a2.png`
        const course = new Course( formData );
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch( err => {});
    }

    // [GET] /courses/:id/edit
    edit( req, res, next){
        Course.findById( req.params.id)
            .then( course =>  res.render('course/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }

    // [PUT] /courses/:id  
    update( req, res, next){
        Course.updateOne( { _id: req.params.id },  req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch( next);
    }

    // [Delete] /courses/:id  
    delete( req, res, next){
        Course.delete( {_id: req.params.id } )
            .then(() => res.redirect('back'))
            .catch( next );
    }

    // [PATCH] /courses/:id/restore
    restore( req, res, next ){
        Course.restore( {_id: req.params.id } )
            .then(() => res.redirect('back'))
            .catch( next );
    }

    // [Delete] /courses/:id/force 
    destroy( req, res, next){
        Course.deleteOne( {_id: req.params.id } )
            .then(() => res.redirect('back'))
            .catch( next );
    }

    // [POST] /courses/handle-form-action
    handleFormAction(req, res, next){
        switch( req.body.action){
            case 'delete':
                Course.delete( {_id: {$in: req.body.courseIds} } )
                    .then(() => res.redirect('back'))
                    .catch( next );
                break;
            default:
                res.json({massage: 'Action in valid'});
        } 
    }

    getText(req, res, next){
        let textFromBody = req.body;
        return res.json({textFromBody});
    }
    
}

module.exports = new CourseController;