import React, { useState, useRef, useEffect } from 'react';
import type { GroupChatMessage, User } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import XIcon from '../icons/XIcon';
import SendIcon from '../icons/SendIcon';

interface GroupChatProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: User;
}

// Mock data
const mockUsers = [
    { name: 'Alice', avatar: '😊' },
    { name: 'Bob', avatar: '🧑‍💻' },
    { name: 'Charlie', avatar: '🤔' },
];

const initialMessages: GroupChatMessage[] = [
    {
        id: 1,
        user: mockUsers[0],
        text: 'Hey everyone! Did anyone understand the last part of the lecture on linear regression?',
        timestamp: '10:30 AM'
    },
    {
        id: 2,
        user: mockUsers[1],
        text: 'I got most of it, but the part about cost functions was a bit tricky.',
        timestamp: '10:31 AM'
    },
];

const mockReplies = [
    "That makes sense, thanks!",
    "I'm still a bit lost, can you explain the part about gradient descent?",
    "Oh, I see now. The visualization in the textbook helped me a lot.",
    "Has anyone started the assignment yet?",
    "Yeah, I'm working on the coding question. It's challenging!",
];

const GroupChat: React.FC<GroupChatProps> = ({ isOpen, onClose, currentUser }) => {
    const { t } = useLanguage();
    const [messages, setMessages] = useState<GroupChatMessage[]>(initialMessages);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (input.trim() === '') return;

        const newMessage: GroupChatMessage = {
            id: messages.length + 1,
            user: { name: t('you'), avatar: '🎓' },
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, newMessage]);
        setInput('');
        
        // Simulate a reply from a random user
        setTimeout(() => {
            const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
            const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
            const replyMessage: GroupChatMessage = {
                id: messages.length + 2,
                user: randomUser,
                text: randomReply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, replyMessage]);
        }, 1500 + Math.random() * 1000);
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center" onClick={onClose}>
            <div
                className="w-full h-full lg:w-3/4 lg:h-5/6 lg:max-w-4xl lg:rounded-2xl bg-light dark:bg-dark shadow-2xl flex flex-col animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                        {t('classChat')}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-3 ${msg.user.name === t('you') ? 'justify-end' : 'justify-start'}`}>
                            {msg.user.name !== t('you') && (
                                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-dark-light text-lg flex items-center justify-center flex-shrink-0">
                                    {msg.user.avatar}
                                </div>
                            )}
                            <div>
                                {msg.user.name !== t('you') && <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 ml-2">{msg.user.name}</p>}
                                <div className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${msg.user.name === t('you') ? 'bg-primary text-white rounded-br-lg' : 'bg-white dark:bg-dark-light text-gray-800 dark:text-gray-100 rounded-bl-lg'}`}>
                                    <p className="text-sm break-words">{msg.text}</p>
                                </div>
                                <p className={`text-xs text-gray-400 dark:text-gray-500 mt-1 ${msg.user.name === t('you') ? 'text-right mr-2' : 'ml-2'}`}>
                                    {msg.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-dark-light rounded-full p-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={t('typeAMessage')}
                            className="flex-1 bg-transparent px-4 py-2 focus:outline-none"
                        />
                        <button onClick={handleSend} disabled={input.trim() === ''} className="p-3 bg-primary rounded-full text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupChat;
