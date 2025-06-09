const express = require('express');
const cors = require('cors');
const app = express();
const{ Ollama } = require('ollama');
const PORT = 3000;


const ollama = new Ollama({
  host: 'http://localhost:11434',
})

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//endpoint for the chat stream
app.post('/api/chat-stream', async (req, res) =>{
  try {

    //prompt from the user
    const { prompt } = req.body;

    //initiate the stream from the model
    //throws stream from user into the model
    const strem = await ollama.chat({
      model: 'deepseek-r1:7b',
      messages: [{role: 'user', content: prompt}],
      stream: true
    });

    res.Header('Content-type', 'text/plain');

    for await (const chunk of stream){
      try {
        
        //check content in each chunk using null aware operator "?."
          if(chunk.messsage?.content){
            
        //write the actual chunks with data to stream
          res.write(chunk.message.content);
          }
  } catch (streamError) {
       console.error(`Error with strem: ${streamError}`);
  }
}

  } catch (error) {
      res.status(500).send('Internal server Error');
  }
});



app.listen(PORT, () => {
  console.log(`Connected to Port ${PORT}`);

});