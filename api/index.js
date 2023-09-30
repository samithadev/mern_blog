const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const cors = require('cors')
const User = require('./models/User')
const Post = require('./models/Post')
const cookieParser = require('cookie-parser');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')

const { default: mongoose } = require('mongoose')

const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect(process.env.MONGODB_URI)

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  const UserData = await User.create({ username, password })
  res.json(UserData)
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const UserData = await User.findOne({ username })
  // const passwordOk = (password === UserData.password)
  const passwordOk = UserData && password === UserData.password;

  if (passwordOk) {
    //User login
    jwt.sign({ username, id: UserData._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: UserData._id,
        username
      });
    });
  } else {
    res.status(400).json('wrong credintials')
  }
})

app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

//create Posts
app.post('/post', upload.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const part = originalname.split('.');
  const ext = part[part.length - 1]
  const newPath = path + '.' + ext
  fs.renameSync(path, newPath)

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const { title, summery, content } = req.body
    const postDoc = await Post.create({
      title,
      summery,
      content,
      cover: newPath,
      auth: info.id,
    })
    res.json(postDoc)
  });

})

//update post
app.put('/post', upload.single('file'), async (req, res) => {
  let newPath = null

  if (req.file) {
    const { originalname, path } = req.file;
    const part = originalname.split('.');
    const ext = part[part.length - 1]
    newPath = path + '.' + ext
    fs.renameSync(path, newPath)
  }

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const { id, title, summery, content } = req.body
    const postDoc = await Post.findById(id)

    const isAuth = JSON.stringify(postDoc.auth) === JSON.stringify(info.id)
    if (!isAuth) {
      return res.status(400).json('invalid Author')
    }

    await postDoc.updateOne({
      title,
      summery,
      content,
      cover: newPath ? newPath : postDoc.cover
    })
    res.json(postDoc)
  });

})

//Post get request
app.get('/post', async (req, res) => {
  res.json(
    await Post.find()
      .populate('auth', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  );
})

app.get('/post/:id', async (req, res) => {
  const { id } = req.params
  const postDoc = await Post.findById(id).populate('auth', ['username'])
  res.json(postDoc)
})

app.delete('/post/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await Post.findById(id);

    if (!postDoc) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Post.deleteOne({ _id: id });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(4000)

//mongodb+srv://blog:1234@cluster.xghc8d4.mongodb.net/?retryWrites=true&w=majority
