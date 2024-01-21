const ChatMessage = require("../Models/chat");
const Group = require("../Models/group");
const User = require('../Models/UserModel')

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

const createGroup = async (req, res) => {
  try {
    const { name, creatorId } = req.body;

    // Create a new group instance
    const newGroup = new Group({
      name,
      members: [creatorId], // Include the creator as a member
    });

    // Save the group to the database
    await newGroup.save();

    res.status(201).json({ message: 'Group created successfully', data: newGroup });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getGroupsForUser = async (req, res) => {
  try {
    const userId = req.body.userId; 

    // Find all groups where the user is a member
    const userGroups = await Group.find({ members: userId });

    res.status(200).json({ data: userGroups });
  } catch (error) {
    console.error('Error fetching user groups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const { groupId } = req.params;

    // Check if the group exists
    const groupExist = await Group.exists({ _id: groupId });

    if (!groupExist) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Check if the user exists
    const userExist = await User.exists({ _id: userId });

    if (!userExist) {
      return res.status(404).json({ error: 'User not found' });
    }

    await Group.findByIdAndUpdate(groupId, { $addToSet: { members: userId } });

    // Retrieve the updated group data with the new member information
    const updatedGroup = await Group.findById(groupId).populate('members');

    res.status(200).json({ message: 'User added to group successfully', data: updatedGroup });
  } catch (error) {
    console.error('Error adding user to group:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getChatMessages = async (req, res) => {
  try {
    const chatMessages = await ChatMessage.find()
      .populate('sender_id')
      .populate('recipient_id')
      .exec();

    // Log details for each chat message
    chatMessages.forEach((message) => {
      console.log(`Message ID: ${message._id}`);
      console.log(`Sender: ${message.sender_id.username} (${message.sender_id.email})`);
      console.log(`Recipient: ${message.recipient_id ? message.recipient_id.username : 'N/A'}`);
      console.log(`Content: ${message.content}`);
      console.log(`Timestamp: ${message.timestamp}`);
      console.log('------------------------');
    });

    res.status(200).json({ data: chatMessages });
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getChatMessagesForUserOrGroup = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Invalid request. Please provide a valid group ID' });
    }

    const query = { group_id: id };

    const groupMessages = await ChatMessage.find(query)
      .populate('sender_id')
      .populate('recipient_id')
      .populate('group_id')
      .exec();

    res.status(200).json({ data: groupMessages });
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = {sendMessages,createGroup,addMember,getGroupsForUser,getChatMessages,getChatMessagesForUserOrGroup}