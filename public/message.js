//declaring global variables
let abortController = null;
let isGenerating = false;

//asynchronous function that is invoked when "send" button is pushed
async function sendMessage(message) {


//grabbing elements of the chat window
    const inputBox = document.getElementById("inputBox");
    const chatBox = document.getElementById("chatBox");
    const stopbtn = document.getElementById("stop-btn");
     //trim rempves for prompt, if none we jump out of function
    const prompt = inputBox.value.trim();
// checking for prompt
    if(!prompt) return;
    if (isGenerating) {
       stopGeneration(); 
        
    }

    chatBox.innerHTML += <div class="user-message">You: ${prompt}</div>;

    try {
         // create a new instance of the abortcontroller, which stops the function process
        
    }catch (error) {



    }

}

function stopGeneration() {
    if (abortController) {
        abortController.abort();
        
    }
    isGenerating = false;
    document.getElementById('stop-btn').disable = true;
}