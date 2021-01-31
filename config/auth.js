module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
       
        return next();
        
        
      }
     
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');      
    },
    modAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        if(req.user.usertype== "mod")
        return next();
      }
      res.redirect('/');      
    }
  };