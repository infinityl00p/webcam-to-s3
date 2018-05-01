const mongoose = require('mongoose');
const Images = mongoose.model('images');

module.exports = app => {
  app.get('/api/customers/:cid/images', (req,res) => {
    Images.findOne({ cid: req.params.cid })
      .then((images) => {
        if (images) {
          //send the image object
          res.send(images);
        } else {
          new Images({
            cid: req.params.cid,
            front: '',
            side: '',
            back: ''
          })
          .save()
          .then(images => {
            res.send(images);
          })
        }
      })
  });

  app.post('/api/customers/:cid/images', (req,res) => {
    const type = req.query.type;
    const query = {};

    switch(type) {
      case 'front':
        query.front = req.query.url;
        break;

      case 'side':
        query.side = req.query.url;
        break;

      case 'back':
        query.back = req.query.url;
        break;

      default:
        break;
    }

    Images.findOneAndUpdate({ cid: req.params.cid }, query)
      .then((response) => {
        res.send(response);
      })
  });
};
// var query = {'username':req.user.username};
// req.newData.username = req.user.username;
// MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
//     if (err) return res.send(500, { error: err });
//     return res.send("succesfully saved");
// });