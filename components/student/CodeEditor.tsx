import React from 'react';

interface CodeEditorProps {
    code: string;
    setCode: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
    const lineCount = code.split('\n').length;
    
    return (
        <div className="bg-[#282c34] rounded-lg overflow-hidden w-full h-full flex font-mono text-sm">
            <div className="line-numbers text-gray-500 p-4 text-right select-none">
                {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                ))}
            </div>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-transparent text-white p-4 resize-none focus:outline-none"
                spellCheck="false"
                wrap="soft"
            />
        </div>
    );
};

export default CodeEditor;
