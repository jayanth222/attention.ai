import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../../types';
import { sendMessageToAI } from '../../services/geminiService';
import XIcon from '../icons/XIcon';
import SendIcon from '../icons/SendIcon';
import MicIcon from '../icons/MicIcon';
import UserIcon from '../icons/UserIcon';
import SparklesIcon from '../icons/SparklesIcon';
import { useLanguage } from '../../contexts/LanguageContext';

interface DoubtBuddyProps {
    isOpen: boolean;
    onClose: () => void;
}

const DoubtBuddy: React.FC<DoubtBuddyProps> = ({ isOpen, onClose }) => {
    const { t, language } = useLanguage();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (isOpen) {
            setMessages([{ role: 'model', text: t('doubtBuddyInitial') }]);
        }
    }, [isOpen, t, language]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;
        
        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponse = await sendMessageToAI(input, messages);
            const modelMessage: ChatMessage = { role: 'model', text: aiResponse };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = { role: 'model', text: t('doubtBuddyError') };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div 
                className="fixed top-0 right-0 h-full w-full max-w-lg bg-light dark:bg-dark shadow-2xl flex flex-col animate-slide-in-right"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                        <SparklesIcon/> {t('aiDoubtBuddy')}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                           {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5"/></div>}
                            <div className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-br-lg' : 'bg-gray-200 dark:bg-dark-light text-gray-800 dark:text-gray-100 rounded-bl-lg'}`}>
                                <p className="text-sm break-words">{msg.text}</p>
                            </div>
                           {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 flex items-center justify-center flex-shrink-0"><UserIcon className="w-5 h-5"/></div>}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3 justify-start">
                             <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5"/></div>
                             <div className="max-w-xs md:max-w-md px-4 py-3 rounded-2xl bg-gray-200 dark:bg-dark-light">
                                <div className="flex items-center space-x-1">
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-0"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-dark-light rounded-full p-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={t('askMeAnything')}
                            className="flex-1 bg-transparent px-4 py-2 focus:outline-none"
                            disabled={isLoading}
                        />
                        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title={t('voiceInput')}>
                            <MicIcon className="w-6 h-6" />
                        </button>
                        <button onClick={handleSend} disabled={isLoading || input.trim() === ''} className="p-3 bg-primary rounded-full text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                            <SendIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoubtBuddy;