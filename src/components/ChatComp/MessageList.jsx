import { View, Text, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import theme from '../../core/theme'
import Messages from './Messages'


const MessagesList = ({ onSwipeToReply }) => {
	const [messages, setMessages] = useState([
		{
			user: 0,
			time: "12:00",
			content: "Hey",
		},
		{
			user: 1,
			time: "12:05",
			content: "What's up",
		},
		{
			user: 1,
			time: "12:07",
			content: "How is it going?",
		},
		{
			user: 0,
			time: "12:09",
			content: "things are going great",
		},
		{
			user: 0,
			time: "12:00",
			content: "Good :)",
		},
		{
			user: 1,
			time: "12:05",
			content: "Should we hang out tomorrow? I was thinking of going somewhere which has drinks",
		},
		{
			user: 0,
			time: "12:07",
			content: "Sure",
		},
		{
			user: 1,
			time: "12:09",
			content: "Great",
		},
		{
			user: 0,
			time: "12:07",
			content: "7 o'clock?",
		},
		{
			user: 1,
			time: "12:09",
			content: "Sounds good",
		},
	]);

	const user = useRef(0);
	const scrollView = useRef();

	return (
		<ScrollView style={{ backgroundColor: theme.colors.white, flex: 1 }}
			ref={ref => scrollView.current = ref}
			onContentChange={() => {
				scrollView.current.scrollToEnd({ animated: true })
			}}
		> 
			{messages.map((message, index) => (
				<Messages
					key={index}
					time={message.time}
					isLeft={message.user !== user.current}
					message={message.content}
					onSwipe={onSwipeToReply}
				/>
			))}
		</ScrollView>
	);
};

export default MessagesList;