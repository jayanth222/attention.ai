import React, { useState } from 'react';
import type { Question, MCQQuestion, CodingQuestion } from '../../data/quizData';
import Card from '../shared/Card';
import Button from '../shared/Button';
import CodeEditor from './CodeEditor';
import { useLanguage } from '../../contexts/LanguageContext';

interface QuizPageProps {
    quiz: Question[];
    onComplete: (answers: (string | null)[]) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ quiz, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(quiz.length).fill(null));
    const { t } = useLanguage();

    // Initialize coding answer state separately to handle the editor's controlled component nature
    const initialCode = (quiz.find(q => q.type === 'coding') as CodingQuestion)?.starterCode || '';
    const [codingAnswer, setCodingAnswer] = useState(initialCode);

    const currentQuestion = quiz[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.length - 1;

    const handleAnswerSelect = (answer: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setUserAnswers(newAnswers);
    };
    
    const handleCodingAnswerChange = (code: string) => {
        setCodingAnswer(code);
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = code;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (!isLastQuestion) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        onComplete(userAnswers);
    };

    const renderMCQ = (question: MCQQuestion) => (
        <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{question.question}</h2>
            <div className="space-y-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all text-gray-700 dark:text-gray-200
                            ${userAnswers[currentQuestionIndex] === option
                                ? 'border-primary bg-primary/10 ring-2 ring-primary'
                                : 'border-gray-300 dark:border-gray-600 hover:bg-primary/5'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </>
    );

    const renderCoding = (question: CodingQuestion) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
            <div className="h-full">
                <CodeEditor code={codingAnswer} setCode={handleCodingAnswerChange} />
            </div>
            <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{t('codingAssignment')}</h2>
                <p className="text-gray-600 dark:text-gray-300">{question.question}</p>
            </div>
        </div>
    );
    
    return (
        <Card className="w-full animate-fade-in">
            <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('questionOf', { current: (currentQuestionIndex + 1).toString(), total: quiz.length.toString() })}</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
                    <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="py-8 min-h-[400px]">
                {currentQuestion.type === 'mcq' ? renderMCQ(currentQuestion as MCQQuestion) : renderCoding(currentQuestion as CodingQuestion)}
            </div>

            <div className="flex justify-between items-center mt-6">
                <Button variant="ghost" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                    {t('previous')}
                </Button>
                {isLastQuestion ? (
                    <Button onClick={handleSubmit} glow>{t('submitQuiz')}</Button>
                ) : (
                    <Button onClick={handleNext}>
                        {t('next')}
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default QuizPage;