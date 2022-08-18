const {Router, json} = require('express');
const router = Router();
const fs = require('fs');
const bookID = require('uuid');

let bookList = [];
router.get('/',(req, res) => {
    res.render('index');
})

router.get('/books',(req,res)=> {
    const data = JSON.parse(fs.readFileSync('src/books.json'));
    res.render('books', {data});
})

router.post('/new_book',(req,res)=>{
    const {name,authorname,description}=req.body;
    //validacion
    const books={
        id:bookID.v4(),
        name,
        authorname,
        description
    }
    const currentData = JSON.parse(fs.readFileSync('src/books.json'));
    currentData.unshift(books);
    console.log(currentData);
    const json_books=JSON.stringify(currentData);
    fs.writeFileSync('src/books.json',json_books,'utf-8');
    res.redirect('/');
    console.log("LIBRO INSERTADO");
    console.log(books);
    console.log(books.name);
    console.log(books.description);
    console.log(books.authorname);

})

router.get('/get/:id' ,(req,res)=>{
    const currentData = JSON.parse(fs.readFileSync('src/books.json'));
    console.log(currentData);
    let newBooks = currentData.filter(books=> {
        return req.params.id == books.id;
    });
    console.log(newBooks);
    res.render('editbooks', newBooks [0]);
});


router.post('/editbooks',(req,res)=>{
    const currentData = JSON.parse(fs.readFileSync('src/books.json'));
    currentData.forEach(books=> {
        if(books.id == req.body.id) {
            books.name = req.body.name.length == 0 ? books.name : req.body.name;
            books.authorname = req.body.authorname.length == 0 ? books.authorname : req.body.authorname;
            books.description = req.body.description.length == 0 ? books.description : req.body.description;
        } 
    });
    fs.writeFileSync('src/books.json', JSON.stringify(currentData), 'utf-8');
    res.redirect('/books');
    console.log("ESTOY FUNCIONANDO WE");
    console.log(currentData);
});



module.exports=router;