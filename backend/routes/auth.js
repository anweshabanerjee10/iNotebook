// const express = require('express')
// const User = require('../models/User')
// const router = express.Router()
// const bcrypt = require('bcryptjs')
// var jwt = require('jsonwebtoken')
// var fetchuser = require('../middleware/fetchuser')
// const { body, validationResult } = require('express-validator')

// const JWT_SECRET = 'Harryisagood$boy'
// router.post(
//   '/createuser',
//   [
//     body('name', 'Enter a valid name').isLength({ min: 3 }),

//     body('email', 'Enter a valid email').isEmail(),

//     body('password').isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }

//     try {
//       let user = await User.findOne({ email: req.body.email })
//       if (user) {
//         return res
//           .status(400)
//           .json({ error: 'Sorry a user with this email already exists' })
//       }

//       // create user
//       const salt = await bcrypt.genSalt(10)
//       const secPass = await bcrypt.hash(req.body.password, salt)

//       user = await User.create({
//         name: req.body.name,
//         password: secPass,
//         email: req.body.email,
//       })

//       const data = {
//         id: user.id,
//       }

//       const authtoken = jwt.sign(data, JWT_SECRET)

//       // res.json(user)
//       res.json({ authtoken })
//     } catch (error) {
//       console.error(error.message)
//       res.status(500).send('Internal Server error')
//     }
//   },
// )
// //Authenticate a user

// router.post(
//   '/login',
//   [
//     body('email', 'Enter a valid email').isEmail(),

//     body('password', 'Paaword cannot be blank').exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }

//     const { email, password } = req.body

//     try {
//       let user = await User.findOne({ email })

//       if (!user) {
//         return res
//           .status(400)
//           .json({ error: 'Please try to log in with correct credentials' })
//       }

//       const passwordCompare = await bcrypt.compare(password, user.password)

//       if (!passwordCompare) {
//         return res
//           .status(400)
//           .json({ error: 'Please try to log in with correct credentials' })
//       }

//       const data = {
//         user: {
//           id: user.id,
//         },
//       }

//       const authtoken = jwt.sign(data, JWT_SECRET)

//       res.json({ authtoken })
//     } catch (error) {
//       console.error(error.message)
//       res.status(500).send('Internal Server error')
//     }
//   },
// )

// //get loggedin user details

// router.post(
//   '/getUser',
//   fetchuser,

//   async (req, res) => {
//     try {
//       userId = req.user.id

//       const user = await User.findById(userId).select('-password')

//       res.send(user)
//     } catch (error) {
//       console.error(error.message)
//       res.status(500).send('Internal Server error')
//     }
//   },
// )
// module.exports = router

// const express = require('express')
// const User = require('../models/User')
// const router = express.Router()
// const { body, validationResult } = require('express-validator')
// const bcrypt = require('bcryptjs')
// var jwt = require('jsonwebtoken')
// var fetchuser = require('../middleware/fetchuser')

// const JWT_SECRET = 'Harryisagoodb$oy'

// // ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
// router.post(
//   '/createuser',
//   [
//     body('name', 'Enter a valid name').isLength({ min: 3 }),
//     body('email', 'Enter a valid email').isEmail(),
//     body('password', 'Password must be atleast 5 characters').isLength({
//       min: 5,
//     }),
//   ],
//   async (req, res) => {
//     // If there are errors, return Bad request and the errors
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }
//     try {
//       // Check whether the user with this email exists already
//       let user = await User.findOne({ email: req.body.email })
//       if (user) {
//         return res
//           .status(400)
//           .json({ error: 'Sorry a user with this email already exists' })
//       }
//       const salt = await bcrypt.genSalt(10)
//       const secPass = await bcrypt.hash(req.body.password, salt)

//       // Create a new user
//       user = await User.create({
//         name: req.body.name,
//         password: secPass,
//         email: req.body.email,
//       })
//       const data = {
//         user: {
//           id: user.id,
//         },
//       }
//       const authtoken = jwt.sign(data, JWT_SECRET)

//       // res.json(user)
//       res.json({ authtoken })
//     } catch (error) {
//       console.error(error.message)
//       res.status(500).send('Internal Server Error')
//     }
//   },
// )

// // ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
// router.post(
//   '/login',
//   [
//     body('email', 'Enter a valid email').isEmail(),
//     body('password', 'Password cannot be blank').exists(),
//   ],
//   async (req, res) => {
//     let success = false
//     // If there are errors, return Bad request and the errors
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }

//     const { email, password } = req.body
//     try {
//       let user = await User.findOne({ email })
//       if (!user) {
//         success = false
//         return res
//           .status(400)
//           .json({ error: 'Please try to login with correct credentials' })
//       }

//       const passwordCompare = await bcrypt.compare(password, user.password)
//       if (!passwordCompare) {
//         success = false
//         return res
//           .status(400)
//           .json({
//             success,
//             error: 'Please try to login with correct credentials',
//           })
//       }

//       const data = {
//         user: {
//           id: user.id,
//         },
//       }
//       const authtoken = jwt.sign(data, JWT_SECRET)
//       success = true
//       res.json({ success, authtoken })
//     } catch (error) {
//       console.error(error.message)
//       res.status(500).send('Internal Server Error')
//     }
//   },
// )

// // ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
// router.post('/getuser', fetchuser, async (req, res) => {
//   try {
//     userId = req.user.id
//     const user = await User.findById(userId).select('-password')
//     res.send(user)
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send('Internal Server Error')
//   }
// })
// module.exports = router

const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchUser')

const JWT_SECRET = 'Harryisagoodb$oy'

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  '/createuser',
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() })
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: 'Sorry a user with this email already exists',
          })
      }
      const salt = await bcrypt.genSalt(10)
      const secPass = await bcrypt.hash(req.body.password, salt)

      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      const data = {
        user: {
          id: user.id,
        },
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      // res.json(user)
      success = true
      res.json({ success, authToken })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Internal Server Error')
    }
  },
)

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    let success = false
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({
            success,
            error: 'Please try to login with correct credentials',
          })
      }

      const passwordCompare = await bcrypt.compare(password, user.password)
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            success,
            error: 'Please try to login with correct credentials',
          })
      }

      const data = {
        user: {
          id: user.id,
        },
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      success = true
      res.json({ success, authToken })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Internal Server Error')
    }
  },
)

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})
module.exports = router
