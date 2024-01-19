const ChatMessage = require("../Models/chat")

const  sendMessages =  async (req, res)=>{
     try {
          const { sender_id, recipient_id, content } = req.body;
      
          // Create a new chat message instance
          const newChatMessage = new ChatMessage({
            sender_id,
            recipient_id,
            content,
          });
      
          // Save the chat message to the database
          await newChatMessage.save();
      
          res.status(201).json({ message: 'Chat message created successfully', data: newChatMessage });
        } catch (error) {
          console.error('Error creating chat message:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
}

module.exports = {sendMessages}