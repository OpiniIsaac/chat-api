const ChatMessage = require("../Models/chat");
const Group = require("../Models/group");

const  sendMessages =  async (req, res)=>{
     try {
          const { sender_id, recipient_id, group_id, content } = req.body;
      
          // Check if the recipient or group exists
          if (recipient_id) {
            const recipientExist = await User.exists({ _id: recipient_id });
            if (!recipientExist) {
              return res.status(404).json({ error: 'Recipient not found' });
            }
          } else if (group_id) {
            const groupExist = await Group.exists({ _id: group_id });
            if (!groupExist) {
              return res.status(404).json({ error: 'Group not found' });
            }
          }
      
          // Create a new chat message instance
          const newChatMessage = new ChatMessage({
            sender_id,
            recipient_id,
            group_id,
            content,
          });
      
          // Save the chat message to the database
          await newChatMessage.save();
      
          res.status(201).json({ message: 'Chat message sent successfully', data: newChatMessage });
        } catch (error) {
          console.error('Error sending chat message:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
}

const createGroup = async (req,res)=>{
 try {
    const { name, members } = req.body;

//     // Check if members exist
//     const membersExist = await User.find({ _id: { $in: members } });
//     if (membersExist.length !== members.length) {
//       return res.status(404).json({ error: 'One or more members not found' });
//     }

    // Create a new group instance
    const newGroup = new Group({
      name,
      members,
    });

    // Save the group to the database
    await newGroup.save();

    res.status(201).json({ message: 'Group created successfully', data: newGroup });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


const addMember = async (req, res) =>{
     try {
          const { userId } = req.body;
          const { groupId } = req.params;
      
          // Check if the user and group exist
          const userExist = await User.exists({ _id: userId });
          const groupExist = await Group.exists({ _id: groupId });
      
          if (!userExist || !groupExist) {
            return res.status(404).json({ error: 'User or Group not found' });
          }
      
          // Update the group to add the user
          await Group.findByIdAndUpdate(groupId, { $addToSet: { members: userId } });
      
          res.status(200).json({ message: 'User added to group successfully' });
        } catch (error) {
          console.error('Error adding user to group:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
}
module.exports = {sendMessages,createGroup,addMember}