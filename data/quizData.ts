export type QuestionType = 'mcq' | 'coding';

export interface MCQQuestion {
    type: 'mcq';
    question: string;
    options: string[];
    answer: string;
}

export interface CodingQuestion {
    type: 'coding';
    question: string;
    starterCode: string;
}

export type Question = MCQQuestion | CodingQuestion;

export const linearRegressionQuiz: Question[] = [
    {
        type: 'mcq',
        question: 'What is the primary goal of Linear Regression?',
        options: [
            'To classify data into different categories.',
            'To find the best-fitting straight line through the data points.',
            'To group similar data points together.',
            'To reduce the number of variables in a dataset.'
        ],
        answer: 'To find the best-fitting straight line through the data points.'
    },
    {
        type: 'mcq',
        question: 'In the equation y = mx + c, what does \'m\' represent?',
        options: [
            'The y-intercept',
            'The x-value',
            'The slope of the line',
            'The prediction error'
        ],
        answer: 'The slope of the line'
    },
    {
        type: 'mcq',
        question: 'Which of the following is a common method to evaluate the performance of a regression model?',
        options: [
            'Accuracy Score',
            'Confusion Matrix',
            'Root Mean Squared Error (RMSE)',
            'F1-Score'
        ],
        answer: 'Root Mean Squared Error (RMSE)'
    },
    {
        type: 'mcq',
        question: 'What does "overfitting" mean in the context of linear regression?',
        options: [
            'The model is too simple to capture the underlying trend of the data.',
            'The model performs well on training data but poorly on unseen data.',
            'The model has a high bias.',
            'The model fails to converge during training.'
        ],
        answer: 'The model performs well on training data but poorly on unseen data.'
    },
    {
        type: 'coding',
        question: 'Complete the Python function to predict a `y` value given `m`, `x`, and `c`. The formula for a simple linear regression is `y = m*x + c`.',
        starterCode: `def predict(m, x, c):
    # Your code here
    y = 0 
    return y

# Example usage (Do not modify)
slope = 2.5
x_value = 10
intercept = 5
prediction = predict(slope, x_value, intercept)
print(f"The prediction is: {prediction}") # Expected output: 30.0
`
    }
];
