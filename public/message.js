//declaring global variables

let abortController = null;
let isGenerating = false;

//asynchronous function that is invoked when "send" button is pushed

async function sendMessage(){
    
    //grabbing elements of the chat window

    const inputBox = document.getElementById("input-box");
    const chatBox = document.getElementById("chat-box");
    const stopBtn = document.getElementById("stop-btn");
    
    //trim rempves for prompt, if none we jump out of function

    const prompt = inputBox.Value.trim();
    
    // checking for prompt

    if(!prompt) return;

    if(isGenerating){
        stopGenerating();
    }
         
     chatBox.innerHTML += <div class="user-message">You: ${prompt}</div>;
    
       try {
           // create a new instance of the abortcontroller, which stops the function process
           abortController = new AbortController();
           //because the model is generating. the prompt has been sent to the back end.
           isGenerating = true;

           //network request to the api endpoint
           const response = await fetch('http://localhost:3000/api/chat-stream', {
               method: 'POST',
               header: {'Content-Type': 'application/json'},
               body: JSON.stringify({prompt}),
               signal: abortController.signal
        });
            //read the response with built-in method
            const reader = response.body.getReader();

            //create a new instance of text decoder
            const decoder = new TextDecoder();

            //create the bot-message div element
            const botDiv = document.createElement('div');
            botDiv.className = 'bot-messaage';
            botDiv.textContent = 'Ai:' ;
            chatBox.appendChild(botDiv);

            //iterate the process of streaming  the data to the front in batches
            while (true) {
                const {done, value } = await reader.read();
                if (done) break;

                //use additional assignment operator to decode bot message and send to botdiv
                botDiv.textContent += decoder.decode(value, {stream: true});

                //scroll box as data is streaming out 
                chatBox.scrollTop = chatBox.scrollHeight;

                
            }

    }catch (error) {
       chatBox.innerHTML = <div class="bot-message" style="color:red;">${error.message}</div>;
    } finally {
    stopBtn.disable = true;
    isGenerating = false;
    }

}   
 
//
 function stopGenerating (){
    if(abortController){
        abortController.abort();
    }
    isGenerating = false;
    document.getElementById('stop-btn').disable = true;

 }