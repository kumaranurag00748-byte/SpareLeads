import React from "react"
import Markdown from "react-markdown"

export default function Response({ response }) {
    return (
        <section className="suggested-project-container">
            <h2>Suggested project</h2>
            <Markdown>{response}</Markdown>
        </section>
    )
}