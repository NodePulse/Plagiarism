import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    const { code, language, selectedTransformations } = await req.json();
    let prompt = `Refactor the following ${language} code to make it appear less syntactically and structurally similar to its original form, while strictly preserving its functionality and correctness. `;
    prompt += `Apply the following transformations: `;

    const transformationsList = [];
    if (selectedTransformations.renameVariables) transformationsList.push('Rename variables and function names to less obvious or different names which may be short name and always use valiable names like i, j, k, etc. only in if there is loop. Also short the output statement. Always write less code.');
    if (selectedTransformations.addComments) transformationsList.push("Remove all comments and add short comments and also miss some comments. Make it like random comments as I write comment forcefully so, the comments are very short.");
    if (selectedTransformations.reformatCode) transformationsList.push('Reformat the code (e.g., change indentation, add/remove blank lines, adjust spacing) without altering syntax.');
    if (selectedTransformations.restructureLogic) transformationsList.push('Slightly restructure logical blocks or expressions where possible without changing the program\'s behavior (e.g., combine or split simple statements, reorder independent lines).');


    prompt += transformationsList.join(' ');
    prompt += `\n\nOriginal ${language} code:\n\`\`\`${language}\n${code}\n\`\`\`\n\nProvide only the refactored ${language} code within a single \`\`\`${language}\`\`\` block. Do not include any introductory or concluding text.`;

    try {
      const chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = process.env.GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log(result?.candidates[0]?.content.parts[0].text)

      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        const llmResponseText = result.candidates[0].content.parts[0].text;
        const codeMatch = llmResponseText?.match(/```[^\n]*\n([\s\S]*?)```/);
        const transformedCode = codeMatch?.[1]?.trim() || llmResponseText?.trim();
        return NextResponse.json({transformedCode});
      }
    } catch (err) {
      console.error('Transformation error:', err);
}
}

export function GET() {
  return NextResponse.json({message: "Hello"})
}