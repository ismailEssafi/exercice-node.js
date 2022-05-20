const db = require('mongoose');
module.exports.start = function() {
    let connectionString = "mongodb://localhost/exercice_node_js";
    console.log(connectionString);
    db.connect(connectionString)
    .then(()=>{
    console.log('Mongodb Connected 🚀');
        return;})
        .catch((err) => {
        console.log('Error Connect MongoDB...',err);
        return;
    });
}
module.exports.close = function(){
    try {
        db.disconnect();
    } catch (error) {
        console.log('Disconnect MongoDB...');
        return;
    }
}
