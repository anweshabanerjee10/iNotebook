// const express = require('express')
// const router = express.Router()
// var fetchuser = require('../middleware/fetchuser')
// const Note = require('../models/Note')
// const { body, validationResult } = require('express-validator')

// //get all the notes using GET
// router.get('/fetchallnotes', fetchuser, async (req, res) => {
//   try {
//     const notes = await Note.find({ user: req.user.id })
//     res.json(notes)
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send('Internal Server error')
//   }
// })

// // add notes using POST

// router.post(
//   '/addnote',
//   fetchuser,
//   [
//     body('title', 'Enter a valid tiltle').isLength({ min: 3 }),

//     body('description', 'Description must be at least 5 characters').isLength({
//       min: 5,
//     }),
//   ],
//   async (req, res) => {
//     try {
//       const { title, description, tag } = req.body

//       const errors = validationResult(req)
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//       }

//       const note = new Note({
//         title,
//         description,
//         tag,
//         user: req.user.id,
//       })
//       const savedNote = await note.save()
//       res.json(note)
//     } catch (error) {
//       console.error(error.message)
//       res.status(500).send('Internal Server error')
//     }
//   },
// )

// // for update using PUT

// router.put(
//   '/updatenote/:id',
//   fetchuser,

//   async (req, res) => {
//     const { title, description, tag } = req.body

//     // create a newnote object
//     try {
//       const newNote = {}

//       if (title) {
//         newNote.title = title
//       }

//       if (description) {
//         newNote.description = description
//       }

//       if (tag) {
//         newNote.tag = tag
//       }

//       // find the note to be updated

//       let note = await Note.findById(req.params.id)

//       if (!note) {
//         return res.status(404).send('Not Found')
//       }

//       if (note.user.toString() !== req.user.id) {
//         return res.status(401).send('Not Allowed')
//       }

//       note = await Note.findByIdAndUpdate(
//         req.params.id,
//         { $set: newNote },
//         { new: true },
//       )
//       res.json({ note })
//     } catch (error) {
//       console.error(error.message)
//       res.status(500).send('Internal Server error')
//     }
//   },
// )

// // delete note using PUT

// router.delete(
//   '/deletenote/:id',
//   fetchuser,

//   async (req, res) => {
//     // find the note to be updated and deleted
//     try {
//       let note = await Note.findById(req.params.id)

//       if (!note) {
//         return res.status(404).send('Not Found')
//       }

//       // allows deletion if user owns this

//       if (note.user.toString() !== req.user.id) {
//         return res.status(401).send('Not Allowed')
//       }

//       note = await Note.findByIdAndDelete(req.params.id)
//       res.json({ Success: 'Note has been deleted', note: note })
//     } catch (error) {
//       console.error(error.message)
//       res.status(500).send('Internal Server error')
//     }
//   },
// )
// module.exports = router

// const express = require('express')
// const router = express.Router()
// const fetchuser = require('../middleware/fetchuser')
// const Note = require('../models/Note')
// const { body, validationResult } = require('express-validator')

// // ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
// router.get('/fetchallnotes', fetchuser, async (req, res) => {
//   try {
//     const notes = await Note.find({ user: req.user.id })
//     res.json(notes)
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send('Internal Server Error')
//   }
// })

// // ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
// router.post(
//   '/addnote',
//   fetchuser,
//   [
//     body('title', 'Enter a valid title').isLength({ min: 3 }),
//     body('description', 'Description must be atleast 5 characters').isLength({
//       min: 5,
//     }),
//   ],
//   async (req, res) => {
//     try {
//       const { title, description, tag } = req.body

//       // If there are errors, return Bad request and the errors
//       const errors = validationResult(req)
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//       }
//       const note = new Note({
//         title,
//         description,
//         tag,
//         user: req.user.id,
//       })
//       const savedNote = await note.save()

//       res.json(savedNote)
//     } catch (error) {
//       console.error(error.message)
//       res.status(500).send('Internal Server Error')
//     }
//   },
// )

// // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
// router.put('/updatenote/:id', fetchuser, async (req, res) => {
//   const { title, description, tag } = req.body
//   try {
//     // Create a newNote object
//     const newNote = {}
//     if (title) {
//       newNote.title = title
//     }
//     if (description) {
//       newNote.description = description
//     }
//     if (tag) {
//       newNote.tag = tag
//     }

//     // Find the note to be updated and update it
//     let note = await Note.findById(req.params.id)
//     if (!note) {
//       return res.status(404).send('Not Found')
//     }

//     if (note.user.toString() !== req.user.id) {
//       return res.status(401).send('Not Allowed')
//     }
//     note = await Note.findByIdAndUpdate(
//       req.params.id,
//       { $set: newNote },
//       { new: true },
//     )
//     res.json({ note })
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send('Internal Server Error')
//   }
// })

// // ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
// router.delete('/deletenote/:id', fetchuser, async (req, res) => {
//   try {
//     // Find the note to be delete and delete it
//     let note = await Note.findById(req.params.id)
//     if (!note) {
//       return res.status(404).send('Not Found')
//     }

//     // Allow deletion only if user owns this Note
//     if (note.user.toString() !== req.user.id) {
//       return res.status(401).send('Not Allowed')
//     }

//     note = await Note.findByIdAndDelete(req.params.id)
//     res.json({ Success: 'Note has been deleted', note: note })
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send('Internal Server Error')
//   }
// })
// module.exports = router

// const express = require('express')
// const Note = require('../models/Note')
// const router = express.Router()
// var fetchuser = require('../middleware/fetchuser.js')
// const { body, validationResult } = require('express-validator')

// // get users notes : GET "/api/notes/getuser" Login required *****************************ROUTE 1*********************************
// router.get('/fetchallnotes', fetchuser, async (req, res) => {
//   try {
//     const notes = await Notes.find({ user: req.user.id })
//     res.json(notes)
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send('some error occured')
//   }
// })

// // add a new note using : POST "/api/notes/addnotes" Login required *****************************ROUTE 2**********************************
// router.post(
//   '/addnote',
//   fetchuser,
//   [
//     body('title', 'Enter a valid title').isLength({ min: 3 }),
//     body('description', 'Enter description of minimum 5 characters').isLength({
//       min: 5,
//     }),
//   ],
//   async (req, res) => {
//     // if there are errors , return bad request and the errors
//     try {
//       const { title, description, tag } = req.body
//       const errors = validationResult(req)
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//       }
//       const notes = new Notes({
//         title,
//         description,
//         tag,
//         user: req.user.id,
//       })
//       const savednote = await notes.save()
//       res.json(savednote)
//     } catch (error) {
//       console.error(error.message)
//       res.status(500).send('some error occured')
//     }
//   },
// )

// // update note using : PUT "/api/notes/updatenote" Login required *****************************ROUTE 3**********************************
// router.put('/updatenote/:id', fetchuser, async (req, res) => {
//   const { title, description, tag } = req.body
//   try {
//     // create a newNote object
//     const newNote = {}
//     if (title) {
//       newNote.title = title
//     }
//     if (description) {
//       newNote.description = description
//     }
//     if (tag) {
//       newNote.tag = tag
//     }
//     // find the note to be updated and update it
//     let notes = await Notes.findById(req.params.id)
//     if (!notes) {
//       return res.status(404).send('Not Found')
//     }
//     if (notes.user.toString() !== req.user.id) {
//       return res.status(401).send('Not Allowed')
//     }
//     notes = await Notes.findByIdAndUpdate(
//       req.params.id,
//       { $set: newNote },
//       { new: true },
//     )
//     res.json({ notes })
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send('some error occured')
//   }
// })

// // update note using : DELETE "/api/notes/deletenote" Login required *****************************ROUTE 4**********************************
// router.delete('/deletenote/:id', fetchuser, async (req, res) => {
//   const { title, description, tag } = req.body
//   try {
//     // find the note to be deleted and delete it
//     let notes = await Notes.findById(req.params.id)
//     if (!notes) {
//       return res.status(404).send('Not Found')
//     }
//     // allow deletion only if user owns this note
//     if (notes.user.toString() !== req.user.id) {
//       return res.status(401).send('Not Allowed')
//     }
//     notes = await Notes.findByIdAndDelete(req.params.id)
//     res.json({ success: 'notes have been deleted', notes: notes })
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send('some error occured')
//   }
// })
// module.exports = router

const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
  '/addnote',
  fetchuser,
  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      })
      const savedNote = await note.save()

      res.json(savedNote)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Internal Server Error')
    }
  },
)

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body
  try {
    // Create a newNote object
    const newNote = {}
    if (title) {
      newNote.title = title
    }
    if (description) {
      newNote.description = description
    }
    if (tag) {
      newNote.tag = tag
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).send('Not Found')
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed')
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true },
    )
    res.json({ note })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).send('Not Found')
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed')
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ Success: 'Note has been deleted', note: note })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})
module.exports = router
