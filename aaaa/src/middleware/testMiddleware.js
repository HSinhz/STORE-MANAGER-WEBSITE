const testMDW = (req, res, next) => {
    let cookies = req.cookies;
    console.log('MDW Cookies: ', cookies);  
}

module.exports  = {
    testMDW
}