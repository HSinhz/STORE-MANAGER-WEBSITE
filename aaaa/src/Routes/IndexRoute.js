const courseRoute = require('./courseRoute');
const loginRoute = require('./loginRouter');
const shopOwnerRoute = require('./shopownerRoute');
const otpRoute = require('./otpRoute');
const managerRoute = require('./managerRouter');
const appRoute = require('./appRoute');
function route(app){
    app.use('/courses', courseRoute);
    app.use('/api/v1', loginRoute);
    app.use('/api/v1', shopOwnerRoute);
    app.use('/api/v1', otpRoute);
    app.use('/api/v1', managerRoute);
    app.use('/api/v1', appRoute);

}
module.exports = route;