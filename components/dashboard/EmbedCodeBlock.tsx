import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; 

const EmbedCodeBlock = ({ embedCode }: { embedCode: string }) => {
  return (
    <SyntaxHighlighter language="javascript" style={vscDarkPlus} wrapLines wrapLongLines>
      {embedCode}
    </SyntaxHighlighter>
  );
};

export default EmbedCodeBlock;