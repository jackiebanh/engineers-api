import express from 'express';
import mongoose from 'mongoose';

const app = express().use(express.json())
const port = 8080

const engineerSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Name is required']},
  team: {type: String, required: [true, 'Team is required']},
  skills: {type: [String], required: [true, 'Skills are required']},
  createdAt: {type: Date, required: true},
  updatedAt: {type: Date, required: true}
});

mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${DATABASE_HOST}${CA_CERT}`)
const Engineer = mongoose.model('Engineer', engineerSchema);

// remove virtual _id and __v version fields
engineerSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});

const errorMessage = (errorType, message) => {
  return {errorType: errorType, message: message}
}

const validationErrorResponse = (bodyError, res) => {
  if (bodyError.errors['name']) {
    res.status(400).send(errorMessage('Bad Request', bodyError.errors['name'].message))
  } else if (bodyError.errors['team']) {
    res.status(400).send(errorMessage('Bad Request', bodyError.errors['team'].message))
  } else if (bodyError.errors['skills']) {
    res.status(400).send(errorMessage('Bad Request', bodyError.errors['skills'].message))
  }
}

app.get('/engineers', async (req, res) => {
  const engineers = await Engineer.find({});
  res.send(engineers);
})

app.post('/engineers', async (req, res) => {
  const body = req.body;
  const date = new Date();
  body["createdAt"] = date;
  body["updatedAt"] = date;

  const bodyError = new Engineer(body).validateSync();
  if (bodyError) {
    validationErrorResponse(bodyError, res);
  } else {
    Engineer.create(body, (err, engineer) => {
      if (err) {
        res.status(500).send(errorMessage('Internal Server Error', 'Issue with creating engineer'))
      } else {
        res.status(201).send(engineer);
      }
    });
  }
})

app.get('/engineers/:engineerId', (req, res) => {
  const id = req.params.engineerId

  Engineer.findById(id, (err, engineer) => {
    if (engineer) {
      res.status(200).send(engineer)
    } else {
      res.status(404).send(errorMessage('Not found', `No engineer with id '${id}' found`));
    }
  })
})

app.patch('/engineers/:engineerId', (req, res) => {
  const id = req.params.engineerId;
  const body = req.body;
  
  if (body && Object.keys(body).length === 0) {
    res.status(400).send(errorMessage('Bad Request', 'Body must contain at least 1 property to modify of name, team or skills'));
  } else {
    Engineer.findByIdAndUpdate({ "_id": id}, body, async (err, engineer) => {
      if (engineer) {
        const updatedEngineer = await Engineer.findById(id).exec();
        res.status(200).send(updatedEngineer);
      } else {
        res.status(404).send(errorMessage('Not found', `No engineer with id '${id}' found`));
      }
    })
  }
})

app.delete('/engineers/:engineerId', (req, res) => {
  const id = req.params.engineerId;

  Engineer.findById(id, async (err, engineer) => {
    if (engineer) {
      await Engineer.deleteOne(engineer);
      res.status(204).send("Engineer was successfully deleted");
    } else {
      res.status(404).send(errorMessage('Not found', `No engineer with id '${id}' found`))
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})