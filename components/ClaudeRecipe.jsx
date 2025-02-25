import React from "react";
import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe(props) {
    const markdown = `${props.recipe}`;

    return (
        <div>
            <ReactMarkdown children={markdown} />
        </div>
    );
}
